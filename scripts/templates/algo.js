// Fonction de tri des mots commençant par les lettres saisies dans la barre de recherche
const selectIngredient = document.querySelector('.dropdown_ingredients')
const selectAppliance = document.querySelector('.dropdown_appliance')
const selectUstensils = document.querySelector('.dropdown_ustensils')

// Dropdonw qui resteront sélectionnés
let ingredientTags = []
let ustensilTags = []
let applianceTags = []
let filterRecipes = []


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
    }

    console.log(filterRecipes)

    // Efface les cards
    const recipesContainer = document.querySelector(".recipes_cards")
    recipesContainer.innerHTML = ``

    // Efface les tags
    selectIngredient.innerHTML = ``
    selectAppliance.innerHTML = ``
    selectUstensils.innerHTML = ``

    // Affiche les nouvelles cards correspondant à la recherche
    displayRecipes(filterRecipes) 
}

// Appel de la fonction searchRecipes lorsqu'une touche est relâchée dans la barre de recherche
document.querySelector('#search').addEventListener('keyup', searchRecipes)


// Delete item from focusRecipes, focusAppliance or focusUstensils
function deletItem(tableau, valeur) {

    // Search index
    const index = tableau.indexOf(valeur)

    // Delete index
    tableau.splice(index, 1) 
    console.log("La valeur", valeur, "a été supprimée du tableau.")
}

// Element for focusConstruct
const div = document.createElement('div')

// Display select tag
function focusConstruct(focus) {
    const focusElement = document.querySelector('.recipes')
    div.innerHTML = ``
    focus.forEach((element) => 
        div.innerHTML += `
            ${element}
        `,
        focusElement.appendChild(div)
    )    
}

// Recherche dans les dropdowns
function searchDropdownRecipes() {
    console.log("<<<<<<<", this.value)
    
    // Push or delete item from focusRecipes
    if(!ingredientTags.includes(this.value)) {
        ingredientTags.push(this.value)
        focusConstruct(ingredientTags)
    } else {
        deletItem(ingredientTags, this.value)
        focusConstruct(ingredientTags)
    }
    // focusRecipes.forEach((element) =>
        // console.log(element)
    // )

    let tags = [...ustensilTags, ...applianceTags, ...ingredientTags];
    // Filtrer les mots commençant par la chaîne de recherche
    for ( i = 0 ; i < allRecipes.length; i++) {
        const recipe = allRecipes[i];
        if(filterRecipes.includes(recipe)) continue;
        let ingredients = recipe.ingredients;
        let temp = [...recipe.ustensils, recipe.appliance];
        // Lister les noms des ingrédients -> recipe.ingredients.map(item => item.ingredient)
        for (let h = 0; h < ingredients.length; h++) {
            temp.push(ingredients[h].ingredient);
        }

        let tagMatchCount = 0;
        // Boucle sur les tags sélectionnés
        for(let j = 0; j < tags.length; j++) {
            let tag = tags[j];
            console.log('>>>', tag)

            if (temp.includes(tag)) {
                tagMatchCount += 1;
            }
        }
        console.log(tagMatchCount, tags.length)
        if (tagMatchCount === tags.length) {
            filterRecipes.push(recipe);
        }

    }
    console.log(filterRecipes)

    // Efface les cards
    const recipesContainer = document.querySelector(".recipes_cards")
    recipesContainer.innerHTML = ``

    // Efface les tags
    selectIngredient.innerHTML = ``
    selectAppliance.innerHTML = ``
    selectUstensils.innerHTML = ``

    // Affiche les nouvelles cards correspondant à la recherche
    displayRecipes(filterRecipes)
}

// Appel de la fonction searchDropdown lors d'un clique
selectIngredient.addEventListener('change', searchDropdownRecipes)

// Recherche dans les dropdowns
function searchDropdownAppliance() {
    console.log("<<<<<<<", this.value)
    
    let filterRecipes = []
    
    // Filtrer les mots commençant par la chaîne de recherche
    for ( i = 0 ; i < allRecipes.length; i++) {
        let appliance = allRecipes[i].appliance
        
        if(appliance.toLowerCase() === this.value) {
            console.log(allRecipes[i])
            filterRecipes.push(allRecipes[i])
        }
        
    }
    console.log(filterRecipes)

    // Efface les cards
    const recipesContainer = document.querySelector(".recipes_cards")
    recipesContainer.innerHTML = ``

    // Efface les tags
    selectIngredient.innerHTML = ``
    selectAppliance.innerHTML = ``
    selectUstensils.innerHTML = ``

    // Affiche les nouvelles cards correspondant à la recherche
    displayRecipes(filterRecipes)
}

// Appel de la fonction searchDropdown lors d'un clique
selectAppliance.addEventListener('change', searchDropdownAppliance)

// Recherche dans les dropdowns
function searchDropdownUstensils() {
    console.log("<<<<<<<", this.value)
    
    let filterRecipes = []
    
    // Filtrer les mots commençant par la chaîne de recherche
    for ( i = 0 ; i < allRecipes.length; i++) {
        let ustensils = allRecipes[i].ustensils

        for(let j = 0; j < ustensils.length; j++) {
            if(ustensils[j].toLowerCase() === this.value) {
                filterRecipes.push(allRecipes[i])
            }  
        }  
    }

    // Efface les cards
    const recipesContainer = document.querySelector(".recipes_cards")
    recipesContainer.innerHTML = ``

    // Efface les tags
    selectIngredient.innerHTML = ``
    selectAppliance.innerHTML = ``
    selectUstensils.innerHTML = ``

    // Affiche les nouvelles cards correspondant à la recherche
    displayRecipes(filterRecipes)
}

// Appel de la fonction searchDropdown lors d'un clique
selectUstensils.addEventListener('change', searchDropdownUstensils)