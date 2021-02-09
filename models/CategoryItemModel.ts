export default class CategoryItemModel {
    id: BigInt;
    name: string;
    image: string;
    categoryId: BigInt;

    /**
     * Category Item constructor
     * @param {BigInt} id
     * @param {string} name
     * @param {string} description
     */
    constructor(id: BigInt, name: string, image: string, categoryId: BigInt) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.categoryId = categoryId;
    }
}