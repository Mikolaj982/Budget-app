let nameOfIncome = document.querySelector('#name-of-income');
let valueOfIncome = document.querySelector('#value-of-income');
let nameOfExpense = document.querySelector('#name-of-expense');
let valueOfExpense = document.querySelector('#value-of-expense');
let btnIncome = document.querySelector('#add-income');
let btnExpen = document.querySelector('#add-expen');
let incomesList = document.querySelector('#incomes-list');
let expenList = document.querySelector('#expenses-list');
let div = document.createElement('div');
let totalIncome = document.querySelector('#total-income');
let totalExpense = document.querySelector('#total-expense');
let budgetAmount = document.querySelector('.budget-amount');
let formAndButtonIncome = document.querySelector('#fb-income');
let formAndButtonExpense = document.querySelector('#fb-expense');
let totalIncomeValue = 0
let totalExpenseValue = 0

let incomes = JSON.parse(localStorage.getItem("incomes"))
if(incomes == 'undefined') incomes = []

let expenses = JSON.parse(localStorage.getItem("expenses"))
if(expenses == 'undefined') incomes = []

let sumIncome = [];
let sumExpense = [];


btnIncome.addEventListener('click', (e) => {
    e.preventDefault();
    inputValidation();
    resetForm();
    summmaryIncome();
    uptadeBalance();
});

btnExpen.addEventListener('click', (e) => {
    e.preventDefault();
    inputValidation1();
    resetForm1();
    summaryExpense();
    uptadeBalance();
});

let inputValidation = () => {
    if(nameOfIncome.value === '' || valueOfIncome.value === '') {
        formAndButtonIncome.insertAdjacentElement('afterend', div);
        div.classList.add('validation');
        div.innerHTML = 'Przypisz nazwę przychodu oraz kwotę.';
        
    } else {
        div.innerHTML = '';
        acceptIncomeData();
        
    }
}

let inputValidation1 = () => {
    if(nameOfExpense.value === '' || valueOfExpense.value === '') {
        formAndButtonExpense.insertAdjacentElement('afterend', div);
        div.classList.add('validation');
        div.innerHTML = 'Przypisz nazwę wydatku oraz kwotę.';
        
    } else {
        div.innerHTML = '';
        acceptExpensesData();
    }
}

let deleteIncome = (e) => {
    e.parentElement.remove();
    incomes.splice(e.parentElement.id, 1);
    localStorage.setItem("incomes", JSON.stringify(incomes));
    summmaryIncome();
    uptadeBalance();
    
}

let deleteExpense = (e) => {
    e.parentElement.remove();
    expenses.splice(e.parentElement.id, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    summaryExpense();
    uptadeBalance();
    
}

let editIncome = (e) => {
    
    let select = e.parentElement;

    nameOfIncome.value = select.children[1].innerHTML;
    valueOfIncome.value = select.children[2].innerHTML;

    deleteIncome(e);
    
}  

let editExpense = (e) => {
    let selected = e.parentElement;

    nameOfExpense.value = selected.children[1].innerHTML;
    valueOfExpense.value = selected.children[2].innerHTML;

    deleteExpense(e);
    
}

let addEarn = () => {
    incomesList.innerHTML = "";
    incomes.map((x, y) => {
        return (incomesList.innerHTML += `<div id=${y}><i class="fa-solid fa-arrow-trend-up"></i><span>${x.name}</span> - <span id='price'>${Number(x.value)}</span>zł <i onClick="editIncome(this)" class="fa-solid fa-pen-to-square"></i> <i onClick="deleteIncome(this);addEarn()" class="fa-solid fa-trash-can"></i></div>`);  
    })
    
};


let addExpe = () => {
    expenList.innerHTML = "";
    expenses.map((x, y) => {
        return (expenList.innerHTML += `<div id=${y}><i class="fa-solid fa-arrow-trend-down"></i><span>${x.name}</span> - <span id='price1'>${x.value}</span>zł <i onClick="editExpense(this)" class="fa-solid fa-pen-to-square"></i> <i onClick="deleteExpense(this);addExpe()" class="fa-solid fa-trash-can"></i></div>`);  
    })
    
};

let acceptIncomeData = () => {
    incomes = incomes || [];
    incomes.push({
        name: nameOfIncome.value,
        value: valueOfIncome.value,
    });

    localStorage.setItem("incomes", JSON.stringify(incomes));
    addEarn();
};

let acceptExpensesData = () => {
    expenses.push({
      name: nameOfExpense.value,
      value: valueOfExpense.value,
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));

    addExpe();
};

let resetForm = () => {
    nameOfIncome.value = '';
    valueOfIncome.value = '';
}

let resetForm1 = () => {
    nameOfExpense.value = '';
    valueOfExpense.value = '';
}

(() => {
    data = JSON.parse(localStorage.getItem("incomes")) || [];
    data.map((x, y) => {
        return (incomesList.innerHTML += `<div id=${y}><i class="fa-solid fa-arrow-trend-up"></i><span>${x.name}</span> - <span id='price'>${x.value}</span>zł <i onClick="editIncome(this)" class="fa-solid fa-pen-to-square"></i> <i onClick="deleteIncome(this)" class="fa-solid fa-trash-can"></i></div>`);  
    }) 
  })();


(() => {
    data = JSON.parse(localStorage.getItem("expenses")) || [];
    data.map((x, y) => {
        return (expenList.innerHTML += `<div id=${y}><i class="fa-solid fa-arrow-trend-up"></i><span>${x.name}</span> - <span id='price1'>${x.value}</span>zł <i onClick="editExpense(this)" class="fa-solid fa-pen-to-square"></i> <i onClick="deleteExpense(this)" class="fa-solid fa-trash-can"></i></div>`);  
    }) 
  })();

  

let summmaryIncome = () => {
    
    totalIncome.innerHTML = ''
    const spanList = document.querySelectorAll('#price')
    let elList = [...spanList];
    let innerValues = elList.map(el => parseInt(el.innerText))
    const summ = () => { 
        let sum = innerValues.reduce((x, y) =>  x + y);
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

let summaryExpense = () => {
    
    totalExpense.innerHTML = ''
    const spanList = document.querySelectorAll('#price1')
    let elList = [...spanList];
    let innerValues = elList.map(el => parseInt(el.innerText))
    const summ = () => { 
        let sum = innerValues.reduce((x, y) =>  x + y);
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

let uptadeBalance = () => {
    budgetAmount.innerText = `Bilans wynosi ${calculateBalance()} złotych`
}

let calculateBalance = () => {
        let totalIncome = 0
        let totalExpense = 0
        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        let incomes = JSON.parse(localStorage.getItem('incomes')) || [];
        
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

uptadeBalance()
summmaryIncome()
summaryExpense()