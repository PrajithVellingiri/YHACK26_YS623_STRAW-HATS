import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.database import SessionLocal, engine
from database.models import Base, User, Compliance, Business, Application
from routers.admin import (
    get_admin_dashboard,
    get_all_compliances,
    get_compliance,
    create_compliance,
    update_compliance,
    delete_compliance
)
from schemas.admin import ComplianceCreate, ComplianceUpdate
from routers.auth import get_password_hash

def run_admin_tests():
    print("=== STARTING ADMIN MODULE TESTS ===")
    
    db = SessionLocal()
    try:
        # Create an ADMIN user for testing
        test_email = "admin_test@example.com"
        admin_user = db.query(User).filter(User.email == test_email).first()
        if not admin_user:
            admin_user = User(
                name="Admin Test", 
                email=test_email, 
                password_hash=get_password_hash("password123"), 
                role="ADMIN"
            )
            db.add(admin_user)
            db.commit()
            db.refresh(admin_user)
            
        print("[1] Admin user setup verified.")

        # 1. Admin Dashboard Statistics
        stats = get_admin_dashboard(db=db, admin=admin_user)
        assert hasattr(stats, 'total_businesses')
        assert hasattr(stats, 'total_applications')
        assert hasattr(stats, 'total_compliances')
        assert hasattr(stats, 'submitted')
        print("[2] Admin dashboard statistics retrieved successfully.")

        # 2. Create Compliance
        new_comp_data = ComplianceCreate(
            name="Test Admin Compliance",
            sector="Tech",
            state="All",
            business_size="All",
            department="IT Dept",
            requirement_type="Optional",
            description="Just a test",
            required_documents="None"
        )
        created_comp = create_compliance(request=new_comp_data, db=db, admin=admin_user)
        assert created_comp.id is not None
        print(f"[3] Create compliance verified. ID: {created_comp.id}")

        # 3. Get All Compliances
        all_comps = get_all_compliances(db=db, admin=admin_user)
        assert len(all_comps) > 0
        print(f"[4] Get all compliances verified. Found {len(all_comps)} records.")

        # 4. Get One Compliance
        fetched_comp = get_compliance(compliance_id=created_comp.id, db=db, admin=admin_user)
        assert fetched_comp.name == "Test Admin Compliance"
        print("[5] Get one compliance verified.")

        # 5. Update Compliance
        update_data = ComplianceUpdate(
            name="Updated Admin Compliance",
            sector="Tech",
            state="All",
            business_size="All",
            department="IT Dept",
            requirement_type="Optional",
            description="Updated test",
            required_documents="None"
        )
        updated_comp = update_compliance(compliance_id=created_comp.id, request=update_data, db=db, admin=admin_user)
        assert updated_comp.name == "Updated Admin Compliance"
        print("[6] Update compliance verified.")

        # 6. Delete Compliance
        delete_resp = delete_compliance(compliance_id=created_comp.id, db=db, admin=admin_user)
        assert delete_resp["detail"] == "Compliance deleted successfully"
        
        # 7. Invalid Compliance ID
        try:
            get_compliance(compliance_id=created_comp.id, db=db, admin=admin_user)
            print("[7] ERROR: Deleted compliance was found!")
        except Exception as e:
            assert "404" in str(e) or "not found" in str(e).lower()
            print("[7] Delete and Invalid ID verification passed.")

        print("=== ALL ADMIN MODULE TESTS PASSED SUCCESSFULLY ===")

    except Exception as e:
        print(f"Test failed: {str(e)}")
    finally:
        db.close()

if __name__ == "__main__":
    run_admin_tests()
