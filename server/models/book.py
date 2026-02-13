class Book:
    _id_counter = 0
    def __init__(self, title, author, price,  is_available = True, book_id = None):
        if book_id:
            self.id = book_id
            if book_id > self._id_counter:
                Book._id_counter = book_id
        else:
            Book._id_counter += 1
            self.id = Book._id_counter
        self.title = title
        self.author = author
        self.price = price
        self.is_available = is_available

    def __str__(self):
        return self.title
    def __repr__(self):
        return self.title