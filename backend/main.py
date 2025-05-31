from fastapi import FastAPI, Query
from services import fetch_covid_data
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

app = FastAPI()

@app.get("/covid/{country}")
def get_covid_data(
    country: str,
    date: Optional[str] = Query(None, description="Data no formato YYYY-MM-DD"),
    total: Optional[bool] = Query(False, description="Se True, retorna apenas o total do país")
):
    data_list = fetch_covid_data(country)
    if not data_list or not isinstance(data_list, list):
        return {"error": "No data found"}
    data = data_list[0]  # ou filtre pela região desejada

    # Se quiser apenas o total
    if total and "total" in data:
        return {"country": country, "total": data["total"]}

    # Se quiser filtrar por data específica
    if date and "cases" in data:
        # Se for lista com um dict de datas
        if isinstance(data["cases"], list) and len(data["cases"]) > 0 and isinstance(data["cases"][0], dict):
            cases_dict = data["cases"][0]
            if date in cases_dict:
                # Retorna apenas a data filtrada
                return {"country": country, "cases": [ {"date": date, **cases_dict[date]} ]}
            else:
                return {"country": country, "cases": []}
        # Se for dict (caso futuro)
        elif isinstance(data["cases"], dict):
            if date in data["cases"]:
                return {"country": country, "cases": [ {"date": date, **data["cases"][date]} ]}
            else:
                return {"country": country, "cases": []}
        else:
            return {"country": country, "cases": []}

    # Retorna tudo se nenhum filtro for aplicado
    return data

# Endpoint padrão (Brasil)
@app.get("/covid")
def get_covid_data_default(
    date: Optional[str] = Query(None),
    total: Optional[bool] = Query(False)
):
    return get_covid_data("brazil", date, total)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)