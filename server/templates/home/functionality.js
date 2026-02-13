const video = document.querySelector('#video-intro video');
const videoIntro = document.getElementById('video-intro');
const mainContent = document.getElementById('main-content');

const skipVideo = () => {
    videoIntro.style.display = 'none';
    if (mainContent) {
        mainContent.style.display = 'block';
    }

    // REMOVED: document.body.style.overflow = 'auto'
    // This was the cause of your scrolling issue.

    video.pause();
};

video.addEventListener('ended', skipVideo);

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        skipVideo();
    }
});

// Ensure scrolling is disabled from the start
document.body.style.overflow = 'hidden';