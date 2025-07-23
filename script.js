import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const form = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");
const themeToggle = document.getElementById("themeToggle");

// DARK MODE
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// DISPLAY A BOOK CARD
function displayBook(data) {
  const div = document.createElement("div");
  div.className = "book";
  div.innerHTML = `
    ${data.image ? `<img src="${data.image}" alt="book image">` : ""}
    <p><strong>عنوان:</strong> ${data.title}</p>
    <p><strong>نویسنده/انتشارات:</strong> ${data.author}</p>
    <p><strong>قیمت:</strong> ${data.price} تومان</p>
    <p><strong>دسته:</strong> ${data.category}</p>
    <p><strong>تماس:</strong> ${data.phone}</p>
  `;
  bookList.prepend(div);
}

// LOAD ALL BOOKS FROM FIRESTORE
async function loadBooks() {
  const booksCol = collection(window.db, "books");
  const q = query(booksCol, orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);
  snapshot.forEach(doc => displayBook(doc.data()));
}

// FORM SUBMIT → SAVE & SHOW
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = form.title.value.trim();
  const author = form.author.value.trim();
  const price = form.price.value.trim();
  const category = form.category.value;
  const phone = form.phone.value.trim();
  const file = form.bookImage.files[0];

  if (file && file.size > 1024 * 1024) {
    alert("حجم فایل بیشتر از 1MB است.");
    return;
  }

  const reader = new FileReader();
  reader.onload = async (event) => {
    const imageData = file ? event.target.result : "";
    const newBook = {
      title,
      author,
      price,
      category,
      phone,
      image: imageData,
      timestamp: new Date()
    };
    await addDoc(collection(window.db, "books"), newBook);
    displayBook(newBook);
    form.reset();
  };

  if (file) reader.readAsDataURL(file);
  else reader.onload({ target: { result: "" } });
});

// INITIALIZE
loadBooks();
