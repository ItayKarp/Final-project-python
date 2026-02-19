from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from server.api import book_router, statistics_router
from server.services import reroute

# Resolve plots dir relative to this file so save and serve use the same path
_SERVER_DIR = Path(__file__).resolve().parent
PLOTS_DIR = _SERVER_DIR / "static" / "plots"
PLOTS_DIR.mkdir(parents=True, exist_ok=True)

templates = Jinja2Templates(directory="templates")

app = FastAPI(
    title="Book Library API",
    version="1.0.0",
    docs_url="/administrator123"
)


app.mount("/templates", StaticFiles(directory="templates"), name="templates")

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

@app.get("/update")
def update_book():
    return "hello"

@app.get("/delete")
def delete_book():
    return FileResponse("templates/delete/delete.html")

@app.get("/statistics")
def statistics():
    return FileResponse("templates/statistics/statistics.html")

@app.get("/statistics/result")
def statistics_result(request: Request, stat_id: str, title: str):
    try:
        question_id = int(stat_id)
        plot_filename = reroute(question_id)
    except (ValueError, TypeError, AttributeError):
        plot_filename = None
    return templates.TemplateResponse(
        "statistics/statistics_graphs/statistics_graphs.html",
        {
            "request": request,
            "stat_id": stat_id,
            "title": title,
            "graph_title": title,
            "plot_filename": plot_filename or "",
        },
    )


app.include_router(
    book_router,
    prefix="/api/v1"
)

app.include_router(
    statistics_router,
    prefix="/api/v1"
)