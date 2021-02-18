import CategoryItemModel from '../models/CategoryItemModel';
import CategoryModel from '../models/CategoryModel'

export const categories = [
    new CategoryModel(
        1,
        'Reforestación',
        'Reforestación',
        'spa',
    ),
    new CategoryModel(
        2,
        'Reciclaje',
        'Reciclaje',
        'autorenew',
    ),
    new CategoryModel(
        3,
        'Desechos',
        'Desechos',
        'delete',
    ),
];

export const items = [
    new CategoryItemModel(
        1,
        'Árbol 1',
        'Árbol_1.png',
        1
    ),
    new CategoryItemModel(
        2,
        'Árbol 2',
        'Árbol_1.png',
        1
    ),
    new CategoryItemModel(
        3,
        'Árbol 3',
        'Árbol_1.png',
        1
    ),
    new CategoryItemModel(
        1,
        'Basurero 1',
        'Basurero_1.png',
        3
    ),
    new CategoryItemModel(
        2,
        'Basurero 2',
        'Basurero_1.png',
        3
    ),
    new CategoryItemModel(
        3,
        'Basurero 3',
        'Basurero_1.png',
        3
    ),
];