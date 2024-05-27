// Met en place la liste des ingrédients en minuscule
const getRecipeIngredientsArray = (resource) => {
  let ingredients = [];
  resource.ingredients.forEach((el) => {
    ingredients.push(el.ingredient.toLowerCase());
  });
  return ingredients;
};

// Transforme en minuscule
const listElementToLowerCase = (list) => {
  let res = [];
  list.forEach((el) => {
    res.push(el.toLowerCase());
  });
  return res;
};

// Filtre les ingrédients et élimine les doublons
const filterResourceByIngredients = (el, filter) => {
  let ingredientsFilter = [filter]; // [[SUcre, caroote]]
  if (Array.isArray(filter)) {
      ingredientsFilter = filter;
  }
  const ingredients = getRecipeIngredientsArray(el);
  
  let isSubset = true;
  ingredientsFilter.forEach((ingredientFilter) => {
      if (!ingredients.includes(ingredientFilter)) {
          isSubset = false;
          return;
      }
  });
  
  return isSubset;
};

// Filtre les ustensils et élimine les doublons
const filterResourceByUstensils = (el, filter) => {
  let ustensilsFilter = [filter];
  if (Array.isArray(filter)) {
      ustensilsFilter = filter;
  }
  const formattedList = listElementToLowerCase(el.ustensils);

  let isSubset = true;
  ustensilsFilter.forEach((ustensilFilter) => {
      if (!formattedList.includes(ustensilFilter)) {
          isSubset = false;
          return;
      }
  });

  return isSubset;
};

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

// Filtre appliquée sur les recettes pour obtenir un tableau de celles correspondantes
const filterBy = (resources, filter, types) => {
  const formattedFilter = filter.toLowerCase();

  // Filtrer les ressources pour chaque type de filtre et combiner les résultats
  let filteredResources = resources.filter((el) => 
    types.some((t) => filterFunction[t](el, formattedFilter, t))
  );

  // Éviter les doublons en utilisant un Set pour stocker les IDs uniques
  const resourceSubset = {};
  filteredResources.forEach((el) => {
    resourceSubset[el.id] = el;
  });

  return Object.values(resourceSubset);
};

// Compare plusieurs tableaux pour en repérer les correspondances
const filterByMulti = (resources, filters) => {
  const resourceSubset = [];

  resources.forEach((el) => {
    let isSubset = true; // Pour vérifier si l'élément satisfait tous les filtres

    Object.entries(filters).forEach(([tagFamily, tags]) => {
        if (!tags.length) return;

        const formattedTags = tags.map(tag => tag.toLowerCase());
        if (!filterFunction[tagFamily](el, formattedTags)) {
            isSubset = false;
            return;
        }
    });

    // Si l'élément satisfait tous les filtres, l'ajouter à l'ensemble
    if (isSubset) {
        resourceSubset.push(el);
    }
});
  return resourceSubset;
}

// Contrôleur
const filterFunction = {
  ingredients: filterResourceByIngredients,
  ustensils: filterResourceByUstensils,
  appliance: filterResourceByAppliance,
  name: filterResourceByString,
  description: filterResourceByString,
}