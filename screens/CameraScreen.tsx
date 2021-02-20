import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, PixelRatio, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import ViewShot from "react-native-view-shot";
import DraggableImage from '../components/DraggableImage';
import Modal from 'react-native-modal';
import { colors } from '../utils/colors';

export default function CameraScreen(props: any) {
  const [hasPermission, setHasPermission] = useState(null);
  const [taking, setTaking] = useState(false);
  const [settingItem, setItemSetting] = useState(false);
  const [itemsView, setItemsView] = useState([]);
  const [category, setCategory] = useState(null);
  const [itemsSource, setItemsSource] = useState([]);
  const [photoData, setPhoto] = useState(null);
  const [modalVisible, setModalVisible] = React.useState(true);
  let camera: any = useRef();
  let viewShot: any = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      const { items, category } = props?.route?.params;
      setItemsSource(items);
      setCategory(category);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function onCapture() {
    if (taking) { return; }
    setTaking(true);
    const photo = await camera.takePictureAsync();
    setPhoto(photo);
  }

  function addNewItem(item: any) {
    if (settingItem) return;
    setItemSetting(true);
    let prevItemList: any = [...itemsView];
    const newItem = { ...item };
    newItem.id = Math.floor(Math.random() * 100) + Date.now();
    newItem.visible = true;
    prevItemList.push(newItem);
    setItemsView(prevItemList);
    setTimeout(() => { setItemSetting(false); }, 1000);
    console.log('prevItemList', prevItemList)
  }

  function deleteItemView(id: any) {
    let prevItemList: any = [...itemsView];
    const index = prevItemList.findIndex((item: any) => item.id === id);
    if (index > -1) {
      prevItemList[index].visible = false;
    }
    setItemsView(prevItemList);
  }

  async function captureView() {
    setTimeout(async () => {
      const uri = await viewShot.capture();
      navigation.navigate('ViewImageScreen', { photo: { uri: uri }, items: itemsView, category });
      setTaking(false);
    }, 500);
    setTimeout(() => {
      setPhoto(null);
    }, 1000);
  }

  return (
    <View style={styles.container}>
      <ViewShot ref={(ref) => { viewShot = ref }} style={styles.container}>
        {!photoData ?
          (<View style={styles.camera}>
            <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={(ref: any) => { camera = ref }}>
              <View style={styles.buttonContainer}>
                {!taking &&
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => { onCapture() }}>
                  </TouchableOpacity>
                }
              </View>
            </Camera>
            <View style={styles.optionsContent}>
              {
                itemsSource?.map((buttonItem, index) =>
                  <TouchableOpacity key={index} style={styles.itemContent} onPress={() => { addNewItem(buttonItem) }}>
                    <Image style={{ width: 50, height: 50 }} source={buttonItem.source} />
                  </TouchableOpacity>
                )
              }
            </View>
          </View>)
          :
          (
            <View style={styles.container}>
              <Image style={styles.takedPicture} source={{ uri: photoData.uri }} onLoadEnd={() => { captureView() }} />
            </View>
          )
        }

        {
          !!itemsView && !!itemsView.length &&
          itemsView.map((item: any, index) =>
            <DraggableImage key={index} source={item.source} deleteItem={() => { deleteItemView(item.id) }} visible={item.visible} />
          )
        }

      </ViewShot>

      <Modal style={{ margin: 0 }} isVisible={modalVisible} coverScreen={true} backdropColor={colors?.darkBlue}>
        <View style={styles.modalContainer}>
          <View style={styles.logoImage}>
            <Image style={{ width: 100, height: 100, }} source={require('../assets/images/involve_logo.png')} />
          </View>

          <Text style={styles.headerText}>¡Plasma tu idea!</Text>

          <Text style={styles.descriptionText}>1. Selecciona la imagen</Text>

          <Text style={styles.descriptionText}>2. Presiona repetidamente la imagen para agrandarla</Text>

          <Text style={styles.descriptionText}>3. Presiona por unos segundos la imagen para eliminarla</Text>

          <View style={styles.modalOptionsContent} pointerEvents='none' >
            {
              itemsSource?.map((buttonItem, index) =>
                <TouchableOpacity key={index} style={styles.itemContent} onPress={() => { addNewItem(buttonItem) }}>
                  <Image style={{ width: 50, height: 50 }} source={buttonItem.source} />
                </TouchableOpacity>
              )
            }
          </View>

          <View style={styles.dismissButton}>
            <TouchableOpacity >
              <Text style={styles.dismissText} onPress={() => { setModalVisible(!modalVisible) }}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    left: (Dimensions.get('window').width / 2) - 35,
    bottom: 30,
    borderWidth: 2,
    borderColor: 'white',
    height: 70,
    width: 70,
    borderRadius: 70,
    zIndex: 1001,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'white',
    height: 60,
    width: 60,
    borderRadius: 60,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  itemContent: {
    width: 50,
    height: 50,
    margin: 5
  },
  optionsContent: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255, 0.7)',
    right: 0,
    top: (Dimensions.get('window').height / 2) - 60
  },
  takedPicture: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  modalOptionsContent: {
    position: 'absolute',
    backgroundColor: 'white',
    right: 0,
    top: (Dimensions.get('window').height / 2) - 85
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
    textAlign: 'left',
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
    marginRight: 100,
    marginLeft: 20,
    marginTop: 20
  },
  fab: {
    alignSelf: 'center',
    width: 50,
    height: 50,
    borderRadius: 100,
    padding: 5,
    marginTop: 40,
  },
  logoImage: {
    backgroundColor: 'white',
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
