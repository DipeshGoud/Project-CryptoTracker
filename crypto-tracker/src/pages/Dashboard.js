import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import TabsComponent from '../components/DashboardPage/Tabs'

function DashboardPage() {

    let [coins, setCoins] = useState([]);

    let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&locale=en';

    useEffect(() => {
        axios.get(url)
        .then(res => {
            console.log(res.data);
            setCoins(res.data); 
        })
        .catch(error => console.error(error));
    }, []);

return (
    <div>
        <Header />
        <TabsComponent coins={coins}/>
    </div>
)
}

export default DashboardPage