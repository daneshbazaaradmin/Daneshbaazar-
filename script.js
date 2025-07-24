document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookForm");
  const bookList = document.getElementById("bookList");
  const themeToggle = document.getElementById("themeToggle");

  let books = [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const price = document.getElementById("price").value.trim();
    const category = document.getElementById("category").value;
    const location = document.getElementById("location").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const imageInput = document.getElementById("bookImage");

    if (!title || !author || !price || !category || !location || !phone) {
      alert("Please fill in all fields.");
      return;
    }

    if (imageInput.files.length > 0) {
      const file = imageInput.files[0];
      if (file.size > 1024 * 1024 || !["image/jpeg", "image/png"].includes(file.type)) {
        alert("Image must be JPG/PNG and less than 1MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = function (event) {
        const imageData = event.target.result;
        const newBook = { title, author, price, category, location, phone, image: imageData };
        books.push(newBook);
        displayBooks(books);
        form.reset();
      };
      reader.readAsDataURL(file);
    } else {
      const newBook = { title, author, price, category, location, phone, image: null };
      books.push(newBook);
      displayBooks(books);
      form.reset();
    }
  });

  function displayBooks(bookArray) {
    bookList.innerHTML = "";
    if (bookArray.length === 0) {
      bookList.innerHTML = "<p>No books found.</p>";
      return;
    }

    bookArray.forEach(book => {
      const card = document.createElement("div");
      card.className = "book";

      card.innerHTML = `
        ${book.image ? `<img src="${book.image}" alt="Book Image">` : ""}
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Price:</strong> ${book.price} Toman</p>
        <p><strong>Category:</strong> ${book.category}</p>
        <p><strong>Location:</strong> ${book.location}</p>
        <p><strong>Contact:</strong> <a href="https://wa.me/98${book.phone}" target="_blank">${book.phone}</a></p>
      `;
      bookList.appendChild(card);
    });
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "🌞" : "🌗";
  });
});
