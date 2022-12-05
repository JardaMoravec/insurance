'use strict';

export class Person {

    constructor(id, firstName, sureName, age, phoneNumber) {
        this.id = id;
        this.firstName = firstName;
        this.sureName = sureName;
        this.age = age;
        this.phoneNumber = phoneNumber;
    }

    toString() {
        return `id ${this.id} -  ${this.firstName} ${this.sureName} (věk: ${this.age}), tel.: ${this.phoneNumber} `;
    }

    static fromForm(form) {
        const formData = new FormData(form);

        return new Person(
            parseInt(formData.get("id")),
            formData.get("firstName"),
            formData.get("sureName"),
            parseInt(formData.get("age")),
            formData.get("phoneNumber"),
        );
    }

}