from server.database import books
from fastapi import HTTPException

def get_book(book_id: int):
    if book_id not in books['book_id'].values:
        raise HTTPException(status_code=404, detail="Book not found")
    book_details = books[books['book_id'] == book_id]
    return book_details.to_dict(orient='records')
