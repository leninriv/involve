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
        require('../assets/images/opciones/ref1.png'),
        1
    ),
    new CategoryItemModel(
        2,
        'Árbol 2',
        require('../assets/images/opciones/ref2.png'),
        1
    ),
    new CategoryItemModel(
        3,
        'Árbol 3',
        require('../assets/images/opciones/ref3.png'),
        1
    ),
    new CategoryItemModel(
        1,
        'Basurero 1',
        require('../assets/images/opciones/bas1.png'),
        3
    ),
    new CategoryItemModel(
        2,
        'Basurero 2',
        require('../assets/images/opciones/bas2.png'),
        3
    ),
    new CategoryItemModel(
        3,
        'Basurero 3',
        require('../assets/images/opciones/bas3.png'),
        3
    ),
];