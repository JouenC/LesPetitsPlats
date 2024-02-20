// Create a new list
let allRecipes = recipes
const recipesContainer = document.querySelector(".recipes_cards")

// ??? dropdown
const dropdownIngredient = document.querySelector(".dropdown_ingredients")

console.log(allRecipes)

// Count number of recipes
function recipesCount(numberOfRecipes) {
    console.log(numberOfRecipes)
    let number = document.querySelector(".recepice_count")
    number.innerHTML = numberOfRecipes + " recettes"
}

// Create dropdown
// function recipesDropdown(item) {

//     let dropdownIngredient = document.querySelector(".dropdown_ingredients")
//     let allIngredients = ""

//     console.log(item)
//     console.log(dropdownIngredient)

//     // dropdownIngredient.innerHTML = `
//     //     <div class="dropdown">
//     //         <div class="dropdown_title">Ingrédients</div>
//     //         <select class="dropdown_select" aria-label="dropdown for media sorting">
//     //             <option class="dropdown_select" value="Popularité" aria-label="sorting for popularity"> Popularité </option>
//     //             <option class="dropdown_select" value="Date" aria-label="sorting for date"> Date </option>
//     //             <option class="dropdown_select" value="Titre" aria-label="sorting for title"> Titre </option>
//     //         </select>
//     //     </div>
//     // `
//     for (i = 0; i <item.length; i++) {
//         allIngredients = `
//             <option class="dropdown_select" value="${item[i]}" aria-label="sorting for ${item[i]}"> ${item[i]} </option>
//         `
//         allIngredients.appendChild(dropdownIngredient)
//     }
// }

// Create cards
function recipesCard(recipes) {

    // ??? dropdown
    const dropdownIngredient = document.querySelector(".dropdown_ingredients")
    const dropdownAppliance = document.querySelector(".dropdown_appliance")
    const dropdownUstensils = document.querySelector(".dropdown_ustensils")
    
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

            if (tempIngredients.includes(ingredient.toLowerCase())) continue
        
            // Create a part for cards
            tempIngredients.push(ingredient.toLowerCase())
            ingredients+= `<li class="card_ingredients"> ${ingredient} <div class="card_quantity">${quantity} ${unit}</div></li>`
            
            // Create dropdown option for ingredients
            dropdownIngredient.innerHTML += `
                <option class="dropdown_select dropdown_ingredients_option" value="${ingredient}" aria-label="sorting for ${ingredient}"> ${ingredient} </option>
            `
        }
        console.log(tempIngredients)
        // Create dropdown option for ingredients
        // tempIngredients.forEach((element) => 
        //     dropdownIngredient.innerHTML += `
        //         <option class="dropdown_select dropdown_ingredients_option" value="${element}" aria-label="sorting for ${element}"> ${element} </option>
        //     `
        // )
        // tempIngredients = []
        tempIngredients = []

        // Creation d'un tableau contenant les appliances
        if (tempAppliance.includes(recipes[i].appliance.toLowerCase())) continue
        tempAppliance.push(recipes[i].appliance.toLowerCase())
        
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
    
    // Create dropdown option for appliance
    tempAppliance.forEach((element) => 
        dropdownAppliance.innerHTML += `
            <option class="dropdown_select dropdown_appliance_option" value="${element}" aria-label="sorting for ${element}"> ${element} </option>
        `
    )
    tempAppliance = []

    // Create dropdown option for ustensils
    tempUstensils.forEach((element) => 
        dropdownUstensils.innerHTML += `
            <option class="dropdown_select dropdown_appliance_option" value="${element}" aria-label="sorting for ${element}"> ${element} </option>
        `
    )
    tempAppliance = []
}

// Display page
function displayRecipes(recipes) {
   
    recipesCount(recipes.length)
    recipesCard(recipes)
   
}

// Call display page
displayRecipes(allRecipes)