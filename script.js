const desc = document.getElementById("desc");
const amount = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expense-list");
const balance = document.getElementById("balance");
const themeToggle = document.getElementById("themeToggle");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Update Total Balance
function updateBalance() {
    const total = expenses.reduce((sum, item) => sum + item.amount, 0);
    balance.textContent = `₹${total.toFixed(2)}`;
}

// Display Expense List
function displayExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((exp, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${exp.desc} 
            <span>₹${exp.amount}</span>
            <button class="delete-btn" onclick="deleteExpense(${index})">X</button>
        `;
        expenseList.appendChild(li);
    });
    updateBalance();
}

// Delete Expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
}

// Add New Expense
addBtn.addEventListener("click", () => {
    const descValue = desc.value.trim();
    const amountValue = parseFloat(amount.value.trim());

    if (descValue === "" || isNaN(amountValue)) {
        alert("Please enter a valid description and amount!");
        return;
    }

    const newExpense = { desc: descValue, amount: amountValue };
    expenses.push(newExpense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    desc.value = "";
    amount.value = "";
    displayExpenses();
});

// Theme Toggle (Dark / Light Mode)
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

//  Load Saved Theme
window.onload = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeToggle.textContent = "☀️";
    }
    displayExpenses();
};
