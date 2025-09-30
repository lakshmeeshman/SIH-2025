from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from typing import Optional
import os
from sqlalchemy.orm import Session

from schemas import User, UserProfileUpdate
from database import get_db, get_user_by_email, update_user_profile, get_user_profile_data

router = APIRouter()

# Security
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = "HS256"
security = HTTPBearer()

# Database connection is handled in database.py

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
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
    return user

def require_student_or_admin_role(current_user = Depends(get_current_user)):
    if current_user.role not in ["student", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied. Student or admin role required."
        )
    return current_user

@router.get("/me", response_model=User)
async def get_current_user_profile(current_user = Depends(require_student_or_admin_role), db: Session = Depends(get_db)):
    """
    Get the current user's profile data.
    Only accessible to users with 'student' role.
    """
    profile_data = get_user_profile_data(db, current_user.email)
    return User(
        id=current_user.id,
        email=current_user.email,
        role=current_user.role,
        profile_data=profile_data
    )

@router.put("/me", response_model=User)
async def update_current_user_profile(
    profile_update: UserProfileUpdate,
    current_user = Depends(require_student_or_admin_role),
    db: Session = Depends(get_db)
):
    """
    Update the current user's profile data.
    Only accessible to users with 'student' role.
    Replaces the entire profile_data object with the new data.
    """
    # Update the user's profile data in the database
    updated_user = update_user_profile(db, current_user.email, profile_update.profile_data.dict())
    
    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Return the updated user
    return User(
        id=current_user.id,
        email=current_user.email,
        role=current_user.role,
        profile_data=profile_update.profile_data.dict()
    )
