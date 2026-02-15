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

async function getData(){
    const url = "/api/v1/books/"
    try{
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`)
        }
        const json = await response.json()
        const label = document.getElementById('id_label')
        const input = document.getElementById('book_id')
        if (Array.isArray(json) && json.length > 0){
            // Find the maximum book_id from all books
            const maxValue = Math.max(...json.map(book => book.book_id))
            label.textContent = `Enter Book ID Number (Up to ${maxValue})`
            input.setAttribute('max', maxValue)
        }
    } catch (error){
        console.error(error.message)
    }
}
getData()

document.getElementById('id_format').addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page reload
    const bookId = parseInt(document.getElementById('book_id').value)
    const resultDiv = document.getElementById('result_display');
    const resultYear = document.getElementById('year')
    const resultID = document.getElementById('header')
    const resultTitle = document.getElementById('title')
    const resultQuantity = document.getElementById('quantity')
    const resultAuthor = document.getElementById('author')
    const resultPrice = document.getElementById('price')
    const resultAvailability = document.getElementById('is_available')
    fetch(`/api/v1/books/${bookId}`)
        .then(response => response.json())
        .then(data => {
            // 2. Hide the form
            console.log(data)
            document.getElementById('id_format_container').style.display = 'none';
            resultID.textContent = `ID: ${data[0]['book_id']}`
            resultTitle.textContent = `Title: ${data[0]['title']}`
            resultAuthor.textContent = `Author: ${data[0]['author']}`
            resultYear.textContent = `Year: ${data[0]['year']}`
            resultPrice.textContent = `Price: ${data[0]['price']}$`
            resultQuantity.textContent = `Quantity: ${data[0]['quantity']}`
            resultAvailability.textContent = `Availability: ${data[0]['is_available'] === 1}`
            resultDiv.style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
