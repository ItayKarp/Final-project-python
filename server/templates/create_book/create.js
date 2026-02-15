// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
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
        
        // Initialize form listeners after content is shown
        initializeFormListeners();
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
        
        // Initialize form listeners after content is shown
        initializeFormListeners();
    });
    
    // Listen for the "Escape" key press
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            skipVideo();
        }
    });

    // Ensure form listeners are attached even if video never ends (e.g. error, autoplay blocked)
    initializeFormListeners();
});

// Initialize form event listeners
function initializeFormListeners() {
    const bookForm = document.getElementById('create_form');
    const confirmModal = document.getElementById('confirm-modal');
    const confirmBtn = document.getElementById('confirm-create');
    const cancelBtn = document.getElementById('cancel-create');

    let currentBookData = null;

    // Prevent multiple event listener attachments
    if (bookForm.dataset.initialized) {
        return;
    }
    bookForm.dataset.initialized = 'true';

    bookForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevents the page from reloading/redirecting

        const bookTitle = document.getElementById("book_title").value;
        const bookAuthor = document.getElementById("book_author").value;
        const bookPrice = parseFloat(document.getElementById("book_price").value);
        const bookYear = parseInt(document.getElementById('book_year').value);
        const bookQuantity = parseInt(document.getElementById('book_quantity').value);

        // Store the book data for later use
        currentBookData = {
            title: bookTitle,
            author: bookAuthor,
            year: bookYear,
            price: bookPrice,
            quantity: bookQuantity
        };

        // Show confirmation modal
        confirmModal.style.display = 'flex';
    });

    cancelBtn.addEventListener('click', () => {
        confirmModal.style.display = 'none';
        currentBookData = null;
    });

    confirmBtn.addEventListener('click', async () => {
        if (!currentBookData) return;

        confirmModal.style.display = 'none';

        // Prevent double-submit
        confirmBtn.disabled = true;

        try {
            const response = await fetch('/api/v1/books/?type=create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(currentBookData)
            });

            if (response.ok) {
                // Show success toast
                const toast = document.getElementById('success-toast');
                toast.className = 'success-toast show';

                setTimeout(() => {
                    toast.className = 'success-toast';
                }, 3000);

                // Clear form
                document.getElementById('create_form').reset();
            } else {
                let message = 'Could not create book';
                try {
                    const errorData = await response.json();
                    message = errorData.detail || message;
                    if (typeof message !== 'string') message = JSON.stringify(message);
                } catch (_) {
                    message = `Server error (${response.status})`;
                }
                alert('Error: ' + message);
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error occurred while creating the book');
        } finally {
            confirmBtn.disabled = false;
            currentBookData = null;
        }
    });
}