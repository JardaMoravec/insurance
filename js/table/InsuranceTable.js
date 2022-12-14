'use strict';

import {BaseTable} from "./BaseTable.js";

export class InsuranceTable extends BaseTable {

    constructor(persons, evens) {
        super(persons, evens);
        this.titles = ['Název', 'Maximální jištěn', 'Měsiční platba', 'Platnost od', 'Platnost do', '', '', ''];
    }

    createRow(insurance) {
        let tr = document.createElement("tr");

        tr.appendChild(this.createBox(insurance.name));
        tr.appendChild(this.createBox(insurance.priceLimit));
        tr.appendChild(this.createBox(insurance.pricePerMonth));
        tr.appendChild(this.createBox(insurance.validFrom));
        tr.appendChild(this.createBox(insurance.validTo));

        tr.appendChild(this.createButtonBox(insurance.id, 'Info', this.evens['info']));
        tr.appendChild(this.createButtonBox(insurance.id, 'Upravit', this.evens['edit']));
        tr.appendChild(this.createButtonBox(insurance.id, 'Smazat', this.evens['delete']));

        return tr;
    }

}