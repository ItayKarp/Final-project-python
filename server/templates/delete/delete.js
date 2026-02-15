const video = document.querySelector('#video-intro video');
const videoIntro = document.getElementById('video-intro');
const mainContent = document.getElementById('main-content');

function skipVideo() {
    videoIntro.style.display = 'none';
    mainContent.style.display = 'block';
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    video.pause();
}

video.addEventListener('ended', skipVideo);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') skipVideo();
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
        } else {
            const errorData = await response.json();
            alert('Error: ' + (errorData.detail || 'Could not delete book'));
        }

    } catch (error) {
        console.error('Network error:', error);
    }
});
