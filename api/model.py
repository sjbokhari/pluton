from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, BLOB
from sqlalchemy.orm import relationship

from .database import Base

class Entry(Base):
    __tablename__ = "entries"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, index=True)
    name = Column(String, index=True)
    purpose = Column(String, index=True)
    amount = Column(Integer, index=True)
    is_revenue = Column(Boolean)
    is_expenditure = Column(Boolean)
    document = Column(BLOB)
