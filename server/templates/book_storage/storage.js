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

    // 3. Keep body overflow hidden
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

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

    // 3. Keep body overflow hidden
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

});
// Listen for the "Escape" key press
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        skipVideo();
    }
});

async function getData(){
    const url = "/api/v1/books/"
    try{
        const response = await fetch(url)
        if (!response.ok){
            throw new Error(`Response Status: ${response.status}`)
        }

        const json = await response.json()
        const tableBody = document.querySelector('#dataTable tbody')
        for (const [key, value] of Object.entries(json)){
            const row = document.createElement('tr')
            const idCell = document.createElement('td')
            const titleCell = document.createElement('td')
            const authorCell = document.createElement('td')
            const yearCell = document.createElement('td')
            const priceCell = document.createElement('td')
            const quantityCell = document.createElement('td')
            const isAvailableCell = document.createElement('td')
            idCell.textContent = parseInt(key) + 1
            titleCell.textContent = `${value['title']}`
            authorCell.textContent = `${value['author']}`
            yearCell.textContent = `${value['year']}`
            priceCell.textContent = `${value['price']}$`
            quantityCell.textContent = `${value['quantity']}`
            isAvailableCell.textContent = `${value['is_available']}`
            row.appendChild(idCell)
            row.appendChild(titleCell)
            row.appendChild(authorCell)
            row.appendChild(yearCell)
            row.appendChild(priceCell)
            row.appendChild(quantityCell)
            row.appendChild(isAvailableCell)
            tableBody.appendChild(row)
        }
    } catch (error){
        console.error(error.message)
    }

}
getData()