const deleteForm = document.getElementById('delete_form');

deleteForm.addEventListener('submit', async (e) => {
    // 1. Prevent the page from refreshing
    e.preventDefault();

    // 2. Get the ID value from the input field
    const bookId = document.getElementById('delete_book').value;

    // 3. Basic validation to make sure the ID isn't empty
    if (!bookId) {
        alert("Please enter a Book ID");
        return;
    }

    try {
        // 4. Send the DELETE request
        const response = await fetch(`/api/v1/books/${bookId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Deleted successfully:', result);
        } else {
            const errorData = await response.json();
            console.error('Delete failed:', errorData);
            alert('Error: ' + (errorData.detail || 'Could not delete book'));
        }
    } catch (error) {
        console.error('Network error:', error);
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