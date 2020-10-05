let incomeUl;
let expenditureUl;
let incomeForm;
let expenditureForm;
let incomeList = [];
let expenditureList = [];
let income;
let expenditure;
let incomeId = 0;
let expenditureId = 0;
let sum;
let sum2;
let finalSum = 0;



document.addEventListener('DOMContentLoaded', () => {
    incomeUl = document.getElementById('incomeList');
    expenditureUl = document.getElementById('expenditureList');
    incomeForm = document.getElementById('incomeForm');
    expenditureForm = document.getElementById('expenditureForm');
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
        incomeId++;

        if (incomeType.value.length > 2) {
            incomeType.classList.remove('input-danger');
            incomeTypeError.innerText = "";
        } 

        if (isNaN(incomeAmount.value)==false) {
            incomeAmount.classList.remove('input-danger');
            incomeAmountError.innerText = "";
        } 
    
        if (incomeType.value.length > 2 && isNaN(incomeAmount.value)==false) {
            
            incomeList.push(income);
            localStorage.setItem('incomeList',JSON.stringify(incomeList));
            incomeType.value = "";
            incomeAmount.value = "";

            updateIncomeList();
            updateIncomeCounter()
            finalBalance();
        
        } else {
            if (incomeType.value.length < 3) {
                incomeType.classList.add('input-danger')
                incomeTypeError.innerText = "Description is too short - min. 3 letters!";
            } if (isNaN(incomeAmount.value)==true)  {
            incomeAmount.classList.add('input-danger')
            incomeAmountError.innerText = "digits only";
            }
        }
    })

    function onRemoveIncomeBtnClicked(event){
        incomeList = incomeList.filter(function(elem){
            return Number(elem.id) !== Number(event.target.id);
        })
        updateIncomeList();
        updateIncomeCounter()
        finalBalance()
    }

    function onEditIncomeBtnClicked(currentIncome){
        const incomeEditElem = document.getElementById(`container-${currentIncome.id}`);
        incomeEditElem.innerHTML = `<input id='saveName-${currentIncome.id}' value=${currentIncome.name}></input><input id='saveAmount-${currentIncome.id}' value=${currentIncome.amount}></input>
        <button onclick='onEditIncomeDataSave(${currentIncome.id})'>Zapisz</button>`;
    }


    function onEditIncomeDataSave(id){
        let newIncomeNameElem = document.getElementById(`saveName-${id}`);
        let newIncomeName  = newIncomeNameElem.value;
        let newIncomeAmountElem = document.getElementById(`saveAmount-${id}`);
        let newIncomeAmount = newIncomeAmountElem.value;

        incomeNew = incomeList.find(function(elem){
            return elem.id === id;
        })
        
        incomeNew.name = newIncomeName;
        incomeNew.amount = newIncomeAmount;
        
        updateIncomeList();
        updateIncomeCounter()
        finalBalance()
    
        console.log(newIncomeName);
        console.log(newIncomeAmount);
    }
    
    const updateIncomeList = () => {

        incomeUl.innerHTML = "";
    
        incomeList.forEach((income) => {
            let li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'flex-container');
            li.id = `container-${income.id}`;
    
            let main = document.createElement('main');
            let heading = document.createElement('h5');
            let paragraph = document.createElement('p');

            let buttonEdit  = document.createElement('button');
            buttonEdit.classList.add('btn', 'btn-secondary', 'btn-sm', 'button-change');
            buttonEdit.innerText = "Change";
            buttonEdit.id = `buttonEdit-${income.id}`;
            buttonEdit.addEventListener('click', function(){
                onEditIncomeBtnClicked(income)
            });
    
            let buttonRemove = document.createElement('button');
            buttonRemove.classList.add('btn', 'btn-danger', 'btn-sm')
            buttonRemove.innerText = "Remove";
            buttonRemove.id = income.id;
            buttonRemove.addEventListener('click', onRemoveIncomeBtnClicked);
           
            heading.innerText = income.amount  + ' PLN';
            paragraph.innerText = income.name;
    
            main.appendChild(heading);
            main.appendChild(paragraph);
    
            li.appendChild(main);
            li.appendChild(buttonEdit);
            li.appendChild(buttonRemove);
    
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
        expenditureId++;

        if (expenditureType.value.length > 2) {
            expenditureType.classList.remove('input-danger');
            expenditureTypeError.innerText = "";
        } 

        if (isNaN(expenditureAmount.value)==false) {
            expenditureAmount.classList.remove('input-danger');
            expenditureAmountError.innerText = "";
        }
    
        if (expenditureType.value.length > 2 && isNaN(expenditureAmount.value)==false) {
            expenditure = {
                name: expenditureType.value, 
                amount: expenditureAmount.value,
                id: expenditureId
            }

            expenditureList.push(expenditure);
            localStorage.setItem('expenditureList',JSON.stringify(expenditureList));
            expenditureType.value = "";
            expenditureAmount.value = "";

            updateExpenditureList();
            updateExpenditureCounter() 
            finalBalance();
        
        
        } else {
            if (expenditureType.value.length < 3) {
                expenditureType.classList.add('input-danger')
                expenditureTypeError.innerText = "Description is too short - min. 3 letters!";
            } if (isNaN(expenditureAmount.value)==true)  {
                expenditureAmount.classList.add('input-danger')
                expenditureAmountError.innerText = "digits only";
            }
        }
    })
    
    function onRemoveExpenditureBtnClicked(event){
        expenditureList = expenditureList.filter(function(elem){
            return Number(elem.id) !== Number(event.target.id);
        })
        updateExpenditureList();
        updateExpenditureCounter()
        finalBalance()
    }

    function onEditExpenditureBtnClicked(currentExpenditure){
        const expenditureEditElem = document.getElementById(`container-${currentExpenditure.id}`);
        expenditureEditElem.innerHTML = `<input id='saveName-${currentExpenditure.id}' value=${currentExpenditure.name}></input>
        <input id='saveAmount-${currentExpenditure.id}' value=${currentExpenditure.amount}></input>
        <button onclick='onEditExpenditureDataSave(${currentExpenditure.id})'>Zapisz</button>`;
    }


    function onEditExpenditureDataSave(id){
        let newExpenditureNameElem = document.getElementById(`saveName-${id}`);
        let newExpenditureName  = newExpenditureNameElem.value;
        let newExpenditureAmountElem = document.getElementById(`saveAmount-${id}`);
        let newExpenditureAmount = newExpenditureAmountElem.value;

        incomeNew = incomeList.find(function(elem){
            return elem.id === id;
        })
        expenditureNew.name = newExpenditureName;
        expenditureNew.amount = newExpenditureAmount;

        updateExpenditureList();
        updateExpenditureCounter()
        finalBalance()
    }
   

    const updateExpenditureList = () => {
        expenditureUl.innerHTML = "";
    
        expenditureList.forEach((expenditure) => {
            
            let li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            li.id = `container-${expenditure.id}`;
           
            let main = document.createElement('main');
            let heading = document.createElement('h5');
            let paragraph = document.createElement('p');
            let buttonEdit = document.createElement('button');
            buttonEdit.classList.add('btn', 'btn-secondary', 'btn-sm', 'button-change')
            buttonEdit.innerText = "Change";
            buttonEdit.id = `buttonEdit-${expenditure.id}`;
            buttonEdit.addEventListener('click', function(){
                onEditExpenditureBtnClicked(expenditure)
            })
            
            let buttonRemove = document.createElement('button');
            buttonRemove.classList.add('btn', 'btn-danger', 'btn-sm')
            buttonRemove.innerText = "Remove";
            buttonRemove.id = expenditure.id;
            buttonRemove.addEventListener('click', function(){
                onRemoveExpenditureBtnClicked(income)
            });

            heading.innerText = expenditure.amount + ' PLN';
            paragraph.innerText = expenditure.name; 
    
            main.appendChild(heading);
            main.appendChild(paragraph);
    
            li.appendChild(main);
            li.appendChild(buttonEdit);
            li.appendChild(buttonRemove);
    
            expenditureUl.appendChild(li);
        })
    }
})

function updateIncomeCounter(elem) {
    let incomeCounter=document.getElementById('incomeSummary');
    sum = 0
        incomeList.filter(function(elem){ 
            sum += Number(elem.amount);
        })
        incomeCounter.innerText  =  sum + ' PLN';
    return sum       
}

function updateExpenditureCounter(elem) {
    let expenditureCounter=document.getElementById('expenditureSummary');
    sum2 = 0
        expenditureList.filter(function(elem){ 
            sum2 += Number(elem.amount);
        })
        expenditureCounter.innerText  =  sum2 + ' PLN';
    return sum2      
}

function finalBalance() {
        finalSum = sum - sum2;
        let finalBalanceField = document.getElementById('moneyCounter')
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
    if (localStorage.getItem('incomeList')){
        incomeList = JSON.parse(localStorage.getItem('incomeList'));
        updateIncomeList();
    } else {
        incomeList=[];
    }
};

const getExpenditureList = () => {
    if (localStorage.getItem('expenditureList')){
        expenditureList = JSON.parse(localStorage.getItem('expenditureList'));
        updateExpenditureList();
    } else {
        expenditureList=[];
    } 
};