const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title,
    this.author= author,
    this.pages = pages,
    this.isRead = isRead
}

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    myLibrary.sort();
}

const libraryTable = document.createElement("table");
const tableTarget = document.querySelector(".library-container")

function displayLibraryTable() {
    libraryTable.innerHTML = "<thead><th>Title</th><th>Author</th><th>Pages</th><th>Read?</th></thead>";

    myLibrary.sort((a, b) => (a.author.localeCompare(b.author)));

    for (const book of myLibrary) {
        const newRow = document.createElement("tr");
        for (const prop in book) {
            const newCell = document.createElement("td");
            newCell.textContent = `${book[prop]}`;
            newRow.appendChild(newCell);
        }
        libraryTable.appendChild(newRow);
    }

    tableTarget.appendChild(libraryTable);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 294, true);
addBookToLibrary("Consider Phlebas", "Iain M. Banks", 550, true);
addBookToLibrary("The Devil By Name", "Keith Rosson", 400, false);

displayLibraryTable();