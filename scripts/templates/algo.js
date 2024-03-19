// Fonction de tri des mots commençant par les lettres saisies dans la barre de recherche
const selectIngredient = document.querySelector('.dropdown_ingredients')
const selectAppliance = document.querySelector('.dropdown_appliance')
const selectUstensils = document.querySelector('.dropdown_ustensils')

// Dropdonw qui resteront sélectionnés
let ingredientTags = []
let ustensilTags = []
let applianceTags = []
let filterRecipes = []

const clearRecipes = () => {

    // Efface les cards
    const recipesContainer = document.querySelector(".recipes_cards")
    recipesContainer.innerHTML = ``

    // Efface les tags
    selectIngredient.innerHTML = ``
    selectAppliance.innerHTML = ``
    selectUstensils.innerHTML = ``
}

function searchRecipes() {
    // Récupérer la valeur saisie dans la barre de recherche
    const searchWord = document.querySelector('#search').value.trim().toLowerCase()

    // console.log(searchWord, allRecipes)
    

    if (searchWord.length === 0) {
            clearRecipes()
            displayRecipes(allRecipes)
            return
    }

    // Vérifier si la saisie est valide (au moins 3 caractères)
    if (searchWord.length < 2) {
        console.log("Veuillez saisir au moins 3 caractères.")
        return
    }
    
    // Filtrer les mots contenant la chaîne de caractère
    let fileredRecipesByWord = filterBy(allRecipes, searchWord, ["name", "description", "ingredients", "ustensils", "appliance"]);

    clearRecipes()
    
    // Affiche les nouvelles cards correspondant à la recherche
    displayRecipes(fileredRecipesByWord) 
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

// document.querySelector('.focus_ingredients').addEventListener('click', console.log(ingredientTags))
// document.querySelector('.focus_ingredients').addEventListener('click', deletItem(ingredientTags, this.value))

// Element for focusConstruct
const divIngredient = document.createElement('div')
divIngredient.className = "focus_ingredients"
// div.innerHTML = `Remplissage`
// focusElement.appendChild(div)

// Display select tag ingredient
function focusConstruct(focus) {
    const focusElementIngredient = document.querySelector('.select_ingredients')
    divIngredient.innerHTML = ``
    focus.forEach((element) => 
        divIngredient.innerHTML += `
            ${element}
        `,
        focusElementIngredient.appendChild(divIngredient)
    )    
}

// // Récupération des éléments de dropdown
// const ingredientsDropdown = document.querySelector('.dropdown_ingredients')
// const ustensilesDropdown = document.getElementById('.dropdown_appliance')
// const appliancesDropdown = document.getElementById('.dropdown_ustensils')

// // Fonction pour filtrer et afficher les recettes
// function filtrerRecettes() {
//     // Récupérer les éléments sélectionnés dans chaque dropdown
//     const ingredientsSelectionnes = Array.from(ingredientsDropdown.selectedOptions).map(option => option.value)
//     const ustensilesSelectionnes = Array.from(ustensilesDropdown.selectedOptions).map(option => option.value)
//     const appliancesSelectionnes = Array.from(appliancesDropdown.selectedOptions).map(option => option.value)
//     // Filtrer les recettes selon les sélections
//     const recettesFiltrees = RECETTES.filter(recette =>
//         ingredientsSelectionnes.every(ingredient => recette.ingredients.includes(ingredient)) &&
//         ustensilesSelectionnes.every(ustensile => recette.ustensiles.includes(ustensile)) &&
//         appliancesSelectionnes.every(appliance => recette.appliances.includes(appliance))
//     )
//     console.log(recettesFiltrees)
//     // Afficher les recettes filtrées
//     displayRecipes(recettesFiltrees)
// }

// // Écouter les changements dans les dropdowns
// ingredientsDropdown.addEventListener('change', filtrerRecettes)
// ustensilesDropdown.addEventListener('change', filtrerRecettes)
// appliancesDropdown.addEventListener('change', filtrerRecettes)

// Recherche dans les dropdowns
function searchDropdown() {
    console.log("<<<<<<<", this.value)
    
    // Push or delete item from focusRecipes
    if(!ingredientTags.includes(this.value)) {
        ingredientTags.push(this.value)
        // focusConstruct(ingredientTags)
    } else {
        deletItem(ingredientTags, this.value)
        // focusConstruct(ingredientTags)
    }

    for (const el of ingredientTags) {
        let fileredByTag = filterBy(allRecipes, el, ["ingredients", "ustensils", "appliance"])
        console.log(fileredByTag)

        clearRecipes()
        displayRecipes(fileredByTag)
    }
    
    // let tags = [...ustensilTags, ...applianceTags, ...ingredientTags]

    // // Filtrer les mots commençant par la chaîne de recherche
    // for ( i = 0 ; i < allRecipes.length; i++) {
    //     const recipe = allRecipes[i];
    //     if(filterRecipes.includes(recipe)) continue;
    //     let ingredients = recipe.ingredients;
    //     let temp = [...recipe.ustensils, recipe.appliance]

    //     // Lister les noms des ingrédients -> recipe.ingredients.map(item => item.ingredient)
    //     for (let h = 0; h < ingredients.length; h++) {
    //         temp.push(ingredients[h].ingredient);
    //     }

    //     let tagMatchCount = 0;
    //     // Boucle sur les tags sélectionnés
    //     for(let j = 0; j < tags.length; j++) {
    //         let tag = tags[j];
    //         console.log('>>>', tag)

    //         if (temp.includes(tag)) {
    //             tagMatchCount += 1;
    //         }
    //     }
    //     console.log(tagMatchCount, tags.length)
    //     if (tagMatchCount === tags.length) {
    //         filterRecipes.push(recipe);
    //     }

    // }
    // console.log(filterRecipes)

    // // Efface les cards
    // const recipesContainer = document.querySelector(".recipes_cards")
    // recipesContainer.innerHTML = ``

    // // Efface les tags
    // selectIngredient.innerHTML = ``
    // selectAppliance.innerHTML = ``
    // selectUstensils.innerHTML = ``

    // // Affiche les nouvelles cards correspondant à la recherche
    // displayRecipes(filterRecipes)
}

// Appel de la fonction searchDropdown lors d'un clique
selectIngredient.addEventListener('change', searchDropdown)
selectAppliance.addEventListener('change', searchDropdown)
selectUstensils.addEventListener('change', searchDropdown)

// // Recherche dans les dropdowns
// function searchDropdownAppliance() {
//     console.log("<<<<<<<", this.value)
    
//     let filterRecipes = []
    
//     // Filtrer les mots commençant par la chaîne de recherche
//     for ( i = 0 ; i < allRecipes.length; i++) {
//         let appliance = allRecipes[i].appliance
        
//         if(appliance.toLowerCase() === this.value) {
//             console.log(allRecipes[i])
//             filterRecipes.push(allRecipes[i])
//         }
        
//     }
//     console.log(filterRecipes)

//     // Efface les cards
//     const recipesContainer = document.querySelector(".recipes_cards")
//     recipesContainer.innerHTML = ``

//     // Efface les tags
//     selectIngredient.innerHTML = ``
//     selectAppliance.innerHTML = ``
//     selectUstensils.innerHTML = ``

//     // Affiche les nouvelles cards correspondant à la recherche
//     displayRecipes(filterRecipes)
// }

// // Appel de la fonction searchDropdown lors d'un clique
// selectAppliance.addEventListener('change', searchDropdownAppliance)

// // Recherche dans les dropdowns
// function searchDropdownUstensils() {
//     console.log("<<<<<<<", this.value)
    
//     let filterRecipes = []
    
//     // Filtrer les mots commençant par la chaîne de recherche
//     for ( i = 0 ; i < allRecipes.length; i++) {
//         let ustensils = allRecipes[i].ustensils

//         for(let j = 0; j < ustensils.length; j++) {
//             if(ustensils[j].toLowerCase() === this.value) {
//                 filterRecipes.push(allRecipes[i])
//             }  
//         }  
//     }

//     // Efface les cards
//     const recipesContainer = document.querySelector(".recipes_cards")
//     recipesContainer.innerHTML = ``

//     // Efface les tags
//     selectIngredient.innerHTML = ``
//     selectAppliance.innerHTML = ``
//     selectUstensils.innerHTML = ``

//     // Affiche les nouvelles cards correspondant à la recherche
//     displayRecipes(filterRecipes)
// }

// // Appel de la fonction searchDropdown lors d'un clique
// selectUstensils.addEventListener('change', searchDropdownUstensils)