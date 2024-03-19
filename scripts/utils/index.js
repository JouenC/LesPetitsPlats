// commentaire
const getRecipeIngredientsArray = (resource) => {
  let ingredients = [];
  for (let el of resource.ingredients) {
    ingredients.push(el.ingredient.toLowerCase())
  }
  return ingredients
}

const listElementToLowerCase = (list) => {
  let res = [];
  for (const el of list) {
    res.push(el.toLowerCase());
  }
  return res;
}



//
const filterResourceByIngredients = (el, filter) => {
    const ingredients = getRecipeIngredientsArray(el);
    for (const ingredient of ingredients) {
      if (ingredient.includes(filter)) return true;
    }
    return false; 
}



const filterResourceByUstensils = (el, filter) => {
    const formattedList = listElementToLowerCase(el.ustensils)
    for (const ustensil of formattedList) {
      if (ustensil.includes(filter)) return true;
    }
    return false;
}

// const filterResourceByAppliance = (el, filter) => el.appliance.toLowerCase().inclurdes(filter);
const filterResourceByAppliance = (el, filter) => el.appliance.toLowerCase().includes(filter);
const filterResourceByString = (el, filter, researchPool) => el[researchPool].toLowerCase().includes(filter);

// Search by time.
const filterResourceByTime = (el, finishHour, finishMinute) => {
  let resourceSubset = []

  // Search present time in minute
  let now = new Date()
  let hours = now.getHours()
  let minutes = now.getMinutes()
  let minutesTime = hours * 60 + minutes

  // Recipe's time
  const time = parseInt(el.time)

  // Search recepice's finish hour in minute
  let filter = ''
  if (finishHour < 24 || finishMinute < 61) {
    filter = parseInt(finishHour * 60 + finishMinute)
  }

  // Verification
  if (minutesTime + time < filter) {
    resourceSubset.push(el)
   }
   return resourceSubset
}

/**
 * The `filterBy` function filters a list of resources based on a specified filter and types using a
 * set of filter functions.
 * @param resources - Resources is an array of objects containing information about different items.
 * @param filter - The `filter` parameter is the keyword or criteria that you want to use to filter the
 * resources.
 * @param types - Types is an array that contains the different types of filters that can be applied to
 * the resources.
 * @returns The `filterBy` function returns a subset of resources that match the specified filter
 * criteria based on the types provided.
 */
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



const filterFunction = {
  ingredients: filterResourceByIngredients,
  ustensils: filterResourceByUstensils,
  appliance: filterResourceByAppliance,
  name: filterResourceByString,
  description: filterResourceByString,
  time: filterResourceByTime,
}



//*************************************************/
// The `Filters` class is used to filter           /
// resources based on different criteria and types /
//*************************************************/
class Filters {
  _resources = recipes;
  _currentSubset = recipes;
  _searchValue = '';

  filterBy(types) {
    let resourceSubset = [];
    for (const el of this._resources) {
      for (const t of types) {
        if (filterFunction[t](el, this._searchValue, t)) {
          resourceSubset.push(el);
          break;
        }
      }
    }
    this._currentSubset = resourceSubset;
    return resourceSubset;
  }

  set searchValue(value) {
    if (value.length < 2) {
      console.log("Veuillez saisir au moins 3 caractères.")
      return
    }
    this._searchValue = value.toLowerCase();
    this.filterBy(["name", "description"]);
  }

  set tagValue(value) {
    this._searchValue = value.toLowerCase();
    this.filterBy(["ingredients", "ustensils", "appliance"]);
  }

  get resources() {
    return this._resources;
  }

  get currentSubset() {
    return this._currentSubset;
  }

  get ingredients() {
    const ingredients = [];
    for (const el of this._currentSubset) {
      for (const ingredient of el.ingredients) {
        ingredients.push(ingredient.ingredient.toLowerCase());
      }
    }
    return [...new Set(ingredients)];
  }

  get ustensils() {
    const ustensils = [];
    for (const el of this._currentSubset) {
      for (const ustensil of el.ustensils) {
        ustensils.push(ustensil.toLowerCase());
      }
    }
    return [...new Set(ustensils)];
  }

  get appliances() {
    const appliances = [];
    for (const el of this._currentSubset) {
      appliances.push(el.appliance.toLowerCase());
    }
    return [...new Set(appliances)];
  }

  get count() {
    return this._currentSubset.length;
  }

}

const filters = new Filters();
