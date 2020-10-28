//DOM Elements
const displayEl = document.querySelector('.display')

//Functions
const acEl = document.querySelector('.ac')
const pmEl = document.querySelector('.pm')
const percentEl = document.querySelector('.percent')

//Operators
const divisionEl = document.querySelector('.division')
const multiplicationEl = document.querySelector('.multiplication')
const subtractionEl = document.querySelector('.subtraction')
const additionEl = document.querySelector('.addition')
const equalsEl = document.querySelector('.equal')


//Numbers
const decimalEl = document.querySelector('.decimal')
const number7El = document.querySelector('.number-7')
const number8El = document.querySelector('.number-8')
const number9El = document.querySelector('.number-9')
const number4El = document.querySelector('.number-4')
const number5El = document.querySelector('.number-5')
const number6El = document.querySelector('.number-6')
const number1El = document.querySelector('.number-1')
const number2El = document.querySelector('.number-2')
const number3El = document.querySelector('.number-3')
const number0El = document.querySelector('.number-0')


const numberElArray = [number0El ,number1El,number2El,
                        number3El,number4El,number5El,
                        number6El,number7El,number8El,
                        number9El]




//variables
let valueStringInMemory
let operatorInMemory


//Functions 

const getDisplayAsStr = ()=> displayEl.textContent.split(',').join('')

const getDisplayAsNum = ()=> parseFloat(getDisplayAsStr())

const setStringAsDisplay = (str)=>{  
    if (str[str.length -1]=='.'){
            displayEl.textContent+='.'
            return;
        }
        const [integerStr , floatStr ] = str.split('.')
        if(floatStr){
            displayEl.textContent = parseFloat(integerStr).toLocaleString().toString()+'.'+ floatStr
        } else {
            displayEl.textContent = parseFloat(integerStr).toLocaleString()
        }
        if (displayEl.textContent.length < 6){
            displayEl.style.fontSize = '5rem'
        }
        if(displayEl.textContent.length >= 6 && displayEl.textContent.length < 10){
            displayEl.style.fontSize = '4rem'
        } else if (displayEl.textContent.length >= 10){
            displayEl.style.fontSize = '2.5rem'
        }        
       
}
const handleNumberClick = (numStr) =>{
    if(getDisplayAsStr() == '0') {
        setStringAsDisplay(numStr)
    } else {
        setStringAsDisplay(getDisplayAsStr()+numStr)
    } 
}

const handleOperatorClick =(operation)=>{


    if (!valueStringInMemory){
        operatorInMemory = operation
        valueStringInMemory = getDisplayAsStr()
        setStringAsDisplay('0')
        return;
    } 

    valueStringInMemory = getResultAsStr()
    operatorInMemory = operation
    setStringAsDisplay('0')
}

function getResultAsStr(){
    const currentValueNum = getDisplayAsNum()
    const valueNumInMemory =  parseFloat(valueStringInMemory)
    let newValueNum 
    if (operatorInMemory == 'addition'){
        newValueNum = valueNumInMemory + currentValueNum
    } else if (operatorInMemory == 'multiplication'){
        newValueNum = valueNumInMemory * currentValueNum
    }else if (operatorInMemory == 'subtraction'){
        newValueNum = valueNumInMemory - currentValueNum
    }else if (operatorInMemory == 'division'){
        newValueNum = valueNumInMemory / currentValueNum
    }

    return newValueNum.toString()
}


//Add Event Listeners To Functions

acEl.addEventListener('click', ()=>{
    setStringAsDisplay('0')
    valueStringInMemory = null
    operatorInMemory = null
})

pmEl.addEventListener('click',()=>{
    if(getDisplayAsStr()=='-0'){setStringAsDisplay('0')}
   else if (getDisplayAsNum()>= 0){ 
       setStringAsDisplay('-' + getDisplayAsStr())
    }
   else {
      setStringAsDisplay(getDisplayAsStr().slice(1)) 
   }
   valueStringInMemory = null
   operatorInMemory = null
})


percentEl.addEventListener('click', ()=>{
    setStringAsDisplay((getDisplayAsNum()/100).toString())
    valueStringInMemory = null;
    operatorInMemory = null;

})
////Add Event Listeners To Operators
additionEl.addEventListener('click', ()=>{
    handleOperatorClick('addition')
})
subtractionEl.addEventListener('click', ()=>{
    handleOperatorClick('subtraction')
})
multiplicationEl.addEventListener('click', ()=>{
    handleOperatorClick('multiplication')
})
divisionEl.addEventListener('click', ()=>{
    handleOperatorClick('division')
})
equalsEl.addEventListener('click', ()=>{
  equalsOperation()
})

function equalsOperation() {
    if(valueStringInMemory){
        setStringAsDisplay(getResultAsStr())
        valueStringInMemory = null
        operatorInMemory = null
     }
}

//Add Event Listener To Numbers And Decimal
numberElArray.forEach(number =>{
    number.addEventListener('click',()=>{
        handleNumberClick(number.textContent)
    })
})

decimalEl.addEventListener('click',()=>{   
   decimalInput()
})


function decimalInput() {
    if (!getDisplayAsStr().includes('.')){
        setStringAsDisplay(getDisplayAsStr()+'.')
    }  
}


//Keyboard Section


window.addEventListener('keydown',(e)=>{
    const {keyCode}=e

    switch (keyCode) {
        //Numbers
        case 48:
        handleNumberClick('0')
        break;
        case 49:
        handleNumberClick('1')
        break;
        case 50:
        handleNumberClick('2')
        break;
        case 51:
        handleNumberClick('3')
        break;
        case 52:
        handleNumberClick('4')
        break;
        case 53:
        handleNumberClick('5')
        break;
        case 54:
        handleNumberClick('6')
        break;
        case 55:
        handleNumberClick('7')
        break;
        case 56:
        handleNumberClick('8')
        break;
        case 57:
        handleNumberClick('9')
        break;
       case 190:
        decimalInput()
        break;

        //Operations
        case 107:
        handleOperatorClick('addition')
        break;
        case 109:
        handleOperatorClick('subtraction')
        break;
        case 106:
        handleOperatorClick('multiplication')
        break;
        case 111:
        handleOperatorClick('division')
        break;
        case 187:
        equalsOperation()
        break;

        
    }

    
})

