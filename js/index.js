'use strict';

/*
*  @todo kontroly dat a hlasky
*  @todo bootstrap
*  @todo info pojištěni
*  @todo editace pojištěni
**/

import {userListRoute, userAddRoute} from "./route/PersonRoute.js";
import {insuranceListRoute, insuranceAddRoute} from "./route/InsuranceRoute.js";
import {getInsuranceLastId, getPersonLastId, loadFromLocalStorage, popById, saveChanges} from "./function.js";

window.menu = {
    'person': {'label': 'Pojištěnci', 'title': 'Seznam pojištěnců', 'route': userListRoute},
    'insurance': {'label': 'Pojištění', 'title': 'Seznam pojištění', 'route': insuranceListRoute},
    'add_person': {'label': 'Nový pojištěnec', 'title': 'Nový pojištěnec', 'route': userAddRoute},
    'add_insurance': {'label': 'Nové pojištění', 'title': 'Nové pojištění', 'route': insuranceAddRoute},
};

window.onload = function () {
    let menuElm = document.getElementById('mainNav');
    for (let key in menu) {
        let li = document.createElement("li");
        li.innerHTML = menu[key].label;
        li.onclick = menu[key].route;
        menuElm.appendChild(li);
    }
    let li = document.createElement("li");
    li.setAttribute("title", "Uloží všechny provedené změny do paměti.");
    li.classList.add("save");
    li.innerHTML = "Uložit změny";
    li.onclick = saveChanges;
    menuElm.appendChild(li);

    window.persons = [];

    window.persons.popById = popById;
    window.persons.loadFromLocalStorage = loadFromLocalStorage;
    window.persons.getPersonLastId = getPersonLastId;
    window.persons.getInsuranceLastId = getInsuranceLastId;

    window.persons.loadFromLocalStorage();
}


