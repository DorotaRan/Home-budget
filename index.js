let incomeList = [];
let expenditureList = [];
let incomeId = 0;
let expenditureId = 0;
let finalSum = 0;
let totalIncome = 0;
let totalExpenses = 0;
let incomeUl = document.getElementById('incomeList');
let expenditureUl = document.getElementById('expenditureList');
let incomeForm = document.getElementById('incomeForm');
let expenditureForm = document.getElementById('expenditureForm');
let incomeTypeError = document.getElementById('incomeTypeError');
let incomeAmountError = document.getElementById('incomeAmountError');
let expenditureTypeError = document.getElementById('expenditureTypeError');
let expenditureAmountError = document.getElementById('expenditureAmountError');

incomeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let incomeType = event.target.elements[0];
    let incomeAmount = event.target.elements[1];
    let income = {
        name: incomeType.value, 
        amount: incomeAmount.value,
        id: incomeId
    }
    if (incomeType.value.length > 2) {
        incomeType.classList.remove('input-danger');
        incomeTypeError.innerText = '';
    } 
    if (isNaN(incomeAmount.value)==false) {
        incomeAmount.classList.remove('input-danger');
        incomeAmountError.innerText = '';
    } 
    if (incomeType.value.length > 2 && isNaN(incomeAmount.value)==false) {
        incomeId++;
        incomeList.push(income);
        localStorage.setItem('incomeList',JSON.stringify(incomeList));
        incomeType.value = '';
        incomeAmount.value = '';
        updateIncomeList();
        updateIncomeCounter();
        finalBalance();
    } else {
        if (incomeType.value.length < 3) {
            incomeType.classList.add('input-danger');
            incomeTypeError.innerText = 'za krótki opis - min. 3 znaki!';
        } if (isNaN(incomeAmount.value)==true)  {
            incomeAmount.classList.add('input-danger');
            incomeAmountError.innerText = 'wprowadź kwotę';
        };
    };
});

function onRemoveIncomeBtnClicked(event) {
    incomeList = incomeList.filter(function(elem) {
        return Number(elem.id) !== Number(event.target.id);
    })
    updateIncomeList();
    updateIncomeCounter();
    finalBalance();
    localStorage.setItem('incomeList',JSON.stringify(incomeList));
}

function onEditIncomeBtnClicked(currentIncome) {
    const incomeEditElem = document.getElementById(`incomeContainer-${currentIncome.id}`);
    incomeEditElem.innerHTML = `<input id='saveIncomeName-${currentIncome.id}' value=${currentIncome.name}></input>
                                <input id='saveIncomeAmount-${currentIncome.id}' value=${currentIncome.amount}></input>
                                <button onclick='onEditIncomeDataSave(${currentIncome.id})'>Zapisz</button>`;
}

function onEditIncomeDataSave(id) {
    let newIncomeNameElem = document.getElementById(`saveIncomeName-${id}`);
    let newIncomeName  = newIncomeNameElem.value;
    let newIncomeAmountElem = document.getElementById(`saveIncomeAmount-${id}`);
    let newIncomeAmount = newIncomeAmountElem.value;
    incomeNew = incomeList.find(function(elem) {
        return elem.id === id;
    })
    incomeNew.name = newIncomeName;
    incomeNew.amount = newIncomeAmount;
    updateIncomeList();
    updateIncomeCounter();
    finalBalance();
    localStorage.setItem('incomeList',JSON.stringify(incomeList));
}

const updateIncomeList = () => {
    incomeUl.innerHTML = '';
    incomeList.forEach((income) => {
        let li = document.createElement('li');
        li.classList.add('list-group-item', 'flex-container', 'align-items-center', 'justify-content-between');
        li.id = `incomeContainer-${income.id}`;
        let main = document.createElement('main');
        let heading = document.createElement('h5');
        let paragraph = document.createElement('p');
        let buttonIncEdit  = document.createElement('button');
        buttonIncEdit.classList.add('btn', 'btn-secondary', 'btn-sm', 'button-change');
        buttonIncEdit.innerText = 'Zmień';
        buttonIncEdit.id = `buttonIncEdit-${income.id}`;
        buttonIncEdit.addEventListener('click', function() {
            onEditIncomeBtnClicked(income);
        });
        let buttonIncRemove = document.createElement('button');
        buttonIncRemove.classList.add('btn', 'btn-danger', 'btn-sm');
        buttonIncRemove.innerText = 'Usuń';
        buttonIncRemove.id = income.id;
        buttonIncRemove.addEventListener('click', onRemoveIncomeBtnClicked);
        heading.innerText = income.amount  + ' PLN';
        paragraph.innerText = income.name;
        main.appendChild(heading);
        main.appendChild(paragraph);
        li.appendChild(main);
        li.appendChild(buttonIncEdit);
        li.appendChild(buttonIncRemove);
        incomeUl.appendChild(li);
    })
}

expenditureForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let expenditureType = event.target.elements[0];
    let expenditureAmount = event.target.elements[1]; 
    let expenditure = {
        name: expenditureType.value, 
        amount: expenditureAmount.value,
        id: expenditureId
    }
    if (expenditureType.value.length > 2) {
        expenditureType.classList.remove('input-danger');
        expenditureTypeError.innerText = '';
    } 
    if (isNaN(expenditureAmount.value)==false) {
        expenditureAmount.classList.remove('input-danger');
        expenditureAmountError.innerText = '';
    }
    if (expenditureType.value.length > 2 && isNaN(expenditureAmount.value)==false) {
        expenditureId++;
        expenditureList.push(expenditure);
        localStorage.setItem('expenditureList',JSON.stringify(expenditureList));
        expenditureType.value = '';
        expenditureAmount.value = '';
        updateExpenditureList();
        updateExpenditureCounter();
        finalBalance();
    } else {
        if (expenditureType.value.length < 3) {
            expenditureType.classList.add('input-danger');
            expenditureTypeError.innerText = 'za krótki opis - min. 3 znaki!';
        } if (isNaN(expenditureAmount.value)==true) {
            expenditureAmount.classList.add('input-danger');
            expenditureAmountError.innerText = 'wprowadź kwotę';
        }
    }
})

