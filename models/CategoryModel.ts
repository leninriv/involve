export default class CategoryModel {
    id: BigInt;
    name: string;
    description: string;

    /**
     * Category constructor
     * @param {BigInt} id
     * @param {string} name
     * @param {string} description
     */
    constructor(id: BigInt, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}