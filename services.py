import requests
import os
from dotenv import load_dotenv

load_dotenv()

# Serviço para buscar dados de COVID-19 usando a API Ninjas
API_KEY = os.getenv("API_NINJAS_KEY")
BASE_URL = "https://api.api-ninjas.com/v1/covid19"

headers = {
    "X-Api-Key": API_KEY
}

#Função para buscar dados de COVID-19
def fetch_covid_data(country: str = "brazil"):
    response = requests.get(f"{BASE_URL}?country={country}", headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Não foi possível recuperar os dados"}
