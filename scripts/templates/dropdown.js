// Fonction pour afficher le dropdown au clic sur le bouton
/**
 * The function `openDropdown` adds the "show" class to a specified dropdown element and overlay.
 * @param {string} dropdownId - The `dropdownId` parameter in the `openDropdown` function is a string that
 * represents the ID of the dropdown element that you want to open.
 */
function openDropdown(dropdownId) {
    document.getElementById(dropdownId).classList.add("show");
    document.querySelector(".overlay").classList.add("show");
}

/**
 * The function `closeUnusedDropDowns` closes all dropdowns except for the one specified as
 * `usedDropdown`.
 * @param {string} usedDropdown [usedDropdown] - The `usedDropdown` parameter in the `closeUnusedDropDowns` function is used
 * to specify the dropdown that should remain open while closing all other dropdowns. If a
 * `usedDropdown` is provided, all dropdowns except the one with the specified ID will have the "show"
 * class removed to
 */
const closeUnusedDropDowns = (usedDropdown = undefined) => {
    const dropdowns = [...document.querySelectorAll(".dropdown_content")];

    if (!usedDropdown) {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove("show");
        });
        return;
    }

    dropdowns.forEach(dropdown => {
        if (dropdown.id !== usedDropdown) {
            dropdown.classList.remove("show");
        }
    });
}

/**
 * The function `dropdownClickEvent` closes any unused dropdowns and opens the dropdown associated with
 * the clicked element.
 * @param {Element} dropdown - The `dropdown` parameter in the `dropdownClickEvent` function is a reference to
 * the dropdown element that was clicked on by the user.
 */
const dropdownClickEvent = (dropdown) => {
    closeUnusedDropDowns(dropdown.nextElementSibling.id);
    openDropdown(dropdown.nextElementSibling.id);
}

const dropdownController = (dropdown) => dropdown.addEventListener("click", () => dropdownClickEvent(dropdown));
[...document.querySelectorAll(".dropbtn")].forEach(dropdownController);

// Ajoutez des écouteurs d'événements pour chaque bouton correspondant
// document.getElementById("btn_ingredient").addEventListener("click", function(e) {
//     e.stopPropagation();
//     closeUnusedDropDowns("myDropdown_ingredients");
//     openDropdown("btn_ingredient", "myDropdown_ingredients");
// });

// document.getElementById("btn_appliance").addEventListener("click", function(e) {
//     e.stopPropagation();
//     closeUnusedDropDowns("myDropdown_appliance");
//     openDropdown("btn_appliance", "myDropdown_appliance");
// });

// document.getElementById("btn_ustensils").addEventListener("click", function(e) {
//     e.stopPropagation();
//     closeUnusedDropDowns("myDropdown_ustensils");
//     openDropdown("btn_ustensils", "myDropdown_ustensils");
// });

const overlay = document.querySelector(".overlay")

// Fonction pour fermer le dropdown si l'utilisateur clique en dehors de celui-ci
overlay.addEventListener("click", function() {
    if(overlay.classList[0] === "overlay") {
        closeUnusedDropDowns()
        overlay.classList.remove("show");
    }
});