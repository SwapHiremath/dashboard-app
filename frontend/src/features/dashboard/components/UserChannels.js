import { useEffect, useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import axios from "axios";

// const userSourceData = [
//     {source : "Facebook Ads", count : "26,345", conversionPercent : 10.2},
//     {source : "Google Ads", count : "21,341", conversionPercent : 11.7},
//     {source : "Instagram Ads", count : "34,379", conversionPercent : 12.4},
//     {source : "Affiliates", count : "12,359", conversionPercent : 20.9},
//     {source : "Organic", count : "10,345", conversionPercent : 10.3},
// ]

function UserChannels() {
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/city")
      .then((response) => {
        setCityData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <TitleCard title={"City Details"}>
      {/** Table Data */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="normal-case">Name</th>
              <th className="normal-case">Country Code</th>
              <th className="normal-case">District</th>
              <th className="normal-case">Population</th>
            </tr>
          </thead>
          <tbody>
            {cityData.map((u, k) => {
              return (
                <tr key={k}>
                  <th>{k + 1}</th>
                  <td>{u.Name}</td>
                  <td>{u.CountryCode}</td>
                  <td>{u.District}</td>
                  <td>{u.Population}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}

export default UserChannels;
