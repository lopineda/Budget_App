const totalAmount = document.getElementById('total-amount');
const userAmount = document.getElementById('user-amount');
const checkAmountButton = document.getElementById('check-amount');
const totalAmountButton = document.getElementById('total-amount-button');
const productTitle = document.getElementById('product-title');
const errorMessage = document.getElementById('budget-error');
const productTitleError = document.getElementById('product-title-error');
const amount = document.getElementById('amount');
const expenditureValue = document.getElementById('expenditure-value');
const balanceValue = document.getElementById('balance-amount');
const list = document.getElementById('list');

let tempAmount = 0;

// Set Budget Function
totalAmountButton.addEventListener('click', () => {
    const budget = parseFloat(totalAmount.value);
    
    if (isNaN(budget) || budget <= 0) {
        errorMessage.classList.remove('hide');
    } else {
        errorMessage.classList.add('hide');
        tempAmount = budget;
        amount.innerText = tempAmount.toFixed(2);
        balanceValue.innerText = (tempAmount - parseFloat(expenditureValue.innerText)).toFixed(2);
        totalAmount.value = ''; // Clear input
    }
});

// Disable edit and delete buttons
const disableButtons = (disable) => {
    document.querySelectorAll('.edit').forEach(button => button.disabled = disable);
};

// Modify List Elements
const modifyElement = (element, isEdit = false) => {
    const parentDiv = element.parentElement;
    const expenseAmount = parseFloat(parentDiv.querySelector('.amount').innerText);
    
    // Update budget values
    balanceValue.innerText = (parseFloat(balanceValue.innerText) + expenseAmount).toFixed(2);
    expenditureValue.innerText = (parseFloat(expenditureValue.innerText) - expenseAmount).toFixed(2);

    if (isEdit) {
        productTitle.value = parentDiv.querySelector('.product').innerText;
        userAmount.value = expenseAmount;
        disableButtons(true);
    }

    parentDiv.remove();
};

// Create List Function
const listCreator = (expenseName, expenseValue) => {
    const subListContent = document.createElement('div');
    subListContent.classList.add('sublist-content', 'flex-space');
    subListContent.innerHTML = `
        <p class="product">${expenseName}</p>
        <p class="amount">${parseFloat(expenseValue).toFixed(2)}</p>
    `;

    const editButton = document.createElement('button');
    editButton.classList.add('fa-solid', 'fa-pen-to-square', 'edit');
    editButton.style.fontSize = '1.2em';
    editButton.addEventListener('click', () => modifyElement(editButton, true));

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('fa-solid', 'fa-trash', 'delete');
    deleteButton.style.fontSize = '1.2em';
    deleteButton.addEventListener('click', () => modifyElement(deleteButton));

    subListContent.appendChild(editButton);
    subListContent.appendChild(deleteButton);
    list.appendChild(subListContent);
};

// Add Expense Function
checkAmountButton.addEventListener('click', () => {
    const expenseName = productTitle.value.trim();
    const expenseValue = parseFloat(userAmount.value);

    if (!expenseName || isNaN(expenseValue) || expenseValue <= 0) {
        productTitleError.classList.remove('hide');
        return;
    } else {
        productTitleError.classList.add('hide');
    }

    // Enable buttons and update values
    disableButtons(false);
    expenditureValue.innerText = (parseFloat(expenditureValue.innerText) + expenseValue).toFixed(2);
    balanceValue.innerText = (tempAmount - parseFloat(expenditureValue.innerText)).toFixed(2);

    // Add item to list
    listCreator(expenseName, expenseValue);

    // Clear inputs
    userAmount.value = '';
    productTitle.value = '';
});
