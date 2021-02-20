import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { View } from '../components/Themed';
import { Button, TextInput } from 'react-native-paper';
import * as Location from 'expo-location';
import { generateBase64, getReports } from '../utils/global';
import ReportModel from '../models/ReportModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import { colors } from '../utils/colors';

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
  const [modalVisible, setModalVisible] = React.useState(false);
  const [reports, setReports] = React.useState([]);

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
    setReports(existingReports);
  };

  React.useEffect(() => {
    if (reports?.length) {
      setModalVisible(!modalVisible)
    }
  }, [reports]);

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

      <Modal style={{ margin: 0 }} isVisible={modalVisible} coverScreen={true} backdropColor={colors?.darkBlue}>
        <View style={styles.modalContainer}>
          <View style={styles.logoImage}>
            <Image style={{ width: 100, height: 100, }} source={require('../assets/images/involve_logo.png')} />
          </View>

          <Text style={styles.headerText}>¡Gracias por tu aporte!</Text>

          <Text style={styles.descriptionText}>¿Sabías que? Por cada árbol que siembras garantizas agua para 3 personas...</Text>

          <View style={styles.dismissButton}>
            <TouchableOpacity>
              <Text style={styles.dismissText} onPress={() => {
                setModalVisible(!modalVisible)
                navigation.navigate('ListScreen', { reports });
              }}>Entendido</Text>
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
