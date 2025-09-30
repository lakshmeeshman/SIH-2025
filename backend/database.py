"""
Database configuration and models for Career Navigator
Supports both SQLite (development) and PostgreSQL (production)
"""

import os
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import json
from passlib.context import CryptContext

# Password hashing context
pwd_context = CryptContext(
    schemes=["bcrypt"], 
    deprecated="auto",
    bcrypt__default_rounds=4
)

# Database URL from environment variable
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./career_navigator.db")

# Create database engine
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create base class for models
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="student")
    profile_data = Column(JSON, default={})  # JSON field
    created_at = Column(DateTime, default=datetime.utcnow)

def get_db():
    """Dependency to get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    """Create all database tables"""
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")

def get_user_by_email(db, email: str):
    """Get user by email from database"""
    return db.query(User).filter(User.email == email).first()

def create_user(db, email: str, hashed_password: str, role: str = "student", profile_data: dict = None):
    """Create a new user in database"""
    user = User(
        email=email,
        hashed_password=hashed_password,
        role=role,
        profile_data=profile_data if profile_data else {}
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def update_user_profile(db, email: str, profile_data: dict):
    """Update user profile data"""
    user = db.query(User).filter(User.email == email).first()
    if user:
        user.profile_data = profile_data
        db.commit()
        return user
    return None

def get_user_profile_data(db, email: str):
    """Get user profile data from database"""
    user = db.query(User).filter(User.email == email).first()
    if user and user.profile_data:
        return user.profile_data
    return {}

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)

# Initialize database on import
if __name__ == "__main__":
    create_tables()
