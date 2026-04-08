import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/participants")
      .then(res => setData(res.data));
  }, []);

  const attending = data.filter(p => p.attending === true);
  const notAttending = data.filter(p => p.attending === false);

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 gap-10">

        <div>
          <h2 className="text-green-600 font-bold mb-3">
            Attending ({attending.length})
          </h2>
          {attending.map(p => (
            <p key={p._id}>{p.title} {p.name}</p>
          ))}
        </div>

        <div>
          <h2 className="text-red-600 font-bold mb-3">
            Not Attending ({notAttending.length})
          </h2>
          {notAttending.map(p => (
            <p key={p._id}>{p.title} {p.name}</p>
          ))}
        </div>

      </div>
    </div>
  );
}