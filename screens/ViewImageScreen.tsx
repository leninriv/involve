import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Image } from 'react-native';
import Header from '../components/Header';


import { Text, View } from '../components/Themed';

export default function ViewImageScreen(props: any) {
  const navigation = useNavigation();
  const { photo } = props?.route?.params;

  return (
    <View style={styles.container}>
      <Header title='Ponle un nombre'
        showBack={true}
        goBack={() => { navigation.goBack(); }}
      />
      {!!photo &&
        <Image
          style={styles.tinyLogo}
          source={{ uri: photo.uri }}
          resizeMethod={'resize'}
        />}
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
  tinyLogo: {
    height: '100%',
    resizeMode: 'stretch'
  },
});
