from pydantic import BaseModel
class BookCreate(BaseModel):
    title : str
    author : str
    year : int
    price : float | int
    quantity : int
    is_available : int = 1


class BookRead(BaseModel):
    book_id: int
    title: str
    author: str
    year: int
    price: float
    quantity: int
    is_available: int

class BookResponse(BaseModel):
    status: str
    new_details: BookRead

class BookDeleteResponse(BaseModel):
    status: str
    id: int