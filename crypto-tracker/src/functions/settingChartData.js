import { convertDate } from "./convertDate";

export const settingChartData = (setChartData, prices) => {
    setChartData({
        labels: prices.map((price) => convertDate(price[0])),
        datasets: [
            {
                label: "Price",
                data: prices.map((price) => price[1]),
                borderColor: "#3a80e9",
                borderWidth: 2,
                fill: true,
                tension: 0.25,
                backgroundColor: prices
                    ? "transparent"
                    : "rgba(58, 128, 233, 0.1)",
                pointRadius: 0,
            },
            // Additional datasets if needed
        ],
    });
}