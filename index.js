const form = document.querySelector('.form');
const palette = document.querySelector('.content-list');
const defaultColors = ['#F55A5A', '#2B283A', '#FBF3AB', '#AAD1B6', '#A626D3'];

renderColorPalette(defaultColors);

form.addEventListener('submit', handleSubmit);

function renderColorPalette(colors) {
  const markup = colors
    .map((color, i) => {
      return `
      <li class="content-list-item" style="background-color: ${color}">
        <div class="color-code">${color}</div>
      </li>
    `;
    })
    .join('');

  palette.style.gridTemplateColumns = `repeat(${colors.length}, 1fr)`;
  palette.innerHTML = markup;
}

async function handleSubmit(event) {
  event.preventDefault();
  const { inputPicker, schemeMode } = event.currentTarget.elements;
  const data = {
    color: inputPicker.value.slice(1),
    mode: schemeMode.value,
  };

  const url = setUrl(data);
  const colorObj = await getColors(url);
  const colors = colorObj.map((color) => color.hex.value);

  renderColorPalette(colors);
}

function setUrl(obj) {
  const data = {
    baseURL: 'https://www.thecolorapi.com',
    endpoint: '/scheme',
    color: obj.color,
    mode: obj.mode,
    count: obj.count || 5,
  };

  return `${data.baseURL}${data.endpoint}?hex=${data.color}&mode=${data.mode}&count=${data.count}`;
}

async function getColors(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.colors;
}

// https://www.thecolorapi.com/docs#schemes
// /scheme?hex=24B1E0&mode=triad&count=6
