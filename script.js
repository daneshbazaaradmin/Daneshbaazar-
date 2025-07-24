document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookForm");
  const bookList = document.getElementById("bookList");
  const themeToggle = document.getElementById("themeToggle");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");

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
      alert("لطفاً تمام فیلدها را پر کنید.");
      return;
    }

    if (imageInput.files.length > 0) {
      const file = imageInput.files[0];
      if (file.size > 1024 * 1024 || !["image/jpeg", "image/png"].includes(file.type)) {
        alert("تصویر باید JPG یا PNG باشد و کمتر از ۱ مگابایت.");
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
      bookList.innerHTML = "<p>کتابی پیدا نشد.</p>";
      return;
    }

    bookArray.forEach(book => {
      const card = document.createElement("div");
      card.className = "book";

      card.innerHTML = `
        ${book.image ? `<img src="${book.image}" alt="Book Image">` : ""}
        <h3>${book.title}</h3>
        <p><strong>نویسنده/ناشر:</strong> ${book.author}</p>
        <p><strong>قیمت:</strong> ${book.price} تومان</p>
        <p><strong>دسته:</strong> ${book.category}</p>
        <p><strong>مکان:</strong> ${book.location}</p>
        <p><strong>تماس:</strong> <a href="https://wa.me/98${book.phone}" target="_blank">${book.phone}</a></p>
      `;
      bookList.appendChild(card);
    });
  }

  function filterBooks() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchText) || book.author.toLowerCase().includes(searchText);
      const matchesCategory = selectedCategory === "همه" || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    displayBooks(filtered);
  }

  searchInput.addEventListener("input", filterBooks);
  categoryFilter.addEventListener("change", filterBooks);

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "🌞" : "🌗";
  });
});
