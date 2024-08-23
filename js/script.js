const pokemonName= document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')
const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const next = document.querySelector('.btn-next')
const prev = document.querySelector('.btn-prev')

let searchPokemon = 1

const fetchPokemon= async (pokemon)=>{
    {/*async - indica que essa função é assíncrona. Isso significa que ela pode conter operações que podem levar algum tempo para serem concluídas (como chamadas de API) e que podemos usar await dentro dela. */}
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    {/*await-  pausa a execução da função assíncrona até que a promessa (promise) retornada pela operação fetch seja resolvida. Isso significa que o código a seguir só será executado após a resposta da API ser recebida.*/}
    if(APIResponse.status ===200){
        const data = await APIResponse.json()
        return data
    }

}
const renderPokemon=async (pokemon) =>{
    pokemonImage.style.display = 'none'
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''
    const data =  await fetchPokemon(pokemon)
    if(data){
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value=''
        searchPokemon = data.id
    }else{
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not found!'
        pokemonNumber.innerHTML = ''
    }
}


form.addEventListener('submit',(e)=>{
    e.preventDefault()
    renderPokemon(input.value.toLowerCase())
    
})
renderPokemon('1')

prev.addEventListener('click',()=>{
    if(searchPokemon >1){
        searchPokemon -=1
        renderPokemon(searchPokemon)
    }
    
})
next.addEventListener('click',()=>{
    searchPokemon +=1
    renderPokemon(searchPokemon)
})