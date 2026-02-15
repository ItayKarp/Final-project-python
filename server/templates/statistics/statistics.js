const video = document.querySelector('#video-intro video');
const videoIntro = document.getElementById('video-intro');
const mainContent = document.getElementById('main-content');

const skipVideo = () => {
    // Hide the video overlay
    videoIntro.style.display = 'none';

    if (mainContent) {
        mainContent.style.display = 'block';
    }

    // RE-ENABLE scrolling now that the video is gone
    document.body.style.overflow = 'auto';

    video.pause();
};

// End video naturally
video.addEventListener('ended', skipVideo);

// Allow skipping with Escape key
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        skipVideo();
    }
});

// Ensure scrolling is disabled while the video is playing
document.body.style.overflow = 'hidden';