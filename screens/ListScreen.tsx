import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Header from '../components/Header';
import { Button } from 'react-native-paper';
import FabButton from '../components/FabButton';

import { Text, View } from '../components/Themed';

export default function ListScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Header title='Tus Ideas' showBack={false} />
            <Text style={styles.title}>ListScreen</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Button icon="camera" mode="contained" onPress={() => {navigation.navigate('ViewImageScreen')}}> Navegar a la vista </Button>
            <FabButton/>
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
