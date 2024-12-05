import getBooksByAuthor from "./BookSearchApiClient";

getBooksByAuthor('exampleBookSeller', "Shakespeare", 10).then(booksByAuthor => {
    console.log(booksByAuthor)
});