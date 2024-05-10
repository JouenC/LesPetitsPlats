// Met en place la liste des ingrédients en minuscule
const getRecipeIngredientsArray = (resource) => {
  let ingredients = [];
  for (let el of resource.ingredients) {
    ingredients.push(el.ingredient.toLowerCase())
  }
  return ingredients
}

// Transforme en minuscule
const listElementToLowerCase = (list) => {
  let res = [];
  for (const el of list) {
    res.push(el.toLowerCase());
  }
  return res;
}



// Filtre les ingrédients et élimine les doublons
const filterResourceByIngredients = (el, filter) => {
    let ingredientsFilter = [filter]; // [[SUcre, caroote]]
    if (Array.isArray(filter)) {
      ingredientsFilter = filter
    }
    const ingredients = getRecipeIngredientsArray(el);
      for (ingredientFilter of ingredientsFilter) {
        if (!ingredients.includes(ingredientFilter)) return false;
      }

    return true; 
}

// Filtre les ustensils et élimine les doublons
const filterResourceByUstensils = (el, filter) => {
  let ustensilsFilter = [filter];
  if (Array.isArray(filter)) {
    ustensilsFilter = filter
  }
    const formattedList = listElementToLowerCase(el.ustensils);
    for (ustensilFilter of ustensilsFilter) {
      if (!formattedList.includes(ustensilFilter)) return false;
    }
    return true;
}

// Filtre les appliances et élimine les doublons
const filterResourceByAppliance = (el, filter) => {
  let appliancesFilter = [filter];
  if (Array.isArray(filter)) {
    appliancesFilter = filter
  }
  if (!appliancesFilter.includes(el.appliance.toLowerCase())) return false;
  return true
}

// Filtre permettant de trouver des correspondances dans une liste à partir d'une suite de caractères donnée
const filterResourceByString = (el, filter, researchPool) => el[researchPool].toLowerCase().includes(filter);

// // Search by time.
// const filterResourceByTime = (el, finishHour, finishMinute) => {
//   let resourceSubset = []

//   // Search present time in minute
//   let now = new Date()
//   let hours = now.getHours()
//   let minutes = now.getMinutes()
//   let minutesTime = hours * 60 + minutes

//   // Recipe's time
//   const time = parseInt(el.time)

//   // Search recepice's finish hour in minute
//   let filter = ''
//   if (finishHour < 24 || finishMinute < 61) {
//     filter = parseInt(finishHour * 60 + finishMinute)
//   }

//   // Verification
//   if (minutesTime + time < filter) {
//     resourceSubset.push(el)
//    }
//    return resourceSubset
// }

// Filtre appliquée sur les recettes pour obtenir un tableau de celles correspondantes
const filterBy = (resources, filter, types) => { 
  let resourceSubset = [];
  const formattedFilter = filter.toLowerCase();
  for (const el of resources) {
    for (const t of types) {
      if (filterFunction[t](el, formattedFilter, t)) {
        resourceSubset.push(el);
        break;
      }
    }
  }
  return resourceSubset;
}

// Compare plusieurs tableaux pour en repérer les correspondances
const filterByMulti = (resources, filters) => {
  const resourceSubset = [];

  for (const el of resources) {
    let isSubset = true; // Pour vérifier si l'élément satisfait tous les filtres

    for (let [tagFamily, tags] of Object.entries(filters)) {
      if (!tags.length) continue;

      const formattedTags = tags.map(tag => tag.toLowerCase());
      if (!filterFunction[tagFamily](el, formattedTags)) {
        isSubset = false;
        break;
      }
    }
  
    // Si l'élément satisfait tous les filtres, l'ajouter à l'ensemble
    if (isSubset) {
      resourceSubset.push(el);
    }
  }
  return resourceSubset;
}

// const filterBySecondary = (resources, filter, type) {
//   let resourceSubset = [];
//   const formattedFilter = filter.toLowerCase();
//   for (const el of resources) {
//     if (filterFunction[type](el, formattedFilter, re)) {
//       resourceSubset.push(el)
//       break
//     }
//   }
// }

// Contrôleur
const filterFunction = {
  ingredients: filterResourceByIngredients,
  ustensils: filterResourceByUstensils,
  appliance: filterResourceByAppliance,
  name: filterResourceByString,
  description: filterResourceByString,
  // time: filterResourceByTime,
}



// //*************************************************/
// // The `Filters` class is used to filter           /
// // resources based on different criteria and types /
// //*************************************************/
// class Filters {
//   _resources = recipes;
//   _currentSubset = recipes;
//   _searchValue = '';

//   filterBy(types) {
//     let resourceSubset = [];
//     for (const el of this._resources) {
//       for (const t of types) {
//         if (filterFunction[t](el, this._searchValue, t)) {
//           resourceSubset.push(el);
//           break;
//         }
//       }
//     }
//     this._currentSubset = resourceSubset;
//     return resourceSubset;
//   }

//   set searchValue(value) {
//     if (value.length < 2) {
//       return
//     }
//     this._searchValue = value.toLowerCase();
//     this.filterBy(["name", "description"]);
//   }

//   set tagValue(value) {
//     this._searchValue = value.toLowerCase();
//     this.filterBy(["ingredients", "ustensils", "appliance"]);
//   }

//   get resources() {
//     return this._resources;
//   }

//   get currentSubset() {
//     return this._currentSubset;
//   }

//   get ingredients() {
//     const ingredients = [];
//     for (const el of this._currentSubset) {
//       for (const ingredient of el.ingredients) {
//         ingredients.push(ingredient.ingredient.toLowerCase());
//       }
//     }
//     return [...new Set(ingredients)];
//   }

//   get ustensils() {
//     const ustensils = [];
//     for (const el of this._currentSubset) {
//       for (const ustensil of el.ustensils) {
//         ustensils.push(ustensil.toLowerCase());
//       }
//     }
//     return [...new Set(ustensils)];
//   }

//   get appliances() {
//     const appliances = [];
//     for (const el of this._currentSubset) {
//       appliances.push(el.appliance.toLowerCase());
//     }
//     return [...new Set(appliances)];
//   }

//   get count() {
//     return this._currentSubset.length;
//   }

// }

// const filters = new Filters();
