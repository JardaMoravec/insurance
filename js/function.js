'use strict';

import {Person} from "./model/Person.js";
export const saveChanges = function () {
    localStorage.setItem("persons", JSON.stringify(window.persons));
    alert("Všechna data byla uložena");
}
export const popById = function (id, event) {
    for (let i = 0; i < this.length; i++) {
        for (let e = 0; e < this[i].insuranceList.length; e++) {
            if (this[i].id === id) {
                return event(i, e);
            }
        }
    }
}
export const getPersonLastId = function () {
    let lastId = 0;
    for (let person of this) {
        if (person.id > lastId) {
            lastId = person.id;
        }
    }
    return lastId;
}

export const getInsuranceLastId = function () {
    let lastId = 0;
    for (let person of this) {
        for (let insurance of person.insuranceList) {
            if (insurance.id > lastId) {
                lastId = person.id;
            }
        }
    }
    return lastId;
}

export const loadFromLocalStorage = function () {
    const jsonPersonList = JSON.parse(localStorage.getItem("persons"));
    if (jsonPersonList != null) {
        for (let person of jsonPersonList) {
            this.push(Person.fromJson(person));
        }
    }
}