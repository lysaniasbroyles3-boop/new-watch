let cash = 10000;
let shares = 0;
let quantity = 1;

let stockPrice = 100;
let startingPrice = 100;

// -------------------------
// PAGE CONTROL
// -------------------------

function showPage(pageName) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const page = document.getElementById(pageName);

  if (page) {
    page.classList.add("active");
    window.scrollTo(0, 0);
  }
}

// -------------------------
// CLOCK
// -------------------------

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  if (hours === 0) hours = 12;

  document.getElementById("clock").textContent =
    `${hours}:${minutes} ${ampm}`;

  document.getElementById("date").textContent =
    now.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric"
    });
}

setInterval(updateClock, 1000);
updateClock();

// -------------------------
// TRADING
// -------------------------

function changeQuantity(amount) {
  quantity += amount;

  if (quantity < 1) {
    quantity = 1;
  }

  if (quantity > 100) {
    quantity = 100;
  }

  document.getElementById("quantity").textContent = quantity;
}

function buyStock() {
  const cost = stockPrice * quantity;

  if (cost > cash) {
    notify("Not enough virtual cash!");
    return;
  }

  cash -= cost;
  shares += quantity;

  updateTrading();
  notify(`Bought ${quantity} share${quantity > 1 ? "s" : ""}`);
}

function sellStock() {
  if (quantity > shares) {
    notify("You don't own that many shares!");
    return;
  }

  const earnings = stockPrice * quantity;

  cash += earnings;
  shares -= quantity;

  updateTrading();
  notify(`Sold ${quantity} share${quantity > 1 ? "s" : ""}`);
}

function updateTrading() {
  const portfolio = shares * stockPrice;

  const totalValue = cash + portfolio;

  const profit = totalValue - 10000;

  document.getElementById("cash").textContent =
    money(cash);

  document.getElementById("shares").textContent =
    shares;

  document.getElementById("portfolio").textContent =
    money(portfolio);

  document.getElementById("profit").textContent =
    money(profit);

  const change =
    ((stockPrice - startingPrice) / startingPrice) * 100;

  document.getElementById("stockPrice").textContent =
    money(stockPrice);

  document.getElementById("priceChange").textContent =
    `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;

  document.getElementById("priceChange").style.color =
    change >= 0 ? "#35e879" : "#ff6b6b";
}

function money(number) {
  return "$" + number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Simulated market movement
setInterval(() => {

  const movement =
    (Math.random() - 0.5) * 4;

  stockPrice += movement;

  if (stockPrice < 1) {
    stockPrice = 1;
  }

  updateTrading();

}, 3000);

// -------------------------
// RESET
// -------------------------

function resetTrading() {
  cash = 10000;
  shares = 0;
  quantity = 1;
  stockPrice = 100;

  document.getElementById("quantity").textContent = quantity;

  updateTrading();

  notify("Trading simulation reset!");
}

// -------------------------
// DASHBOARD
// -------------------------

function refreshDashboard() {
  updateClock();
  updateTrading();

  notify("BOBOS refreshed!");
}

// -------------------------
// NOTIFICATIONS
// -------------------------

function notify(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

// Start trading display
updateTrading();
