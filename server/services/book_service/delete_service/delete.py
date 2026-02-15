from typing import Dict
from fastapi import HTTPException
import sqlite3
from server.database import books


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