document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('اطلاعات ثبت شد (در نسخه‌ی بعدی ذخیره خواهد شد)');
});
const form = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');
const darkToggle = document.getElementById('darkModeToggle');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const price = document.getElementById('price').value;
  const contact = document.getElementById('contact').value;

  const bookDiv = document.createElement('div');
  bookDiv.innerHTML = `
    <strong>عنوان:</strong> ${title}<br>
    <strong>نویسنده/انتشارات:</strong> ${author}<br>
    <strong>قیمت:</strong> ${price} تومان<br>
    <strong>تماس:</strong> ${contact}
  `;
  bookList.prepend(bookDiv);

  form.reset();
});

// Dark Mode Toggle
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
