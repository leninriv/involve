import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Image } from 'react-native';
import Header from '../components/Header';
import { View } from '../components/Themed';
import { Button, TextInput } from 'react-native-paper';
import * as Location from 'expo-location';
import { generateBase64, getReports } from '../utils/global';
import ReportModel from '../models/ReportModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewImageScreen(props: any) {
  const navigation = useNavigation();
  const { photo } = props?.route?.params;
  const [place, setPlace] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);
  const [category, setCategory] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [selectedReport, setSelectedReport] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const { items, category, selectedReport } = props?.route?.params;
      
      // Disable inputs if report received
      if (selectedReport) {
        setSelectedReport(selectedReport);
        setIsDisabled(true);
        setPlace(selectedReport.place);
        setComment(selectedReport.comment);
        return;
      }

      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      if (location?.coords) {
        setLatitude(location.coords.latitude || 0);
        setLongitude(location.coords.longitude || 0);
      }
      setItems(items);
      setCategory(category);
    })();
  }, []);

  const _onSubmitReport = async () => {
    const existingReports = await getReports();
    existingReports.push(new ReportModel(
      existingReports.length + 1,
      place,
      latitude,
      longitude,
      comment,
      category.name,
      category.id,
      items,
      await generateBase64(photo.uri),
    ));
    await AsyncStorage.setItem('reports', JSON.stringify(existingReports));
    navigation.navigate('ListScreen', { reports: existingReports });
  };

  return (
    <View style={styles.container}>
      <Header title='Reporte'
        showBack={true}
        goBack={() => { navigation.goBack(); }}
      />
      {!!(photo || isDisabled) &&
        <Image
          style={styles.tinyLogo}
          source={{ uri: !isDisabled ? photo.uri : selectedReport.picture }}
          resizeMethod={'resize'}
        />}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.placeInput}
          label='Lugar'
          value={place}
          onChangeText={text => setPlace(text)}
          mode='outlined'
          disabled={isDisabled}
          editable={!isDisabled}
        />
        <TextInput
          style={styles.commentInput}
          label='Comentario'
          value={comment}
          onChangeText={text => setComment(text)}
          multiline={true}
          numberOfLines={5}
          mode='outlined'
          returnKeyType='default'
          returnKeyLabel='Done'
          blurOnSubmit={true}
          disabled={isDisabled}
          editable={!isDisabled}
        />
      </View>
      {!isDisabled && <View style={styles.buttonContainer}>
        <Button
          style={styles.buttonStyle}
          icon="comment"
          mode="contained"
          onPress={_onSubmitReport}>Crear Reporte
        </Button>
      </View>}
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
    height: '50%',
    resizeMode: 'contain',
    marginTop: 20,
  },
  formContainer: {
    marginHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'column',
  },
  placeInput: {
    fontSize: 20,
    marginBottom: 20,
  },
  commentInput: {
    fontSize: 20,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    alignContent: 'center',
  },
  buttonStyle: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10
  },
});
