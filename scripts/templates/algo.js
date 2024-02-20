// Fonction de tri des mots commençant par les lettres saisies dans la barre de recherche
const selectIngredient = document.querySelector('.dropdown_ingredients')
function searchRecipes() {
    // Récupérer la valeur saisie dans la barre de recherche
    let searchWord = document.querySelector('#search').value.trim().toLowerCase()

    // console.log(searchWord, allRecipes)
    
    // Vérifier si la saisie est valide (au moins 3 caractères)
    if (searchWord.length < 2) {
        console.log("Veuillez saisir au moins 3 caractères.")
        return
    }

    let filterRecipes = []
    
    // Filtrer les mots commençant par la chaîne de recherche
    for ( i = 0 ; i < allRecipes.length; i++) {
        let {name} = allRecipes[i]
        if(name.toLowerCase().includes(searchWord)) {
            filterRecipes.push(allRecipes[i])
        }
        // let {appliance} = allRecipes[i]
        // if(appliance.toLowerCase().includes(searchWord)) {
        //     filterRecipes.push(allRecipes[i])
        // }
        // let ustensils = allRecipes[i].ustensils
        // ustensils.forEach(element => {
        //     console.log(element)
        //     if(element.toLowerCase().includes(searchWord)) {
        //     filterRecipes.push(element)
        //     }
        // })
        
        // for(let j = 0; j <allRecipes[i].ingredients.length; j++) {
        //     let ingredients = allRecipes[i].ingredients[j].ingredient
        //     console.log(ingredients)
        //     if(ingredients.toLowerCase().includes(searchWord)) {
        //         filterRecipes.push(allRecipes[i].ingredients[j].ingredient)
        //     }
        // }
    }

    console.log(filterRecipes)

    // Efface les cards
    const recipesContainer = document.querySelector(".recipes_cards")
    recipesContainer.innerHTML = ``

    // Efface les tags
    selectIngredient.innerHTML = ``

    // Affiche les nouvelles cards correspondant à la recherche
    displayRecipes(filterRecipes) 
}

// Appel de la fonction searchRecipes lorsqu'une touche est relâchée dans la barre de recherche
document.querySelector('#search').addEventListener('keyup', searchRecipes)

// Recherche dans les dropdowns
function searchDropdown() {
    console.log("<<<<<<<", this.value)
    
    let filterRecipes = []
    
    // Filtrer les mots commençant par la chaîne de recherche
    for ( i = 0 ; i < allRecipes.length; i++) {
        for(let j = 0; j <allRecipes[i].ingredients.length; j++) {
            let ingredients = allRecipes[i].ingredients[j].ingredient
            if(ingredients.includes(this.value)) {
                filterRecipes.push(allRecipes[i])
            }
        }
    }
    console.log(filterRecipes)

    // Efface les cards
    const recipesContainer = document.querySelector(".recipes_cards")
    recipesContainer.innerHTML = ``

    // Efface les tags
    selectIngredient.innerHTML = ``

    // Affiche les nouvelles cards correspondant à la recherche
    displayRecipes(filterRecipes)
}

// Appel de la fonction searchDropdown lors d'un clique
console.log(selectIngredient)
selectIngredient.addEventListener('change', searchDropdown)