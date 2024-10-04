const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title,
        this.author = author,
        this.pages = pages,
        this.isRead = isRead
}

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    myLibrary.sort();
    displayLibraryTable();
}

const libraryTable = document.createElement("table");
const tableTarget = document.querySelector(".library-container")

function displayLibraryTable() {
    libraryTable.innerHTML = "<thead><th>Title</th><th>Author</th><th>Pages</th><th>Read?</th></thead>";

    myLibrary.sort((a, b) => (a.author.localeCompare(b.author)));

    for (const book of myLibrary) {
        const newRow = document.createElement("tr");
        for (const prop in book) {
            const newCell = createCell(book, prop);
            newRow.appendChild(newCell);
        }
        libraryTable.appendChild(newRow);
    }
    tableTarget.appendChild(libraryTable);
}

function createCell(book, prop) {
    const newCell = document.createElement("td");

    if (typeof book[prop] === "boolean") {
        createCheckbox(book, prop, newCell);
    } else {
        newCell.textContent = `${book[prop]}`;
        newCell.classList.add(`${prop}`)
    }
    return newCell;
}

function createCheckbox(book, prop, newCell) {
    newCell.classList.add("isRead");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.disabled = true;
    if (book[prop] === true) {
        checkbox.classList.add("read-box");
        checkbox.checked = true;
    } else {
        checkbox.classList.add("unread-box");
    }
    newCell.appendChild(checkbox);
}

const newBookButton = document.querySelector(".new-book-button");
const newBookContainer = document.querySelector(".new-book-container");

newBookButton.addEventListener("click", () => {
    console.log("click");
    if (newBookContainer.style.maxHeight) {
        newBookContainer.style.maxHeight = null;
    } else {
        newBookContainer.style.maxHeight = newBookContainer.scrollHeight + "px";
    }
})

const newBookForm = document.querySelector(".new-book-form");
newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let newTitle = document.getElementsByName("title").value;
    let newAuthor = document.getElementsByName("author").value;
    let newPages = document.getElementsByName("pages").value;
    let newReadStatus = document.getElementsByName("isRead").value;

    addBookToLibrary(newTitle, newAuthor, newPages, newReadStatus);
    newBookForm.reset();
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 294, true);
addBookToLibrary("Consider Phlebas", "Iain M. Banks", 550, true);
addBookToLibrary("The Devil By Name", "Keith Rosson", 400, false);

displayLibraryTable();