document.addEventListener('DOMContentLoaded', function () {

    const video = document.querySelector('#video-intro video');
    const videoIntro = document.getElementById('video-intro');
    const mainContent = document.getElementById('main-content');

    const skipVideo = () => {
        if (videoIntro) videoIntro.style.display = 'none';
        if (mainContent) mainContent.style.display = 'flex';
        document.body.style.overflow = 'auto';
        if (video) video.pause();
    };

    if (video) {
        video.addEventListener('ended', skipVideo);
    }

    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            skipVideo();
        }
    });

    document.body.style.overflow = 'hidden';

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
    // Redirect to graph page with stat_id in query string
    window.location.href = `/statistics/result?stat_id=${statId}&title=${encodeURIComponent(statLabel)}`;
}

