# Projeto COVID 19

API desenvolvida em Python utilizando FastAPI para consulta de dados sobre a COVID-19 em diferentes países. Os dados são obtidos a partir da API Ninjas.

## Funcionalidades

- Consulta de dados de COVID-19 por país.
- Endpoint padrão para consulta dos dados.
- Respostas em formato JSON.

## Tecnologias Utilizadas

- **Python 3**
- **FastAPI**
- **requests**
- **dotenv**
- **API Ninjas** (https://api-ninjas.com/api/covid19)

## Como Executar

1. Clone este repositório:
   ```bash
   git clone https://github.com/OleanoGui/Projeto_covid.git
   cd Projeto_covid
   ```

2. Crie um ambiente virtual e ative-o:
   ```bash
   python -m venv venv
   source venv/bin/activate  # No Windows use: venv\Scripts\activate
   ```

3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```

4. Crie um arquivo `.env` na raiz do projeto e adicione sua chave da API Ninjas:
   ```
   API_NINJAS_KEY=SUA_CHAVE_AQUI
   ```

5. Execute o servidor FastAPI:
   ```bash
   uvicorn main:app --reload
   ```

## Exemplos de Uso

- Acesse `http://localhost:8000/covid` para obter os dados.
- Acesse `http://localhost:8000/covid/{country}` substituindo `{country}` pelo nome do país desejado.

## Estrutura do Projeto

- `main.py`: Arquivo principal com as rotas da API.
- `services.py`: Serviço responsável por buscar os dados da COVID-19 na API Ninjas.
