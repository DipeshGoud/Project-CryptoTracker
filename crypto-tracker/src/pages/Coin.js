import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Loader from '../components/Common/Loader';
import { coinobject } from '../functions/coinObject';
import List from '../components/DashboardPage/List';
import Coininfo from '../components/Coin/Coininfo';


function CoinPage() {

    const { id } = useParams();
    const [loading, setLoading] = useState(true); // Holds the loading state
    const [coinData, setCoinData] = useState(); // Holds the coin data

    useEffect(() => {
        document.title = `${id} | Crypto Tracker`
        if (id) {
            axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
                .then(res => {
                    console.log(res.data);
                    setLoading(false); // Set the loading state to false
                    coinobject(setCoinData, res.data)
                })
                .catch(error => {
                    console.error(error);
                    setLoading(false); // Set the loading state to false
                });
        }
    }, [id])

    return (
        <div>
            <Header />
            {loading ?
                <Loader />
                : <>
                    {console.log(coinData)}
                    <div className='dark-grey-wrapper'>
                        <List coin={coinData} />
                    </div>
                    <Coininfo heading={coinData.name} desc={coinData.desc} /> 
                </>}
        </div>
    )
}

export default CoinPage
