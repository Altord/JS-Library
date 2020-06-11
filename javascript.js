addBookJS = document.querySelector(".addBook");
aBC = document.querySelector(".addBookContainer");

action = 0;
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

function Book(title,author,pages,complete){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.complete = complete;

}

function newBook(){
    clearElements();

}
