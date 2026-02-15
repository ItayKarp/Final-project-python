from server.database import books
from server.schemas import BookCreate, BookRead
import sqlite3
from fastapi import HTTPException
import pandas as pd


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
