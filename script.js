const body = document.body
const btn = document.createElement('button')


const pokeForm = document.getElementById('poke-form')

pokeForm.addEventListener('submit', async(e) => {
    e.preventDefault()
    const pokeName = getPokeName()
    const data = await pokeApiCall(pokeName)
    const pokeData = parsePokeData(data)
    makePokeCard(pokeData)
})

function getPokeName() {
    const pokeField = document.querySelector('#poke-field')
    return pokeField.value
}

async function pokeApiCall(pokeName) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
    if (res.ok) {
        return await res.json()
        
    }
}

function parsePokeData(pokeData) {
    return {
        name: pokeData.name,
        weight: pokeData.weight,
        abilities: pokeData.abilities,
        imgUrl: pokeData.sprites.front_default
    }

}

function makePokeCard({ name, weight, abilities, imgUrl }) {
    const pokeCard = document.createElement('div')
    const pokeHeader = document.createElement('h3')
    const abilitiesContainer = document.createElement('ul')
    const weightP = document.createElement('p')
    const pokeImg = document.createElement('img')


    pokeHeader.innerText = titleCase(name)

    for (const ability of abilities) {
        const abilityLi = document.createElement('li')
        abilityLi.innerText = ability.ability.name
        abilitiesContainer.appendChild(abilityLi)
    }

    weightP.innerText = weight

    pokeImg.src =  imgUrl

    pokeCard.append(pokeHeader,abilitiesContainer,weightP, pokeImg)

    pokeCard.addEventListener('click', () => {
        pokeCard.remove()
    })

    body.append(pokeCard)
}