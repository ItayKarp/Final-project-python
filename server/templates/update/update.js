const bookForm = document.getElementById('params-form')

bookForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevents the page from reloading/redirecting

    const bookID = document.getElementById("book_id").value
    const bookTitle = document.getElementById("book-title").value
    const bookAuthor = document.getElementById("book-author").value
    const bookPrice = parseFloat(document.getElementById("book-price").value)
    const dataForm = {
        title: bookTitle,
        author: bookAuthor,
        price: bookPrice
    };

    const response = await fetch(`/api/v1/books/${bookID}?type=update_details`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataForm)
    });

    if (response.ok) {
        console.log("Book updated successfully!");
    }
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