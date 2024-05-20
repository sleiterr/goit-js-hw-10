const form = document.querySelector('.form');

// Додаємо обробник події submit
form.addEventListener('submit', function (event) {
  // Зупиняємо стандартну поведінку форми
  event.preventDefault();

  // Отримуємо значення затримки з інпуту
  const delay = parseInt(form.delay.value);

  // Отримуємо значення обраного стану
  const state = form.querySelector('input[name="state"]:checked').value;

  // Створюємо проміс
  const promise = new Promise((resolve, reject) => {
    // Викликаємо resolve або reject через delay мілісекунд
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  // Обробка вдалого виконання промісу
  promise.then(delay => {
    // Вивід повідомлення з використанням iziToast
    iziToast.success({
      title: 'Fulfilled promise',
      message: `✔️ Fulfilled promise in ${delay}ms`,
    });
  });

  // Обробка відхилення промісу
  promise.catch(delay => {
    // Вивід повідомлення з використанням iziToast
    iziToast.error({
      title: 'Rejected promise',
      message: `⛔ Rejected promise in ${delay}ms`,
    });
  });
});
