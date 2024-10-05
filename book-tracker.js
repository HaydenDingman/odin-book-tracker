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
    libraryTable.innerHTML = "<thead><th><th>Title</th><th>Author</th><th>Pages</th><th>Read?</th></thead>";

    myLibrary.sort((a, b) => (a.author.localeCompare(b.author)));

    for (const book of myLibrary) {
        let itemNumber = 0;
        const newRow = document.createElement("tr");

        associateRemoveButton(newRow, itemNumber);

        for (const prop in book) {
            const newCell = createCell(book, prop);
            newRow.appendChild(newCell);
        }
        libraryTable.appendChild(newRow);
    }
    tableTarget.appendChild(libraryTable);
}

function associateRemoveButton(newRow, itemNumber) {
    const removeButtonCell = document.createElement("td");
    removeButtonCell.classList.add("remove-column");
    const removeButton = document.createElement("button");
    removeButton.textContent = "x";
    removeButton.classList.add("remove-button");
    removeButtonCell.appendChild(removeButton);
    newRow.appendChild(removeButtonCell);
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
const formFields = newBookContainer.getElementsByTagName("*"); // For disabling form fields

newBookButton.addEventListener("click", () => {
    console.log("click");
    if (newBookContainer.style.maxHeight) {
        newBookContainer.style.maxHeight = null;
        for (let i = 0; i < formFields.length; i++) {
            formFields[i].disabled = true;
        }
    } else {
        newBookContainer.style.maxHeight = newBookContainer.scrollHeight + "px";
        for (let i = 0; i < formFields.length; i++) {
            formFields[i].disabled = false;
        }
    }
})

const newBookForm = document.querySelector(".new-book-form");
newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let newTitle = document.getElementById("new-title").value;
    let newAuthor = document.getElementById("new-author").value;
    let newPages = document.getElementById("new-pages").value;
    let newReadStatus = Boolean(document.getElementById("new-read-status").value);

    addBookToLibrary(newTitle, newAuthor, newPages, newReadStatus);
    newBookForm.reset();
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 294, true);
addBookToLibrary("Consider Phlebas", "Iain M. Banks", 550, true);
addBookToLibrary("The Devil By Name", "Keith Rosson", 400, false);

displayLibraryTable();