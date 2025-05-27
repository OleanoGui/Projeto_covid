from fastapi import FastAPI
from services import fetch_covid_data

app = FastAPI()

# Importando o serviço de busca de dados COVID-19
@app.get("/")
def home():
    return {"message": "API COVID - FastAPI"}

# Rota para buscar dados de COVID-19 por país
@app.get("/covid/{country}")
def get_covid_data(country: str):
    data = fetch_covid_data(country)
    return data

# Rota para buscar dados de COVID-19 com país padrão (Brasil)
@app.get("/covid")
def get_covid_data_default():
    data = fetch_covid_data()
    return data