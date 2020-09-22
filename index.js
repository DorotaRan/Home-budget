let incomeUl;
let expenditureUl;
let incomeForm;
let expenditureForm;
let incomeList = [];
let expenditureList = [];
let IncTotal;
let ExpTotal;
let balansSummary;
let income;
let expenditure;
let lastId = 0;


document.addEventListener('DOMContentLoaded', () => {
    incomeUl = document.getElementById('incomeList');
    expenditureUl = document.getElementById('expenditureList');
    incomeForm = document.getElementById('incomeForm');
    expenditureForm = document.getElementById('expenditureForm');
    let incomeTypeError = document.getElementById('incomeTypeError');
    let incomeDescError = document.getElementById('incomeDescError');
    let expenditureTypeError = document.getElementById('expenditureTypeError');
    let expenditureDescError = document.getElementById('expenditureDescError');

    getIncomeList();
    getExpenditureList();
    // onRemoveIncomeBtnClick();
    // onRemoveExpenditureBtnClick();

    incomeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let incomeType = event.target.elements[0];
        let incomeDesc = event.target.elements[1];

        if (incomeType.value.length > 2) {
            incomeType.classList.remove('input-danger');
            incomeTypeError.innerText = "";
        } 

        if (isNaN(incomeDesc.value)==false) {
            incomeDesc.classList.remove('input-danger');
            incomeDescError.innerText = "";
        } 
    
        if (incomeType.value.length > 2 && isNaN(incomeDesc.value)==false) {
            income = {
                name: incomeType.value, 
                desc: incomeDesc.value,
                id: lastId
            }
            incomeList.push(income);
            localStorage.setItem('incomeList',JSON.stringify(incomeList));
            incomeType.value = "";
            incomeDesc.value = "";

            updateIncomeList();
        
        } else {
            if (incomeType.value.length < 3) {
                incomeType.classList.add('input-danger')
                incomeTypeError.innerText = "description is too short - min. 3 letters!";
            } if (isNaN(incomeDesc.value)==true)  {
            incomeDesc.classList.add('input-danger')
            incomeDescError.innerText = "digits only";
            }
        } 
    }); 


    expenditureForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let expenditureType = event.target.elements[0];
        let expenditureDesc = event.target.elements[1];

        if (expenditureType.value.length > 2) {
            expenditureType.classList.remove('input-danger');
            expenditureTypeError.innerText = "";
        } 

        if (isNaN(expenditureDesc.value)==false) {
            expenditureDesc.classList.remove('input-danger');
            expenditureDescError.innerText = "";
        }
    
        if (expenditureType.value.length > 2 && isNaN(expenditureDesc.value)==false) {
            expenditure = {
                name: expenditureType.value, 
                desc: expenditureDesc.value,
                id: lastId
            }

            expenditureList.push(expenditure);
            localStorage.setItem('expenditureList',JSON.stringify(expenditureList));
            expenditureType.value = "";
            expenditureDesc.value = "";

            updateExpenditureList();
        
        } else {
            if (expenditureType.value.length < 3) {
                expenditureType.classList.add('input-danger')
                expenditureTypeError.innerText = "description is too short - min. 3 letters!";
            } if (isNaN(expenditureDesc.value)==true)  {
                expenditureDesc.classList.add('input-danger')
                expenditureDescError.innerText = "digits only";
            }
        }
    })
})

const updateIncomeList = () => {

    incomeUl.innerHTML = "";

    incomeList.forEach((incomeItem, index) => {
        let li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'flex-container');

        let main = document.createElement('main');
        let heading = document.createElement('h5');
        let paragraph = document.createElement('p');
        let editBtn  = document.createElement('button');
        editBtn.classList.add('btn', 'btn-secondary', 'btn-sm', 'button-change')
        editBtn.innerText = "Change";
        // editBtn.id = `editbtn-${income.id}`;
        // editBtn.addEventListener('click', function(){
        //     onEditIncomeBtnClickon(income);
        // });

        let buttonRemove = document.createElement('button');
        buttonRemove.classList.add('btn', 'btn-danger', 'btn-sm')
        buttonRemove.innerText = "Remove";
        // buttonRemove.id = income.id;
        // buttonRemove.addEventListener('click', function() {
            // onRemoveIncomeBtnClick()
        // });
            
        heading.innerText = incomeItem.desc  + ' PLN';
        paragraph.innerText = incomeItem.name;

        main.appendChild(heading);
        main.appendChild(paragraph);

        li.appendChild(main);
        // li.appendChild(buttonChange);
        li.appendChild(buttonRemove);

        incomeUl.appendChild(li);
        let incomeSummary = document.getElementById('incomeSummary');
        incomeSummary.innerText = "test"
    });
}

const updateExpenditureList = () => {
    expenditureUl.innerHTML = "";

    expenditureList.forEach((expenditureItem, index) => {
        let li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
       
        let main = document.createElement('main');
        let heading = document.createElement('h5');
        let paragraph = document.createElement('p');
        let editBtn  = document.createElement('button');
        editBtn.classList.add('btn', 'btn-secondary', 'btn-sm', 'button-change')
        editBtn.innerText = "Change";
        // editBtn.id = `editbtn-${expenditure.id}`;
        // editBtn.addEventListener('click', function(){
        //     onEditExpenditureBtnClickon(income);
        // });
        
        let buttonRemove = document.createElement('button');
        buttonRemove.classList.add('btn', 'btn-danger', 'btn-sm')
        buttonRemove.innerText = "Remove";
        // buttonRemove.id = expenditure.id;
        // buttonRemove.addEventListener('click', function(){
            // onRemoveExpenditureBtnClick);
        // });

        heading.innerText = expenditureItem.desc + ' PLN';
        paragraph.innerText = expenditureItem.name; 

        main.appendChild(heading);
        main.appendChild(paragraph);

        li.appendChild(main);
        // li.appendChild(buttonChange);
        li.appendChild(buttonRemove);

        expenditureUl.appendChild(li);
        let expenditureSummary = document.getElementById('expenditureSummary');
        expenditureSummary.innerText = "test"
    })
};

const updateMoneyBalance = () => {
        let moneyBalanceCounter = document.getElementById('moneyCounter');
        moneyCounter.innerText = "test"
};



// const onRemoveIncomeBtnClick = (event) => {
//     lastId++;
//     incomeList.push(income);
//     incomeList = incomeList.filter(function(elem){
//         return elem.id !==Number(event.target.id);
//     });
//         updateIncomeList();
// }

// const onRemoveExpenditureBtnClick = (event) => {
//     lastId++;
//     expenditureList.push(expenditure);
//     expenditureList = expenditureList.filter(function(elem){
//         return elem.id !==Number(event.target.id);
//     });
//         updateExpenditureList();
// }

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