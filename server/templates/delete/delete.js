const deleteBookInput = document.getElementById('delete_book');

// Debounce timer for live preview
let previewTimeout;

// Live preview as user types
deleteBookInput.addEventListener('input', async () => {
    const bookId = deleteBookInput.value.trim();
    const previewDiv = document.getElementById('book-preview');

    // Clear previous timeout
    clearTimeout(previewTimeout);

    if (!bookId) {
        // Hide preview if input is empty
        previewDiv.style.display = 'none';
        return;
    }

    // Debounce the API call by 300ms
    previewTimeout = setTimeout(async () => {
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
                document.getElementById('preview-quantity').textContent = `Qty: ${book['quantity']}`;
                document.getElementById('preview-availability').textContent = `Available: ${book['is_available'] === 1 ? 'Yes' : 'No'}`;

                previewDiv.style.display = 'block';
            } else {
                previewDiv.style.display = 'none';
            }
        } catch (error) {
            console.error('Error fetching book preview:', error);
            previewDiv.style.display = 'none';
        }
    }, 300);
});

const confirmModal = document.getElementById('confirm-modal');
const confirmBtn = document.getElementById('confirm-delete');
const cancelBtn = document.getElementById('cancel-delete');
const deleteForm = document.getElementById('delete_form');

let currentBookId = null;

deleteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const bookId = document.getElementById('delete_book').value;

    if (!bookId) {
        alert("Please enter a Book ID");
        return;
    }

    currentBookId = bookId;
    confirmModal.style.display = 'flex';
    console.log('Modal display:', confirmModal.style.display); // Debug
    console.log('Modal element:', confirmModal); // Debug
});

cancelBtn.addEventListener('click', () => {
    confirmModal.style.display = 'none';
    currentBookId = null;
});

confirmBtn.addEventListener('click', async () => {
    if (!currentBookId) return;

    confirmModal.style.display = 'none';

    try {
        const response = await fetch(`/api/v1/books/${currentBookId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            const toast = document.getElementById("success-toast");
            toast.className = "success-toast show";

            setTimeout(() => {
                toast.className = "success-toast";
            }, 3000);

            document.getElementById('delete_book').value = '';
            document.getElementById('book-preview').style.display = 'none';
        } else {
            const errorData = await response.json();
            alert('Error: ' + (errorData.detail || 'Could not delete book'));
        }

    } catch (error) {
        console.error('Network error:', error);
    }
});