from pydantic import BaseModel
class BookCreate(BaseModel):
    title : str
    author : str
    price : float | int

class BookUpdate(BaseModel):
    title : str = ""
    author : str = ""
    price : float | int = 0

class BookRead(BaseModel):
    id: int
    title: str
    author: str
    price: float
    is_available: bool

class BookResponse(BaseModel):
    status: str
    new_details: BookRead

class BookDeleteResponse(BaseModel):
    status: str
    id: int