const buttons = {
  light: document.querySelector('.mode--light'),
  dark: document.querySelector('.mode--dark'),
  pink: document.querySelector('.mode--pink'),
};

buttons.light.addEventListener('click', setColors.bind(this, 'light'));
buttons.dark.addEventListener('click', setColors.bind(this, 'dark'));
buttons.pink.addEventListener('click', setColors.bind(this, 'pink'));

function setColors(mode, event) {
  darkHeader(mode);
  const curButton = event.target;
  setFrame(curButton);

  localStorage.setItem('colorMode', mode);
  for (let i = 1; i < 5; i++) {
    document.documentElement.style.setProperty(
      `--main${i}`,
      `var(--${mode}-main${i})`,
    );
  }
}

function setFrame(button) {
  const frame = document.querySelector('.frame');
  frame.style.left = `${button.offsetLeft - 1}px`;
  frame.style.width = `${button.offsetWidth + 2}px`;
}

let mode = localStorage.getItem('colorMode');

window.onload = () => {
  if (mode) {
    darkHeader(mode);
    setFrame(buttons[mode]);
    for (let i = 1; i < 5; i++) {
      document.documentElement.style.setProperty(
        `--main${i}`,
        `var(--${mode}-main${i})`,
      );
    }
  } else {
    localStorage.setItem('colorMode', 'light');
    setFrame(buttons.light);
  }
};

function darkHeader(mode) {
  const header = document.querySelector('.header__logo');
  const inputs = document.querySelectorAll('.upload__input');

  if (mode === 'dark') {
    inputs.forEach(elm => {
      elm.classList.add('darkInput');
    });

    header.classList.add('dark-mode');
  } else {
    inputs.forEach(elm => {
      elm.classList.remove('darkInput');
    });

    header.classList.remove('dark-mode');
  }
}
