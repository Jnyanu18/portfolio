from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
from enum import Enum
import uuid

# Enums
class SkillCategory(str, Enum):
    frontend = "frontend"
    backend = "backend"
    design = "design"
    tools = "tools"

# Project Models
class ProjectBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1, max_length=1000)
    image: str = Field(..., min_length=1)
    technologies: List[str] = Field(..., min_items=1)
    category: str = Field(..., min_length=1, max_length=100)
    demo_url: Optional[str] = None
    github_url: Optional[str] = None
    featured: bool = False

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

# Skill Models
class SkillBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    level: int = Field(..., ge=0, le=100)
    years: int = Field(..., ge=0, le=50)
    category: SkillCategory

class SkillCreate(SkillBase):
    pass

class Skill(SkillBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

# Contact Models
class ContactSubmission(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=2000)

class Contact(ContactSubmission):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    is_read: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

# Contact Info Models
class ContactInfoBase(BaseModel):
    email: EmailStr
    phone: Optional[str] = None
    location: Optional[str] = None
    availability: Optional[str] = None
    response_time: Optional[str] = None

class ContactInfo(ContactInfoBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

# Response Models
class ApiResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None

class SkillsResponse(BaseModel):
    frontend: List[Skill]
    backend: List[Skill]
    design: List[Skill]
    tools: List[Skill]