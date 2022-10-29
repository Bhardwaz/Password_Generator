const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', () => {
    const textArea = document.createElement("textarea");
    const password = resultEl.innerText;
    if(!password) {return};
    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
    alert("Password is copied to clipboard");
})

generateEl.addEventListener('click', () => {
    const isUppercaseChecked = uppercaseEl.checked;
    const isLowercaseChecked = lowercaseEl.checked;
    const isNumbersChecked = numbersEl.checked;
    const isSymbolsChecked = symbolsEl.checked;
    const length = Number(lengthEl.value);
    resultEl.innerText = generatePassword(isLowercaseChecked,isUppercaseChecked,isNumbersChecked,isSymbolsChecked,length);
})

function generatePassword(lower, upper, number, symbol, length) {
    let yourPassword = "";
    const typesChecked = lower + upper + number + symbol;
    const typesCheckedArr = [{lower},{upper},{number},{symbol}].filter(item => Object.values(item)[0]); 
    if(typesChecked === 0){
        return "";
    };
    for(let i = 0 ; i < length ; i = i + 1){
        typesCheckedArr.forEach((func) => {
            const funcName = Object.keys(func)[0];
            yourPassword += randomFunc[funcName]();
        })
    }
    const finalPassword = yourPassword.slice(0,length);
    return finalPassword;  
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random()*26) + 97 );
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() *26 ) + 65 );
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10 ) + 48 );
}

function getRandomSymbol() {
    const symbols = "!@#$%^&*():;<>.?/{}[]";
    return symbols[Math.floor(Math.random()* symbols.length)];
}