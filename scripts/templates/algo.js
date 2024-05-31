// Dropdonw qui resteront sélectionnés
let ingredientTags = []
let ustensilTags = []
let applianceTags = []
let filterRecipes = []

// Filtre les entrées dans la barre de recherche
function searchBar() {
    // Récupérer la valeur saisie dans la barre de recherche
    let searchWord = this.value.trim().toLowerCase()

    // Supprimer tous les caractères non alphabétiques de la chaîne de recherche
    searchWord = searchWord.replace(/[^a-z]/g, '');

    switch (this.id) {

        case 'search':
            searchRecipes(searchWord)  
            break

        case 'search_ingredient':
            searchRecipesIngredients(searchWord)
            optionListener()
            break

        case 'search_appliance':
            searchRecipesAppliances(searchWord)
            optionListener()
            break

        case 'search_ustensile':
            searchRecipesUstensiles(searchWord)
            optionListener()
            break
    }    
}

function searchRecipes(search) {
    // Display all recipes if search bar is empty
            if (search.length === 0) {
                displayRecipes(allRecipes)
                return
            }

            // Vérifier si la saisie est valide (au moins 3 caractères)
            if (search.length < 3) {
                displayRecipes(allRecipes)
                return
            }
    
            // Filtrer les mots contenant la chaîne de caractère
            let fileredRecipesByWord = filterBy(allRecipes, search, ["name", "description", "ingredients", "ustensils", "appliance"]);
            
            // Affiche les nouvelles cards correspondant à la recherche
            return fileredRecipesByWord
}

// Filtre les entrées dans la barre de ingredient
function searchRecipesIngredients(search) {
    // Utiliser la fonction searchTag et récupérer la valeur retournée dans tempItem
    tempItem = searchTag(search, allIngredients);  

    // Vérifier si tempItem est vide, si c'est le cas, afficher un message d'erreur
    if (tempItem.length === 0) {
        selectIngredient.innerHTML = "";
        for (let i = 0; i < allIngredients.length; i++) {
            const item = allIngredients[i];
            selectIngredient.innerHTML += `
                <option class="dropdown_select dropdown_ingredients_option" value="${item}" aria-label="sorting for ${item}"> ${item} </option>
            `;
        }
    }

    // Vérifier si la saisie est valide (au moins 3 caractères)
    if (search.length < 2) {
        selectIngredient.innerHTML = "";
        for (let i = 0; i < allIngredients.length; i++) {
            const item = allIngredients[i];
            selectIngredient.innerHTML += `
                <option class="dropdown_select dropdown_ingredients_option" value="${item}" aria-label="sorting for ${item}"> ${item} </option>
            `;
        }
    }

    else {
        selectIngredient.innerHTML = "";
        for (let i = 0; i < tempItem.length; i++) {
            const item = tempItem[i];
            selectIngredient.innerHTML += `
                <option class="dropdown_select dropdown_ingredients_option" value="${item}" aria-label="sorting for ${item}"> ${item} </option>
            `;
        }
    }
}

// Filtre les entrées dans la barre de appliances
function searchRecipesAppliances(search) {
    
    // Utiliser la fonction searchTag et récupérer la valeur retournée dans tempItem
    tempItem = searchTag(search, allAppliances);

    // Vérifier si tempItem est vide, si c'est le cas, afficher un message d'erreur
    if (tempItem.length === 0) {
        selectAppliance.innerHTML = "";
        for (let i = 0; i < allAppliances.length; i++) {
            const item = allAppliances[i];
            selectAppliance.innerHTML += `
                <option class="dropdown_select dropdown_appliance_option" value="${item}" aria-label="sorting for ${item}"> ${item} </option>
            `;
        }
    }

    // Vérifier si la saisie est valide (au moins 3 caractères)
    if (search.length < 2) {
        selectAppliance.innerHTML = "";
        for (let i = 0; i < allAppliances.length; i++) {
            const item = allAppliances[i];
            selectAppliance.innerHTML += `
                <option class="dropdown_select dropdown_appliance_option" value="${item}" aria-label="sorting for ${item}"> ${item} </option>  
            `;
        }
        
    } else {
        selectAppliance.innerHTML = "";
        for (let i = 0; i < tempItem.length; i++) {
            const item = tempItem[i];
            selectAppliance.innerHTML += `
                <option class="dropdown_select dropdown_appliance_option" value="${item}" aria-label="sorting for ${item}"> ${item} </option>
            `;
        }
    }
}

// Filtre les entrées dans la barre de ustensils
function searchRecipesUstensiles(search) {

    // Utiliser la fonction searchTag et récupérer la valeur retournée dans tempItem
    tempItem = searchTag(search, allUstensils);

    // Vérifier si tempItem est vide, si c'est le cas, afficher un message d'erreur
    if (tempItem.length === 0) {
        selectUstensils.innerHTML = "";
        for (let i = 0; i < allUstensils.length; i++) {
            const item = allUstensils[i];
            selectUstensils.innerHTML += `
                <option class="dropdown_select dropdown_ustensils_option" value="${item}" aria-label="sorting for ${item}"> ${item} </option>
            `;
        }
    }

    // Vérifier si la saisie est valide (au moins 3 caractères)
    if (search.length < 2) {
        selectUstensils.innerHTML = "";
        for (let i = 0; i < allUstensils.length; i++) {
            const item = allUstensils[i];
            selectUstensils.innerHTML += `
                <option class="dropdown_select dropdown_ustensils_option" value="${item}" aria-label="sorting for ${item}"> ${item} </option>
            `;
        }
    } else {
        selectUstensils.innerHTML = "";
        for (let i = 0; i < tempItem.length; i++) {
            const item = tempItem[i];
            selectUstensils.innerHTML += `
                <option class="dropdown_select dropdown_ustensils_option" value="${item}" aria-label="sorting for ${item}"> ${item} </option>
            `;
        }
    }
}

