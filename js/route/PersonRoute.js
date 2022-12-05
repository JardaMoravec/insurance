import {PersonTable} from "../table/PersonTable.js";
import {PersonForm} from "../form/PersonForm.js";
import {Person} from "../model/Person.js";

export const userListRoute = function () {
    let content = document.getElementById('content');
    content.innerHTML = `<h1>${window.menu["person"].title}</h1>`;

    let table = new PersonTable(window.persons, {'info': userInfoRoute, 'edit': userEditRoute, 'delete': userDeleteRoute});
    content.appendChild(table.create());
};

export const userAddRoute = function () {
    let content = document.getElementById('content');
    content.innerHTML = `<h1>${window.menu["add_person"].title}</h1>`;

    let form = new PersonForm(null, userAddSaveRoute);
    content.appendChild(form.create());
};

const userAddSaveRoute = function (event) {
    const form = event.target;

    const person = Person.fromForm(form);
    person.id = 10;
    console.log(person);

    window.persons.push(person);

    userListRoute();
    return false;
}

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

    let form = new PersonForm(user, userEditSaveRoute);
    content.appendChild(form.create());
};

const userEditSaveRoute = function (event) {
    const form = event.target;

    const person = Person.fromForm(form);

    for (let i = 0; i < window.persons.length; i++) {
        if (window.persons[i].id === person.id) {
            window.persons[i] = person;
        }
    }

    userListRoute();
    return false;
}

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

export const userInfoRoute = function (event) {
    let content = document.getElementById('content');
    let id = parseInt(event.target.dataset['id']);
    content.innerHTML = `<h1>Informace o pojištěnci s id:${id}</h1>`;

    let user;
    for (let i = 0; i < window.persons.length; i++) {
        if (window.persons[i].id === id) {
            user = window.persons[i];
        }
    }

    let table = document.createElement("table");
    let tr1 = document.createElement("tr");

    let thName = document.createElement("th");
    thName.innerText = "Jméno a přijmení:";
    tr1.appendChild(thName);

    let tdName = document.createElement("td");
    tdName.innerText = `${user.firstName} ${user.sureName}`;
    tr1.appendChild(tdName);

    let tr2 = document.createElement("tr");

    let thAge = document.createElement("th");
    thAge.innerText = "Věk:";
    tr2.appendChild(thAge);

    let tdAge = document.createElement("td");
    tdAge.innerText = `${user.age}`;
    tr2.appendChild(tdAge);

    let tr3 = document.createElement("tr");

    let thPhone = document.createElement("th");
    thPhone.innerText = "Telefon:";
    tr3.appendChild(thPhone);

    let tdPhone = document.createElement("td");
    tdPhone.innerText = `${user.phoneNumber}`;
    tr3.appendChild(tdPhone);

    table.appendChild(tr1);
    table.appendChild(tr2);
    table.appendChild(tr3);
    content.appendChild(table);

    let insuranceListTitle = document.createElement("h2");
    insuranceListTitle.innerText = "Seznam pojištění";
    content.appendChild(insuranceListTitle);
}



