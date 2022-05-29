const $template = document.getElementById("template").content,
    $fragment = document.createDocumentFragment(),
    amounts = []


const getDataAmounts = async() => {
    const res = await fetch('./data.json')
    const dataAmount = await res.json()

    // loop each amount from data.json
    dataAmount.forEach(el => {
        amounts.push(el.amount)
    })

    // it show max amount(value) from json data 
    const maxAmount = Math.max(...amounts)

    dataAmount.forEach(el => {
        $template.querySelector(".amount-day").textContent = `$${el.amount.toFixed(2)}`;

        $template.querySelector(".bar-day").style.height = `${(120/maxAmount)*el.amount}px`;

        $template.querySelector(".day").textContent = `${el.day}`

        $clone = $template.cloneNode(true)
        if (el.amount === maxAmount) $clone.querySelector(".bar-day").classList.add('isMaxAmount')
        $fragment.appendChild($clone)
    })
    document.getElementById("bar-chart").appendChild($fragment)
}
getDataAmounts()