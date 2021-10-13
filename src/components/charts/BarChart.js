import React from 'react'
import { Bar } from 'react-chartjs-2'

const data = {
    labels: ['Perodua Myvi', 'Honda Jazz', 'Honda City', 'Toyota Vios', 'Mazda 3'],
    datasets: [
    {
        label: 'Male',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgb(33, 150, 243)',
    },
    {
        label: 'Female',
        data: [2, 3, 20, 5, 1, 4],
        backgroundColor: 'rgb(255, 234, 0)',
    },
    ],
};
  
const options = {
    scales: {
        yAxes: [
            {
            ticks: {
                beginAtZero: true,
            },
            },
        ],
    },
};

const BarChart = () => {
    return (
        <Bar
            data={data}
            height={300}
            width={600}
            options={options}
        />
    )
}

export default BarChart
