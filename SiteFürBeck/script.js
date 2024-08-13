document.getElementById('show-all-books').addEventListener('click', showAllBooks);
document.getElementById('search-by-author').addEventListener('click', searchByAuthor);
document.getElementById('search-by-title').addEventListener('click', searchByTitle);
document.getElementById('search-by-genre').addEventListener('click', searchByGenre);
document.getElementById('add-book-button').addEventListener('click', addBook);
document.getElementById('delete-book-button').addEventListener('click', deleteBook);

function showAllBooks() {
  fetch('/books')
    .then(response => response.json())
    .then(books => {
      displayBooks(books);
    });
}

function searchByAuthor() {
  const author = document.getElementById('author-input').value;
  fetch(`/books/author?name=${encodeURIComponent(author)}`)
    .then(response => response.json())
    .then(books => {
      displayBooks(books);
    });
}

function searchByTitle() {
  const title = document.getElementById('title-input').value;
  fetch(`/books/title?name=${encodeURIComponent(title)}`)
    .then(response => response.json())
    .then(books => {
      displayBooks(books);
    });
}

function searchByGenre() {
  const genre = document.getElementById('genre-input').value;
  fetch(`/books/genre?name=${encodeURIComponent(genre)}`)
    .then(response => response.json())
    .then(books => {
      displayBooks(books);
    });
}

function addBook() {
  const title = document.getElementById('new-title').value;
  const author = document.getElementById('new-author').value;
  const genre = document.getElementById('new-genre').value;
  const description = document.getElementById('new-description').value;

  const book = {
    title: title,
    author: author,
    genre: genre,
    description: description
  };

  fetch('/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(book)
  })
  .then(response => response.json())
  .then(newBook => {
    alert('Книга добавлена: ' + newBook.title);
    showAllBooks();
  });
}

function deleteBook() {
  const id = document.getElementById('delete-id-input').value;

  fetch(`/books/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      alert('Книга удалена');
      showAllBooks();
    } else {
      alert('Книга не найдена');
    }
  });
}

function displayBooks(books) {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';
  books.forEach(book => {
    const bookItem = document.createElement('div');
    bookItem.innerHTML = `<p>ID: ${book.id}, Название: ${book.title}, Автор: ${book.author}, Жанр: ${book.genre}, Описание: ${book.description}</p>`;
    bookList.appendChild(bookItem);
  });
}
