import React, { useState } from "react";

function App() {
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCovidData = async () => {
    setLoading(true);
    setData(null);
    let url = "http://localhost:8000/covid";
    if (country) {
      url += `/${country}`;
    }
    const params = [];
    if (date) params.push(`date=${date}`);
    if (params.length > 0) url += "?" + params.join("&");

    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (error) {
  setData({ error: "Error fetching data: " + error.message });
}
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "Arial" }}>
      <h2>SEARCH FOR COVID-19 CASES</h2>
      <input
        type="text"
        placeholder="Enter the country (e.g., Brazil)"
        value={country}
        onChange={e => setCountry(e.target.value)}
        style={{ width: "60%", padding: "8px", marginRight: 8 }}
      />
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        style={{ padding: "8px", marginRight: 8 }}
      />
      <button onClick={fetchCovidData} style={{ padding: "8px 16px" }}>
        Search
      </button>
      {loading && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999
        }}>
          <div style={{
            background: "#fff",
            padding: "32px 48px",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            fontSize: 20
          }}>
            Loading...
          </div>
        </div>
      )}
{data && (
  <div style={{ background: "#222", padding: 16, marginTop: 16 }}>
    {data.error && <div style={{ color: "red" }}>{data.error}</div>}
{Array.isArray(data.cases) && data.cases.length === 0 && (
  <div style={{ color: "#ffa500" }}>No cases found for this date.</div>
)}

    {data.total && typeof data.total === "object" && (
      <div>
        <h3>Total</h3>
        <ul>
          {Object.entries(data.total).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {String(value)}
            </li>
          ))}
        </ul>
      </div>
    )}
    {Array.isArray(data.cases) && data.cases.length > 0 && (
  <div>
    <ul>
      {data.cases.map((item, idx) => (
        <li key={idx}>
          <ul>
            {Object.entries(item).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {String(value)}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </div>
)}
          {!data.total && !data.cases && !data.error && (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
}

export default App;