function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json()) //funcao anonima que retorna valor
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.false = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = false

    fetch(url)
        .then(res => res.json()) //funcao anonima que retorna valor
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false

        })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// itens de coleta
// pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {

    const itemLi = event.target

    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // console.log("ITEM ID: ", itemId)

    // verificar se existem itens selecionados. Se sim, pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId //isso será true ou falso
        return itemFound
    })

    // se já estiver seleciondo, tirar da selecao
    if (alreadySelected >= 0) {
        // tirar da selecao
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
        return itemIsDifferent
        })

        selectedItems = filteredItems
    }
    else{
        // se nao estiver selecionado, adicionar a selecao
        selectedItems.push(itemId)
    }

    // console.log("selectedItems: ", selectedItems)
    
    // atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems
}