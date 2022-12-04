import {PersonTable} from "../table/PersonTable.js";
import {PersonForm} from "../form/PersonForm.js";

export const userListRoute = function () {
    let content = document.getElementById('content');
    content.innerHTML = `<h1>${window.menu["person"].title}</h1>`;

    let table = new PersonTable(window.persons, {'edit': userEditRoute, 'delete': userDeleteRoute});
    content.appendChild(table.create());
};

export const userAddRoute = function (event) {
    let content = document.getElementById('content');
    content.innerHTML = `<h1>${window.menu["add_person"].title}</h1>`;

    let form = new PersonForm();
    content.appendChild(form.create());
};

export const userEditRoute = function (event) {
    let content = document.getElementById('content');
    let id = parseInt(event.target.dataset['id']);
    content.innerHTML = `<h1>Úprava pojištěnce s id:${id}</h1>`;

    let user;
    for (let i = 0; i < window.persons.length; i++) {
        if (window.persons[i].id === id) {
            user = window.persons[i];
        }
    }

    let form = new PersonForm(user);
    content.appendChild(form.create());
};

export const userDeleteRoute = function (event) {
    if (!confirm("Opravdu si přejete odstranit pojištěnce?")) {
        return;
    }
    let id = parseInt(event.target.dataset['id']);
    let row = event.target.closest("tr");

    let ok = false;

    for (let i = 0; i < window.persons.length; i++) {
        if (window.persons[i].id === id) {
            window.persons.splice(i, 1);
            ok = true;
        }
    }
    if (ok) {
        row.remove();
    }
};
