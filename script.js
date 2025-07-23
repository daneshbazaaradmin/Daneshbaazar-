document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookForm");
  const bookList = document.getElementById("bookList");
  const searchInput = document.getElementById("searchInput");
  const darkToggle = document.getElementById("darkModeToggle");

  let books = [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const price = document.getElementById("price").value.trim();
    const category = document.getElementById("category").value;
    const contact = document.getElementById("contact").value.trim();

    if (!title || !author || !price || !category || !contact) {
      alert("لطفاً همه فیلدها را پر کنید.");
      return;
    }

    const newBook = { title, author, price, category, contact };
    books.push(newBook);
    displayBooks(books);

    form.reset();
  });

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
    displayBooks(filtered);
  });

  function displayBooks(bookArray) {
    bookList.innerHTML = "";
    if (bookArray.length === 0) {
      bookList.innerHTML = "<p>کتابی پیدا نشد.</p>";
      return;
    }

    bookArray.forEach((book) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${book.title}</h3>
        <p>✍️ نویسنده/انتشارات: ${book.author}</p>
        <p>💰 قیمت: ${book.price} تومان</p>
        <p>📂 دسته‌بندی: ${book.category}</p>
        <p>📞 <a href="${formatContact(book.contact)}" target="_blank">ارتباط با فروشنده</a></p>
      `;
      bookList.appendChild(card);
    });
  }

  function formatContact(link) {
    if (link.startsWith("http")) return link;
    if (/^\d+$/.test(link)) return `https://wa.me/98${link}`;
    return link;
  }

  // Dark mode toggle
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");

    if (isLight) {
      document.documentElement.style.setProperty("--bg-color", "#ffffff");
      document.documentElement.style.setProperty("--text-color", "#000000");
      document.documentElement.style.setProperty("--card-color", "#f2f2f2");
      darkToggle.textContent = "🌙 حالت شب";
    } else {
      document.documentElement.style.setProperty("--bg-color", "#121212");
      document.documentElement.style.setProperty("--text-color", "#ffffff");
      document.documentElement.style.setProperty("--card-color", "#1e1e1e");
      darkToggle.textContent = "🌓 حالت شب";
    }
  });
});
