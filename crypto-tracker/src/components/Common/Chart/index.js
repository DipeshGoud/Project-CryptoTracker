import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as Charts } from "chart.js/auto"; // Don't get rid of this if needed elsewhere
import { convertNumber } from "../../../functions/convertNumber";

function Chart({ chartData, priceType, multiAxis }) {
    const options = {
        plugins: {
            legend: {
                display: multiAxis ? true : false,
            },
        },
        responsive: true,
        interaction: {
            mode: "index",
            intersect: false,
        },
        scales: {
            crypto1: { // Left y-axis
                type: "linear",
                display: true,
                position: "left",
                ticks: {
                    callback: function (value, index, values) {
                        if (priceType === 'prices') return "$" + value.toLocaleString();
                        else {
                            return "$" + convertNumber(value);
                        }
                    },
                },
            }, 
        },
    };

    return <Line className="dark-grey-wrapper-2" data={chartData} options={options} />;
}

export default Chart;