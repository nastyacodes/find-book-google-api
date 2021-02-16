const btnSearch = document.querySelector('#btn-search');
const divResults = document.querySelector('#search-results');
const inputSearch = document.querySelector('#input-search');

// Search on click on a serch button
btnSearch.addEventListener('click', fetchAPI);
// Search on clicking Enter
inputSearch.addEventListener('keyup', function(e) {
    if(e.keyCode === 13) {
        fetchAPI();
    }
});

function fetchAPI() {
    // Definitions of phrase to search and API KEY
    const searchPhrase = inputSearch.value ? inputSearch.value : 'javascript';
    const apiKey = 'AIzaSyCLhvQyJ4Zx-TqXHw_EEp4MD1sX6fo5WxQ';

    // Fetch Google Books API
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchPhrase}&maxResults=40&key=${apiKey}`)
    .then(response => response.json()) // receive response in JSON format
    .then(data => data.items.reverse()) // reverse items in books array
    .then(books => {
        let resultHtml = ``; // here we save created html elements

        books.forEach(book => {
            const bookInfo = book.volumeInfo;

            // books info displayed on the search page
            const image = bookInfo.imageLinks ? bookInfo.imageLinks.smallThumbnail : '/';
            const title = bookInfo.title;
            const subtitle = bookInfo.subtitle ? bookInfo.subtitle : '';
            const description = bookInfo.description ? cutDescription(bookInfo.description) : 'Description not found...';
            const link = bookInfo.infoLink;

            // add a book card to the html markup
            resultHtml += showBook(image, title, subtitle, description, link);
        });

        // display created html markup
        divResults.innerHTML = `<div class="row mx-auto">${resultHtml}</div>`;
    });
    
}

// create html markup for one book
function showBook(image, title, subtitle, description, link) {
    return `
        <div class="card col-xs-6 col-sm-4 col-md-3 col-lg-2" style="width: 18rem;">
            <img src="${image}" class="card-img-top" alt="book cover">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <h6 class="card-title">${subtitle}</h6>
                <p class="card-text">${description}</p>
                <a href="${link}" class="btn btn-primary">More info...</a>
            </div>
        </div>`;
}

// decrease the size of the long description to 100 symbols + add '...' at the end
function cutDescription(description) {
    return description.slice(0, 100).concat('', '...');
}