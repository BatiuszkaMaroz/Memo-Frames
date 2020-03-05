const form = document.querySelector('.upload__form');

form.addEventListener('submit', event => {
  event.preventDefault();

  //Checks if inputs are empty
  const inputs = form.querySelectorAll('input');
  for (const input of inputs) {
    if (!input.value.trim()) {
      return;
    }
  }

  const formData = new FormData(document.querySelector('form'));

  for (const key of formData.keys()) {
    console.log(formData.get(key));
  }
});
