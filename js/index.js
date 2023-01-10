'use strict';

import {userListRoute, userAddRoute} from "./route/PersonRoute.js";
import {insuranceListRoute, insuranceAddRoute} from "./route/InsuranceRoute.js";
import {getInsuranceLastId, getPersonLastId, loadFromLocalStorage, popById, saveChanges} from "./function.js";

window.menu = {
    'person': {'label': 'Pojištěnci', 'title': 'Seznam pojištěnců', 'route': userListRoute, 'icon': 'bi-person'},
    'insurance': {
        'label': 'Pojištění',
        'title': 'Seznam pojištění',
        'route': insuranceListRoute,
        'icon': 'bi-database'
    },
    'add_person': {
        'label': 'Nový pojištěnec',
        'title': 'Nový pojištěnec',
        'route': userAddRoute,
        'icon': 'bi-person-add'
    },
    'add_insurance': {
        'label': 'Nové pojištění',
        'title': 'Nové pojištění',
        'route': insuranceAddRoute,
        'icon': 'bi-database-add'
    },
};

window.onload = function () {
    let menuElm = document.getElementById('mainNav');
    for (let key in menu) {
        let li = document.createElement("li");
        li.onclick = menu[key].route;

        let icon = document.createElement("span");
        icon.classList.add("bi", menu[key].icon, "d-block", "mx-auto");
        li.appendChild(icon);

        let span = document.createElement("span");
        span.innerHTML = menu[key].label;

        span.classList.add("nav-link");
        span.classList.add("text-secondary");
        li.appendChild(span);
        menuElm.appendChild(li);
    }
    let li = document.createElement("li");
    li.classList.add("save");

    let icon = document.createElement("span");
    icon.classList.add("bi", "bi-save", "d-block", "mx-auto");
    li.appendChild(icon);

    let span = document.createElement("span");
    span.setAttribute("title", "Uloží všechny provedené změny do paměti.");
    span.innerHTML = "Uložit změny";
    span.onclick = saveChanges;
    span.classList.add("nav-link");
    span.classList.add("text-secondary");
    li.appendChild(span);
    menuElm.appendChild(li);

    window.persons = [];

    window.persons.popById = popById;
    window.persons.loadFromLocalStorage = loadFromLocalStorage;
    window.persons.getPersonLastId = getPersonLastId;
    window.persons.getInsuranceLastId = getInsuranceLastId;

    window.persons.loadFromLocalStorage();
}


