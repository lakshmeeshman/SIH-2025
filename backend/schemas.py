from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional, Dict, Any

class ProfileProject(BaseModel):
    title: str = Field(..., min_length=1, description="Project title")
    description: str = Field(..., min_length=1, description="Project description")
    technologies: List[str] = Field(default=[], description="List of technologies used in the project")

class ProfileExperience(BaseModel):
    role: str = Field(..., min_length=1, description="Role title")
    company: str = Field(..., min_length=1, description="Company name")
    description: str = Field(..., min_length=1, description="Experience description")
    duration: str = Field(..., description="Duration of the experience")

class UserProfileData(BaseModel):
    name: Optional[str] = Field(None, description="Full name")
    phone: Optional[str] = Field(None, description="Phone number")
    linkedin: Optional[str] = Field(None, description="LinkedIn profile URL")
    github: Optional[str] = Field(None, description="GitHub profile URL")
    skills: Optional[List[str]] = Field(default=[], max_length=20, description="List of skills (max 20)")
    projects: Optional[List[ProfileProject]] = Field(default=[], description="List of projects")
    experience: Optional[List[ProfileExperience]] = Field(default=[], description="List of work experience")

class UserProfileUpdate(BaseModel):
    profile_data: UserProfileData

class User(BaseModel):
    id: int
    email: str
    role: str
    profile_data: Optional[Dict[str, Any]] = None

class UserCreate(BaseModel):
    email: str = Field(..., description="Email address")
    password: str = Field(..., min_length=6, description="Password must be at least 6 characters")
    role: str = Field(default="student", description="User role")

class UserLogin(BaseModel):
    email: str = Field(..., description="Email address")
    password: str = Field(..., description="Password")

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
