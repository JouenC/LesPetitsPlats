// Dropdonw qui resteront sélectionnés
let ingredientTags = []
let ustensilTags = []
let applianceTags = []
let filterRecipes = []

// Filtre les entrées dans la barre de recherche
function searchBar() {
    // Récupérer la valeur saisie dans la barre de recherche
    const searchWord = this.value.trim().toLowerCase()
    
    switch (this.id) {

        case 'search':
            searchRecipes(searchWord)  
            break

        case 'search_ingredient':
            searchRecipesIngredients(searchWord)
            break

        case 'search_appliance':
            searchRecipesAppliances(searchWord)
            break

        case 'search_ustensile':
            searchRecipesUstensiles(searchWord)
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
            if (search.length < 2) {
                displayRecipes(allRecipes)
                console.log("Veuillez saisir au moins 3 caractères.")
                return
            }
    
            // Filtrer les mots contenant la chaîne de caractère
            let fileredRecipesByWord = filterBy(allRecipes, search, ["name", "description", "ingredients", "ustensils", "appliance"]);
            
            // Affiche les nouvelles cards correspondant à la recherche
            displayRecipes(fileredRecipesByWord)
}

// Filtre les entrées dans la barre de ingredient
function searchRecipesIngredients(search) {
    // Utiliser la fonction searchTag et récupérer la valeur retournée dans tempItem
    tempItem = searchTag(search, allIngredients);  

    // Vérifier si tempItem est vide, si c'est le cas, afficher un message d'erreur
    if (tempItem.length === 0) {
        selectIngredient.innerHTML = "";
        allIngredients.forEach(item => {
            // Create dropdown option for ingredients
            selectIngredient.innerHTML += `
                <option class="dropdown_select dropdown_ingredients_option" value="${item}" aria-label="sorting for ${item}"> ${item} </option>
            `;
        });
    }

    // Vérifier si la saisie est valide (au moins 3 caractères)
    if (search.length < 2) {
        selectIngredient.innerHTML = "";
        console.log("Veillez saisir plus de 2 caractères")
        allIngredients.forEach(item => {
            // Create dropdown option for ingredients
            selectIngredient.innerHTML += `
                <option class="dropdown_select dropdown_ingredients_option" value="${item}" aria-label="sorting for ${item}"> ${item} </option>
            `;
        });
    }

    else {
        selectIngredient.innerHTML = "";
        tempItem.forEach(item => {
            // Create dropdown option for ingredients
            selectIngredient.innerHTML += `
                <option class="dropdown_select dropdown_ingredients_option" value="${item}" aria-label="sorting for ${item}"> ${item} </option>
            `;
        });
    } 
}

function searchRecipesAppliances(search) {
    
    // Utiliser la fonction searchTag et récupérer la valeur retournée dans tempItem
    tempItem = searchTag(search, allAppliances);

    // Vérifier si tempItem est vide, si c'est le cas, afficher un message d'erreur
    if (tempItem.length === 0) {
        selectAppliance.innerHTML = ""
        allAppliances.forEach(item => {
            // Create dropdown option for ingredients
            selectAppliance.innerHTML += `
                <option class="dropdown_select dropdown_appliance_option" value="${item}" aria-label="sorting for ${item}"> ${item} </option>
            `; 
        });
    }

    // Vérifier si la saisie est valide (au moins 3 caractères)
    if (search.length < 2) {
        selectAppliance.innerHTML = ""
        console.log("Veillez saisir plus de 2 caractères")
        allAppliances.forEach(item => {
            // Create dropdown option for ingredients
            selectAppliance.innerHTML += `
                <option class="dropdown_select dropdown_appliance_option" value="${item}" aria-label="sorting for ${item}"> ${item} </option>
            `; 
        });
    }
        
    else {
        selectAppliance.innerHTML = "";
        tempItem.forEach(item => {
            // Create dropdown option for ingredients
            selectAppliance.innerHTML += `
                <option class="dropdown_select dropdown_appliance_option" value="${item}" aria-label="sorting for ${item}"> ${item} </option>
            `; 
        });
    }
}

function searchRecipesUstensiles(search) {

    // Utiliser la fonction searchTag et récupérer la valeur retournée dans tempItem
    tempItem = searchTag(search, allUstensils);

    // Vérifier si tempItem est vide, si c'est le cas, afficher un message d'erreur
    if (tempItem.length === 0) {
        selectUstensils.innerHTML = ""
        allUstensils.forEach(item => {
            // Create dropdown option for ingredients
            selectUstensils.innerHTML += `
                <option class="dropdown_select dropdown_ustensils_option" value="${item}" aria-label="sorting for ${item}"> ${item} </option>
            `;
        });
    }

    // Vérifier si la saisie est valide (au moins 3 caractères)
    if (search.length < 2) {
        selectUstensils.innerHTML = ""
        console.log("Veillez saisir plus de 2 caractères")
        allUstensils.forEach(item => {
            // Create dropdown option for ingredients
            selectUstensils.innerHTML += `
                <option class="dropdown_select dropdown_ustensils_option" value="${item}" aria-label="sorting for ${item}"> ${item} </option>
            `;
        });
    }

    else {
        selectUstensils.innerHTML = "";
        tempItem.forEach(item => {
            // Create dropdown option for ingredients
            selectUstensils.innerHTML += `
                <option class="dropdown_select dropdown_ustensils_option" value="${item}" aria-label="sorting for ${item}"> ${item} </option>
            `;
        });
    }      
}

// Filtre les entrées dans la barre de recherche
const searchTag = (searchZone, searchItem) => {
    const tempItem = []

    // Récupérez la valeur de chaque élément <option> et ajoutez-la au tableau TempIngredient
    searchItem.forEach(option => {
        if (option.includes(searchZone)) {
           tempItem.push(option); 
        }   
    });

    console.log(tempItem)    
    return tempItem
}

// Sélectionnez tous les éléments de recherche
const searchElements = document.querySelectorAll('#search, #search_ingredient, #search_appliance, #search_ustensile');

// Ajoutez un écouteur d'événements à chaque élément de recherche
searchElements.forEach(element => {
    element.addEventListener('keyup', searchBar);
});

// Delete item from focusRecipes, focusAppliance or focusUstensils
function deletItem(tableau, valeur, type) {

    // Search index
    const index = tableau.indexOf(valeur)

    // Delete index
    tableau.splice(index, 1) 
    console.log("La valeur", valeur, "a été supprimée du tableau.")
    focusConstruct(tableau, type)
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
                focus.forEach((element) => 
                    divIngredient.innerHTML += `
                        <p class="element_ingredient">${element}<p>
                    `,
                    divIngredient.style.backgroundColor = 'orange',
                    focusElement.after(divIngredient)
                )
            break;
        case 'appliance':
            focusElement = document.querySelector('.button_dropdown_appliance')
                divAppliance.innerHTML = ``
                focus.forEach((element) => 
                    divAppliance.innerHTML += `
                        <p class="element_appliance">${element}<p>
                    `,
                    divAppliance.style.backgroundColor = 'orange',
                    focusElement.after(divAppliance)
                )
            break;
        case 'ustensils':
            focusElement = document.querySelector('.button_dropdown_ustensils')
                divUstensil.innerHTML = ``
                focus.forEach((element) => 
                    divUstensil.innerHTML += `
                        <p class="element_ustensils">${element}<p>
                    `,
                    divUstensil.style.backgroundColor = 'orange',
                    focusElement.after(divUstensil)
                )
            break;
        default:
            console.log('Oups!');
            break;
    } 
    optionListener()
    deletListener()     
}

