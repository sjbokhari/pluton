from sqlalchemy.orm import Session

from . import model, schema

def get_entry(db: Session, entry_id: int):
    return db.query(model.Entry).filter(model.Entry.id == entry_id).first()

def get_entries(db: Session, skip: int = 0, limit: int = 100):
    return db.query(model.Entry).offset(skip).limit(limit).all()

def get_entry_by_month(db: Session, month: int, year: int):
    return db.query(model.Entry).filter((model.Entry.date.year == year) & (model.Entry.date.month == month)).all()

def create_entry(db: Session, entry: schema.EntryCreate):
    db_entry = model.Entry(**entry.dict())
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry
