from database.database import SessionLocal, engine
from database.models import Base, Compliance

def seed_data():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    if db.query(Compliance).count() == 0:
        compliances = [
            Compliance(
                name="FSSAI Registration",
                sector="Food",
                state="All",
                business_size="All",
                department="Food Safety Department",
                requirement_type="Required",
                description="Food business registration is mandatory for anyone involved in manufacturing, processing, packaging, or selling food.",
                required_documents="Identity Proof,Business Address Proof,Passport Size Photo"
            ),
            Compliance(
                name="Shop and Establishment License",
                sector="All",
                state="Tamil Nadu",
                business_size="All",
                department="Labour Department",
                requirement_type="Required",
                description="Mandatory state-level registration for any commercial establishment or shop.",
                required_documents="Identity Proof,Rental Agreement,Employer ID"
            ),
            Compliance(
                name="GST Registration",
                sector="All",
                state="All",
                business_size="Medium",
                department="CBIC",
                requirement_type="Required",
                description="Mandatory for businesses crossing the threshold turnover or engaged in inter-state supply.",
                required_documents="PAN Card,Aadhaar Card,Bank Details,Address Proof"
            ),
            Compliance(
                name="Fire Safety NOC",
                sector="Manufacturing",
                state="All",
                business_size="All",
                department="Fire Services",
                requirement_type="Required",
                description="Required to ensure that building complies with fire safety norms.",
                required_documents="Building Plan,Property Papers,Fire Safety Plan"
            )
        ]
        db.add_all(compliances)
        db.commit()
        print("Database seeded with sample compliances.")
    else:
        print("Compliances already exist. Skipping seed.")
    db.close()

if __name__ == "__main__":
    seed_data()
