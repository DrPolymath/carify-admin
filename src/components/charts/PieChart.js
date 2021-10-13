import React from 'react'
import { Pie } from 'react-chartjs-2';

const data = {
    labels: ['Perodua', 'Honda', 'Proton', 'Toyota'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5],
        backgroundColor: [
          'rgb(33, 150, 243)',
          'rgb(255, 255, 168)',
          'rgb(255, 234, 0)',
          'rgb(165, 197, 255)',
        ],
        borderColor: [
          'rgb(33, 150, 243)',
          'rgb(255, 255, 168)',
          'rgb(255, 234, 0)',
          'rgb(165, 197, 255)',
        ],
        borderWidth: 1,
      },
    ],
  };

const PieChart = () => {
    return (
        <Pie data={data} options={{responsive: true,  maintainAspectRatio: true,}}/>
    )
}

export default PieChart
