const bookForm = document.getElementById('params-form')
const confirmModel = document.getElementById('confirm-model');
const confirmBtn = document.getElementById('confirm-update_service');
const cancelBtn = document.getElementById('cancel-update_service');

let currentBookData = null;

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
            alert('Error: ' + (errorData.detail || 'Could not update_service book'));
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