function onRemoveExpenditureBtnClicked(event) {
    expenditureList = expenditureList.filter(function(elem) {
        return Number(elem.id) !== Number(event.target.id);
    })
    updateExpenditureList();
    updateExpenditureCounter();
    finalBalance();
    localStorage.setItem('expenditureList',JSON.stringify(expenditureList));
}

function onEditExpenditureBtnClicked(currentExpenditure) {
    const expenditureEditElem = document.getElementById(`expenditureContainer-${currentExpenditure.id}`);
    expenditureEditElem.innerHTML = `<input id='saveExpenditureName-${currentExpenditure.id}' value=${currentExpenditure.name}></input>
                                    <input id='saveExpenditureAmount-${currentExpenditure.id}' value=${currentExpenditure.amount}></input>
                                    <button onclick='onEditExpenditureDataSave(${currentExpenditure.id})'>Zapisz</button>`;
}

function onEditExpenditureDataSave(id) {
    let newExpenditureNameElem = document.getElementById(`saveExpenditureName-${id}`);
    let newExpenditureName  = newExpenditureNameElem.value;
    let newExpenditureAmountElem = document.getElementById(`saveExpenditureAmount-${id}`);
    let newExpenditureAmount = newExpenditureAmountElem.value;
    expenditureNew = expenditureList.find(function(elem) {
        return elem.id === id; 
    })
    expenditureNew.name = newExpenditureName;
    expenditureNew.amount = newExpenditureAmount;
    updateExpenditureList();
    updateExpenditureCounter();
    finalBalance();
    localStorage.setItem('expenditureList',JSON.stringify(expenditureList));
}

const updateExpenditureList = () => {
    expenditureUl.innerHTML = '';
    expenditureList.forEach((expenditure) => {
        let li = document.createElement('li');
        li.classList.add('list-group-item', 'justify-content-between', 'align-items-center');
        li.id = `expenditureContainer-${expenditure.id}`;
        let main = document.createElement('main');
        let heading = document.createElement('h5');
        let paragraph = document.createElement('p');
        let buttonExpEdit = document.createElement('button');
        buttonExpEdit.classList.add('btn', 'btn-secondary', 'btn-sm', 'button-change');
        buttonExpEdit.innerText = 'Zmień';
        buttonExpEdit.id = `buttonExpEdit-${expenditure.id}`;
        buttonExpEdit.addEventListener('click', function() {
            onEditExpenditureBtnClicked(expenditure);
        })
        let buttonExpRemove = document.createElement('button');
        buttonExpRemove.classList.add('btn', 'btn-danger', 'btn-sm');
        buttonExpRemove.innerText = 'Usuń';
        buttonExpRemove.id = expenditure.id;
        buttonExpRemove.addEventListener('click', onRemoveExpenditureBtnClicked);
        heading.innerText = expenditure.amount + ' PLN';
        paragraph.innerText = expenditure.name; 
        main.appendChild(heading);
        main.appendChild(paragraph);
        li.appendChild(main);
        li.appendChild(buttonExpEdit);
        li.appendChild(buttonExpRemove);
        expenditureUl.appendChild(li);
    })
}

function updateIncomeCounter(elem) {
    let incomeCounter=document.getElementById('incomeSummary');
    let sum = 0;
        incomeList.forEach(function(elem) { 
            sum += Number(elem.amount);
        })
        incomeCounter.innerText  =  sum + ' PLN';
        totalIncome = sum;
}

function updateExpenditureCounter(elem) {
    let expenditureCounter=document.getElementById('expenditureSummary');
    let sum2 = 0;
    expenditureList.forEach(function(elem) { 
        sum2 += Number(elem.amount);
    })
    expenditureCounter.innerText  =  sum2 + ' PLN';
    totalExpenses = sum2;
}

function finalBalance() {
    finalSum = totalIncome - totalExpenses;
    let finalBalanceField = document.getElementById('moneyCounter');
    finalBalanceField.innerText = '';
    if  (finalSum === 0) {
        finalBalanceField.innerText = 'Bilans wynosi zero';
    } else if (finalSum < 0 ) {
        finalBalanceField.innerText = `Bilans jest ujemny. Jesteś na minusie ${finalSum} PLN`;
    } else {
        finalBalanceField.innerText = `Możesz wydać jeszcze ${finalSum} PLN`;
    }
}

const getIncomeList = () => {
    if (localStorage.getItem('incomeList')) {
        incomeList = JSON.parse(localStorage.getItem('incomeList'));
        let maxIncomeId = 0;
        incomeList.map(function(obj){     
            if (obj.id > maxIncomeId) maxIncomeId = obj.id;    
        });
        incomeId = Number(maxIncomeId) +1;
        updateIncomeList();
        updateIncomeCounter()
        finalBalance() 
    } else {
        incomeList=[];
    }
}; 
getIncomeList();

const getExpenditureList = () => {
    if (localStorage.getItem('expenditureList')) {
        expenditureList = JSON.parse(localStorage.getItem('expenditureList'));
        let maxExpenditureId = 0;
        expenditureList.map(function(obj){     
            if (obj.id > maxExpenditureId) maxExpenditureId = obj.id;    
        });
        expenditureId = Number(maxExpenditureId) +1;
        updateExpenditureList();
        updateExpenditureCounter()
        finalBalance() 
    } else {
        expenditureList=[];
    } 
};
getExpenditureList();










