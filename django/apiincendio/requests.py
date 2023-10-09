import json
import requests
import csv
from io import StringIO
import pandas as pd
import difflib
from datetime import date,timedelta

today = date.today()
# Recebe a a latitude e longitude do app
# lat = '-22.882315'
# lon = '-43.112282'

# Import e criação do DataFrame de Codigos de paises para utilização na API
df = pd.read_csv('C:/Users/rafae/Desktop/managing-fire/apiincendio/apiincendio/Country_Codes.csv')
data = pd.DataFrame(df)


def focos_de_incendio(codPais):
    try:
        api_key = '33f8b27309efb375cd8ad0e6d14be019'
        # URL da API que gera o CSV
        url = f'https://firms.modaps.eosdis.nasa.gov/api/country/csv/{api_key}/MODIS_NRT/{codPais}/1/{today}'

        # Faz uma solicitação GET para a API
        response = requests.get(url)

        # Verifica se a solicitação foi bem-sucedida (código de status 200)
        if response.status_code == 200:
            # Lê os dados CSV da resposta da API
            csv_data = response.text
            # Use StringIO para criar um objeto de arquivo de texto
            csv_file = StringIO(csv_data)

            # Use o leitor CSV para processar o arquivo CSV
            csv_reader = csv.reader(csv_file)

            # Create a Pandas DataFrame from the CSV data
            df = pd.read_csv(csv_file)

            return pd.DataFrame(df)

        else:
            raise ValueError(f'Erro ao fazer a solicitação. Código de status: {response.status_code}')
    except requests.exceptions.RequestException as e:
        print("Ocorreu um erro ao fazer a solicitação:", e)

    except Exception as e:
        print("Ocorreu um erro inesperado:", e)

def getCidade_Estado_Pais(latitude, longitude):
    # Construa a URL da API do Google Maps Geocoding
    url = f'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude={latitude}&longitude={longitude}'

    # Faça uma solicitação GET para a API
    response = requests.get(url)

    # Faz uma solicitação GET para a API
    response = requests.get(url)

    # Verifica se a solicitação foi bem-sucedida (código de status 200)
    if response.status_code == 200:
        # Lê os dados CSV da resposta da API
        df = response.json()
        # data = json.load(df)
        # pprint.pprint(df)
        return [df['locality'],df['city'],df['countryName']]


def searchCountryCode(pais):

    corresp = difflib.get_close_matches(str(pais), data['Country'].tolist(),1)

    for key, row in df.iterrows():

        if row.iloc[2] == pais:

            return row.iloc[1]
        elif row.iloc[2] == corresp[0]:

            return row.iloc[1]



def requisicao(lat,lon):
    CEP = getCidade_Estado_Pais(lat,lon)
    pais = searchCountryCode(CEP[2])
    try:
        df = focos_de_incendio(pais)
        colunas = ['latitude','longitude', 'brightness','bright_t31','acq_date','acq_time','confidence']
        dfire = df[colunas]
        dfire = dfire.drop(dfire[dfire['confidence'] <= 90].index)
    except ValueError:
        print(ValueError)
    else:
        if not dfire.empty:
            json_str = dfire.to_json(orient='records')
            json_obj = json.loads(json_str)
            return json_obj
        else:
            print('Sem dados de queimada para o páis')
            return []
