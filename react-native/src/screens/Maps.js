import { useEffect, useState, useRef } from 'react';
import { View, Image, ActivityIndicator, Modal, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from "react-native";
import SearchBar from '../components/SearchBar';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy
} from 'expo-location'
import { Icon } from 'react-native-elements';
import { BlurView } from 'expo-blur';
import '../utils/i18n'
import { useTranslation } from 'react-i18next';


export default function Maps() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [location, setLocation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfos, setModalInfos] = useState(null);
  const [mapMarker, setMapMarker] = useState(null);
  const [nasaMapMarker, setNasaMapMarker] = useState(null);
  const {t, i18n} = useTranslation();

  const mapRef = useRef(MapView);

  async function requestPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync({ accuracy: LocationAccuracy.Highest, });
      setSelectedLocation({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      });
      setLocation(currentPosition);
    }
  }

  const formatarData = (data) => {
    const dataDaRequisicao = new Date(data);
    if (dataDaRequisicao) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      return new Intl.DateTimeFormat('pt-BR', options).format(dataDaRequisicao);
    }
    return ""; // Caso a data seja nula ou indefinida
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    }, (response) => {
      setLocation(response);
      mapRef.current?.animateCamera({
        center: response.coords
      });
    })
  }, []);

  

  useEffect(() => {
    const fetchData = async () => {
      
      let apiUrl = `http://10.0.2.2:8000/report/`

      if (selectedLocation) {
        apiUrl += `?latitude=${selectedLocation.latitude}&longitude=${selectedLocation.longitude}`
      } else if (location && location.coords) {
        apiUrl += `?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
      }

      await fetch(apiUrl)
        .then(response => response.json())
        .then((json) => {

          setMapMarker(json.data)
          
          setNasaMapMarker(json.data_nasa)
        }
  
        )
      
    }
    fetchData()
  }, [selectedLocation, location])

  const handleLocationSelect = (latitude, longitude) => {
    setSelectedLocation({ latitude, longitude });
  };


  const openModal = (infos) => {
    setModalVisible(true);
    setModalInfos(infos);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  return (
    <View style={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <SearchBar onLocationSelect={handleLocationSelect} />
        {location ? (
          <MapView
            ref={mapRef}
            style={styles.map}
            region={{
              latitude: selectedLocation ? selectedLocation.latitude : location.coords.latitude,
              longitude: selectedLocation ? selectedLocation.longitude : location.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }}
            
          >
            {selectedLocation && (
              <Marker
                coordinate={{
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                }}
                title= { t("Localização escolhida")}
              />
            )}

            {location && (
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title={t("Minha Localização")}
              />
            )}
            {/* {mapMarker && console.log(mapMarker)} */}
            {mapMarker && mapMarker.map((item) => {
              return (
                <Marker
                  key={item.id} // Certifique-se de fornecer uma chave única para cada marcador
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude
                  }}
                  image={{uri:'https://cdn-icons-png.flaticon.com/128/1366/1366574.png'
                  ,width: 40,height: 40}}
                  onPress={() => openModal(item)} // Use o item.infos para abrir o modal
                >
                </Marker>
              );
            })}
            {nasaMapMarker && nasaMapMarker.map((item, index) => {
              return (
                <Marker
                  key={index} // Certifique-se de fornecer uma chave única para cada marcador
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude
                  }}
                  image={{uri:'https://cdn-icons-png.flaticon.com/128/595/595786.png'
                  ,width: 40,height: 40}}
                  onPress={() => openModal(item)} // Use o item.infos para abrir o modal
                >

                </Marker>
              );
            })}

          </MapView>
        ) : (
          <ActivityIndicator size="large" color="#007AFF" />
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View 
                style={styles.modalContainer}
                accessible={true}
                accessibilityLabel="Fire informations">
            <View style={styles.modalView}>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Icon
                  name="times"
                  type="font-awesome"

                />
              </TouchableOpacity>
              {modalInfos && modalInfos.file && 
              <View intensity={20} style={styles.modalContentView}>

                <Image
                source={{uri:'https://cdn-icons-png.flaticon.com/128/1366/1366574.png'}}
                style={{
                  width: 50,
                  height: 50,
                  marginBottom: 20,
                }}
                />
                  <Image
                  source={{uri:'http://10.0.2.2:8000' + modalInfos.file}}
                  style={{
                    width: '100%',
                    height: 300,
                    borderWidth: 4, 
                    borderColor: '#A60000', 
                    objectFit: 'cover',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                  />
                  <Text style={styles.modalContentDesc}>{modalInfos.desc}</Text>
                  <Text style={styles.modalContentDesc}>{formatarData(modalInfos.date)}</Text>
                  <Text style={styles.modalContent}>Dados disponibilizados por Usuários</Text>
              </View>}
              {modalInfos && modalInfos.confidence && 
              <View style={styles.modalContentView}>
                <Image
                source={{uri:'https://cdn-icons-png.flaticon.com/128/11623/11623491.png'}}
                style={{
                  width: 100,
                  height: 100,
                  borderWidth: 4, 
                  borderColor: '#A60000', 
                }}
                />
                <Text style={styles.modalContent}>{t('Nível de confiança:')} {modalInfos.confidence}</Text>
                <Text>{t('Dados disponibilizados pela Nasa')}</Text>
              </View>
              }
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
    zIndex: -10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: 20,
    alignItems: 'center',
    fontSize: 14,
    backgroundColor: '#A60000',
    color: '#fff',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    width: '100%',
  },
  modalContentDesc: {
    padding: 20,
    alignItems: 'center',
    fontSize: 18,
    backgroundColor: '#A60000',
    color: '#fff',
    width: '100%',
  },
  closeButton: {
    marginTop: 10,
    color: 'red',
    right: 10,
    top: 0,
    position: 'absolute'
  },
  modalView: {
    backgroundColor: 'rgba(255,255,255,1)',
    width: '100%',
    height: '95%',
    borderRadius: 15,
    bottom: 0,
    position: 'absolute',
  },
  modalContentView: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal:40,
  }
});