let tagsToUpdate = []; // Tableau pour stocker les tags à mettre à jour

function searchDropdown(type) {
    console.log(this, type)
    const selectValue = this.value.trim().toLowerCase(); // Valeur sélectionnée dans le dropdown
    
    let filterType = ''; // Type de filtre à mettre à jour

    // Déterminer quel tableau de tags mettre à jour en fonction du type de dropdown
    switch (this.className) {
        case 'dropdown_select dropdown_ingredients_option':
            tagsToUpdate = ingredientTags;
            filterType = 'ingredients';
            break;
        case 'dropdown_select dropdown_appliance_option':
            console.log("Hello Appliance!", applianceTags);
            tagsToUpdate = applianceTags;
            filterType = 'appliance';
            break;
        case 'dropdown_select dropdown_ustensils_option':
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
        deletItem(tagsToUpdate, selectValue, type);
        focusConstruct(tagsToUpdate, filterType);
    }

    // Mettre à jour les éléments de focus et les tags
    // focusConstruct(ingredientTags, ustensilTags, applianceTags);

    // // Créer un objet contenant les tags
    // const tags = {
    //     ingredients: ingredientTags,
    //     ustensils: ustensilTags,
    //     appliance: applianceTags
    // };

    // // Filtrer les recettes en fonction des tags
    // filteredByTag = filterByMulti(allRecipes, tags);

    // // Afficher les recettes filtrées
    // displayRecipes(filteredByTag);
    test()
}

function test() {
    // Créer un objet contenant les tags
    const tags = {
        ingredients: ingredientTags,
        ustensils: ustensilTags,
        appliance: applianceTags
    };

    // Filtrer les recettes en fonction des tags
    filteredByTag = filterByMulti(allRecipes, tags);

    // Afficher les recettes filtrées
    displayRecipes(filteredByTag)
    // deletItem(tagsToUpdate, p.innerHTML, type);
}