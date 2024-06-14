let formulaire = document.querySelector(".all"); // Sélectionne l'élément du formulaire
let information = document.querySelector(".information"); // Sélectionne l'élément d'information

function bouton() {
    // Affiche ou cache le formulaire
    if (formulaire.style.display === "none" || formulaire.style.display === "") {//triple = c'est pour vérifier une condition.// if = si c'est égale a truc alors on fait machin.

        formulaire.style.display = "block"; // Affiche le formulaire
    } else {//sinon tu fais. Il n'y a pas de condition.//
        formulaire.style.display = "none"; // Cache le formulaire
    }
}

function showinfo() {
    // Affiche ou cache les informations
    if (information.style.display === "none" || information.style.display === "") {
        information.style.display = "block"; // Affiche les informations
    } else {
        information.style.display = "none"; // Cache les informations
    }
}

function showcontact(element) {
    // Affiche ou cache les détails du contact
    let show = element.nextElementSibling;
    if (show.style.display === "none" || show.style.display === "") {
        show.style.display = "block"; // Affiche les détails du contact
    } else {
        show.style.display = "none"; // Cache les détails du contact
    }
}

$(document).ready(function () {
    let editIndex = null; // Index du contact en cours d'édition
    let contacts = []; // Tableau pour stocker les contacts

    function loadContacts() {
        // Charge les contacts depuis le stockage local
        contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.forEach((contact, index) => {
            addContactHTML(contact, index); // Ajoute chaque contact au HTML
        });
    }

    function addContact() {
        // Ajoute un nouveau contact
        let civility = $('#civility-select').val();
        let name = $('#name-input').val();
        let lastname = $('#lastname-input').val();
        let number = $('#number-input').val();

        if (name && lastname && number) {
            let contact = {
                civility: civility,
                name: name,
                lastname: lastname,
                number: number,
            };

            if (editIndex !== null) {
                // Mise à jour d'un contact existant
                contacts[editIndex] = contact;
                localStorage.setItem('contacts', JSON.stringify(contacts));
                $('#liste-utilisateur').empty(); // Vide la liste des contacts
                loadContacts(); // Recharge les contacts
                editIndex = null;
            } else {
                // Ajout d'un nouveau contact
                contacts.push(contact);
                localStorage.setItem('contacts', JSON.stringify(contacts));
                addContactHTML(contact, contacts.length - 1);
            }
        } else {
            alert('Please complete all fields.'); // Alerte si des champs sont vides
        }
    }

    function addContactHTML(contact, index) {
        // Ajoute le contact au HTML
        let user = `<li>
            <p class="name-user" onclick="showcontact(this)">${contact.name} ${contact.lastname}</p>
            <div class="show" style="display: none;">
                <p class="complet-name">${contact.civility} ${contact.lastname} ${contact.name}</p>
                <p class="number-user">${contact.number}</p>
                <p class="modification bouton-action" data-index="${index}"><i class="fas fa-pen"></i> Editer ce contact</p>
                <p class="suppression bouton-action" data-index="${index}"><i class="fas fa-trash"></i> Supprimer ce contact</p>
            </div>
        </li>`;

        $('#liste-utilisateur').append(user); // Ajoute le contact à la liste
        $('#civility-select').val(''); // Réinitialise le formulaire
        $('#name-input').val('');
        $('#lastname-input').val('');
        $('#number-input').val('');
        bouton(); // Cache le formulaire
    }

    function deleteAllContacts() {
        // Supprime tous les contacts
        localStorage.removeItem('contacts');
        $('#liste-utilisateur').empty();
        contacts = [];
    }

    // Délégation d'événements pour les éléments ajoutés dynamiquement
    $(document).on('click', '.modification', function () {
        editIndex = $(this).data('index'); // Récupère l'index du contact à modifier
        let contact = contacts[editIndex];
        $('#civility-select').val(contact.civility);
        $('#name-input').val(contact.name);
        $('#lastname-input').val(contact.lastname);
        $('#number-input').val(contact.number);
        bouton(); // Affiche le formulaire pour modification
    });

    $(document).on('click', '.suppression', function () {
        let index = $(this).data('index'); // Récupère l'index du contact à supprimer
        contacts.splice(index, 1); // Supprime le contact du tableau
        localStorage.setItem('contacts', JSON.stringify(contacts));
        $('#liste-utilisateur').empty(); // Vide la liste des contacts
        loadContacts(); // Recharge les contacts
    });

    // Événement du bouton d'ajout de contact
    $('.enter').click(function () {
        addContact(); // Ajoute le contact
    });

    // Événement du bouton de suppression de tous les contacts
    $('#trash').click(function () {
        deleteAllContacts(); // Supprime tous les contacts
    });

    // Charge les contacts lors du chargement de la page
    loadContacts();
});
