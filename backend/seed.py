import os
import hashlib
from sqlalchemy.orm import Session
from database.database import SessionLocal
from database.models import User, Business, Compliance, Application

def get_password_hash(password: str) -> str:
    salt = os.urandom(16)
    hashed = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    return f"{salt.hex()}:{hashed.hex()}"

def seed_demo_data():
    db: Session = SessionLocal()
    try:
        # Seed Users
        demo_users = [
            {"name": "Demo System Admin", "email": "admin@demo.com", "role": "ADMIN", "password": "DemoAdmin123"},
            {"name": "Demo Government Officer", "email": "officer@demo.com", "role": "OFFICER", "password": "DemoOfficer123"},
            {"name": "Demo Business Owner", "email": "business@demo.com", "role": "CITIZEN", "password": "DemoBusiness123"}
        ]
        
        for u in demo_users:
            if not db.query(User).filter(User.email == u["email"]).first():
                db.add(User(name=u["name"], email=u["email"], role=u["role"], password_hash=get_password_hash(u["password"])))
        
        db.commit()
        
        # Seed Compliances (Admin)
        if db.query(Compliance).count() == 0:
            db.add_all([
                Compliance(name="Food Safety License (FSSAI)", sector="Food", state="All", business_size="All", department="Health", requirement_type="License", description="Mandatory license for food businesses", required_documents="ID Proof, Address Proof, Food Safety Plan"),
                Compliance(name="GST Registration", sector="All", state="All", business_size="Medium", department="Finance", requirement_type="Registration", description="Goods and Services Tax", required_documents="PAN, Bank Details")
            ])
            db.commit()
            
        # Seed Business and Application (Officer)
        if db.query(Business).count() == 0:
            biz = Business(name="Fresh Foods Cafe", description="A healthy food cafe", sector="Food", state="Tamil Nadu", business_size="Small", business_stage="Starting")
            db.add(biz)
            db.commit()
            db.refresh(biz)
            
            comp = db.query(Compliance).first()
            if comp:
                db.add(Application(business_id=biz.id, compliance_id=comp.id, status="SUBMITTED"))
                db.commit()
    finally:
        db.close()