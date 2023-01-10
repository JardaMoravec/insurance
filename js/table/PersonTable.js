'use strict';

import {BaseTable} from "./BaseTable.js";

export class PersonTable extends BaseTable {

    constructor(persons, evens) {
        super(persons, evens);
        this.titles = ['Jméno', 'Příjmení', 'Věk', 'Telefon', 'Počet pojištění', '', '', ''];
    }

    createRow(person) {
        let tr = document.createElement("tr");

        tr.appendChild(this.createBox(person.firstName));
        tr.appendChild(this.createBox(person.sureName));
        tr.appendChild(this.createBox(person.age));
        tr.appendChild(this.createBox(person.phoneNumber));
        tr.appendChild(this.createBox(person.insuranceList.length));

        tr.appendChild(this.createButtonBox(person.id, 'Info', 'bi-person', this.evens['info']));
        tr.appendChild(this.createButtonBox(person.id, 'Upravit', 'bi-person-gear', this.evens['edit']));
        tr.appendChild(this.createButtonBox(person.id, 'Smazat', 'bi-person-x', this.evens['delete']));

        return tr;
    }

}