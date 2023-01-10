'use strict';

export class BaseTable {

    constructor(persons, evens, cssClass = "table-hover") {
        this.table = document.createElement("table");
        this.table.classList.add(cssClass);
        this.data = persons;
        this.evens = evens;
        this.titles = [];
    }

    create() {
        let header = this.createHeader();
        this.table.appendChild(header);

        if (this.data.length > 0) {
            for (let person of this.data) {
                person.tableRow = this.createRow(person);
                this.table.appendChild(person.tableRow);
            }
        } else {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            td.innerText = "žádné údaje";
            td.setAttribute("colspan", this.titles.length + 3)

            tr.appendChild(td);
            this.table.appendChild(tr);
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
        td.innerHTML = (value != null ? value : "nezadáno");
        return td;
    }

    createButtonBox(id, title, icon, event) {
        let td = document.createElement("td");
        let deleteButton = document.createElement("a");
        deleteButton.setAttribute('data-id', id)
        deleteButton.innerHTML = `<span class='bi ${icon}'></span> ${title}`;
        deleteButton.onclick = event;
        td.appendChild(deleteButton);
        return td;
    }
}
