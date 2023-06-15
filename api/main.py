from fastapi import Depends, FastAPI, HTTPException, Request, Response
from sqlalchemy.orm import Session

from . import crud, model, schema
from .database import SessionLocal, engine

model.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    try:
        request.state.db = SessionLocal()
        response = await call_next(request)
    finally:
        request.state.db.close()
    return response

# Dependency
def get_db(request: Request):
    return request.state.db

@app.post("/entries/", response_model=schema.Entry)
def create_entry(entry: schema.EntryCreate, db: Session = Depends(get_db)):
    return crud.create_entry(db, entry=entry)

@app.get("/entries", response_model=list[schema.Entry])
def read_entries(skip: int=0, limit: int = 100, db: Session = Depends(get_db)):
    entries = crud.get_entries(db, skip=skip, limit=limit)
    return entries

@app.get("/entries/{year}/{month}", response_model=schema.Entry)
def read_entries_by_month(month: int, year: int, db: Session = Depends(get_db)):
    db_entries = crud.get_entry_by_month(db, month=month, year=year)
    if db_entries is None:
        raise HTTPException(status_code=404, detail="No Entries found for this year and month")
    return db_entries

@app.get("/entry/{entry_id}", response_model=schema.Entry)
def read_user(entry_id: int, db: Session = Depends(get_db)):
    db_entry = crud.get_entry(db, entry_id=entry_id)
    if db_entry is None:
        raise HTTPException(status_code=404, detail="Entry not found")
    return db_entry
