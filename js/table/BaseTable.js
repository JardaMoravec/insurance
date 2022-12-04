'use strict';

export class BaseTable {

    constructor(persons, evens) {
        this.table = document.createElement("table");
        this.data = persons;
        this.evens = evens;
        this.titles = [];
    }

    create() {
        let header = this.createHeader();
        this.table.appendChild(header);

        for (let person of this.data) {
            person.tableRow = this.createRow(person);
            this.table.appendChild(person.tableRow);
        }
        return this.table;
    }

    createHeader() {
        let header = document.createElement("tr");

        for (let title of this.titles) {
            let th = document.createElement("th");
            th.innerHTML = title;
            header.appendChild(th);
        }
        return header;
    }

    createRow(person) {
        let tr = document.createElement("tr");

        tr.appendChild(this.createButtonBox(person.id, 'Upravit', this.evens['edit']));
        tr.appendChild(this.createButtonBox(person.id, 'Smazat', this.evens['delete']));

        return tr;
    }

    createBox(value) {
        let td = document.createElement("td");
        td.innerHTML = value;
        return td;
    }

    createButtonBox(id, title, event) {
        let td = document.createElement("td");
        let deleteButton = document.createElement("a");
        deleteButton.setAttribute('data-id', id)
        deleteButton.innerHTML = title;
        deleteButton.onclick = event;
        td.appendChild(deleteButton);
        return td;
    }
}
