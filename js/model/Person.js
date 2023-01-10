'use strict';

import {Insurance} from "./Insurance.js";

export class Person {

    constructor(id, firstName, sureName, age, phoneNumber, insuranceList = []) {
        this.id = id;
        this.firstName = firstName;
        this.sureName = sureName;
        this.age = age;
        this.phoneNumber = phoneNumber;
        this.insuranceList = insuranceList;
    }

    toString() {
        return `id ${this.id} -  ${this.firstName} ${this.sureName} (počet pojištění: ${this.insuranceList.length}), tel.: ${this.phoneNumber} `;
    }

    toOption() {
        return {"id": this.id, "label": `${this.firstName} ${this.sureName} (id: ${this.id})`}
    }

    get totalPriceLimit() {
        let totalPrice = 0;
        for (let insurance of this.insuranceList) {
            totalPrice += parseFloat(insurance.priceLimit);
        }
        return totalPrice;
    }

    get totalPricePreMonth() {
        let totalPrice = 0;
        for (let insurance of this.insuranceList) {
            totalPrice += parseFloat(insurance.pricePerMonth);
        }
        return totalPrice;
    }

    static fromForm(form) {
        const formData = new FormData(form);

        return new Person(
            parseInt(formData.get("id")),
            formData.get("firstName"),
            formData.get("sureName"),
            parseInt(formData.get("age")),
            formData.get("phoneNumber")
        );
    }

    static fromJson(jsonObject) {
        let insuranceList = jsonObject.insuranceList;
        if (insuranceList != null) {
            for (let insurance of insuranceList) {
                insurance = Insurance.fromJson(insurance);
            }
        }

        return new Person(
            parseInt(jsonObject.id),
            jsonObject.firstName,
            jsonObject.sureName,
            parseInt(jsonObject.age),
            jsonObject.phoneNumber,
            insuranceList
        );
    }

}