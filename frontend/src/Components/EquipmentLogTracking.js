import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function EquipmentLogTracking() {
  const [equipments, setEquipments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/equipments')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setEquipments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Error: {error.message}</h1>
      </div>
    );
  }

  if (!equipments || !Array.isArray(equipments.averageValue)) {
    return (
      <div>
        <h1>No equipment data available.</h1>
      </div>
    );
  }

  return (
    <div>
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Equipments Log Tracking
      </h1>
      <div>
        {equipments.averageValue.map((equipment) => {
          const chartData = {
            labels: ['24h', '48h', '1 Week', '1 Month'],
            datasets: [
              {
                label: `Equipment average values`,
                data: [
                  parseFloat(equipment.avg_24h) || 0,
                  parseFloat(equipment.avg_48h) || 0,
                  parseFloat(equipment.avg_1week) || 0,
                  parseFloat(equipment.avg_1month) || 0,
                ],
                backgroundColor: [
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
                barThickness: 30,
                maxBarThickness: 30,
              },
            ],
          };

          const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: true },
            },
            scales: {
              x: {
                grid: { display: false },
                categoryPercentage: 0.8,
                barPercentage: 0.9,
              },
              y: {
                beginAtZero: true,
              },
            },
          };

          return (
            <div key={equipment.equipmentId}>
              <h2 style={{ display: 'flex', justifyContent: 'center' }}>
                Equipment ID: {equipment.equipmentId}
              </h2>
              <div style={{ display: 'grid', placeItems: 'center' }}>
                <div style={{ width: '800px' }}>
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
