const bookForm = document.getElementById('params-form')
const confirmModel = document.getElementById('confirm-model');
const confirmBtn = document.getElementById('confirm-update');
const cancelBtn = document.getElementById('cancel-update');
const bookIdInput = document.getElementById('book_id');

let currentBookData = null;

// Preview book details on blur from book_id input
bookIdInput.addEventListener('blur', async () => {
    const bookId = bookIdInput.value.trim();
    const previewDiv = document.getElementById('book-preview');

    if (!bookId) {
        // Hide preview if input is empty
        previewDiv.style.display = 'none';
        return;
    }

    try {
        const response = await fetch(`/api/v1/books/${parseInt(bookId)}`);

        if (response.ok) {
            const data = await response.json();
            const book = data[0];

            // Populate preview with book details
            document.getElementById('preview-id').textContent = `ID: ${book['book_id']}`;
            document.getElementById('preview-title').textContent = `Title: ${book['title']}`;
            document.getElementById('preview-author').textContent = `Author: ${book['author']}`;
            document.getElementById('preview-year').textContent = `Year: ${book['year']}`;
            document.getElementById('preview-price').textContent = `Price: ${book['price']}$`;
            document.getElementById('preview-quantity').textContent = `Quantity: ${book['quantity']}`;
            document.getElementById('preview-availability').textContent = `Available: ${book['is_available'] === 1 ? 'Yes' : 'No'}`;

            previewDiv.style.display = 'block';
        } else {
            previewDiv.style.display = 'none';
        }
    } catch (error) {
        console.error('Error fetching book preview:', error);
        previewDiv.style.display = 'none';
    }
});

// Hide preview when user focuses back on the input
bookIdInput.addEventListener('focus', () => {
    const previewDiv = document.getElementById('book-preview');
    previewDiv.style.display = 'none';
});

bookForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevents the page from reloading/redirecting

    const bookID = parseInt(document.getElementById("book_id").value)
    const bookTitle = document.getElementById("book-title").value
    const bookAuthor = document.getElementById("book-author").value
    const bookYear = parseInt(document.getElementById('book-year').value)
    const bookQuantity = parseInt(document.getElementById('book-quantity').value)
    const bookPrice = parseFloat(document.getElementById("book-price").value)

    // Store the book data for later use
    currentBookData = {
        id: bookID,
        data: {
            title: bookTitle,
            author: bookAuthor,
            year: bookYear,
            price: bookPrice,
            quantity: bookQuantity
        }
    };

    // Show confirmation model
    confirmModel.style.display = 'flex';
});

cancelBtn.addEventListener('click', () => {
    confirmModel.style.display = 'none';
    currentBookData = null;
});

confirmBtn.addEventListener('click', async () => {
    if (!currentBookData) return;

    confirmModel.style.display = 'none';

    try {
        const response = await fetch(`/api/v1/books/${currentBookData.id}?type=update_details`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentBookData.data)
        });

        if (response.ok) {
            console.log("Book updated successfully!");

            // Show success toast
            const toast = document.getElementById("success-toast");
            toast.className = "success-toast show";

            setTimeout(() => {
                toast.className = "success-toast";
            }, 3000);

            // Clear form
            document.getElementById('params-form').reset();
        } else {
            const errorData = await response.json();
            alert('Error: ' + (errorData.detail || 'Could not update book'));
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('Network error occurred while updating the book');
    }

    currentBookData = null;
});

const video = document.querySelector('#video-intro video');
const videoIntro = document.getElementById('video-intro');
const mainContent = document.getElementById('main-content');

const skipVideo = () => {
    // 1. Hide the video overlay
    videoIntro.style.display = 'none';

    // 2. Show the main content
    if (mainContent) {
        mainContent.style.display = 'block';
    }

    // 3. Restore scrolling
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    // Optional: Pause the video if it's still playing (for the Esc skip)
    video.pause();
};

video.addEventListener('ended', () => {
    // 1. Hide the video overlay
    videoIntro.style.display = 'none';

    // 2. Show the main content
    if (mainContent) {
        mainContent.style.display = 'block';
    }

    // 3. Restore scrolling to the body
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

});
// Listen for the "Escape" key press
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        skipVideo();
    }
});