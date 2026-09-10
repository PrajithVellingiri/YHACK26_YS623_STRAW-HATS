from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from database.database import Base
from datetime import datetime

class Business(Base):
    __tablename__ = "businesses"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)
    sector = Column(String)
    state = Column(String)
    business_size = Column(String)
    business_stage = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class Compliance(Base):
    __tablename__ = "compliances"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    sector = Column(String)
    state = Column(String)
    business_size = Column(String)
    department = Column(String)
    requirement_type = Column(String)
    description = Column(Text)
    required_documents = Column(Text) # Stored as comma-separated values

class Application(Base):
    __tablename__ = "applications"
    id = Column(Integer, primary_key=True, index=True)
    business_id = Column(Integer, ForeignKey("businesses.id"))
    compliance_id = Column(Integer, ForeignKey("compliances.id"))
    status = Column(String, default="NOT_STARTED")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
