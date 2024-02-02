function recipesCount(numberOfRecipes) {
    console.log(numberOfRecipes)
    let number = document.querySelector(".recepice_count")
    number.innerHTML = numberOfRecipes + "recettes"
}

// recipesCount("bonjour ")