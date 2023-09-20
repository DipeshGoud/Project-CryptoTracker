import axios from "axios";

export const getCoinPrice = (id,days) => {
    const prices = axios
        .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            console.error(error);
        });
    return prices;
}