// Fonction pour afficher le dropdown au clic sur le bouton
function openDropdown(dropdownId) {
    document.getElementById(dropdownId).classList.add("show");
    document.querySelector(".overlay").classList.add("show");
}

// Fermeture des dropdowns
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

// Ferme les dropdowns et ouvre celui où à lui l'évènement
const dropdownClickEvent = (dropdown) => {
    closeUnusedDropDowns(dropdown.nextElementSibling.id);
    openDropdown(dropdown.nextElementSibling.id);
}

// Ecouteur sur les boutons des dropdowns
const dropdownController = (dropdown) => dropdown.addEventListener("click", () => dropdownClickEvent(dropdown));
[...document.querySelectorAll(".dropbtn")].forEach(dropdownController);

const overlay = document.querySelector(".overlay")

// Fonction pour fermer le dropdown si l'utilisateur clique en dehors de celui-ci
overlay.addEventListener("click", function() {
    if(overlay.classList[0] === "overlay") {
        closeUnusedDropDowns()
        overlay.classList.remove("show");
    }
});

// Ecouteur sur les titres des dropdowns
[...document.querySelectorAll(".dropdown_title")].forEach(dropdown => {
    dropdown.addEventListener("click", () => dropdownClickEvent(dropdown))
})