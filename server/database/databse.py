import sqlite3
import pandas as pd
from pathlib import Path

# Get the directory where this file is located
DB_DIR = Path(__file__).parent
DB_PATH = DB_DIR / 'bookstore.db'

conn = sqlite3.connect(str(DB_PATH))

books = pd.read_sql_query("SELECT * FROM books", conn)
sales = pd.read_sql_query("SELECT * FROM sales", conn)
reviews = pd.read_sql_query("SELECT * FROM customer_reviews", conn)
sale_details = pd.read_sql_query("SELECT * FROM sale_details", conn)

conn.close()
