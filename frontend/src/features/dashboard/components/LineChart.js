import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import TitleCard from "../../../components/Cards/TitleCard";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function LineChart() {
  const [cityData, setCityData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);

  useEffect(() => {
    axios
      .get("http://13.235.75.191:3001/city")
      .then((response) => {
        setCityData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    debugger;
    if (cityData) {
      const labels = cityData.map((item) => item.Name);
      const data = {
        labels,
        datasets: [
          {
            fill: true,
            label: "MAU",
            data: cityData.map((item) => item.Population),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      };
      setLineChartData(data);
    }
  }, [cityData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <TitleCard title={"Montly Active Users (in K)"}>
      {lineChartData ? <Line data={lineChartData} options={options} /> : null}
    </TitleCard>
  );
}

export default LineChart;
