'use strict';

import {PersonTable} from "../table/PersonTable.js";
import {PersonForm} from "../form/PersonForm.js";
import {Person} from "../model/Person.js";
import {insuranceAddRoute, insuranceDeleteRoute, insuranceEditRoute, insuranceInfoRoute} from "./InsuranceRoute.js";
import {InsuranceTable} from "../table/InsuranceTable.js";
import {addRow} from "../function.js";

export const userListRoute = function () {
    let content = document.getElementById('content');
    content.innerHTML = `<h1>${window.menu["person"].title}</h1>`;

    let table = new PersonTable(window.persons, {
        'info': userInfoRoute,
        'edit': userEditRoute,
        'delete': userDeleteRoute
    });
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

    try {
        const person = Person.fromForm(form);
        person.id = window.persons.getPersonLastId() + 1;

        window.persons.push(person);
    } catch (e) {
        alert("Data se nepodařilo uložit!");
    }

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

    try {
        const person = Person.fromForm(form);

        for (let i = 0; i < window.persons.length; i++) {
            if (window.persons[i].id === person.id) {
                person.insuranceList = window.persons[i].insuranceList;
                window.persons[i] = person;
            }
        }
    } catch (e) {
        alert("Data se nepodařilo uložit!");
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
    let id = parseInt(event.target.dataset['id']);
    userInfo(id);
}

export const userInfo = function (id) {
    id = parseInt(id);
    let content = document.getElementById('content');
    content.innerHTML = `<h1>Informace o pojištěnci s id:${id}</h1>`;

    let user;
    for (let i = 0; i < window.persons.length; i++) {
        if (window.persons[i].id === id) {
            user = window.persons[i];
        }
    }

    let table = document.createElement("table");
    table.addRow = addRow;

    table.addRow("Jméno a přijmení:", `${user.firstName} ${user.sureName}`);
    table.addRow("Věk:", user.age);
    table.addRow("Telefon:", user.phoneNumber);
    table.addRow("Počet pojištění:", user.insuranceList.length);
    table.addRow("Majetek pojištěna na celkovou částku:", `${user.totalPriceLimit} Kč`);
    table.addRow("Celková mesíční platba pojištění:", `${user.totalPricePreMonth} Kč`);

    content.appendChild(table);

    let insuranceListTitle = document.createElement("h2");
    insuranceListTitle.innerText = "Seznam pojištění";
    content.appendChild(insuranceListTitle);

    let newInsuranceButton = document.createElement("button");
    newInsuranceButton.innerHTML = `<span class="bi bi-database-add"></span> Přidat nové pojištění`;
    newInsuranceButton.setAttribute("type", "button");
    newInsuranceButton.setAttribute("data-person", id);
    newInsuranceButton.classList.add("btn", "btn-success", "mb-3")
    newInsuranceButton.onclick = insuranceAddRoute;

    content.appendChild(newInsuranceButton);

    let insuranceTable = new InsuranceTable(user.insuranceList, {
        'info': insuranceInfoRoute,
        'edit': insuranceEditRoute,
        'delete': insuranceDeleteRoute
    });
    content.appendChild(insuranceTable.create());
}



