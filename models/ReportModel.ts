export default class CategoryModel {
    id: Number;
    place: string;
    latitude: Number;
    longitude: Number;
    comment: string;
    categoryName: string;
    categoryId: Number;
    itemName: string;
    itemId: Number;

    /**
     * Report constructor
     * @param {Number} id
     * @param {string} place
     * @param {string} latitude
     */
    constructor(id: Number, place: string, latitude: Number, longitude: Number, comment: string, categoryName: string, categoryId: Number, itemName: string, itemId: Number) {
        this.id = id;
        this.place = place;
        this.latitude = latitude;
        this.longitude = longitude;
        this.comment = comment;
        this.categoryName = categoryName;
        this.categoryId = categoryId;
        this.itemName = itemName;
        this.itemId = itemId;
    }
}