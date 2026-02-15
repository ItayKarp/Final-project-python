from server.database import books

def get_books():
    return books.to_dict(orient='records')
