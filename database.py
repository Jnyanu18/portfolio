from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Dict, Optional
import os
from models import Project, Skill, Contact, ContactInfo, SkillCategory
import logging

logger = logging.getLogger(__name__)

class Database:
    def __init__(self, mongo_url: str, db_name: str):
        self.client = AsyncIOMotorClient(mongo_url)
        self.db = self.client[db_name]
        
    async def close(self):
        self.client.close()

    # Project operations
    async def get_projects(self) -> List[Project]:
        """Get all projects"""
        try:
            cursor = self.db.projects.find()
            projects = await cursor.to_list(length=None)
            return [Project(**project) for project in projects]
        except Exception as e:
            logger.error(f"Error getting projects: {e}")
            return []

    async def get_featured_projects(self) -> List[Project]:
        """Get featured projects only"""
        try:
            cursor = self.db.projects.find({"featured": True})
            projects = await cursor.to_list(length=None)
            return [Project(**project) for project in projects]
        except Exception as e:
            logger.error(f"Error getting featured projects: {e}")
            return []

    async def create_project(self, project: Project) -> str:
        """Create a new project"""
        try:
            project_dict = project.dict()
            result = await self.db.projects.insert_one(project_dict)
            return project.id
        except Exception as e:
            logger.error(f"Error creating project: {e}")
            raise

    async def seed_projects(self, projects: List[Project]):
        """Seed initial projects data"""
        try:
            # Check if projects already exist
            count = await self.db.projects.count_documents({})
            if count > 0:
                logger.info("Projects already exist, skipping seed")
                return
            
            # Insert projects
            project_dicts = [project.dict() for project in projects]
            await self.db.projects.insert_many(project_dicts)
            logger.info(f"Seeded {len(projects)} projects")
        except Exception as e:
            logger.error(f"Error seeding projects: {e}")
            raise

    # Skill operations
    async def get_skills(self) -> Dict[str, List[Skill]]:
        """Get all skills grouped by category"""
        try:
            cursor = self.db.skills.find()
            skills = await cursor.to_list(length=None)
            skills_objects = [Skill(**skill) for skill in skills]
            
            # Group by category
            grouped = {
                "frontend": [],
                "backend": [],
                "design": [],
                "tools": []
            }
            
            for skill in skills_objects:
                if skill.category in grouped:
                    grouped[skill.category].append(skill)
                    
            return grouped
        except Exception as e:
            logger.error(f"Error getting skills: {e}")
            return {"frontend": [], "backend": [], "design": [], "tools": []}

    async def create_skill(self, skill: Skill) -> str:
        """Create a new skill"""
        try:
            skill_dict = skill.dict()
            result = await self.db.skills.insert_one(skill_dict)
            return skill.id
        except Exception as e:
            logger.error(f"Error creating skill: {e}")
            raise

    async def seed_skills(self, skills: List[Skill]):
        """Seed initial skills data"""
        try:
            # Check if skills already exist
            count = await self.db.skills.count_documents({})
            if count > 0:
                logger.info("Skills already exist, skipping seed")
                return
            
            # Insert skills
            skill_dicts = [skill.dict() for skill in skills]
            await self.db.skills.insert_many(skill_dicts)
            logger.info(f"Seeded {len(skills)} skills")
        except Exception as e:
            logger.error(f"Error seeding skills: {e}")
            raise

    # Contact operations
    async def create_contact(self, contact: Contact) -> str:
        """Create a new contact submission"""
        try:
            contact_dict = contact.dict()
            result = await self.db.contacts.insert_one(contact_dict)
            return contact.id
        except Exception as e:
            logger.error(f"Error creating contact: {e}")
            raise

    async def get_contacts(self) -> List[Contact]:
        """Get all contact submissions"""
        try:
            cursor = self.db.contacts.find().sort("created_at", -1)
            contacts = await cursor.to_list(length=None)
            return [Contact(**contact) for contact in contacts]
        except Exception as e:
            logger.error(f"Error getting contacts: {e}")
            return []

    # Contact Info operations
    async def get_contact_info(self) -> Optional[ContactInfo]:
        """Get contact information"""
        try:
            contact_info = await self.db.contact_info.find_one()
            if contact_info:
                return ContactInfo(**contact_info)
            return None
        except Exception as e:
            logger.error(f"Error getting contact info: {e}")
            return None

    async def upsert_contact_info(self, contact_info: ContactInfo) -> str:
        """Create or update contact information"""
        try:
            contact_info_dict = contact_info.dict()
            result = await self.db.contact_info.replace_one(
                {}, contact_info_dict, upsert=True
            )
            return contact_info.id
        except Exception as e:
            logger.error(f"Error upserting contact info: {e}")
            raise

    async def seed_contact_info(self, contact_info: ContactInfo):
        """Seed initial contact info"""
        try:
            # Check if contact info already exists
            existing = await self.db.contact_info.find_one()
            if existing:
                logger.info("Contact info already exists, skipping seed")
                return
            
            # Insert contact info
            await self.upsert_contact_info(contact_info)
            logger.info("Seeded contact info")
        except Exception as e:
            logger.error(f"Error seeding contact info: {e}")
            raise

# Global database instance
db = None

def get_database() -> Database:
    global db
    if db is None:
        mongo_url = os.environ['MONGO_URL']
        db_name = os.environ['DB_NAME']
        db = Database(mongo_url, db_name)
    return db