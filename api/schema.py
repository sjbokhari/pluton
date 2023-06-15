from pydantic import BaseModel
import datetime


class EntryBase(BaseModel):
    date: datetime.datetime
    name: str
    purpose: str
    amount: int

class EntryCreate(EntryBase):
    pass

class Entry(EntryBase):
    id: int

    class Config:
        orm_mode = True
