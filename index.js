let totalAmount = document.getElementById('total-amount');
let userAmount = document.getElementById('user-amount');
const checkAmountButtton = document.getElementById('check-amount');
const totalAmountButtton = document.getElementById('total-amount-button');
const productTitle = document.getElementById('product-title');
const errorMessage = document.getElementById('budget-error');
const productTitleError = document.getElementById('product-title-error');
const productCostError = document.getElementById('product-cost-error');
const amount = document.getElementById('amount');
const expenditureValue = document.getElementById('expenditure-value');
const balanceValue = document.getElementById('balance-value');
const list = document.getElementById('list');
let tempAmount = 0;

//Set Budget Functions

totalAmountButtton.addEventListener('click', () => {
    tempAmount = totalAmount.value;
    //Bad input
    if (tempAmount === '' || tempAmount < 0) {
        errorMessage.classList.remove('hide');
    }else {
        errorMessage.classList.add('hide');
        //Set Budget
        amount.innerHTML = tempAmount;
        balanceValue.innerText = tempAmount - expenditureValue.innerText;
        //Clear input
        totalAmount.value = '';
    }
});

//Disable edit and delete button function

const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName('edit');
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    });
};

//Modify list elements function

const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpence = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector('.amount').innerText;
    if (edit) {
        let parentText = parentDiv.querySelector('.product').innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }

    balanceValue.innertext = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpence) - parseInt(parentAmount);
    parentDiv.remove();
};

//Create list function

const listCreator = (expenseName, expenseValue) => {
    let subListContent = document.createElement('div');
    subListContent.classList.add('sub-list-content', 'flex-space');
    listCreator.appendChild(subListContent);
    subListContent.innerHTML = `<p class="product">${expenseName}</p><p
    class="amount">${expenseValue}</p>`;
    let editButton = document.createElement('button');
    editButton.classList.add('fa-solid', 'fa-pen-to-square', 'edit');
    editButton.style.fontSize = '1.2em';
    editButton.addEventListener('click', () => {
        modifyElement(editButton, true);
    });
    deleteButton.classList.add('fa-solid', 'fa-trash', 'delete');
    deleteButton.style.fontSize = '1.2em';
    deleteButton.addEventListener('click', () => {
        modifyElement(deleteButton);
    });
    subListContent.appendChild(editButton);
    subListContent.appendChild(deleteButton);
    document.getElementById('list').appendChild(subListContent);
};

//Add epense function

checkAmountButtton.addEventListener('click', () => {
    //Check empty
    if(!userAmount.value || !productTitle.value){
        productTitleError.classList.remove('hide');
        return false;
    }
    //Enable buttoons
    disableButtons(false);
    //Expense
    let expenditure = parseInt(userAmount.value);
    //Total expense (existing + new expense)
    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;
    //Total balance = budget - total expense
    const totalBalance = tempAmount - sum;
    balanceValue.innerText = totalBalance;
    //Crear list
    listCreator(productTitle.value, userAmount.value);
    //Clear inputs
    userAmount.value = '';
    productTitle.value = '';
});