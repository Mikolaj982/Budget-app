const nameOfIncome = document.querySelector('#name-of-income');
const valueOfIncome = document.querySelector('#value-of-income');
const nameOfExpense = document.querySelector('#name-of-expense');
const valueOfExpense = document.querySelector('#value-of-expense');
const btnIncome = document.querySelector('#add-income');
const btnExpen = document.querySelector('#add-expen');
const incomesList = document.querySelector('#incomes-list');
const expenList = document.querySelector('#expenses-list');
const div = document.createElement('div');
const totalIncome = document.querySelector('#total-income');
const totalExpense = document.querySelector('#total-expense');
const budgetAmount = document.querySelector('.budget-amount');
const formAndButtonIncome = document.querySelector('#fb-income');
const formAndButtonExpense = document.querySelector('#fb-expense');
const totalIncomeValue = 0
const totalExpenseValue = 0

let incomes = JSON.parse(localStorage.getItem("incomes"))
if(incomes == 'undefined') incomes = []

let expenses = JSON.parse(localStorage.getItem("expenses"))
if(expenses == 'undefined') incomes = []

let sumIncome = [];
let sumExpense = [];


btnIncome.addEventListener('click', (e) => {
    e.preventDefault();
    inputIncomeValidation();
    resetIncomesForm();
    summmaryIncome();
    uptadeBalance();
});

btnExpen.addEventListener('click', (e) => {
    e.preventDefault();
    inputExpenseValidation();
    resetExpensesForm();
    summaryExpense();
    uptadeBalance();
});

const inputIncomeValidation = () => {
    if(nameOfIncome.value === '' || valueOfIncome.value === '') {
        formAndButtonIncome.insertAdjacentElement('afterend', div);
        div.classList.add('validation');
        div.innerHTML = 'Przypisz nazwę przychodu oraz kwotę.';
        
    } else {
        div.innerHTML = '';
        acceptIncomeData();
        
    }
}

const inputExpenseValidation = () => {
    if(nameOfExpense.value === '' || valueOfExpense.value === '') {
        formAndButtonExpense.insertAdjacentElement('afterend', div);
        div.classList.add('validation');
        div.innerHTML = 'Przypisz nazwę wydatku oraz kwotę.';
        
    } else {
        div.innerHTML = '';
        acceptExpensesData();
    }
}

const deleteIncome = (e) => {
    e.parentElement.remove();
    incomes.splice(e.parentElement.id, 1);
    localStorage.setItem("incomes", JSON.stringify(incomes));
    summmaryIncome();
    uptadeBalance();
    
}

