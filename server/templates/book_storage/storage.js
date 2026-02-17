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

        // Initialize search functionality after data is loaded
        initializeSearch();
    } catch (error){
        console.error(error.message)
    }

}

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const dataTable = document.getElementById('dataTable');

    if (!searchInput) return;

    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = dataTable.querySelectorAll('tbody tr');

        rows.forEach(row => {
            // Get the title from the second cell (index 1)
            const titleCell = row.cells[1];
            const title = titleCell.textContent.toLowerCase();

            // Check if title contains the search term
            if (title.includes(searchTerm)) {
                row.classList.remove('hidden');
            } else {
                row.classList.add('hidden');
            }
        });
    });
}

getData()