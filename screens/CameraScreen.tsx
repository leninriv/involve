import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, PixelRatio, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import ViewShot from "react-native-view-shot";
import DraggableImage from '../components/DraggableImage';

const itemsSource = [
  { source: require('../assets/images/opciones/ref1.png') },
  { source: require('../assets/images/opciones/ref2.png') },
  { source: require('../assets/images/opciones/ref3.png') }
]


export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [taking, setTaking] = useState(false);
  const [settingItem, setItemSetting] = useState(false);
  const [itemsView, setItemsView] = useState([]);
  const [photoData, setPhoto] = useState(null);
  let camera: any = useRef();
  let viewShot: any = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
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
      navigation.navigate('ViewImageScreen', { photo: { uri: uri } });
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
                itemsSource.map((buttonItem, index) =>
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
  }
});
