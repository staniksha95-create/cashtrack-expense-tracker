// ===============================
// SELECTING HTML ELEMENTS
// ===============================

// element that shows remaining balance
const balance = document.getElementById("balance");

// element that shows total income (salary)
const income = document.getElementById("income");

// element that shows total expenses
const expense = document.getElementById("expense");

// list where transaction history will appear
const list = document.getElementById("list");

// form used to add an expense
const form = document.getElementById("form");

// input field for description
const text = document.getElementById("text");

// input field for expense amount
const amount = document.getElementById("amount");

// salary input field
const salaryInput = document.getElementById("salaryInput");

// salary button
const setSalaryBtn = document.getElementById("setSalaryBtn");

// download report button
const downloadBtn = document.getElementById("downloadBtn");

// ===============================
// DATA STORAGE
// ===============================

// stores user's salary
let salary = 0;

// array to store all expense transactions
let transactions = [];

// ===============================
// SET / EDIT SALARY
// ===============================

setSalaryBtn.addEventListener("click", function () {
  // convert salary input from string to number
  salary = +salaryInput.value;

  // update income UI
  income.innerText = "₹" + salary;

  // recalculate balance
  updateBalance();
});

// ===============================
// ADD NEW EXPENSE
// ===============================

function addTransaction(e) {
  // prevents page refresh
  e.preventDefault();

  // get description entered by user
  const textValue = text.value;

  // make sure expense value is always negative
  const amountValue = -Math.abs(amount.value);

  // create transaction object
  const transaction = {
    text: textValue,
    amount: amountValue,
  };

  // add transaction to array
  transactions.push(transaction);

  // refresh the transaction list
  renderTransactions();

  // update balance
  updateBalance();

  // clear input fields
  text.value = "";
  amount.value = "";
}

// ===============================
// RENDER ALL TRANSACTIONS
// ===============================

function renderTransactions() {
  // clear list before re-rendering
  list.innerHTML = "";

  // loop through transactions array
  transactions.forEach(function (transaction, index) {
    const li = document.createElement("li");

    // create transaction row
    li.innerHTML = `
      ${transaction.text}
      <span>-₹${Math.abs(transaction.amount)}</span>
      <button class="delete-btn">❌</button>
    `;

    // delete transaction when button clicked
    li.querySelector(".delete-btn").addEventListener("click", function () {
      // remove transaction from array
      transactions.splice(index, 1);

      // re-render list
      renderTransactions();

      // update balance again
      updateBalance();
    });

    // add transaction to history list
    list.appendChild(li);
  });
}

// ===============================
// UPDATE BALANCE
// ===============================

function updateBalance() {
  let totalExpense = 0;

  // calculate total expenses
  transactions.forEach(function (t) {
    totalExpense += Math.abs(t.amount);
  });

  // update expense display
  expense.innerText = "₹" + totalExpense;

  // calculate remaining balance
  const remaining = salary - totalExpense;

  // update balance UI
  balance.innerText = "₹" + remaining;
}

// ===============================
// DOWNLOAD EXPENSE REPORT (PDF)
// ===============================

downloadBtn.addEventListener("click", function () {
  // select the card container
  const element = document.querySelector(".container");

  // convert container into PDF
  html2pdf().from(element).save("CashTrack_Report.pdf");
});

// ===============================
// FORM SUBMIT EVENT
// ===============================

// when user clicks "Add Expense"
form.addEventListener("submit", addTransaction);
