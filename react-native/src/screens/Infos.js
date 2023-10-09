import React from 'react'
import { ScrollView, View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import Accordion from '../components/Accordion';

import '../utils/i18n'
import { useTranslation } from 'react-i18next';
export default function Infos() {
  const {t, i18n} = useTranslation();
  return (
    <ScrollView>

      <View style={style.container}>
        <Text style={style.title}>
          {t('Guia de Segurança e Prevenção de Incêndios')}
        </Text>
        
        <Text style={style.subTitle}>
          {t('Prevenção de Incêndios Florestais')}
        </Text>

        <Accordion title={t("Limpeza de Terrenos")} content={t("Mantenha sua propriedade livre de vegetação seca e materiais inflamáveis. Crie uma zona de segurança ao redor de sua casa, removendo arbustos e árvores próximas.")}/>
        
        <Accordion title={t("Descarte Adequado de Cigarros")} content={t("Nunca jogue cigarros acesos no chão ou pela janela do carro. Use cinzeiros portáteis à prova de fogo para descartar com segurança os cigarros.")}/>
        
        <Accordion title={t("Fogueiras e Churrascos")} content={t("Siga as regulamentações locais ao fazer fogueiras ou churrascos ao ar livre. Tenha sempre um extintor de incêndio ou água por perto.")}/>

        <Text style={style.subTitle}>{t('Anomalias Térmicas')}</Text>

        <Accordion title={t("O que São Anomalias Térmicas?")} content={t("Anomalias térmicas são áreas de temperatura anormalmente alta detectadas por satélites. Elas podem ser indicativos de incêndios florestais em desenvolvimento.")}/>
        
        <Accordion title={t("Identificação")} content={t("Use nosso mapa interativo para identificar anomalias térmicas próximas à sua localização. Fique atento a mudanças repentinas de temperatura em sua área.")}/>


        <Text style={style.subTitle}>{t('Dicas de Segurança')}</Text>

        <Accordion title={t("Planejamento de Evacuação")} content={t("Elabore um plano de evacuação com sua família, incluindo pontos de encontro e contatos de emergência. Mantenha uma mochila de evacuação com suprimentos essenciais prontos.")}/>


        <Accordion title={t("Comunicação")} content={t("Mantenha-se informado sobre alertas de incêndios e condições climáticas locais. Use aplicativos de alerta de emergência para receber informações em tempo real.")}/>
        

        <Accordion title={t("Kit de Primeiros Socorros")} content={t("Mantenha um kit de primeiros socorros completo em sua casa e em seu veículo. Inclua itens essenciais, como curativos, medicamentos e água potável.")}/>


        <Text style={style.subTitle}>{t('Perguntas Frequentes')}</Text>

        <Accordion title={t("Como posso obter informações em tempo real sobre incêndios?")} content={t("Você pode usar nosso aplicativo para acessar informações atualizadas sobre incêndios e anomalias térmicas em sua região.")}/>

        <Accordion title={t("O que devo fazer se me deparar com um incêndio florestal?")} content={t("Mantenha-se seguro e afaste-se do fogo. Chame imediatamente o número de emergência local e siga as instruções das autoridades.")}/>

      </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    paddingHorizontal: 12,
    flexDirection: 'column',
    gap: 20,
    paddingBottom: 30
  },
  title: {
    fontSize: 28,
    width: '80%',
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: '600',
    color: '#A60000'
  },
  description: {
    fontSize: 16,
    color: '#464646'
  },
  topics: {
    fontSize: 16,
    fontWeight: '500'
  },
  question: {
    gap: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Aumente a altura para uma sombra mais forte
    shadowOpacity: 1, // Aumente a opacidade para uma sombra mais forte
    shadowRadius: 6,
    width: '100%',
  },
  subTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#A60000',
    width: '100%',
    textAlign: 'left'
  }
})



// Guia de Segurança e Prevenção de Incêndios
// Bem-vindo ao nosso Guia de Segurança e Prevenção de Incêndios. Este recurso informativo é projetado para ajudá-lo a entender os riscos de incêndios florestais e as medidas que você pode tomar para proteger a si mesmo, sua família e o meio ambiente. Vamos explorar dicas importantes de segurança, informações sobre anomalias térmicas e respostas às perguntas mais frequentes.

// Prevenção de Incêndios Florestais
// 1. Limpeza de Terrenos
// Mantenha sua propriedade livre de vegetação seca e materiais inflamáveis.
// Crie uma zona de segurança ao redor de sua casa, removendo arbustos e árvores próximas.
// 2. Descarte Adequado de Cigarros
// Nunca jogue cigarros acesos no chão ou pela janela do carro.
// Use cinzeiros portáteis à prova de fogo para descartar com segurança os cigarros.
// 3. Fogueiras e Churrascos
// Siga as regulamentações locais ao fazer fogueiras ou churrascos ao ar livre.
// Tenha sempre um extintor de incêndio ou água por perto.
// Anomalias Térmicas
// 1. O que São Anomalias Térmicas?
// Anomalias térmicas são áreas de temperatura anormalmente alta detectadas por satélites.
// Elas podem ser indicativos de incêndios florestais em desenvolvimento.
// 2. Identificação
// Use nosso mapa interativo para identificar anomalias térmicas próximas à sua localização.
// Fique atento a mudanças repentinas de temperatura em sua área.
// Dicas de Segurança
// 1. Planejamento de Evacuação
// Elabore um plano de evacuação com sua família, incluindo pontos de encontro e contatos de emergência.
// Mantenha uma mochila de evacuação com suprimentos essenciais prontos.
// 2. Comunicação
// Mantenha-se informado sobre alertas de incêndios e condições climáticas locais.
// Use aplicativos de alerta de emergência para receber informações em tempo real.
// 3. Kit de Primeiros Socorros
// Mantenha um kit de primeiros socorros completo em sua casa e em seu veículo.
// Inclua itens essenciais, como curativos, medicamentos e água potável.
// FAQ (Perguntas Frequentes)
// 1. Como posso obter informações em tempo real sobre incêndios?
// Você pode usar nosso aplicativo para acessar informações atualizadas sobre incêndios e anomalias térmicas em sua região.
// 2. O que devo fazer se me deparar com um incêndio florestal?
// Mantenha-se seguro e afaste-se do fogo.
// Chame imediatamente o número de emergência local e siga as instruções das autoridades.
// Esperamos que este guia seja uma valiosa fonte de informações sobre prevenção de incêndios e segurança. Lembre-se de que a prevenção e a preparação são fundamentais para proteger você e sua comunidade. Mantenha-se seguro!