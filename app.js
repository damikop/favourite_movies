'use strict';

const addModalBtn = document.getElementById('add-movie');
const addModal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const addModalCancelBtn = document.querySelector("#add-modal > div.modal__actions > button.btn.btn--passive");
const addBtn = document.querySelector("#add-modal > div.modal__actions > button.btn.btn--success");
const entryText = document.querySelector("#entry-text");
const inputs = document.querySelectorAll('input');
const movieListElement = document.querySelector("#movie-list");
const deleteModal = document.querySelector("#delete-modal");
const deleteBtn = document.querySelector("#delete-modal > div > button.btn.btn--danger");
const deleteModalCancelBtn = document.querySelector("#delete-modal > div > button.btn.btn--passive")

const movieList = [];


const closeModal = (type = 'add') => {
    if (type === 'delete'){
        deleteModal.classList.remove('visible');
    } else {
        addModal.classList.remove('visible');
    }
    backdrop.classList.remove('visible');
}

addModalBtn.addEventListener('click', () => {
    addModal.classList.add('visible');
    backdrop.classList.add('visible');
})

backdrop.addEventListener('click', closeModal);
addModalCancelBtn.addEventListener('click', closeModal);
deleteModalCancelBtn.addEventListener('click', () => closeModal('delete'));

const addMovie = (movie) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-item';
    // listItem.innerHTML = `
    //     <img src="${movie.imageUrl}" alt="${movie.title}">
    //     <span>Rating is ${movie.rating}</span>
    //     <button>❌</button>
    // `
    const modalTemplate = document.getElementById('list-item');
    const modalBody = document.importNode(modalTemplate.content, true);
    modalBody.querySelector('img').src = movie.imageUrl;
    modalBody.querySelector('img').alt = movie.title;
    modalBody.querySelector('span').textContent = `Rating is ${movie.rating}`;
    listItem.append(modalBody);

    movieListElement.append(listItem);

    listItem.addEventListener('click', () => {
        deleteModal.classList.add('visible');
        backdrop.classList.add('visible');
        deleteMovie(movie.id);
    })
}

const deleteMovie = (id) => {
    deleteBtn.addEventListener('click', () => {
        const index = movieList.findIndex(m => m.id === id);
        const listItem = document.querySelectorAll('.list-item');
        movieListElement.removeChild(listItem[index]);
        closeModal('delete')
    });
}

addBtn.addEventListener('click', () => {
    const newMovie = {
        id: Math.random().toString(),
        title: inputs[0]?.value,
        imageUrl: inputs[1]?.value,
        rating: inputs[2]?.value
    }
    movieList.push(newMovie);
    // если в массиве что-то есть то удалить entrytext
    if (movieList.length){
        entryText.remove();
        closeModal();
        addMovie(newMovie);
    }
})

