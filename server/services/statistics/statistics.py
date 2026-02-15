from ...database import books,reviews,sales,sale_details
import matplotlib.pyplot as plt
import seaborn as sns
from typing import Dict, Callable
sns.set_theme(style="dark")


# def reroute(question_id: int):
#     questions: Dict[int, Callable] = {
#         '1': average_book_price_by_year,
#         '2':
#     }



def average_book_price_by_year():
    avg_price_by_year = books.groupby('year')['price'].mean()
    plt.figure(figsize=(10, 6))
    plt.plot(avg_price_by_year['year'], avg_price_by_year['price'], marker='o')
    ylabel = "Price"
    xlabel = "Year"
    plt.title("Average book price by year")
    return plt.show()

def top_authors_by_reviews():
    top_authors = reviews.groupby('author')['rating'].mean().reset_index().sort_values(by='rating', ascending=False)

