
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
initializeFormListeners()