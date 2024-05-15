const eventsContainer = document.getElementById('events');
const eventForm = document.getElementById('eventForm');
const totalQuantityElement = document.getElementById('totalQuantity');
const totalGramsElement = document.getElementById('totalGrams');
const option1TotalElement = document.getElementById('option1Total');
const option2TotalElement = document.getElementById('option2Total');
const option1GramsElement = document.getElementById('option1Grams');
const option2GramsElement = document.getElementById('option2Grams');

let totalQuantity = 0;
let option1Total = 0;
let option2Total = 0;
let option1Grams = 0;
let option2Grams = 0;
let events = [];

function getTextColor(bgColor) {
    const hexToRgb = (hex) => hex.match(/\w\w/g).map(x => parseInt(x, 16));
    const [r, g, b] = hexToRgb(bgColor);
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
}

function calculateTotalGrams() {
    return events.reduce((total, event) => {
        const conversionRate = event.type === '1' ? 20 : 30;
        return total + (event.quantity * conversionRate);
    }, 0).toFixed(3);
}

function calculateOptionGrams(type) {
    return events.reduce((total, event) => {
        if (event.type === type) {
            const conversionRate = type === '1' ? 20 : 30;
            return total + (event.quantity * conversionRate);
        }
        return total;
    }, 0).toFixed(3);
}

function renderEvents() {
    eventsContainer.innerHTML = '';
    totalQuantity = 0;
    option1Total = 0;
    option2Total = 0;
    option1Grams = 0;
    option2Grams = 0;

    events.forEach((event, index) => {
        const eventContainer = document.createElement('div');
        eventContainer.classList.add('event-container');
        eventContainer.style.backgroundColor = event.color;
        eventContainer.style.borderRadius = '20px';

        const eventElement = document.createElement('div');
        eventElement.classList.add('event-content');
        const textColor = getTextColor(event.color);
        eventElement.style.color = textColor;

        const eventTypeName = event.type === '1' ? 'หมั่นโถว' : 'เซาปิง';

        eventElement.innerHTML = `
            <h2><strong>${event.name}</strong></h2>
            <p>Quantity: ${event.quantity}</p>
            <p>Type: ${eventTypeName}</p>
        `;
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-event');
        removeButton.setAttribute('data-index', index);
        removeButton.innerHTML = '-';
        eventContainer.appendChild(eventElement);
        eventContainer.appendChild(removeButton);
        eventsContainer.appendChild(eventContainer);

        totalQuantity += event.quantity;
        if (event.type === '1') {
            option1Total += event.quantity;
        } else {
            option2Total += event.quantity;
        }
    });

    option1Grams = calculateOptionGrams('1');
    option2Grams = calculateOptionGrams('2');

    totalQuantityElement.textContent = `Total Quantity: ${totalQuantity}`;
    totalGramsElement.textContent = `Total Grams: ${calculateTotalGrams()}`;
    option1TotalElement.textContent = `หมั่นโถว Total: ${option1Total}`;
    option2TotalElement.textContent = `เซาปิง Total: ${option2Total}`;
    option1GramsElement.textContent = `หมั่นโถว Total Grams: ${option1Grams}`;
    option2GramsElement.textContent = `เซาปิง Total Grams: ${option2Grams}`;

    const removeButtons = document.querySelectorAll('.remove-event');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            events.splice(index, 1);
            renderEvents();
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
    eventForm.reset();
});

document.addEventListener('DOMContentLoaded', () => {
    renderEvents();
});

