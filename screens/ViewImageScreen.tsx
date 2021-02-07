import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Header from '../components/Header';


import { Text, View } from '../components/Themed';

export default function ViewImageScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header title='Ponle un nombre'
        showBack={true}
        goBack={() => { navigation.goBack(); }}
      />
      <Text style={styles.title}>ViewImageScreen</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
