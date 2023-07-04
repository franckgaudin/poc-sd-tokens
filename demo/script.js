const prefersMode = window.matchMedia('(prefers-color-scheme: dark)');

if(prefersMode.matches) {
  localStorage.setItem('data-theme', 'dark');
} else {
  localStorage.setItem('data-theme', 'light');
}

const toggleTheme = () => {
  const body = document.body;
  const dataTheme = body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
  
  localStorage.setItem('data-theme', dataTheme);
}

const validateTheme = () => {
  const body = document.body;
  const dataTheme = localStorage.getItem('data-theme');

  if (dataTheme) {
    body.dataset.theme = dataTheme;
  } else {
    body.dataset.theme = prefersMode.matches ? 'dark' : 'light';
  }
}

validateTheme();