import * as React from 'react';
import {
    StyleSheet, TouchableOpacity, View, Text, Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';




export default function EmptyListMessage(props: any) {
    return (

        <View style={styles.content}>

            <MaterialCommunityIcons name="file-image" size={130} color="gray" />
            <View style={{ height: 30 }} />
            <Text style={styles.title}>Aun no has ingresado ninguna idea</Text>
            <View style={{ height: 20 }} />
            <Text style={styles.subTitle}>"Con cada pequeño acto se consrtuyen grandes cambios. ¡Hay que salvar el planeta!"</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    content: {
        paddingVertical: 50,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'gray',
        textAlign: 'center'
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray',
        textAlign: 'center',
        fontStyle: 'italic'
    }
});