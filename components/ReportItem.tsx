import * as React from 'react';
import {
    StyleSheet, Image, TouchableOpacity, View, Text, Dimensions,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function ReportItem(props: any) {
    const { report } = props;

    function getRandomArbitrary(min, max) {
        return Math.trunc(Math.random() * (max - min) + min);
    }
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <View style={styles.infoContent}>
                <Image style={styles.image} source={{ uri: report.picture }} />
                <View style={styles.textContent}>
                    <Text style={styles.title}>{report.place}</Text>
                    <Text>{report.comment}</Text>
                    <View style={{ height: 20 }} />
                    <Text style={styles.category}>{report.categoryName}</Text>
                </View>
                <View style={styles.likeBox}>
                    <Text> {getRandomArbitrary(5, 100)} </Text>
                    <AntDesign name="heart" size={20} color={'pink'} />
                </View>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 8,
        minHeight: 50,
        padding: 15,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.5,
        elevation: 5,
    },
    infoContent: {
        flexDirection: 'row'
    },
    likeBox: {
        flexDirection: 'row',
        position: 'absolute',
        right: 10
    },
    category: {
        width: Dimensions.get('window').width - 120,
        textAlign: 'right',
        color: 'gray'
    },
    image: {
        width: 50,
        height: 90,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textContent: {
        paddingLeft: 10
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});