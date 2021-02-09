export default class CategoryModel {
    id: BigInt;
    place: string;
    latitude: string;
    longitude: string;
    comment: string;
    categoryName: string;
    categoryId: BigInt;
    itemName: string;
    itemId: BigInt;

    /**
     * Report constructor
     * @param {BigInt} id
     * @param {string} place
     * @param {string} latitude
     */
    constructor(id: BigInt, place: string, latitude: string, longitude: string, comment: string, categoryName: string, categoryId: BigInt, itemName: string, itemId: BigInt) {
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