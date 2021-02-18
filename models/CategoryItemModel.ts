export default class CategoryItemModel {
    id: Number;
    name: string;
    image: string;
    categoryId: Number;

    /**
     * Category Item constructor
     * @param {Number} id
     * @param {string} name
     * @param {string} image
     * @param {Number} categoryId
     */
    constructor(id: Number, name: string, image: string, categoryId: Number) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.categoryId = categoryId;
    }
}