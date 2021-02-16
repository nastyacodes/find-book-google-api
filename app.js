const btnSearch = document.querySelector('#btn-search');
const divResults = document.querySelector('#search-results');
const inputSearch = document.querySelector('#input-search');

btnSearch.addEventListener('click', () => {
    fetchAPI();
    
});

async function fetchAPI() {
    const searchPhrase = inputSearch.value ? inputSearch.value : 'javascript';
    const apiKey = 'AIzaSyCLhvQyJ4Zx-TqXHw_EEp4MD1sX6fo5WxQ';

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchPhrase}&maxResults=40&key=${apiKey}`)
    .then(response => response.json())
    .then(data => data.items.reverse())
    .then(books => {
        let resultHtml = ``;

        books.forEach(book => {
            const bookInfo = book.volumeInfo;

            const image = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : '/';
            const title = bookInfo.title;
            const subtitle = bookInfo.subtitle ? bookInfo.subtitle : '';
            const description = bookInfo.description ? cutDescription(bookInfo.description) : 'Description not found...';
            const link = bookInfo.infoLink;

            resultHtml += showBook(image, title, subtitle, description, link);
        });

        divResults.innerHTML = `<div class="row mx-auto">${resultHtml}</div>`;
    });
    
}

function showBook(image, title, subtitle, description, link) {
    return `
        <div class="card col-xs-6 col-sm-4 col-md-3 col-lg-2" style="width: 18rem;">
            <img src="${image}" class="card-img-top" alt="book cover">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <h6 class="card-title">${subtitle}</h6>
                <p class="card-text">${description}</p>
                <a href="${link}" class="btn btn-primary">Download</a>
            </div>
        </div>`;
}

function cutDescription(description) {
    return description.slice(0, 100).concat('', '...');
}