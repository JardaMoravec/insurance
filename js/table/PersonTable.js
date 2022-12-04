'use strict';

import {BaseTable} from "./BaseTable.js";

export class PersonTable extends BaseTable {

    constructor(persons, evens) {
        super(persons, evens);
        this.titles = ['Jméno', 'Příjmení', 'Věk', 'Telefon', '', ''];
    }

    createRow(person) {
        let tr = document.createElement("tr");

        tr.appendChild(this.createBox(person.firstName));
        tr.appendChild(this.createBox(person.sureName));
        tr.appendChild(this.createBox(person.age));
        tr.appendChild(this.createBox(person.phoneNumber));

        tr.appendChild(this.createButtonBox(person.id, 'Upravit', this.evens['edit']));
        tr.appendChild(this.createButtonBox(person.id, 'Smazat', this.evens['delete']));

        return tr;
    }

}