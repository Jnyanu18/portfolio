from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path
import os
import logging
from contextlib import asynccontextmanager

# Import our models and database
from models import (
    Project, Skill, Contact, ContactInfo, ContactSubmission,
    ApiResponse, SkillsResponse
)
from database import get_database
from seed_data import seed_database

# Setup
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Lifespan manager for startup/shutdown
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting portfolio backend...")
    try:
        # Seed database with initial data
        await seed_database()
        logger.info("Database seeded successfully")
    except Exception as e:
        logger.error(f"Error during startup: {e}")
    
    yield
    
    # Shutdown
    logger.info("Shutting down portfolio backend...")
    db = get_database()
    await db.close()

# Create the main app
app = FastAPI(
    title="Portfolio API",
    description="Backend API for Alex Chen's portfolio website",
    version="1.0.0",
    lifespan=lifespan
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running", "status": "healthy"}

# Project endpoints
@api_router.get("/projects", response_model=list[Project])
async def get_projects():
    """Get all projects"""
    try:
        db = get_database()
        projects = await db.get_projects()
        return projects
    except Exception as e:
        logger.error(f"Error getting projects: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch projects")

@api_router.get("/projects/featured", response_model=list[Project])
async def get_featured_projects():
    """Get featured projects only"""
    try:
        db = get_database()
        projects = await db.get_featured_projects()
        return projects
    except Exception as e:
        logger.error(f"Error getting featured projects: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch featured projects")

# Skills endpoints
@api_router.get("/skills", response_model=SkillsResponse)
async def get_skills():
    """Get all skills grouped by category"""
    try:
        db = get_database()
        skills = await db.get_skills()
        return SkillsResponse(**skills)
    except Exception as e:
        logger.error(f"Error getting skills: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch skills")

# Contact endpoints
@api_router.post("/contact", response_model=ApiResponse)
async def submit_contact(contact_data: ContactSubmission):
    """Submit contact form"""
    try:
        db = get_database()
        
        # Create contact object
        contact = Contact(**contact_data.dict())
        
        # Save to database
        contact_id = await db.create_contact(contact)
        
        logger.info(f"New contact submission: {contact.name} - {contact.subject}")
        
        return ApiResponse(
            success=True,
            message="Message sent successfully! I'll get back to you soon.",
            data={"id": contact_id}
        )
    except Exception as e:
        logger.error(f"Error submitting contact: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

@api_router.get("/contact-info", response_model=ContactInfo)
async def get_contact_info():
    """Get contact information"""
    try:
        db = get_database()
        contact_info = await db.get_contact_info()
        
        if not contact_info:
            raise HTTPException(status_code=404, detail="Contact information not found")
        
        return contact_info
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting contact info: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch contact information")

# Admin endpoints (for future use)
@api_router.get("/contacts", response_model=list[Contact])
async def get_contacts():
    """Get all contact submissions (admin only)"""
    try:
        db = get_database()
        contacts = await db.get_contacts()
        return contacts
    except Exception as e:
        logger.error(f"Error getting contacts: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch contacts")

# Include the router in the main app
app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)