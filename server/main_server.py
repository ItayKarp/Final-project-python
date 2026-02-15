from fastapi import FastAPI
from pathlib import Path
from fastapi.staticfiles import StaticFiles
from server.api import router as book_router
import os
from fastapi.responses import FileResponse



app = FastAPI(
    title="Book Library API",
    version="1.0.0",
    docs_url="/administrator123"
)


app.mount("/templates/home", StaticFiles(directory="templates/home"), name="home_templates")
app.mount("/templates/book_storage", StaticFiles(directory="templates/book_storage"), name="book_storage_templates")
app.mount("/templates/book_info", StaticFiles(directory="templates/book_info"), name="book_info_templates")
app.mount("/templates/create_book", StaticFiles(directory="templates/create_book"), name="create_book_templates")
app.mount("/templates/update", StaticFiles(directory="templates/update"), name="update_template_templates")
app.mount("/templates/delete", StaticFiles(directory="templates/delete"), name="delete_template_templates")
@app.get("/")
def home():
    return FileResponse("templates/home/home.html")

@app.get("/storage")
def storage():
    return FileResponse("templates/book_storage/book_storage.html")

@app.get("/bookDetails")
def book_details():
    return FileResponse("templates/book_info/get_book.html")

@app.get("/create")
def create_book():
    return FileResponse("templates/create_book/create.html")

@app.get("/update")
def update_book():
    return FileResponse("templates/update/update.html")

@app.get("/delete")
def delete_book():
    return FileResponse("templates/delete/delete.html")


app.include_router(
    book_router,
    prefix="/api/v1"
)