import './index.css';
import Api from "./components/Api";
import Section from "./components/Section";
import Card from "./components/Card";

const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
const paginationNumbers = document.getElementById("pagination-numbers");
let listItems = null;
const paginationLimit = 6;
let pageCount = 0;
let currentPage = 1;

const api = new Api('https://reqres.in/api/users');

Promise.all([api.getUsers()])
    .then(([data]) => {
        cardSection.renderItems(data)
        listItems = document.querySelectorAll('.cards__item');
        pageCount = Math.ceil(data.length / paginationLimit);
        getPaginationNumbers();
        setCurrentPage(1);
    })
    .catch(e => console.log(`Ошибка: \n${e}`))

const disableButton = (button) => {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
};

const enableButton = (button) => {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {
    if (currentPage === 1) {
        disableButton(prevButton);
    } else {
        enableButton(prevButton);
    }

    if (pageCount === currentPage) {
        disableButton(nextButton);
    } else {
        enableButton(nextButton);
    }
};

const appendPageNumber = (index) => {
    const pageNumber = document.createElement("button");
    pageNumber.className = "pagination-number";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    pageNumber.setAttribute("aria-label", "Page " + index);

    paginationNumbers.appendChild(pageNumber);
}

const handleActivePageNumber = () => {
    document.querySelectorAll(".pagination-number").forEach((button) => {
        button.classList.remove("active");
        const pageIndex = Number(button.getAttribute("page-index"));
        if (pageIndex === currentPage) {
            button.classList.add("active");
        }
    });
};

const getPaginationNumbers = () => {
    for (let i = 1; i <= pageCount; i++) {
        appendPageNumber(i);
    }
};

const setCurrentPage = (pageNum) => {
    currentPage = pageNum;

    handleActivePageNumber();
    handlePageButtonsStatus();

    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;

    listItems.forEach((item, index) => {
        item.classList.add("hidden");
        if (index >= prevRange && index < currRange) {
            item.classList.remove("hidden");
        }
    });
};

prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
});

nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
});

document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

    if (pageIndex) {
        button.addEventListener("click", () => {
            setCurrentPage(pageIndex);
        });
    }
});




function createCard(item) {
    const card = new Card(item, '#template_card');
    return card.generateCard();
}

const cardSection = new Section((card) => {
    cardSection.addItem(createCard(card));
}, '.cards');
