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

document.getElementById('id_format').addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page reload

    const bookId = document.getElementById('book_id').value;
    const resultDiv = document.getElementById('result_display');
    const resultID = document.getElementById('header')
    const resultTitle = document.getElementById('title')
    const resultAuthor = document.getElementById('author')
    const resultPrice = document.getElementById('price')
    const resultAvailability = document.getElementById('is_available')

    fetch(`/api/v1/books/${bookId}`)
        .then(response => response.json())
        .then(data => {
            // 2. Hide the form
            document.getElementById('id_format_container').style.display = 'none';
            resultID.textContent = `ID: ${data['id']}`
            resultTitle.textContent = `Title: ${data['title']}`
            resultAuthor.textContent = `Author: ${data['author']}`
            resultPrice.textContent = `Price: ${data['price']}$`
            resultAvailability.textContent = `Is Available: ${data['is_available']}`
            resultDiv.style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
        });
});