import CategoryItemModel from "./CategoryItemModel";

export default class CategoryModel {
    id: Number;
    place: string;
    latitude: Number;
    longitude: Number;
    comment: string;
    categoryName: string;
    categoryId: Number;
    items: Array<CategoryItemModel>;
    picture: string;

    /**
     * Report constructor
     * @param {Number} id
     * @param {string} place
     * @param {string} latitude
     */
    constructor(id: Number, place: string, latitude: Number, longitude: Number, comment: string, categoryName: string, categoryId: Number, items: Array<CategoryItemModel>, picture: string) {
        this.id = id;
        this.place = place;
        this.latitude = latitude;
        this.longitude = longitude;
        this.comment = comment;
        this.categoryName = categoryName;
        this.categoryId = categoryId;
        this.items = items;
        this.picture = picture;
    }
}