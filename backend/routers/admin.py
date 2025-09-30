"""
Admin-only endpoints for Career Navigator
Only accessible to users with 'admin' role
"""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from sqlalchemy.orm import Session
import os

from schemas import User, UserCreate
from database import get_db, get_user_by_email, create_user

router = APIRouter()

# Security
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = "HS256"
security = HTTPBearer()

def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    """Get current user and verify they have admin role"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = get_user_by_email(db, email)
    if user is None:
        raise credentials_exception
    
    # Check if user has admin role
    if user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied. Admin role required."
        )
    
    return user

@router.post("/create-student", response_model=User)
async def create_student_account(
    user: UserCreate, 
    current_admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """
    Create a new student account.
    Only accessible to users with 'admin' role.
    """
    # Check if user already exists
    existing_user = get_user_by_email(db, user.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Force role to be 'student' for security
    from passlib.context import CryptContext
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    
    hashed_password = pwd_context.hash(user.password)
    new_user = create_user(
        db=db,
        email=user.email,
        hashed_password=hashed_password,
        role="student",  # Always create as student
        profile_data={}
    )
    
    return User(
        id=new_user.id,
        email=new_user.email,
        role=new_user.role,
        profile_data={}
    )

@router.delete("/delete-student/{student_id}")
async def delete_student_account(
    student_id: int,
    current_admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """
    Delete a student account.
    Only accessible to users with 'admin' role.
    """
    from database import User
    
    # Find the student
    student = db.query(User).filter(User.id == student_id, User.role == "student").first()
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
    
    # Delete the student
    db.delete(student)
    db.commit()
    
    return {"message": f"Student {student.email} deleted successfully"}

@router.get("/list-students")
async def list_students(
    current_admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """
    List all student accounts.
    Only accessible to users with 'admin' role.
    """
    from database import User
    
    students = db.query(User).filter(User.role == "student").all()
    
    return [
        {
            "id": student.id,
            "email": student.email,
            "created_at": student.created_at.isoformat() if student.created_at else None
        }
        for student in students
    ]
