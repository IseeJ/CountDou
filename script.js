const eventsContainer = document.getElementById('events');
const eventForm = document.getElementById('eventForm');
const cuteGif = document.getElementById('PET');
const totalQuantityElement = document.getElementById('totalQuantity');
const totalGramsElement = document.getElementById('totalGrams');
const customDateInput = document.getElementById('customDate');
const displayDateElement = document.getElementById('displayDate');

let totalQuantity = 0;
let events = [];

function getTextColor(bgColor) {
  const hexToRgb = (hex) => hex.match(/\w\w/g).map(x => parseInt(x, 16));
  const [r, g, b] = hexToRgb(bgColor);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

function updateGifExpression() {
  const numberOfEvents = events.length;
  if (numberOfEvents >= 5) {
    cuteGif.src = 'happy.png';
  } else if (numberOfEvents >= 3) {
    cuteGif.src = 'neutral.png';
  } else {
    cuteGif.src = 'initial.png';
  }
}

function calculateTotalGrams(quantity) {
  return (quantity/24).toFixed(3);
}

function renderEvents() {
  eventsContainer.innerHTML = '';
  totalQuantity = 0;

  events.forEach((event, index) => {
    const eventContainer = document.createElement('div');
    eventContainer.classList.add('event-container');
    eventContainer.style.backgroundColor = event.color;
    eventContainer.style.borderRadius = '20px';

    const eventElement = document.createElement('div');
    eventElement.classList.add('event-content');
    const textColor = getTextColor(event.color);
    eventElement.style.color = textColor;
    
    eventElement.innerHTML = `
      <h2><strong>${event.name}</strong></h2>
      <p>${event.quantity} ${event.type}</p>
    `;
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-event');
    removeButton.setAttribute('data-index', index);
    removeButton.innerHTML = '-';
    eventContainer.appendChild(eventElement);
    eventContainer.appendChild(removeButton);
    eventsContainer.appendChild(eventContainer);

    totalQuantity += event.quantity;
  });

  totalQuantityElement.textContent = `รวม: ${totalQuantity}`;
  totalGramsElement.textContent = `แป้งกี่ลูก: ${calculateTotalGrams(totalQuantity)}`;

  const removeButtons = document.querySelectorAll('.remove-event');
  removeButtons.forEach(button => {
    button.addEventListener('click', function () {
      const index = this.getAttribute('data-index');
      events.splice(index, 1);
      renderEvents();
      updateGifExpression();
    });
  });
}

eventForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const eventName = document.getElementById('eventName').value;
  const eventQuantity = parseInt(document.getElementById('eventQuantity').value, 10);
  const eventType = document.getElementById('eventType').value;
  const eventColor = document.getElementById('eventColor').value;

  events.push({ name: eventName, quantity: eventQuantity, type: eventType, color: eventColor });
  renderEvents();
  updateGifExpression();
  eventForm.reset();
});


document.addEventListener('DOMContentLoaded', () => {
  renderEvents();
  updateGifExpression();
});
