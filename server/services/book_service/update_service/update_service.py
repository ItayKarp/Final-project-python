from server.database import books
from server.schemas import BookRead, BookCreate
import sqlite3
from typing import Dict
from fastapi import HTTPException
import pandas as pd

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
