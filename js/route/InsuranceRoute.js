'use strict';

import {InsuranceForm} from "../form/InsuranceForm.js";
import {Insurance} from "../model/Insurance.js";
import {InsuranceTable} from "../table/InsuranceTable.js";
import {userInfo} from "./PersonRoute.js";
import {addRow} from "../function.js";


export const insuranceListRoute = function () {
    let content = document.getElementById('content');
    content.innerHTML = `<h1>${window.menu["insurance"].title}</h1>`;

    let insuranceList = [];
    for (let person of window.persons) {
        insuranceList = insuranceList.concat(person.insuranceList);
    }

    let table = new InsuranceTable(insuranceList, {
        'info': insuranceInfoRoute,
        'edit': insuranceEditRoute,
        'delete': insuranceDeleteRoute
    });
    content.appendChild(table.create());
};

export const insuranceAddRoute = function (event) {
    let content = document.getElementById('content');
    content.innerHTML = `<h1>Přidání nového pojištění</h1>`;

    let defaultData = [];
    defaultData["person"] = parseInt(event.target.dataset.person);
    defaultData["name"] = "";

    let form = new InsuranceForm(defaultData, insuranceAddSaveRoute);
    content.appendChild(form.create());
};

const insuranceAddSaveRoute = function (event) {
    const form = event.target;

    try {
        const insurance = Insurance.fromForm(form);
        insurance.id = window.persons.getInsuranceLastId() + 1;

        const formData = new FormData(form);
        const personId = parseInt(formData.get("person"));

        for (let i = 0; i < window.persons.length; i++) {
            if (window.persons[i].id === personId) {
                window.persons[i].insuranceList.push(insurance);
            }
        }
        userInfo(personId);

    } catch (e) {
        alert("Data se nepodařilo uložit!");
    }

    return false;
}

export const insuranceEditRoute = function (event) {
    let content = document.getElementById('content');
    let id = parseInt(event.target.dataset['id']);
    content.innerHTML = `<h1>Úprava pojištění s id:${id}</h1>`;

    let insurance;
    window.persons.popById(id, function (i, e) {
        insurance = window.persons[i].insuranceList[e];
        insurance.person = window.persons[i].id;
    });

    insurance.validTo = insurance.validTo != null ? insurance.validTo.split('T')[0] : null;
    insurance.validFrom = insurance.validFrom != null ? insurance.validFrom.split('T')[0] : null;

    let form = new InsuranceForm(insurance, insuranceEditSaveRoute);
    content.appendChild(form.create());
};

export const insuranceEditSaveRoute = function (event) {
    const form = event.target;
    let personId = null;

    try {
        const insurance = Insurance.fromForm(form);
        console.log(insurance);

        window.persons.popById(insurance.id, function (i, e) {
            window.persons[i].insuranceList[e] = insurance;
            personId = window.persons[i].id;
        });

        userInfo(personId);
    } catch (e) {
        alert("Data se nepodařilo uložit!");
    }

    return false;
}

export const insuranceInfoRoute = function (event) {
    let content = document.getElementById('content');
    let id = parseInt(event.target.dataset['id']);
    content.innerHTML = `<h1>Informace o pojištění s id:${id}</h1>`;

    let insurance;
    window.persons.popById(id, function (i, e) {
        insurance = window.persons[i].insuranceList[e];
    });

    let table = document.createElement("table");
    table.addRow = addRow;

    table.addRow("Název:", insurance.name);
    table.addRow("Maximální jištění:", `${insurance.priceLimit} Kč`);
    table.addRow("Měsiční platba:", `${insurance.pricePerMonth} Kč`);
    table.addRow("Platnost od:", insurance.validFrom);
    table.addRow("Platnost do:", insurance.validTo);

    content.appendChild(table);
}

export const insuranceDeleteRoute = function (event) {
    if (!confirm("Opravdu si přejete odstranit pojištění?")) {
        return;
    }
    let id = parseInt(event.target.dataset['id']);
    let row = event.target.closest("tr");

    let ok = false;

    window.persons.popById(id, function (i, e) {
        console.log(window.persons[i].insuranceList[e]);
        window.persons[i].insuranceList.splice(e, 1);
        ok = true;
    });

    if (ok) {
        row.remove();
    }
};
