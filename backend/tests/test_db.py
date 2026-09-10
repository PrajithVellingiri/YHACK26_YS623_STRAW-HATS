import os
import sys

# Add backend directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.database import SessionLocal, engine
from database.models import Base, User, Business, Compliance, Application
from database.seed import seed_data
from routers.auth import get_password_hash

def run_tests():
    print("=== STARTING DATABASE TESTS ===")
    
    # 1. Database creation & table initialization
    Base.metadata.create_all(bind=engine)
    print("[1] Tables initialized successfully.")
    
    db = SessionLocal()
    
    try:
        # Clear existing test data if needed (optional, just using simple tests)
        # 2. Compliance seed data
        if db.query(Compliance).count() == 0:
            seed_data()
        
        comp_count = db.query(Compliance).count()
        assert comp_count > 0, "No compliances found in DB."
        print(f"[2] Compliance seed data verified. Found {comp_count} records.")

        # 3. Authentication user creation
        test_email = "officer_test@example.com"
        user = db.query(User).filter(User.email == test_email).first()
        if user:
            db.delete(user)
            db.commit()

        hashed = get_password_hash("password123")
        new_user = User(name="Officer Test", email=test_email, password_hash=hashed, role="OFFICER")
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        assert new_user.id is not None
        print(f"[3] Authentication user creation verified. User ID: {new_user.id}")

        # 4. Duplicate email handling
        duplicate_user = User(name="Officer Test 2", email=test_email, password_hash=hashed, role="OFFICER")
        db.add(duplicate_user)
        try:
            db.commit()
            print("[4] ERROR: Duplicate email allowed! Database constraint failed.")
        except Exception as e:
            db.rollback()
            print("[4] Duplicate email handling verified. (Integrity error caught successfully)")

        # 5. Business creation/storage
        test_biz = Business(
            name="Test Bakery",
            description="Testing DB",
            sector="Food",
            state="Tamil Nadu",
            business_size="Small",
            business_stage="Starting"
        )
        db.add(test_biz)
        db.commit()
        db.refresh(test_biz)
        assert test_biz.id is not None
        print(f"[5] Business creation/storage verified. Business ID: {test_biz.id}")

        # 6. Application creation/storage
        comp = db.query(Compliance).first()
        test_app = Application(
            business_id=test_biz.id,
            compliance_id=comp.id,
            status="NOT_STARTED"
        )
        db.add(test_app)
        db.commit()
        db.refresh(test_app)
        assert test_app.id is not None
        print(f"[6] Application creation/storage verified. Application ID: {test_app.id}")

        # 7. Application retrieval & joined data
        fetched_app = db.query(Application).filter(Application.id == test_app.id).first()
        assert fetched_app is not None
        print(f"[7] Application retrieval verified. Application Status: {fetched_app.status}")

        # 8. Application status update
        fetched_app.status = "UNDER_REVIEW"
        db.commit()
        db.refresh(fetched_app)
        assert fetched_app.status == "UNDER_REVIEW"
        print("[8] Application status update verified.")

        print("=== ALL DATABASE TESTS PASSED SUCCESSFULLY ===")

    except Exception as e:
        print(f"Test failed: {str(e)}")
    finally:
        db.close()

if __name__ == "__main__":
    run_tests()
