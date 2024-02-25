const resultEl = document.querySelector('.result')
const lengthEl = document.querySelector('.length')
const uppercaseEl = document.querySelector('.uppercase')
const lowercaseEl = document.querySelector('.lowercase')
const numbersEl = document.querySelector('.numbers')
const symbolsEl = document.querySelector('.symbols')
const generateEl = document.getElementById('generate')
const clipboard = document.getElementById('clipboard')

const getRandomLower = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

const getRandomUpper = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}
const getRandomNumber = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

const getRandomSymbol = () => {
    const symbols = '!@#%^&*(){}[]=<>,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}

const randomise = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
}

clipboard.onclick = () => {
    const textArea = document.createElement('textarea')
    const password = resultEl.innerText

    if (!password) return alert('Invalid request')

    textArea.value = password
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    textArea.remove()
    alert('Password copied to Clipboard')
}

generateEl.onclick = () => {
    const length = +lengthEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked
    resultEl.innerHTML = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
}

const generatePassword = (lower, upper, number, symbol, length) => {
    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol
    const typesArray = [
        { lower },
        { upper },
        { number },
        { symbol }
    ].filter((item) => Object.values(item)[0])
    if (typesCount == 0) return alert('No Selected Value')
    for (let i = 0; i < length; i += typesCount) {
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomise[funcName]()
        })
    }
    const finalPassword = generatedPassword.slice(0, length)
    return finalPassword
}
