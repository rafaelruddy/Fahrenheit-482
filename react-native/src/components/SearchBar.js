import React, { useRef } from 'react';
import { View, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import '../utils/i18n'
import { useTranslation } from 'react-i18next';
function SearchBar({ onLocationSelect }) {
  const {t, i18n} = useTranslation();
  const ref = useRef();

  const handleClearInput = () => {
    ref.current.clear();
  };
  const handleSearchIconPress = () => {
    // Foca no campo de pesquisa
    ref.current.focus();
  };


  return (
    <View style={styles.container}>

      <View style={styles.inputContainer}>
        {/* <Icon name="search" size={30} style={styles.icon}/> */}
        <GooglePlacesAutocomplete
          ref={ref}
          placeholder={t('Pesquisar localização...')}
          onPress={(data, details = null) => {
            // O usuário selecionou uma localização, você pode tratar os dados aqui.
            // console.log(data);
            // console.log(details);
            ref.current.setAddressText(data.description);
            if (details && details.geometry && details.geometry.location) {
              const { lat, lng } = details.geometry.location;
              onLocationSelect(lat, lng);
            }
          }}
          query={{
            key: 'AIzaSyB88NBacUuq6a2OPfJ5KY_6dWulEk_SIQg',
            language: 'pt-BR', // Idioma da pesquisa
          }}
          onFail={error => console.error(error)}
          fetchDetails={true}
          listViewDisplayed="auto" // Exibe a lista de sugestões automaticamente
          enablePoweredByContainer={false} // Remove a atribuição do Google
          minLength={2} // Número mínimo de caracteres para iniciar a pesquisa
          debounce={200} // Atraso antes de fazer a pesquisa
          styles={{
            textInputContainer: {
              backgroundColor: 'transparent',
              borderTopWidth: 0,
              borderBottomWidth: 0,
              height: 40,
              zIndex: 1,
              width: 320,
              backgroundColor: '#fff',
              borderRadius: 7,
              alignSelf: 'center'
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: '#5d5d5d',
              fontSize: 16,
              // backgroundColor: '#f00',
              // width: 200
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            listView: {
              width: '93.5%',
              alignSelf: 'center',
              marginTop: 7,
              flex: 1,
              borderRadius: 7
            }
          }}
          renderLeftButton={() => (
            <View style={{ justifyContent: 'center', width: 35 }}>
              <Icon
                name="search"
                type="font-awesome"
                color="#5d5d5d"
                style={styles.icon}
                onPress={handleSearchIconPress} // Inicie a pesquisa ao pressionar o ícone "search"
              />
            </View>
          )}
          renderRightButton={() => (
            <View style={{ justifyContent: 'center', width: 35 }}>
              <Icon
                name="times"
                type="font-awesome"
                color="#5d5d5d"
                style={{ ...styles.icon }}
                onPress={handleClearInput}
              />
            </View>
          )}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 10,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    width: '100%',
    top: 60,
  },
  // inputContainer: {
  //   flexDirection: 'row',
  //   backgroundColor: '#cecece',
  //   borderRadius: 10,
  //   width: 350,
  //   height: 40,

  // },
  icon: {
    paddingTop: 7,
    color: '#fff',
    height: '100%',
    width: 35,
    // backgroundColor: 'red'
  }
});

export default SearchBar;
