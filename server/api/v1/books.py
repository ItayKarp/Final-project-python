from fastapi import APIRouter
from starlette.responses import StreamingResponse

from server.services import get_books, get_book, create_book, update_details, delete_book
from server.schemas import BookCreate, BookRead,BookResponse,BookDeleteResponse
from typing import Dict, List

router = APIRouter(
    prefix="/books",
    tags=["books"],
)

@router.get("/{book_id}")
async def get_book_details(book_id: int):
    return get_book(book_id)


@router.get("/", response_model = List[BookRead])
async def get_book_list():
    return get_books()


@router.post("/", response_model=BookRead, status_code=201)
async def create_new_book(book: BookCreate, type: str= None):
    return create_book(book, type)


@router.put("/{book_id}", response_model=BookResponse)
async def update_book_details(book_id: int, book: BookCreate, type: str= None):
    return update_details(book_id, book, type)


@router.delete("/{book_id}", response_model=BookDeleteResponse)
async def delete_existing_book(book_id: int):
    return delete_book(book_id)
