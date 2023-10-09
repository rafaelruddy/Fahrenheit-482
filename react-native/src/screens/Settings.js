import React from 'react'
import { View, Text,TouchableOpacity } from 'react-native'
import '../utils/i18n'
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-elements';

export default function Settings() {
  const {t, i18n} = useTranslation();

  const changeLanguage = value => {
    i18n.changeLanguage(value)
  }

  return (
    <View style={{paddingTop: 50, paddingHorizontal: 20}}>
        <View style={{alignItems: 'center',  gap: 5, marginBottom: 20,}}>
          <Icon name="settings" size={30}/>
          <Text style={{fontSize: 20, alignSelf: 'center'     }}>Settings</Text>
        </View>

        <Text style={{fontSize:18}}>{t('Escolher idioma:')}</Text>


        <TouchableOpacity onPress={() =>{
          changeLanguage('en')
        }}>
                <Text style={{backgroundColor:'red', color:'white', marginBottom:5}}>English</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() =>{
          changeLanguage('pt')
        }}>
                <Text style={{backgroundColor:'red', color:'white'}}>Português</Text>
        </TouchableOpacity>

    </View>
  )
}
