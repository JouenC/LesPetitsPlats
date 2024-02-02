// Create a new list
let allRecipes = recipes
const recipesContainer = document.querySelector(".recipes_cards")

console.log(allRecipes)

// Count number of recipes
function recipesCount(numberOfRecipes) {
    console.log(numberOfRecipes)
    let number = document.querySelector(".recepice_count")
    number.innerHTML = numberOfRecipes + " recettes"
}

// Create cards
function recipesCard(recipes) {
    for(let i = 0; i <recipes.length-1; i++) {

        console.log(recipes[i].ingredients[i])

        // Create article for each cards
        const article = document.createElement('article')
        article.className += 'card'
        article.id = recipes.id
        

        // Create ingredient ant unit for each recipes
        let ingredients = ""  

        for(let j = 0; j <recipes[i].ingredients.length-1; j++) {
            
            let unit =  recipes[i].ingredients[j]?.unit||""

            ingredients+= `<li> ${recipes[i].ingredients[j].ingredient} : ${recipes[i].ingredients[j].quantity} ${unit}</li>`
        }

        // Cards HTML
        article.innerHTML = `
            <div style="margin-bottom= 10px;">
                <img src="../../data/photographies/${recipes[i].image}" alt="image de la recette" /> 
                <div>
                    ${recipes[i].time}
                </div>
                <div>
                    ${recipes[i].name}
                </div>
                <div>
                    ${recipes[i].description}
                </div>
                <ul>
                    ${ingredients}
                </ul>
            </div>
        `
        // Bond cards
        recipesContainer.appendChild(article)
    }
}

// Display page
function displayRecipes(recipes) {
   
    recipesCount(recipes.length)
    recipesCard(recipes)
   
}

// Call display page
displayRecipes(allRecipes)