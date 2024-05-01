const selectIngredient = document.querySelector('.dropdown_ingredients')
const selectAppliance = document.querySelector('.dropdown_appliance')
const selectUstensils = document.querySelector('.dropdown_ustensils')


// Create a new list
let allRecipes = recipes
const recipesContainer = document.querySelector(".recipes_cards")


// Count number of recipes
function recipesCount(numberOfRecipes) {
    console.log(numberOfRecipes)
    let number = document.querySelector(".recepice_count")
    number.innerHTML = numberOfRecipes + " recettes"
}

// Create cards
function recipesCard(recipes) {
    
    let tempIngredients = []
    let tempAppliance = []
    let tempUstensils = []

    // Search ingredient for build cards and dropdown
    for(let i = 0; i <recipes.length; i++) {

        // Recette Courante
        const currentRecipe = recipes[i]

        // Create article for each cards
        const article = document.createElement('article')

        // Create ingredient ant unit for each recipes
        let ingredients = ""  
        for(let j = 0; j < currentRecipe.ingredients.length; j++) {
            let {ingredient, unit = "", quantity = ""} = currentRecipe.ingredients[j]

            // Create a part for cards
            ingredients+= `<li class="card_ingredients"> ${ingredient} <div class="card_quantity">${quantity} ${unit}</div></li>`

            if (tempIngredients.includes(ingredient.toLowerCase())) continue
            tempIngredients.push(ingredient.toLowerCase())

            // Create dropdown option for ingredients
            selectIngredient.innerHTML += `
                <option class="dropdown_select dropdown_ingredients_option" value="${ingredient}" aria-label="sorting for ${ingredient}"> ${ingredient} </option>
            `
        }
        
        // Creation d'un tableau contenant les appliances
        if (!tempAppliance.includes(recipes[i].appliance.toLowerCase())) {
            tempAppliance.push(recipes[i].appliance.toLowerCase())
        }
        
        // Création d'un tableau contenant les ustensils
        for(let j = 0; j < recipes[i].ustensils.length; j++) {
            if (tempUstensils.includes(recipes[i].ustensils[j].toLowerCase())) continue
            tempUstensils.push(recipes[i].ustensils[j].toLowerCase())
        }

        // Cards HTML
        article.innerHTML = `
            <div class="card">
                <img class="card_image" src="../../data/photographies/${recipes[i].image}" alt="image de la recette" /> 
                <div class="card_time">
                    ${recipes[i].time}min
                </div>
                <div class="card_name">
                    ${recipes[i].name}
                </div>
                <div class="card_title"> 
                    RECETTE
                </div>
                <div class="card_description">
                    ${recipes[i].description}
                </div>
                <div class="card_title"> 
                    INGREDIENTS
                </div>
                <ul class="card_list">
                    ${ingredients}
                </ul>
            </div>
        `
        // Bond cards
        recipesContainer.appendChild(article)
    }
    
    allIngredients = tempIngredients
    tempIngredients = []

    // Create dropdown option for appliance
    tempAppliance.forEach((element) => 
        selectAppliance.innerHTML += `
            <option class="dropdown_select dropdown_appliance_option" value="${element}" aria-label="sorting for ${element}"> ${element} </option>
        `
    )

    allAppliances = tempAppliance
    tempAppliance = []

    // Create dropdown option for ustensils
    tempUstensils.forEach((element) => 
        selectUstensils.innerHTML += `
            <option class="dropdown_select dropdown_ustensils_option" value="${element}" aria-label="sorting for ${element}"> ${element} </option>
        `
    )

    allUstensils = tempUstensils
    tempUstensils = []

    return allIngredients, allAppliances, allUstensils
}

// Clear dropdown
const clearRecipes = () => {

    // Efface les cards
    const recipesContainer = document.querySelector(".recipes_cards")
    recipesContainer.innerHTML = ``

    // Efface les tags
    selectIngredient.innerHTML = ``
    selectAppliance.innerHTML = ``
    selectUstensils.innerHTML = ``
}

function optionListener () {
    const optionIngredient = [...document.querySelectorAll(".dropdown_ingredients_option")]
    const optionAppliance = [...document.querySelectorAll(".dropdown_appliance_option")]
    const optionUstensils = [...document.querySelectorAll(".dropdown_ustensils_option")]

    // Appel de la fonction searchDropdown lors d'un clique dans les options
    optionIngredient.forEach(option => {
        option.addEventListener('click', searchDropdown)
    })

    optionAppliance.forEach(option => {
        option.addEventListener('click', searchDropdown)
    })

    optionUstensils.forEach(option => {
        option.addEventListener('click', searchDropdown)
    })
}

function deletListener() {
    // Pour déselectionner un tag
    const deletIngredient = [...document.querySelectorAll(".element_ingredient")]
    const deletAppliance = [...document.querySelectorAll(".element_appliance")]
    const deletUstensils = [...document.querySelectorAll(".element_ustensils")]

    deletIngredient.forEach(p => {
        p.addEventListener('click', () =>  {
            deletItem(tagsToUpdate, p.innerHTML, "ingredients");
            test()
        } )
    })
    

    deletAppliance.forEach(p => {
        p.addEventListener('click', () => {
            deletItem(tagsToUpdate, p.innerHTML, "appliance");
            test()
        })
    })

    deletUstensils.forEach(p => {
        p.addEventListener('click', () => {
            deletItem(tagsToUpdate, p.innerHTML, "ustensils");
            test()
        } )
    })
}

// Display page
function displayRecipes(recipes) {
   
    clearRecipes()
    recipesCount(recipes.length)
    recipesCard(recipes)  
    optionListener()
    // deletListener()
}

// Call display page
displayRecipes(allRecipes)