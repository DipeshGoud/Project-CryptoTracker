import axios from "axios";

export const getCoinPrice = (id, days, priceType) => {
    return axios
        .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
        )
        .then((res) => {
            if (res.status === 200) {
                return res.data[priceType];
            } else {
                // Handle non-200 status code as an error
                throw new Error(`HTTP status ${res.status}`);
            }
        })
        .catch((error) => {
            console.error(error);
            throw error; // Re-throw the error to propagate it to the caller
        });
};
