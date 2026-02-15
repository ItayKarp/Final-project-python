import os
from typing import Dict
import pandas as pd
from server.models import Book
from server.schemas import BookCreate, BookRead
from fastapi import HTTPException
from server.database import books
import sqlite3


def get_book(book_id: int):
    if book_id not in books['book_id'].values:
        raise HTTPException(status_code=404, detail="Book not found")
    book_details = books[books['book_id'] == book_id]
    return book_details.to_dict(orient='records')


def create_book(book_in: BookCreate, parameter: str) -> BookRead:
    if parameter == "create":
        next_id = books['book_id'].max() + 1
        new_book = {
            'book_id': next_id,
            'title': book_in.title,
            'author': book_in.author,
            'year': book_in.year,
            'price': book_in.price,
            'quantity': book_in.quantity,
            'is_available': book_in.is_available
        }
        new_book_df = pd.DataFrame([new_book])
        books.loc[len(books) + 1] = new_book
        connection = sqlite3.connect("database/bookstore.db")
        new_book_df.to_sql('books', connection,if_exists="append", index=False)
        connection.close()
        return BookRead(**new_book)
    else:
        raise HTTPException(status_code=404, detail="Book not found")


def update_details(book_id: int, new_book: BookCreate, parameter: str) -> Dict[str, str | BookRead]:
    if parameter == "update_details":
        if book_id not in books['book_id'].values:
            raise HTTPException(status_code=404, detail="Book not found")
        updated_book_index = books[books['book_id'] == book_id].index
        updated_book = {
            'book_id': book_id,
            'title': new_book.title,
            'author': new_book.author,
            'year': new_book.year,
            'price': new_book.price,
            'quantity': new_book.quantity,
            'is_available': new_book.is_available
        }
        books.loc[updated_book_index[0]] = updated_book
        updated_book_df = pd.DataFrame([updated_book])
        connection = sqlite3.connect("database/bookstore.db")
        connection.execute("DELETE FROM books WHERE book_id = ?", (book_id,))
        updated_book_df.to_sql('books', connection, if_exists="append", index=False)
        connection.close()
        return {
            'status': 'Success',
            'new_details': BookRead(
                book_id=book_id,
                title=new_book.title,
                year=new_book.year,
                author=new_book.author,
                price=new_book.price,
                quantity=new_book.quantity,
                is_available=new_book.is_available
            )
        }
    else:
        raise HTTPException(status_code=404, detail="Path not found")

def delete_book(book_id: int) -> Dict[str, str|int]:
    if book_id not in books['book_id'].values:
        raise HTTPException(status_code=404, detail="Book not found")
    connection = sqlite3.connect("database/bookstore.db")
    connection.execute("DELETE FROM books WHERE book_id = ?", (book_id,))
    connection.commit()
    connection.close()
    idx = books[books['book_id'] == book_id].index
    books.drop(idx, inplace=True)
    return {
        'status': 'Success',
        'id': book_id
    }

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


