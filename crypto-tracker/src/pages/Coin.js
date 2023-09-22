import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Common/Loader';
import { coinobject } from '../functions/coinObject';
import List from '../components/DashboardPage/List';
import Coininfo from '../components/Coin/Coininfo';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrice } from '../functions/getCoinPrice';
import SelectDays from '../components/Coin/SelectDays';
import { settingChartData } from '../functions/settingChartData';
import TogglePriceType from '../components/Coin/PriceType';
import Chart from '../components/Common/Chart';
import BackToTop from '../components/Common/BackToTop';

function CoinPage() {
    // Get the 'id' parameter from the URL using useParams
    const { id } = useParams();
    const [loading, setLoading] = useState(true); // Holds the loading state
    const [coinData, setCoinData] = useState({}); // Holds the coin data
    const [days, setDays] = useState(7); // Holds the number of days to show on the chart
    const [chartData, setChartData] = useState({}); // Holds the chart data
    const [priceType, setPriceType] = useState('prices');

    // Update the document title when the 'id' changes
    useEffect(() => {
        document.title = `${id} | Crypto Tracker`;
        if (id) {
            getData();
        }
    }, [id, days]); // Include 'days' as a dependency

    // Function to fetch data for the selected cryptocurrency
    async function getData() {
        const data = await getCoinData(id);
        if (data) {
            coinobject(setCoinData, data);
            const prices = await getCoinPrice(id, days, priceType);
            if (prices) {
                settingChartData(setChartData, prices);
                setLoading(false);
            }
        }
    }

    // Handle changes in the number of days
    const handleDaysChange = async (event) => {
        const newDays = event.target.value;
        setDays(newDays); // Update state first
        const prices = await getCoinPrice(id, newDays, priceType); // Use the updated value
        if (prices) {
            settingChartData(setChartData, prices);
        }
    };

    // Handle changes in the selected price type
    const handlePriceTypeChange = async (event, newType) => {
        setPriceType(newType);
        const prices = await getCoinPrice(id, days, newType); // Use the updated value
        if (prices) {
            settingChartData(setChartData, prices);
        }
    };

    return (
        <div>
            <Header />
            <BackToTop />
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className='dark-grey-wrapper'>
                        <List coin={coinData} />
                    </div>
                    <div className='dark-grey-wrapper-2'>
                        <SelectDays days={days} handleDaysChange={handleDaysChange} />
                        <TogglePriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange} />
                        <Chart chartData={chartData} priceType={priceType} multiAxis={false} />
                    </div>
                    <div>
                        <Coininfo heading={coinData.name} desc={coinData.desc} />
                    </div>
                </>
            )}
        </div>
    );
}

export default CoinPage;
