// Fonction pour afficher le dropdown au clic sur le bouton
function openDropdown(dropdownId) {
    document.getElementById(dropdownId).classList.add("show");
    document.querySelector(".overlay").classList.add("show");
}

// Fermeture des dropdowns
const closeUnusedDropDowns = (usedDropdown = undefined) => {
    const dropdowns = [...document.querySelectorAll(".dropdown_content")];

    if (!usedDropdown) {
        for (let i = 0; i < dropdowns.length; i++) {
            const dropdown = dropdowns[i];
            dropdown.classList.remove("show");
        }
        return;
    }
    
    for (let i = 0; i < dropdowns.length; i++) {
        const dropdown = dropdowns[i];
        if (dropdown.id !== usedDropdown) {
            dropdown.classList.remove("show");
        }
    }
}

// Ferme les dropdowns et ouvre celui où à lui l'évènement
const dropdownClickEvent = (dropdown) => {
    closeUnusedDropDowns(dropdown.nextElementSibling.id);
    openDropdown(dropdown.nextElementSibling.id);
}

// Ecouteur sur les boutons des dropdowns
const dropdowns = document.querySelectorAll(".dropbtn");
for (let i = 0; i < dropdowns.length; i++) {
    const dropdown = dropdowns[i];
    dropdown.addEventListener("click", () => dropdownClickEvent(dropdown));
}

const overlay = document.querySelector(".overlay")

// Fonction pour fermer le dropdown si l'utilisateur clique en dehors de celui-ci
overlay.addEventListener("click", function() {
    if(overlay.classList[0] === "overlay") {
        closeUnusedDropDowns()
        overlay.classList.remove("show");
    }
});

// Ecouteur sur les titres des dropdowns
const dropdownTitles = document.querySelectorAll(".dropdown_title");
for (let i = 0; i < dropdownTitles.length; i++) {
    const dropdown = dropdownTitles[i];
    dropdown.addEventListener("click", () => dropdownClickEvent(dropdown));
}