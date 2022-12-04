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

}