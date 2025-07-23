import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBZxT9eSQ37mlzmWCjwaodOQVBf5VxWNBQ",
  authDomain: "daneshbaazar.firebaseapp.com",
  projectId: "daneshbaazar",
  storageBucket: "daneshbaazar.appspot.com",
  messagingSenderId: "1049703578192",
  appId: "1:1049703578192:web:d3e842a8a3c0b6f8d16f55",
  measurementId: "G-KYKNKE9M65"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌗";
});

// Show books
function displayBook(data) {
  const book = document.createElement("div");
  book.className = "book";
  book.innerHTML = `
    ${data.image ? `<img src="${data.image}" alt="book image">` : ""}
    <p><strong>عنوان:</strong> ${data.title}</p>
    <p><strong>نویسنده/انتشارات:</strong> ${data.author}</p>
    <p><strong>قیمت:</strong> ${data.price} تومان</p>
    <p><strong>دسته:</strong> ${data.category}</p>
    <p><strong>تماس:</strong> <a href="https://wa.me/98${data.phone}" target="_blank">${data.phone}</a></p>
  `;
  bookList.prepend(book);
}

async function loadBooks() {
  const snapshot = await getDocs(collection(db, "books"));
  snapshot.forEach((doc) => displayBook(doc.data()));
}

loadBooks();

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const price = document.getElementById("price").value.trim();
  const category = document.getElementById("category").value;
  const phone = document.getElementById("phone").value.trim();
  const file = document.getElementById("bookImage").files[0];

  if (!title || !author || !price || !category || !phone) {
    alert("لطفاً همه فیلدها را پر کنید.");
    return;
  }

  if (file && file.size > 1024 * 1024) {
    alert("حجم تصویر بیشتر از 1 مگابایت است.");
    return;
  }

  const reader = new FileReader();

  reader.onload = async function (event) {
    const imageData = file ? event.target.result : "";
    const bookData = { title, author, price, category, phone, image: imageData };

    await addDoc(collection(db, "books"), bookData);
    displayBook(bookData);
    form.reset();
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    reader.onload({ target: { result: "" } });
  }
});
