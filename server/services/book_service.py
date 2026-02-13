import os
from typing import Dict
from ..models import Book
from ..schemas import BookCreate, BookUpdate, BookRead
from fastapi import HTTPException
from ..database import books


BOOKS_PATH = './books'
os.makedirs(BOOKS_PATH, exist_ok=True)
Books: Dict[int, Book] = {}

def initialize_library() -> None:
    for book_id in os.listdir(BOOKS_PATH):
        if book_id.endswith(".txt"):
            book_data = {}
            book_path = os.path.join(BOOKS_PATH, book_id)
            with open(book_path, "r", encoding="utf-8") as f:
                for line in f:
                    if ':' in line:
                        key, value = line.split(':', 1)
                        book_data[key.strip()] = value.strip()
            if book_data:
                old_book_id = int(book_data['ID'])
                old_book_title = book_data['Title']
                old_book_author = book_data['Author']
                old_book_price = float(book_data['Price'])
                book = Book(old_book_title, old_book_author, old_book_price, book_id=old_book_id)
                Books[old_book_id] = book
    sorted_books = dict(sorted(Books.items(), reverse=True))
    Books.clear()
    Books.update(sorted_books)


def get_book(book_id: int) -> BookRead:
    if book_id not in Books:
        raise HTTPException(status_code=404, detail="Book not found")
    book = Books[book_id]
    return BookRead(
        id=book.id,
        title=book.title,
        author=book.author,
        price=book.price,
        is_available=book.is_available,
    )


def create_book(book_in: BookCreate, parameter: str) -> BookRead:
    if parameter == "create":
        new_book = Book(book_in.title, book_in.author, book_in.price)
        Books[new_book.id] = new_book
        create_file(new_book)
        return BookRead(id=new_book.id, title=new_book.title, author=new_book.author, price=new_book.price, is_available=new_book.is_available)
    else:
        raise HTTPException(status_code=404, detail="Book not found")


def update_details(book_id: int, new_book: BookUpdate, parameter: str) -> Dict[str, str | BookRead]:
    if parameter == "update_details":
        if book_id not in Books:
            raise HTTPException(status_code=404, detail="Book not found")

        # Create the updated book
        book = Book(new_book.title, new_book.author, new_book.price, book_id=book_id)
        Books[book_id] = book  # Update the Books dictionary!
        create_file(book)

        # Return status with BookRead (not BookUpdate!)
        return {
            'status': 'Success',
            'new_details': BookRead(
                id=book.id,
                title=book.title,
                author=book.author,
                price=book.price,
                is_available=book.is_available
            )
        }
    else:
        raise HTTPException(status_code=404, detail="Path not found")

def delete_book(book_id: int) -> Dict[str, str|int]:
    path = os.path.join(BOOKS_PATH, f'book_{book_id}.txt')
    if os.path.exists(path):
        os.remove(path)
        del Books[book_id]
        return {
            'status': 'Success',
            'id': book_id}
    else:
        raise HTTPException(status_code=404, detail="Book not found")

def get_books():
    return books.to_dict(orient='records')


def create_file(book: Book | BookCreate):
    book_path = os.path.join(BOOKS_PATH, f'book_{book.id}.txt')
    content = [
        f"ID:{book.id}",
        f"Title:{book.title}",
        f"Author:{book.author}",
        f"Price:{book.price}",
        f"Is_Available:{book.is_available}"
    ]
    with open(book_path, mode="w", encoding="utf-8") as f:
        f.write("\n".join(content))


