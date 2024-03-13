import "./App.css";
import React, { useEffect, useState } from "react";
import * as Realm from "realm-web";

function App() {
  const [dataSet, setDataSet] = useState([]);
  const [error, setError] = useState(null);

  const getData = async () => {
    const app = new Realm.App({ id: "application-0-purme" });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const allData = await user.functions.getAllData();
      setDataSet(allData);
      // console.log(allData);
    } catch (err) {
      console.error("Failed to log in", err);
      setError("Failed to fetch data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      {error && <div>Error: {error}</div>}
      <ul>
        {dataSet.map((data, key) => (
          <li key={key}>{data.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
