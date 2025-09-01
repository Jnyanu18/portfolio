from models import Project, Skill, ContactInfo, SkillCategory
from database import get_database
import asyncio
import logging

logger = logging.getLogger(__name__)

# Mock projects data converted to Project models
mock_projects = [
    Project(
        title="E-commerce Platform",
        description="A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing, inventory management, and real-time order tracking.",
        image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        technologies=["React", "Node.js", "MongoDB", "Stripe API", "AWS"],
        category="Full-Stack Development",
        demo_url="https://demo-ecommerce.example.com",
        github_url="https://github.com/alexchen/ecommerce-platform",
        featured=True
    ),
    Project(
        title="Task Management App",
        description="A collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features. Built with modern design principles and intuitive UX.",
        image="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
        technologies=["React", "TypeScript", "Firebase", "Material-UI", "Socket.io"],
        category="Web Application",
        demo_url="https://taskflow-demo.example.com",
        github_url="https://github.com/alexchen/taskflow",
        featured=True
    ),
    Project(
        title="Mobile Banking App Design",
        description="Complete UI/UX design for a modern mobile banking application. Focused on security, accessibility, and user experience with comprehensive design system and prototyping.",
        image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
        technologies=["Figma", "Adobe XD", "Principle", "InVision", "User Research"],
        category="UI/UX Design",
        demo_url="https://bankapp-prototype.example.com",
        github_url=None,
        featured=True
    ),
    Project(
        title="Data Visualization Dashboard",
        description="Interactive dashboard for business analytics with real-time data processing, customizable charts, and export functionality. Built for handling large datasets efficiently.",
        image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        technologies=["React", "D3.js", "Python", "FastAPI", "PostgreSQL"],
        category="Data Visualization",
        demo_url="https://analytics-dashboard.example.com",
        github_url="https://github.com/alexchen/analytics-dashboard",
        featured=False
    ),
    Project(
        title="Restaurant Brand Identity",
        description="Complete brand identity design for a modern restaurant chain including logo design, menu layouts, packaging, and digital presence across all touchpoints.",
        image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
        technologies=["Adobe Illustrator", "Photoshop", "InDesign", "Brand Strategy"],
        category="Brand Design",
        demo_url="https://restaurant-brand.example.com",
        github_url=None,
        featured=False
    ),
    Project(
        title="Real-time Chat Application",
        description="Scalable chat application with features like group chats, file sharing, emoji reactions, and message encryption. Supports thousands of concurrent users.",
        image="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=400&fit=crop",
        technologies=["React", "Node.js", "Socket.io", "Redis", "JWT"],
        category="Real-time Application",
        demo_url="https://chatapp-demo.example.com",
        github_url="https://github.com/alexchen/realtime-chat",
        featured=False
    )
]

# Mock skills data converted to Skill models
mock_skills = [
    # Frontend skills
    Skill(name="React", level=95, years=4, category=SkillCategory.frontend),
    Skill(name="TypeScript", level=90, years=3, category=SkillCategory.frontend),
    Skill(name="JavaScript", level=95, years=5, category=SkillCategory.frontend),
    Skill(name="HTML/CSS", level=95, years=5, category=SkillCategory.frontend),
    Skill(name="Tailwind CSS", level=85, years=2, category=SkillCategory.frontend),
    Skill(name="Next.js", level=85, years=2, category=SkillCategory.frontend),
    
    # Backend skills
    Skill(name="Node.js", level=90, years=4, category=SkillCategory.backend),
    Skill(name="Python", level=85, years=3, category=SkillCategory.backend),
    Skill(name="FastAPI", level=80, years=2, category=SkillCategory.backend),
    Skill(name="Express.js", level=90, years=4, category=SkillCategory.backend),
    Skill(name="PostgreSQL", level=85, years=3, category=SkillCategory.backend),
    Skill(name="MongoDB", level=80, years=3, category=SkillCategory.backend),
    
    # Design skills
    Skill(name="Figma", level=90, years=3, category=SkillCategory.design),
    Skill(name="Adobe XD", level=85, years=4, category=SkillCategory.design),
    Skill(name="Photoshop", level=80, years=5, category=SkillCategory.design),
    Skill(name="Illustrator", level=75, years=3, category=SkillCategory.design),
    Skill(name="UI/UX Design", level=90, years=4, category=SkillCategory.design),
    Skill(name="Prototyping", level=85, years=4, category=SkillCategory.design),
    
    # Tools skills
    Skill(name="Git", level=95, years=5, category=SkillCategory.tools),
    Skill(name="Docker", level=80, years=2, category=SkillCategory.tools),
    Skill(name="AWS", level=75, years=2, category=SkillCategory.tools),
    Skill(name="Firebase", level=85, years=3, category=SkillCategory.tools),
    Skill(name="Vercel", level=90, years=2, category=SkillCategory.tools),
    Skill(name="VS Code", level=95, years=5, category=SkillCategory.tools),
]

# Mock contact info
mock_contact_info = ContactInfo(
    email="alex.chen@example.com",
    phone="+1 (555) 123-4567",
    location="San Francisco, CA",
    availability="Available for new opportunities",
    response_time="Usually responds within 24 hours"
)

async def seed_database():
    """Seed the database with initial data"""
    try:
        db = get_database()
        
        logger.info("Starting database seeding...")
        
        # Seed projects
        await db.seed_projects(mock_projects)
        
        # Seed skills
        await db.seed_skills(mock_skills)
        
        # Seed contact info
        await db.seed_contact_info(mock_contact_info)
        
        logger.info("Database seeding completed successfully!")
        
    except Exception as e:
        logger.error(f"Error seeding database: {e}")
        raise

if __name__ == "__main__":
    asyncio.run(seed_database())