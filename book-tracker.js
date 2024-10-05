const myLibrary = [];
displayStyle = "list";

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
    displayLibrary();
}

let libraryTable = document.createElement("table");
const content = document.querySelector(".library-container")

function displayLibrary() {
    myLibrary.sort((a, b) => (a.author.localeCompare(b.author)));
    let itemNumber = 0;

    // Reset table
    content.innerHTML = "";

    if (displayStyle === "list") {
        createTableView(itemNumber);
    } else if (displayStyle === "card") {
        createCardView(itemNumber);
    }
}

function createTableView(itemNumber) {
    libraryTable.innerHTML = "<thead><th><th>Title</th><th>Author</th><th>Pages</th><th class='isRead'>Read?</th></thead>";

    for (const book of myLibrary) {
        const newRow = createNewRow(itemNumber);
        createRemoveButton(newRow, itemNumber);
        itemNumber = addCells(book, itemNumber, newRow);
    }

    content.appendChild(libraryTable);
    return itemNumber;
}

function createNewRow(itemNumber) {
    const newRow = document.createElement("tr");
    newRow.dataset.index = itemNumber;
    return newRow;
}

function createRemoveButton(newRow, itemNumber) {
    const removeButtonCell = document.createElement("td");
    removeButtonCell.classList.add("remove-column");

    removeButtonCell.appendChild(associateRemoveButton(newRow, itemNumber));
    newRow.appendChild(removeButtonCell);
}

function associateRemoveButton(toRemove, itemNumber) {
    const removeButton = document.createElement("button");
    removeButton.textContent = "x";
    removeButton.classList.add("remove-button");

    removeButton.addEventListener("click", (e) => {
        myLibrary.splice(itemNumber, 1);
        displayLibrary();
    })

    return removeButton;
}

function addCells(book, itemNumber, newRow) {
    for (const prop in book) {
        const newCell = createCell(book, prop, itemNumber);
        newRow.appendChild(newCell);
    }
    libraryTable.appendChild(newRow);
    itemNumber++;
    return itemNumber;
}

function createCell(book, prop, itemNumber) {
    const newCell = document.createElement("td");

    if (typeof book[prop] === "boolean") {
        newCell.classList.add("isRead");
        newCell.appendChild(createCheckbox(book, prop));
    } else {
        newCell.textContent = `${book[prop]}`;
        newCell.classList.add(`${prop}`)
    }
    return newCell;
}

function createCheckbox(book, prop) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
        if (book[prop] === true) {
            book[prop] = false;
        } else {
            book[prop] = true;
        }
        console.log(myLibrary);
    });
    checkbox.classList.add("read-box");
    if (book[prop] === true) {
        checkbox.checked = true;
    }

    return checkbox;
}

const newBookButton = document.querySelector(".new-book-button");
const newBookContainer = document.querySelector(".new-book-container");
const formFields = newBookContainer.getElementsByTagName("*"); // For disabling form fields

newBookButton.addEventListener("click", () => {
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

displayLibrary();


// CARD DISPLAY
cardDisplayButton = document.querySelector("#card-display");
cardDisplayButton.addEventListener("click", () => {
    content.innerHTML = "";

    if (displayStyle === "list") {
        displayStyle = "card";
        content.classList.add("card-grid");
    } else {
        displayStyle = "list";
        content.classList.remove("card-grid");
    }

    displayLibrary();
})

function createCardView(itemNumber) {
    for (const book of myLibrary) {
        const newCard = document.createElement("div");
        newCard.dataset.index = itemNumber;
        newCard.classList.add("book-card");

        newCard.appendChild(associateRemoveButton(newCard, itemNumber));

        for (const prop in book) {
            addCardLabel(prop, newCard);
            addCardContent(book, prop, newCard);
        }

        content.appendChild(newCard);
    }
}

function addCardLabel(prop, newCard) {
    if (prop != "title") {
        const propLabel = document.createElement("p");
        if (prop === "author") {
            propLabel.textContent = "By: ";
        } else if (prop === "pages") {
            propLabel.textContent = "Pages: ";
        } else if (prop === "isRead") {
            propLabel.textContent = "Read: ";
        }
        newCard.appendChild(propLabel);
    }
}

function addCardContent(book, prop, newCard) {
    const newGraf = document.createElement("p");
    if (typeof book[prop] === "boolean") {
        newGraf.appendChild(createCheckbox(book, prop));
    } else {
        newGraf.textContent = `${book[prop]}`;
        newGraf.classList.add(`${prop}`);
    }
    newCard.appendChild(newGraf);
}
