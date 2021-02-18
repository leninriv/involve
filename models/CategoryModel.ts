export default class CategoryModel {
    id: Number;
    name: string;
    description: string;
    icon: string;

    /**
     * Category constructor
     * @param {Number} id
     * @param {string} name
     * @param {string} description
     * @param {string} icon
     */
    constructor(id: Number, name: string, description: string, icon: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.icon = icon;
    }
}