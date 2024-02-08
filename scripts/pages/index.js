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
    for(let i = 0; i <recipes.length; i++) {

        console.log(recipes[i].ingredients[i])

        // Create article for each cards
        const article = document.createElement('article')

        // ??? dropdown
        const dropdown = document.createElement('option')
        
        // Create ingredient ant unit for each recipes
        let ingredients = ""  

        for(let j = 0; j <recipes[i].ingredients.length; j++) {
            
            let unit =  recipes[i].ingredients[j]?.unit||""

            // ??? dropdown
            let quantity = recipes[i].ingredients[j]?.quantity||""

            ingredients+= `<li class="card_ingredients"> ${recipes[i].ingredients[j].ingredient} <div class="card_quantity">${quantity} ${unit}</div></li>`
        
            // ??? dropdown
            dropdown.innerHTML = `
                <option class="dropdown_select" value="${recipes[i].ingredients[j].ingredient}" aria-label="sorting for ${recipes[i].ingredients[j].ingredient}"> ${recipes[i].ingredients[j].ingredient} </option>
            `
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

        // ??? dropdown
        dropdownIngredient.appendChild(dropdown)
    }
}

// Display page
function displayRecipes(recipes) {
   
    recipesCount(recipes.length)
    // recipesDropdown(recipes)
    recipesCard(recipes)
   
}

// Call display page
displayRecipes(allRecipes)