// Filtre les entrées dans la barre de recherche
const searchTag = (searchZone, searchItem) => {
    const tempItem = []

    // Récupérez la valeur de chaque élément <option> et ajoutez-la au tableau TempIngredient
    for (let i = 0; i < searchItem.length; i++) {
        const option = searchItem[i];
        if (option.includes(searchZone)) {
            tempItem.push(option);
        }
    }

    return tempItem
}

// Sélectionnez tous les éléments de recherche
const searchElements = document.querySelectorAll('#search, #search_ingredient, #search_appliance, #search_ustensile');

// Ajoutez un écouteur d'événements à chaque élément de recherche
for (let i = 0; i < searchElements.length; i++) {
    const element = searchElements[i];
    element.addEventListener('keyup', searchBar);
}

// Delete item from focusRecipes, focusAppliance or focusUstensils
function deletItem(tags, value, type) {
    tags[type] = tags[type].filter(item => item !== value);
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
            focusElement = document.querySelector('.button_dropdown_ingredients')
                divIngredient.innerHTML = ``
                for (let i = 0; i < focus.ingredients.length; i++) {
                    const element = focus.ingredients[i];
                    divIngredient.innerHTML += `
                        <p class="element_ingredient">${element}<i class="fa-solid fa-x delet_tag"></i></p> 
                    `;
                    divIngredient.style.backgroundColor = 'orange';
                    focusElement.after(divIngredient);
                }
            break;
        case 'appliance':
            focusElement = document.querySelector('.button_dropdown_appliance')
                divAppliance.innerHTML = ``
                for (let i = 0; i < focus.appliance.length; i++) {
                    const element = focus.appliance[i];
                    divAppliance.innerHTML += `
                        <p class="element_appliance">${element}<i class="fa-solid fa-x delet_tag"></i></p>
                    `;
                }
                divAppliance.style.backgroundColor = 'orange';
                focusElement.after(divAppliance);
            break;
        case 'ustensils':
            focusElement = document.querySelector('.button_dropdown_ustensils')
                divUstensil.innerHTML = ``
                for (let i = 0; i < focus.ustensils.length; i++) {
                    const element = focus.ustensils[i];
                    divUstensil.innerHTML += `
                        <p class="element_ustensils">${element}<i class="fa-solid fa-x delet_tag"></i></p>
                    `;
                }
                divUstensil.style.backgroundColor = 'orange';
                focusElement.after(divUstensil);
            break;
        default:
            console.log('Oups!');
            break;
    } 
    optionListener()
    deletListener()     
}

let tagsToUpdate = {ingredients: [], appliance: [], ustensils: [], }; // Tableau pour stocker les tags à mettre à jour

// Construit la liste des tags selectionnés
function searchDropdown() {
    const selectValue = this.value.trim().toLowerCase(); // Valeur sélectionnée dans le dropdown
    
    let filterType = ''; // Type de filtre à mettre à jour
    // Déterminer quel tableau de tags mettre à jour en fonction du type de dropdown
    switch (this.className) {
        case 'dropdown_select dropdown_ingredients_option':
            if (!tagsToUpdate.ingredients.includes(selectValue)) {
                tagsToUpdate.ingredients.push(selectValue); 
                filterType = 'ingredients';
            }
            break;
        case 'dropdown_select dropdown_appliance_option':
            if (!tagsToUpdate.appliance.includes(selectValue)) {
                tagsToUpdate.appliance.push(selectValue); 
                filterType = 'appliance';
            }
            break;
        case 'dropdown_select dropdown_ustensils_option':
            if (!tagsToUpdate.ustensils.includes(selectValue)) {
                tagsToUpdate.ustensils.push(selectValue); 
                filterType = 'ustensils';
            }
            break;
        default:
            break;
    }
    updateTagsDisplay();
    focusConstruct(tagsToUpdate, filterType);
    searchController()
}

let tagsList = document.querySelector(".tags_list");

function updateTagsDisplay() {
    // Vider la liste des tags avant de la remplir
    tagsList.innerHTML = "";

    // Parcourir les catégories de tags
    for (let type in tagsToUpdate) {
        // Parcourir chaque tag dans la catégorie
        tagsToUpdate[type].forEach(tag => {
            // Créer une div pour le tag
            let tagDiv = document.createElement("div");
            tagDiv.className = `tag_item tag_${type}`;
            tagDiv.textContent = tag;

            // Ajouter un bouton de suppression à chaque tag
            let deleteButton = document.createElement("i");
            deleteButton.className = "fa-solid fa-x delet_tag";
            deleteButton.setAttribute("aria-hidden", "true");

            tagDiv.appendChild(deleteButton);
            tagsList.appendChild(tagDiv);
            deletListener()
        })   
    }
}

// Met l'affichage à jour en fonction des tags
function newDisplay(filtered) {

    // Filtrer les recettes en fonction des tags
    filteredByTag = filterByMulti(filtered, tagsToUpdate);

    // Afficher les recettes filtrées
    return { filteredByTag, tagsToUpdate }
}

const searchController = (event) => {
    const value = document.querySelector('#search').value
    let filtered = allRecipes
    if (value.length > 2) {
        filtered = searchRecipes(value); // Subset de recettes
    }
    const {filteredByTag, tagsToUpdate} = newDisplay(filtered);

    return displayRecipes(filteredByTag, tagsToUpdate)
}