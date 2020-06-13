addBookJS = document.querySelector(".addBook");
aBC = document.querySelector(".addBookContainer");
read = document.querySelectorAll("input[type='radio']");
form = document.querySelector("form");
libraryWrap = document.querySelector('.libraryWrap')

let selectedValue;
library = JSON.parse(localStorage.getItem("localLibrary"));
library = library === null ? [] : library;
form.addEventListener("submit",newBook)


function addBookBtn() {
    if (addBookJS.classList.contains('rotateIcon')) {
        addBookJS.classList.toggle('rotateIcon');
        aBC.classList.toggle('fadeIn');

        addBookJS.classList.toggle('rotateIconReverse');
        aBC.classList.toggle('fadeOut');

        aBC.style.opacity = '0';
        aBC.style.visibility = 'hidden'
        aBC.style.transition = 'visibility .5s'


    } else {
        if (addBookJS.classList.contains('rotateIconReverse')) {
            addBookJS.classList.toggle('rotateIconReverse');
            aBC.classList.toggle('fadeOut');
        }
        addBookJS.classList.toggle('rotateIcon');
        aBC.classList.toggle('fadeIn');
        aBC.style.visibility = 'visible';
        aBC.style.transition = 'visibility 0s'

        aBC.style.opacity = '1';
    }
}
function newBook(e) {
    e.preventDefault();

    const inputTitle = document.getElementById("title").value;
    const inputAuthor = document.getElementById("author").value;
    const inputPages = document.getElementById("pages").value;
    radioCheck();

    if(formCheck()) {
        let newBook = new Book(inputTitle, inputAuthor, inputPages, selectedValue);
        addBook(newBook);
        bigBoy();
        formClear();
    } else {
        alert("Please fill out the forms");
    }
}
function deleteBook(e) {
    if (e.target.classList.contains("del-btn")) {
        e.target.parentElement.parentElement.remove();

        const index = e.target.parentElement.parentElement.firstElementChild.getAttribute("data-book_id");
        library.splice(index, 1);

        save();
    }
}
function Book(title,author,pages,complete){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.complete = complete;

}
function formClear(){

    form.reset();
}
function radioCheck() {
    for (let status of read) {
        if (status.checked) {
            selectedValue = status.value;
            break;
        }
    }
}
function formCheck(){
    radioCheck();
    const inputTitle = document.getElementById("title").value;
    const inputAuthor = document.getElementById("author").value;
    const inputPages = document.getElementById("pages").value;

    if (inputTitle === "" || inputAuthor === "" || inputPages === "" || !selectedValue) {
        return false;
    }
    return true;
}






function addBook(book){
    library.push(book);
    save();
}
function changeState(e){
    const index = e.target.parentElement.parentElement.firstElementChild.getAttribute("data-book_id");
    const bookEdit = library[index];

    if (bookEdit.complete === "Yes") {
        bookEdit.complete = "No";
        e.target.textContent = "No";
        e.target.classList.remove("book-read");
        e.target.classList.add("book-not-read");
    } else if (bookEdit.complete === "No") {
        bookEdit.complete = "Yes";
        e.target.textContent = "Yes";
        e.target.classList.remove("book-not-read");
        e.target.classList.add("book-read");
    }

    save();

}
function save(){
    localStorage.removeItem('localLibrary');
    localStorage.setItem("localLibrary", JSON.stringify(library))
}
function clearSelect(){
    let firstElement = libraryWrap.firstElementChild;

    while (firstElement) {
        firstElement.remove();
        firstElement = libraryWrap.firstElementChild;
    }
}
function bigBoy(){
    clearSelect();
    for (let book of library) {
        const bookListWrapper = libraryWrap.appendChild(document.createElement("div"));
        const bookList = bookListWrapper.appendChild(document.createElement("dl"));
        bookList.classList.add("book-list");
        bookList.dataset.book_id = library.indexOf(book);

        const bookTitle = bookList.appendChild(document.createElement("dt"));
        const bookAuthor = bookList.appendChild(document.createElement("dd"));
        const bookPages = bookList.appendChild(document.createElement("dd"));
        const bookStatusWrapper = bookListWrapper.appendChild(document.createElement("div"));
        const bookStatusTitle = bookStatusWrapper.appendChild(document.createElement("h2"));
        const bookStatus = bookStatusWrapper.appendChild(document.createElement("p"));
        const removeBookWrapper = bookListWrapper.appendChild(document.createElement("span"));
        const removeBook = removeBookWrapper.appendChild(document.createElement("img"));

        bookTitle.classList.add("book-title");
        bookAuthor.classList.add("book-author");
        bookPages.classList.add("book-pages");
        bookListWrapper.classList.add("book-list-wrapper");
        removeBookWrapper.classList.add("self-flex-end");
        bookStatusWrapper.classList.add("book-status-wrapper");

        bookTitle.textContent = book.title.trim();
        bookAuthor.textContent = `by ${book.author.trim()}`;
        bookPages.textContent = `${book.pages.trim()} pages`;
        bookStatusTitle.textContent = "Read it?";
        bookStatus.textContent = `${book.complete}`

        if (bookStatus.textContent === "Yes") {
            bookStatus.classList.add("book-read");
        } else {
            bookStatus.classList.add("book-not-read");
        }

        bookStatus.classList.add("book-status");
        removeBook.classList.add("del-btn");
        removeBook.src = "flame2.png";

        removeBook.addEventListener("click", deleteBook);

        bookStatus.addEventListener("click", changeState);
    }

}