import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Header from '../components/Header';
import FabButton from '../components/FabButton';
import { List } from 'react-native-paper';

import { View } from '../components/Themed';
import { getCategories, getItemsByCategory } from '../utils/global';
import CategoryModel from '../models/CategoryModel';

export default function ListScreen() {
    const navigation = useNavigation();
    const [categories, setCategories] = React.useState([]);
    const [actions, setActions] = React.useState([]);

    React.useEffect(() => {
        const getLocalCatalogs = async () => {
            setCategories(await getCategories());
        };
        getLocalCatalogs();
    }, []);

    React.useEffect(() => {
        console.log('useEffect categories', categories);
        if (categories?.length > 0) {
            const formattedActions = categories.map((category: CategoryModel) => {
                return {
                    icon: category.icon,
                    label: category.name,
                    onPress: async () => {
                        await _onCategoryPress(category);
                    },
                    small: false,
                }
            });
            setActions(formattedActions);
        }

    }, [categories]);

    const _onCategoryPress = async (category: CategoryModel) => {
        const categoryItems = await getItemsByCategory(category.id);
        navigation.navigate('CameraScreen', { items: categoryItems, category })
    };

    return (
        <View style={styles.container}>
            <Header title='Mis Reportes' showBack={false} />

            <List.AccordionGroup>
                {!!categories?.length && categories.map((category: CategoryModel) => (
                    <List.Accordion key={category.id} title={category.name} id={category.id} left={props => <List.Icon {...props} icon={category.icon} />}>
                        <List.Item title="Item 1" />
                    </List.Accordion>)
                )}
            </List.AccordionGroup>

            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <FabButton actions={actions} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
