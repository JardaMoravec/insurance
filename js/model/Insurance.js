'use strict';

export class Insurance {

    constructor(id, name, priceLimit, pricePerMonth, validFrom, validTo) {
        this.id = id;
        this.name = name;
        this.priceLimit = priceLimit;
        this.pricePerMonth = pricePerMonth;
        this.validFrom = validFrom;
        this.validTo = validTo;
    }

    toString() {
        return `id ${this.id} -  ${this.name} (cenový limit: ${this.priceLimit}), měcíční platba.: ${this.pricePerMonth} `;
    }

    static fromForm(form) {
        const formData = new FormData(form);

        return new Insurance(
            parseInt(formData.get("id")),
            formData.get("name"),
            parseFloat(formData.get("priceLimit")),
            parseFloat(formData.get("pricePerMonth")),
            formData.get("validFrom") != null && formData.get("validFrom") !== ""? new Date(formData.get("validFrom")) : null,
            formData.get("validTo") != null && formData.get("validTo") !== ""? new Date(formData.get("validTo")): null,
        );
    }

    static fromJson(jsonObject) {
        return new Insurance(
            parseInt(jsonObject.id),
            jsonObject.name,
            parseFloat(jsonObject.priceLimit),
            parseFloat(jsonObject.pricePerMonth),
            new Date(jsonObject.validFrom),
            new Date(jsonObject.validTo),
        );
    }

}