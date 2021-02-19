export default class CategoryItemModel {
    id: Number;
    name: string;
    source: string;
    categoryId: Number;

    /**
     * Category Item constructor
     * @param {Number} id
     * @param {string} name
     * @param {string} source
     * @param {Number} categoryId
     */
    constructor(id: Number, name: string, source: string, categoryId: Number) {
        this.id = id;
        this.name = name;
        this.source = source;
        this.categoryId = categoryId;
    }
}