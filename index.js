const form = document.querySelector('.form');
const colorBoxes = document.querySelectorAll('.list > .color');
const colorTextBoxes = document.querySelectorAll('.list > .color-code');
const defaultColors = ['#F55A5A', '#2B283A', '#FBF3AB', '#AAD1B6', '#A626D3'];

displayInfo(defaultColors);

form.addEventListener('submit', handleSubmit);

function displayInfo(array) {
  array.forEach((color, i) => {
    colorBoxes[i].style.backgroundColor = color;
    colorTextBoxes[i].textContent = color;
  });
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

  displayInfo(colors);
}

function setUrl(obj) {
  const data = {
    baseURL: 'https://www.thecolorapi.com',
    endpoint: '/scheme',
    color: obj.color,
    mode: obj.mode,
    count: obj.count || 5,
  };

  return `${data.baseURL}${data.endpoint}?hex=${data.color}&mode=${
    data.mode
  }&count=${data.count}`;
}

async function getColors(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.colors;
}


// https://www.thecolorapi.com/docs#schemes
// /scheme?hex=24B1E0&mode=triad&count=6