const deleteExpense = (e) => {
    e.parentElement.remove();
    expenses.splice(e.parentElement.id, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    summaryExpense();
    uptadeBalance();
    
}

const editIncome = (e) => {
    
    const select = e.parentElement;
    nameOfIncome.value = select.children[1].innerHTML;
    valueOfIncome.value = select.children[2].innerHTML;
    
    deleteIncome(e);
    
}  

const editExpense = (e) => {
    const selected = e.parentElement;

    nameOfExpense.value = selected.children[1].innerHTML;
    valueOfExpense.value = selected.children[2].innerHTML;

    deleteExpense(e);
    
}

const addEarn = () => {
    incomesList.innerHTML = "";
    incomes.map((income, index) => {
        return (incomesList.innerHTML += `<div id=${index}><i class="fa-solid fa-arrow-trend-up"></i><span>${income.name}</span> - <span id='price'>${Number(income.value)}</span>zł <i onClick="editIncome(this)" class="fa-solid fa-pen-to-square"></i> <i onClick="deleteIncome(this);addEarn()" class="fa-solid fa-trash-can"></i></div>`);  
    })
    
};


const addExpe = () => {
    expenList.innerHTML = "";
    expenses.map((expense, index) => {
        return (expenList.innerHTML += `<div id=${index}><i class="fa-solid fa-arrow-trend-down"></i><span>${expense.name}</span> - <span id='price1'>${expense.value}</span>zł <i onClick="editExpense(this)" class="fa-solid fa-pen-to-square"></i> <i onClick="deleteExpense(this);addExpe()" class="fa-solid fa-trash-can"></i></div>`);  
    })
    
};

const acceptIncomeData = () => {
    incomes = incomes || [];
    incomes.push({
        name: nameOfIncome.value,
        value: valueOfIncome.value,
    });

    localStorage.setItem("incomes", JSON.stringify(incomes));
    addEarn();
};

const acceptExpensesData = () => {
    expenses = expenses || [];
    expenses.push({
      name: nameOfExpense.value,
      value: valueOfExpense.value,
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));

    addExpe();
};

const resetIncomesForm = () => {
    nameOfIncome.value = '';
    valueOfIncome.value = '';
}

const resetExpensesForm = () => {
    nameOfExpense.value = '';
    valueOfExpense.value = '';
}

(() => {
    data = JSON.parse(localStorage.getItem("incomes")) || [];
    data.map((income, index) => {
        return (incomesList.innerHTML += `<div id=${index}><i class="fa-solid fa-arrow-trend-up"></i><span>${income.name}</span> - <span id='price'>${income.value}</span>zł <i onClick="editIncome(this)" class="fa-solid fa-pen-to-square"></i> <i onClick="deleteIncome(this)" class="fa-solid fa-trash-can"></i></div>`);  
    }) 
  })();


(() => {
    data = JSON.parse(localStorage.getItem("expenses")) || [];
    data.map((expense, index) => {
        return (expenList.innerHTML += `<div id=${index}><i class="fa-solid fa-arrow-trend-up"></i><span>${expense.name}</span> - <span id='price1'>${expense.value}</span>zł <i onClick="editExpense(this)" class="fa-solid fa-pen-to-square"></i> <i onClick="deleteExpense(this)" class="fa-solid fa-trash-can"></i></div>`);  
    }) 
  })();

  

const summmaryIncome = () => {
    
    totalIncome.innerHTML = ''
    const spanList = document.querySelectorAll('#price')
    const elList = [...spanList];
    const innerValues = elList.map(el => parseInt(el.innerText))
    const summ = () => { 
        const sum = innerValues.reduce((prev, curr) =>  prev + curr);
        return( totalIncome.innerHTML += `${sum}zł`)
    }
    if(innerValues.length > 0) {
        summ();
    }
    sumIncome.push({
        total: totalIncome.value,
    });

    localStorage.setItem("sumIncome", JSON.stringify(sumIncome));
}

const summaryExpense = () => {
    
    totalExpense.innerHTML = ''
    const spanList = document.querySelectorAll('#price1')
    const elList = [...spanList];
    const innerValues = elList.map(el => parseInt(el.innerText))
    const summ = () => { 
        const sum = innerValues.reduce((prev, curr) =>  prev + curr);
        return (totalExpense.innerHTML += `${sum}zł`)
    }
    if(innerValues.length > 0) {
        summ();
    }
    sumExpense.push({
        total: totalExpense.value,
    });

    localStorage.setItem("sumExpense", JSON.stringify(sumExpense));
}


const calculateBalance = () => {
        let totalIncome = 0
        let totalExpense = 0
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
        
        if(incomes.length > 0) {
            incomes.forEach(income => {
                totalIncome += parseInt(income.value)
            })
        }
        
        if(expenses.length > 0) {
            expenses.forEach(expense => {
                totalExpense += parseInt(expense.value)
            })
        }
        return (totalIncome - totalExpense)
    }
    
    const uptadeBalance = () => {

        if (calculateBalance() === 0) {
            budgetAmount.innerText = `Bilans jest równy 0`;
        } else if (calculateBalance() > 0) {
            budgetAmount.innerText = `Możesz jeszcze wydać ${calculateBalance()}`;
        } else {
            budgetAmount.innerText = `Bilans jest ujemny i wynosi ${calculateBalance()}`;
        }

    }

uptadeBalance()
summmaryIncome()
summaryExpense()