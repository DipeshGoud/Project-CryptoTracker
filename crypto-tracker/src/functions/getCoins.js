import axios from "axios";


let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=120&page=1&sparkline=false&locale=en';

export const getCoins = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching coin data:", error);
        throw error; // Rethrow the error to handle it in the component
    }
}
