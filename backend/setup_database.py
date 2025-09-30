"""
Database setup script for Career Navigator
Creates tables and adds a default student user
"""

from database import create_tables, create_user, get_user_by_email, pwd_context
import os

def setup_database():
    """Initialize database with tables and default user"""
    print("🚀 Setting up Career Navigator Database...")
    
    # Create tables
    create_tables()
    
    # Create default student user
    from database import SessionLocal
    db = SessionLocal()
    
    try:
        # Check if default user already exists
        existing_user = get_user_by_email(db, "student@example.com")
        if existing_user:
            print("✅ Default user already exists")
            return
        
        # Create default user with sample data
        default_profile = {
            "name": "John Doe",
            "phone": "1234567890",
            "linkedin": "https://www.linkedin.com/in/johndoe",
            "github": "https://github.com/johndoe",
            "skills": ["Python", "FastAPI", "React", "SQL"],
            "projects": [
                {
                    "title": "AI Job Matcher",
                    "description": "Core system for Career Navigator.",
                    "technologies": ["FastAPI", "OpenAI"]
                }
            ],
            "experience": [
                {
                    "role": "Software Engineer Intern",
                    "company": "Google",
                    "description": "Worked on the core search algorithm.",
                    "duration": "6 months"
                }
            ]
        }
        
        # Create user
        user = create_user(
            db=db,
            email="student@example.com",
            hashed_password=pwd_context.hash("password123"),
            role="student",
            profile_data=default_profile
        )
        
        print("✅ Default student user created successfully!")
        print(f"   Email: student@example.com")
        print(f"   Password: password123")
        print(f"   Role: student")
        
        # Create admin user
        admin_user = create_user(
            db=db,
            email="admin@example.com",
            hashed_password=pwd_context.hash("admin123"),
            role="admin",
            profile_data={}
        )
        
        print("✅ Admin user created successfully!")
        print(f"   Email: admin@example.com")
        print(f"   Password: admin123")
        print(f"   Role: admin")
        
    except Exception as e:
        print(f"❌ Error creating default user: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    setup_database()
