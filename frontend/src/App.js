import React, { useState } from "react";

function App() {
  const [country, setCountry] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCovidData = async () => {
    setLoading(true);
    setData(null);
    let url = "http://localhost:8000/covid";
    if (country) {
      url += `/${country}`;
    }
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (error) {
      setData({ error: "Erro ao buscar dados" });
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", fontFamily: "Arial" }}>
      <h2>COVID-19 API Consulta</h2>
      <input
        type="text"
        placeholder="Digite o país (ex: brazil)"
        value={country}
        onChange={e => setCountry(e.target.value)}
        style={{ width: "70%", padding: "8px" }}
      />
      <button onClick={fetchCovidData} style={{ padding: "8px 16px", marginLeft: 8 }}>
        Buscar
      </button>
      {loading && <p>Carregando...</p>}
      {data && (
        <pre style={{ background: "#f4f4f4", padding: 16, marginTop: 16 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;