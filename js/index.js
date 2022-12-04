'use strict';

import {userListRoute,userAddRoute} from "./route/PersonRoute.js";

window.menu = {
    'person' : {'label': 'Pojištěnci', 'title': 'Seznam pojištěnců', 'route': userListRoute},
    'insurance' : {'label': 'Pojištění', 'title': 'Seznam pojištění', 'route': userListRoute},
    'add_person' : {'label': 'Nový pojištěnec', 'title': 'Nový pojištěnec', 'route': userAddRoute},
    'add_insurance' : {'label': 'Nové pojištění', 'title': 'Nové pojištění', 'route': userAddRoute},
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

    window.persons = JSON.parse(localStorage.getItem("persons"));
    if (window.persons == null) {
        window.persons = [];
    }

    //window.persons.push(new Person(1, 'Karel', 'Vomáčka', 40, 777555666));
    //window.persons.push(new Person(2, 'Prokop', 'Buben', 27, 111222333));
}

const saveChanges = function () {
    localStorage.setItem("persons", JSON.stringify(window.persons));
    alert("Všechna data byla uložena");
}



