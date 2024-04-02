// Dropdonw qui resteront sélectionnés
let ingredientTags = []
let ustensilTags = []
let applianceTags = []
let filterRecipes = []

// Filtre les entrées dans la barre de recherche
function searchRecipes() {
    // Récupérer la valeur saisie dans la barre de recherche
    const searchWord = document.querySelector('#search').value.trim().toLowerCase()
    
    // Display all recipes if search bar is empty
    if (searchWord.length === 0) {
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
    
    // Affiche les nouvelles cards correspondant à la recherche
    displayRecipes(fileredRecipesByWord) 
}

// Appel de la fonction searchRecipes lorsqu'une touche est relâchée dans la barre de recherche
document.querySelector('#search').addEventListener('keyup', searchRecipes)

// Filtre les entrées dans la barre de ingredient
function searchRecipesIngredients() {
    // Récupérer la valeur saisie dans la barre de recherche
    const searchWord = document.querySelector('#search_ingredient').value.trim().toLowerCase()
    const ingredientOptions = document.querySelectorAll('.dropdown_ingredients_option')

    const ingredientOrigin = ingredientOptions
    // console.log(ingredientOrigin.forEach(item => { console.log(item.value)}))

    try {
        // Utiliser la fonction searchTag et récupérer la valeur retournée dans tempItem
        tempItem = searchTag(searchWord, ingredientOptions);

        // Vérifier si tempItem est vide, si c'est le cas, afficher un message d'erreur
        if (tempItem.length === 0) {
            selectIngredient.innerHTML = "";
            ingredientOrigin.forEach(item => {
                // Create dropdown option for ingredients
                selectIngredient.innerHTML += `
                    <option class="dropdown_select dropdown_ingredients_option" value="${item}" aria-label="sorting for ${item}"> ${item} </option>
                `;
            });
            throw new Error("Grand Néant");
        }

        // Vérifier si la saisie est valide (au moins 3 caractères)
        if (searchWord.length < 2) {
            throw new Error("Veuillez saisir au moins 3 caractères.")
        }

        console.log(">>>>", tempItem);

        selectIngredient.innerHTML = "";
        tempItem.forEach(item => {
            // Create dropdown option for ingredients
            selectIngredient.innerHTML += `
                <option class="dropdown_select dropdown_ingredients_option" value="${item}" aria-label="sorting for ${item}"> ${item} </option>
            `;
        });
    } catch (error) {
        console.error(error.message); // Afficher l'erreur dans la console
    }
}

function searchRecipesAppliances() {
    // Récupérer la valeur saisie dans la barre de recherche
    const searchWord = document.querySelector('#search_appliance').value.trim().toLowerCase()
    const applianceOptions = document.querySelectorAll('.dropdown_appliance_option')
    
    try {
        // Utiliser la fonction searchTag et récupérer la valeur retournée dans tempItem
        tempItem = searchTag(searchWord, applianceOptions);

        // Vérifier si tempItem est vide, si c'est le cas, afficher un message d'erreur
        if (tempItem.length === 0) {
            throw new Error("Grand Néant");
        }

        // Vérifier si la saisie est valide (au moins 3 caractères)
        if (searchWord.length < 2) {
            throw new Error("Veuillez saisir au moins 3 caractères.")
        }

        console.log(">>>>", tempItem);

        selectAppliance.innerHTML = "";
        tempItem.forEach(item => {
            // Create dropdown option for ingredients
            selectAppliance.innerHTML += `
                <option class="dropdown_select dropdown_appliance_option" value="${item}" aria-label="sorting for ${item}"> ${item} </option>
            `;
        });
    } catch (error) {
        console.error(error.message); // Afficher l'erreur dans la console
    }
}

function searchRecipesUstensiles() {
    // Récupérer la valeur saisie dans la barre de recherche
    const searchWord = document.querySelector('#search_ustensile').value.trim().toLowerCase()
    const ustensilsOptions = document.querySelectorAll('.dropdown_ustensils_option')

    try {
        // Utiliser la fonction searchTag et récupérer la valeur retournée dans tempItem
        tempItem = searchTag(searchWord, ustensilsOptions);

        // Vérifier si tempItem est vide, si c'est le cas, afficher un message d'erreur
        if (tempItem.length === 0) {
            throw new Error("Grand Néant");
        }

        // Vérifier si la saisie est valide (au moins 3 caractères)
        if (searchWord.length < 2) {
            throw new Error("Veuillez saisir au moins 3 caractères.")
        }

        console.log(">>>>", tempItem, selectUstensils);

        selectUstensils.innerHTML = "";
        tempItem.forEach(item => {
            // Create dropdown option for ingredients
            selectUstensils.innerHTML += `
                <option class="dropdown_select dropdown_ustensils_option" value="${item}" aria-label="sorting for ${item}"> ${item} </option>
            `;
        });
    } catch (error) {
        console.error(error.message); // Afficher l'erreur dans la console
    }
}

// Filtre les entrées dans la barre de recherche
const searchTag = (searchZone, searchItem) => {
    const tempItem = []

    // Récupérez la valeur de chaque élément <option> et ajoutez-la au tableau TempIngredient
    searchItem.forEach(option => {
        if (option.value.includes(searchZone)) {
           tempItem.push(option.value); 
        }   
    });

    console.log(tempItem)    
    return tempItem
}

// Appel de la fonction searchRecipes lorsqu'une touche est relâchée dans la barre de recherche
document.querySelector('#search_ingredient').addEventListener('keyup', searchRecipesIngredients)
document.querySelector('#search_appliance').addEventListener('keyup', searchRecipesAppliances)
document.querySelector('#search_ustensile').addEventListener('keyup', searchRecipesUstensiles)

// Delete item from focusRecipes, focusAppliance or focusUstensils
function deletItem(tableau, valeur) {

    // Search index
    const index = tableau.indexOf(valeur)

    // Delete index
    tableau.splice(index, 1) 
    console.log("La valeur", valeur, "a été supprimée du tableau.")
}

// Element for focusConstruct
const divIngredient = document.createElement('div')
divIngredient.className = "focus focus_ingredients"
const divAppliance = document.createElement('div')
divAppliance.className = "focus focus_appliances"
const divUstensil = document.createElement('div')
divUstensil.className = "focus focus_ustensile"

// Display select tag ingredient
function focusConstruct(focus, type) {
    let focusElement
    switch (type) {
        case 'ingredients':
            focusElement = document.querySelector('.select_ingredients')
                divIngredient.innerHTML = ``
                focus.forEach((element) => 
                    divIngredient.innerHTML += `
                        <p>${element}<p>
                    `,
                    divIngredient.style.backgroundColor = 'orange',
                    focusElement.appendChild(divIngredient)
                )
            break;
        case 'appliance':
            focusElement = document.querySelector('.select_appliance')
                divAppliance.innerHTML = ``
                focus.forEach((element) => 
                    divAppliance.innerHTML += `
                        <p>${element}<p>
                    `,
                    divAppliance.style.backgroundColor = 'orange',
                    focusElement.appendChild(divAppliance)
                )
            break;
        case 'ustensils':
            focusElement = document.querySelector('.select_ustensiles')
                divUstensil.innerHTML = ``
                focus.forEach((element) => 
                    divUstensil.innerHTML += `
                        <p>${element}<p>
                    `,
                    divUstensil.style.backgroundColor = 'orange',
                    focusElement.appendChild(divUstensil)
                )
            break;
        default:
            console.log('Oups!');
            break;
    }
        
}

selectIngredient.addEventListener('change', focusConstruct)
selectAppliance.addEventListener('change', focusConstruct)
selectUstensils.addEventListener('change', focusConstruct)

// // Recherche dans les dropdowns
// function searchDropdown(type) {
//     console.log("<<<<<<<", this.value)
    
//     // Push or delete item from focusRecipes
//     if(!ingredientTags.includes(this.value)) {
//         ingredientTags.push(this.value)
//         focusConstruct(ingredientTags)
//     } else {
//         deletItem(ingredientTags, this.value)
//         focusConstruct(ingredientTags)
//     }
    
//     const tags = {
//         ingredients: ingredientTags,
//         ustensils: ustensilTags,
//         appliance: applianceTags
//     }
//     filteredByTag = filterByMulti(allRecipes, tags)

//     displayRecipes(filteredByTag)
// }

function searchDropdown(type) {
    const selectValue = this.value.trim().toLowerCase(); // Valeur sélectionnée dans le dropdown
    let tagsToUpdate = []; // Tableau pour stocker les tags à mettre à jour
    let filterType = ''; // Type de filtre à mettre à jour

    console.log(this.value, this.className)

    // Déterminer quel tableau de tags mettre à jour en fonction du type de dropdown
    switch (this.className) {
        case 'dropdown_select dropdown_ingredients':
            tagsToUpdate = ingredientTags;
            filterType = 'ingredients';
            break;
        case 'dropdown_select dropdown_appliance':
            console.log("Hello Appliance!", applianceTags);
            tagsToUpdate = applianceTags;
            filterType = 'appliance';
            break;
        case 'dropdown_select dropdown_ustensils':
            tagsToUpdate = ustensilTags;
            filterType = 'ustensils';
            break;
        default:
            break;
    }

    // Vérifier si la valeur sélectionnée est déjà présente dans les tags
    if (!tagsToUpdate.includes(selectValue)) {
        // Si la valeur n'est pas présente, l'ajouter
        tagsToUpdate.push(selectValue);
        focusConstruct(tagsToUpdate, filterType);
    } else {
        // Si la valeur est déjà présente, la supprimer
        deletItem(tagsToUpdate, selectValue);
        focusConstruct(tagsToUpdate, filterType);
    }

    // Mettre à jour les éléments de focus et les tags
    // focusConstruct(ingredientTags, ustensilTags, applianceTags);

    // Créer un objet contenant les tags
    const tags = {
        ingredients: ingredientTags,
        ustensils: ustensilTags,
        appliance: applianceTags
    };

    // Filtrer les recettes en fonction des tags
    filteredByTag = filterByMulti(allRecipes, tags);

    // Afficher les recettes filtrées
    displayRecipes(filteredByTag);
}

// Appel de la fonction searchDropdown lors d'un clique
selectIngredient.addEventListener('change', searchDropdown)
selectAppliance.addEventListener('change', searchDropdown)
selectUstensils.addEventListener('change', searchDropdown)