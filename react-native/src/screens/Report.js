import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet, Image, Button, Modal ,TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { Camera, CameraType } from 'expo-camera';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationAccuracy
} from 'expo-location'


import '../utils/i18n'
import { useTranslation } from 'react-i18next';
 
export default function AlertButton() {
  const cameraRef = useRef(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [showCamera, setShowCamera ] = useState(false);
  const [photo, setPhoto] = useState();
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const {t, i18n} = useTranslation();
  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  

  const pickImage = async () => {
    if (!permission) {
      return 
    }
    
    if (!permission.granted) {
      Alert.alert(
        t('Permissão da câmera negada'),
        t('Deseja permitir o uso da câmera?'),
        [
          {
            text: t('Cancelar'),
            onPress: () => console.log('Permissão negada'),
            style: 'cancel',
          },
          {
            text: t('Permitir'),
            onPress: () => requestPermission(),
            style: 'default', 
          },
        ]
      );
      return
    }

    setShowCamera(true)
  };

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };    
    setShowCamera(false)
    let newPhoto = await cameraRef.current.takePictureAsync(options);
    const source = newPhoto.base64;
    let base64Img = `data:image/jpg;base64,${source}`;
    setPhoto(newPhoto);
  };

  const reportFire = () => {
    Alert.alert(
      t('Denunciar Incêndio'),
      t('Tem certeza de que deseja denunciar este incêndio?'),
      [
        {
          text: t('Cancelar'),
          onPress: () => {
            Alert.alert(
              t('Denúncia Cancelada'),
              t('Sua denúncia foi cancelada com sucesso.'),
              [
                {
                  text: 'OK',
                },
              ]
            );
          },
          style: 'cancel',
        },  
        {
          text: t('Denunciar'),
          onPress: () => postNewReport(),
          style: 'default', 
        },
      ]
    );
  };

  const postNewReport = async () => {
    if(photo) {
      let formdata = new FormData()
      formdata.append('file',"data:image/jpg;base64," + photo.base64)
      formdata.append('latitude',location.coords.latitude)
      formdata.append('longitude',location.coords.longitude)
      formdata.append('desc',location.coords.longitude)
      formdata.append('date',new Date().toJSON())
      
      await fetch("http://10.0.2.2:8000/report/", {
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: formdata,
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(JSON.stringify(responseData));
        })
    }
      
  }


  async function requestPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync({ accuracy: LocationAccuracy.Highest, });
      setLocation(currentPosition);
    }
  }
  
  useEffect(() => {
    requestPermissions();
  }, []);

  
  const closeCamera = () => {
    setShowCamera(false);
  }
  return (
    <View style={styles.container}>
      <View>
          <View 
                style={styles.modalContainer}
                accessible={true}
                accessibilityLabel="Fire informations">

          <TouchableOpacity onPress={pickImage}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/8191/8191581.png' }} style={{ width: photo ? 50 : 200, height: photo ? 50 : 200 }} />
            {photo && <Image source={{ uri: "data:image/jpg;base64," + photo.base64 }} style={{ width: 200, height: 200 }} />}
          </TouchableOpacity>

          <TextInput 
          style={styles.input}
          onChangeText={newText => setDescription(newText)}
          defaultValue={description}
          placeholder={t("Descrição")}
          multiline={true}
          numberOfLines={4}
          ></TextInput>

          <Text style={{width: '60%'}}>{t('OBS:a denuncia será feita na sua localização atual.')}</Text>

          {showCamera && <View style={styles.container2} >
            <Camera style={styles.camera} type={type} ref={cameraRef}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <Icon
                    name="rotate-right" // Use um ícone adequado para inverter a câmera
                    type="font-awesome"
                    size={30}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={takePic}>

                          <Icon
                    name="camera"
                    type="font-awesome"
                    size={30}
                    color="white"
                  />
                </TouchableOpacity>

                
              </View>
              <TouchableOpacity onPress={closeCamera} style={styles.closeButton2}>
                <Icon
                  name="times"
                  type="font-awesome"
                  color="white"


                />
                </TouchableOpacity>
            </Camera>
          </View>}
          <TouchableOpacity
            onPress={reportFire}
            style={[styles.reportButton, { backgroundColor: '#A60000' }]}
          >
            <Icon name="fire" type="material-community" color="white" size={33} />
            <Text style={styles.buttonText}>{t('Confirmar Denúncia')}</Text>
          </TouchableOpacity>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', 
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: 20
  },

  closeButton2: {
    marginTop: 10,
    color: 'red',
    right: 30,
    top: 0,
    position: 'absolute'
  },

  container2: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

  camera: {
    flex: 1,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  button2: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    borderRadius: 5,
    width: '60%',
    backgroundColor: '#f0f0ff',
    borderWidth: .5, 
    borderColor: '#f0f0f0', 
    padding: 4,
  }
});