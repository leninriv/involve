import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImageManipulator from 'expo-image-manipulator';
import CategoryItemModel from '../models/CategoryItemModel';
import CategoryModel from '../models/CategoryModel';

/**
 * Get categories array from async storage
 */
export const getCategories = async () => {
    return JSON.parse(await AsyncStorage.getItem('categories') || '[]')
};

/**
 * Get items array from async storage by category ID
 * @param categoryId 
 */
export const getCategoryById = async (categoryId: Number) => {
    const categories = JSON.parse(await AsyncStorage.getItem('categories') || '[]');
    return categories?.filter((category: CategoryModel) => category.id === categoryId);
};

/**
 * Get items array from async storage by category ID
 * @param categoryId 
 */
export const getItemsByCategory = async (categoryId: Number) => {
    const items = JSON.parse(await AsyncStorage.getItem('items') || '[]');
    return items?.filter((item: CategoryItemModel) => item.categoryId === categoryId);
};

/**
 * Get reports array from async storage
 */
export const getReports = async () => {
    return JSON.parse(await AsyncStorage.getItem('reports') || '[]')
};

/**
 * Returns a base64 from an image uri
 * @param uri
 */
export const generateBase64 = async (uri: string) => {
    const compressedImage = await ImageManipulator.manipulateAsync(uri, [],
        { format: ImageManipulator.SaveFormat.JPEG, base64: true });
    return `data:image/jpeg;base64,${compressedImage.base64}`;
}