const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");

let cash = 1000;
let shares = 0;
let price = 100;

let prices = [price];
const maxPoints = 100;

// Update UI
function updateUI() {
    document.getElementById("cash").textContent = cash.toFixed(2);
    document.getElementById("shares").textContent = shares;
    document.getElementById("price").textContent = price.toFixed(2);
}

// Draw graph
function drawChart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.strokeStyle = "#0f0";
    ctx.lineWidth = 2;

    prices.forEach((p, i) => {
        const x = (i / maxPoints) * canvas.width;
        const y = canvas.height - (p / 200) * canvas.height;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });

    ctx.stroke();
}

// Stock price movement
function updatePrice() {
    const change = (Math.random() - 0.5) * 10;
    price = Math.max(1, price + change);

    prices.push(price);
    if (prices.length > maxPoints) prices.shift();

    updateUI();
    drawChart();
}

// Buy stock
function buy() {
    if (cash >= price) {
        cash -= price;
        shares++;
        updateUI();
    }
}

// Sell stock
function sell() {
    if (shares > 0) {
        cash += price;
        shares--;
        updateUI();
    }
}

// Start simulation
setInterval(updatePrice, 100);
updateUI();
drawChart();
