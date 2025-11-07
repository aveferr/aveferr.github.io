
const fuelConsumption = {
    motorcycle: 5,  
    car: 10         
};

const motorcycleBtn = document.getElementById('motorcycleBtn');
const carBtn = document.getElementById('carBtn');
const fuelSlider = document.getElementById('fuelSlider');
const fuelValue = document.getElementById('fuelValue');
const messageElement = document.getElementById('message');
const smileyElement = document.getElementById('smiley');

let distance = 0;

const calculateRequiredFuel = (distance, consumption) => {
    return (distance * consumption) / 100;
};

const isEnoughFuel = (availableFuel, requiredFuel) => {
    return availableFuel >= requiredFuel;
};

const showResult = (isEnough, requiredFuel, availableFuel) => {
    if (isEnough) {
        smileyElement.textContent = '😊';
    } else {
        smileyElement.textContent = '😢';
    }
};

const calculateForTransport = (transportType) => {
    if (distance <= 0) {
        alert('Сначала введите длину пути при старте!');
        return;
    }

    const availableFuel = parseFloat(fuelSlider.value);
    const consumption = fuelConsumption[transportType];
    const requiredFuel = calculateRequiredFuel(distance, consumption);
    const enoughFuel = isEnoughFuel(availableFuel, requiredFuel);

    showResult(enoughFuel, requiredFuel, availableFuel);
};

fuelSlider.addEventListener('input', () => {
    fuelValue.textContent = fuelSlider.value;
});

motorcycleBtn.addEventListener('click', () => {
    calculateForTransport('motorcycle');
});

carBtn.addEventListener('click', () => {
    calculateForTransport('car');
});


window.addEventListener('load', () => {
    const start = confirm('Приступаем?');
    
    if (start) {
        messageElement.textContent = 'Жизнь продолжается, и мы должны двигаться дальше';
        
        
        const input = prompt('Введите длину пути в км:');
        if (input !== null && !isNaN(input) && parseFloat(input) > 0) {
            distance = parseFloat(input);
        } else {
            alert('Пожалуйста, введите корректное расстояние!');
            distance = 0;
        }
    } else {
        messageElement.textContent = 'Камень остается на месте';
    }
});