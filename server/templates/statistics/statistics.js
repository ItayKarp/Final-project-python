document.addEventListener('DOMContentLoaded', function () {

    const video = document.querySelector('#video-intro video');
    const videoIntro = document.getElementById('video-intro');
    const mainContent = document.getElementById('main-content');

    const enableScroll = () => {
        document.documentElement.classList.remove('no-scroll');
        document.body.classList.remove('no-scroll');
    };

    const disableScroll = () => {
        document.documentElement.classList.add('no-scroll');
        document.body.classList.add('no-scroll');
    };

    const skipVideo = () => {
        if (videoIntro) videoIntro.style.display = 'none';
        if (mainContent) mainContent.style.display = 'flex';

        enableScroll();

        if (video) video.pause();

        // Smooth scroll to top/main content after video ends
        setTimeout(() => {
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            });
        }, 100);
    };

    // Disable scroll at start
    disableScroll();

    if (video) {
        video.addEventListener('ended', skipVideo);
    }

    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            skipVideo();
        }
    });

    // Button handlers
    const statButtons = document.querySelectorAll('.stat-button');

    statButtons.forEach(button => {
        button.addEventListener('click', function () {
            const statId = this.dataset.statId;
            const statLabel = this.querySelector('.stat-label').textContent;

            loadStatistic(statId, statLabel);
        });
    });

});

function loadStatistic(statId, statLabel) {
    window.location.href = `/statistics/result?stat_id=${statId}&title=${encodeURIComponent(statLabel)}`;
}
