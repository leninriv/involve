import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, ScrollView, Image } from 'react-native';
import Modal from 'react-native-modal';
import Header from '../components/Header';
import FabButton from '../components/FabButton';
import { FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View } from '../components/Themed';
import { getCategories, getItemsByCategory, getReports } from '../utils/global';
import { colors } from '../utils/colors';
import CategoryModel from '../models/CategoryModel';
import ReportModel from '../models/ReportModel';
import ReportItem from '../components/ReportItem';
import EmptyListMessage from '../components/EmptyListMessage';

import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ListScreen(props: any) {
    const navigation = useNavigation();
    const [categories, setCategories] = React.useState([]);
    const [actions, setActions] = React.useState([]);
    const [reports, setReports] = React.useState([]);
    const [modalVisible, setModalVisible] = React.useState(true);

    React.useEffect(() => {
        const getLocalCatalogs = async () => {
            // Remove reports from local storage
            // await AsyncStorage.removeItem('reports');
            // await AsyncStorage.removeItem('items');
            // await AsyncStorage.removeItem('categories');

            setCategories(await getCategories());
            setReports(await getReports())
        };
        getLocalCatalogs();
    }, []);

    React.useEffect(() => {
        if (categories?.length > 0) {
            const formattedActions = categories.map((category: CategoryModel) => {
                return {
                    icon: category.icon,
                    label: category.name,
                    onPress: async () => {
                        await _onCategoryPress(category);
                    },
                    small: false,
                    color: colors.lightGreen,
                }
            });
            setActions(formattedActions);
        }

    }, [categories]);

    React.useEffect(() => {
        if (props?.route?.params?.reports?.length) {
            setReports(props.route.params.reports);
        }
    }, [props?.route?.params?.reports]);

    const _onCategoryPress = async (category: CategoryModel) => {
        const categoryItems = await getItemsByCategory(category.id);
        navigation.navigate('CameraScreen', { items: categoryItems, category });
    };

    const _viewReport = async (report: ReportModel) => {
        navigation.navigate('ViewImageScreen', { selectedReport: report });
    };

    return (
        <View style={styles.container}>
            <Header title='Mis Reportes' showBack={false} />

            <ScrollView style={{ flex: 1 }}>
                {
                    !!reports && reports.length > 0 ?
                        reports.map((report, index) => <ReportItem key={index} report={report} onPress={() => { _viewReport(report) }} />)
                        :
                        <EmptyListMessage />
                }
                <View style={{ height: 20 }} />
            </ScrollView>

            <FabButton actions={actions} />

            <Modal style={{ margin: 0 }} isVisible={modalVisible} coverScreen={true} backdropColor={colors?.darkBlue}>
                <View style={styles.modalContainer}>
                    <View style={styles.logoImage}>
                        <Image style={{ width: 100, height: 100, }} source={require('../assets/images/involve_logo.png')} />
                    </View>

                    <Text style={styles.headerText}>¡Bienvenido/a!</Text>

                    <Text style={styles.descriptionText}>Gracias por involucrarte.</Text>

                    <Text style={styles.descriptionText}>Para enviar un reporte, presiona el botón de cámara.</Text>

                    <View pointerEvents='none' style={{ backgroundColor: 'transparent' }}>
                        <FAB
                            style={styles.fab}
                            small
                            icon="camera"
                            color={colors.darkBlue}
                        />
                    </View>

                    <View style={styles.dismissButton}>
                        <TouchableOpacity >
                            <Text style={styles.dismissText} onPress={() => { setModalVisible(!modalVisible) }}>Entendido</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    modalContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    dismissButton: {
        backgroundColor: colors.darkBlue,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 25,
        paddingHorizontal: 35,
        paddingVertical: 17,
        borderRadius: 15,
        borderColor: colors.lightGreen,
        borderWidth: 2,
    },
    dismissText: {
        color: 'white',
        fontSize: 18
    },
    headerText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 35,
        fontWeight: '700',
        margin: 25
    },
    descriptionText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 25,
        fontWeight: '500',
        marginHorizontal: 20,
        marginTop: 20
    },
    fab: {
        alignSelf: 'center',
        width: 50,
        height: 50,
        borderRadius: 100,
        padding: 5,
        marginTop: 40,
        backgroundColor: colors.lightGreen
    },
    logoImage: {
        marginTop: 20,
        height: 150,
        width: 150,
        alignSelf: 'center',
        padding: 25,
        borderRadius: 100,
        borderColor: colors.lightGreen,
        borderWidth: 3
    }
});
