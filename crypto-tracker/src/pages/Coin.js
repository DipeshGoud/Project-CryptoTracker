import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Loader from '../components/Common/Loader';
import { coinobject } from '../functions/coinObject';
import List from '../components/DashboardPage/List';
import Coininfo from '../components/Coin/Coininfo';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrice } from '../functions/getCoinPrice';


function CoinPage() {

    const { id } = useParams();
    const [loading, setLoading] = useState(true); // Holds the loading state
    const [coinData, setCoinData] = useState(); // Holds the coin data
    const [days, setDays] = useState(30); // Holds the number of days to show on the chart   

    useEffect(() => {
        document.title = `${id} | Crypto Tracker`
        if (id) {
            getData(); 
        }
    }, [id])

    async function getData() {
        const data = await getCoinData(id);
        if (data) {
            coinobject(setCoinData, data);
            const prices = await getCoinPrice(id, days);
            if(prices){
                setLoading(false);
            }
        }
    }

    return (
        <div>
            <Header />
            {loading ?
                <Loader />
                : <>
                    <div className='dark-grey-wrapper'>
                        <List coin={coinData} />
                    </div>
                    <Coininfo heading={coinData.name} desc={coinData.desc} />
                </>}
        </div>
    )
}

export default CoinPage
