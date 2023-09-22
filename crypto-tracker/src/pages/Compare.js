import React, { useEffect } from 'react';
import Header from '../components/Header';
import SelectCoins from '../components/Compare/SelectCoins';
import SelectDays from '../components/Coin/SelectDays';
import { coinobject } from '../functions/coinObject';
import { getCoinPrice } from '../functions/getCoinPrice';
import { getCoinData } from '../functions/getCoinData';
import Loader from '../components/Common/Loader';
import Coininfo from '../components/Coin/Coininfo';
import List from '../components/DashboardPage/List';
import { settingChartData } from '../functions/settingChartData';
import LineChart from '../components/Coin/LineChart';
import TogglePriceType from '../components/Coin/PriceType';
import BackToTop from '../components/Common/BackToTop';

function Compare() {
    // State variables
    const [crypto1, setCrypto1] = React.useState('bitcoin');
    const [crypto2, setCrypto2] = React.useState('ethereum');
    const [coin1Data, setCoin1Data] = React.useState({});
    const [coin2Data, setCoin2Data] = React.useState({});
    const [days, setDays] = React.useState(30);
    const [loading, setLoading] = React.useState(true);
    const [priceType, setPriceType] = React.useState('prices');
    const [chartData, setChartData] = React.useState({});

    // Function to handle changes in the number of days
    async function handleDaysChange(event) {
        setLoading(true);
        setDays(event.target.value);
        const prices1 = await getCoinPrice(crypto1, event.target.value, priceType);
        const prices2 = await getCoinPrice(crypto2, event.target.value, priceType);
        settingChartData(setChartData, prices1, prices2);
        setLoading(false);
    }

    // Function to handle changes in the price type
    const handlePriceTypeChange = async (event, newType) => {
        setPriceType(newType);
        const prices1 = await getCoinPrice(crypto1, days, newType);
        const prices2 = await getCoinPrice(crypto2, days, newType);
        settingChartData(setChartData, prices1, prices2);
        setLoading(false);
    };

    // Fetch initial data when the component mounts
    useEffect(() => {
        getData();
    }, []);

    // Function to fetch data for both cryptocurrencies
    async function getData() {
        setLoading(true);
        const data1 = await getCoinData(crypto1);
        const data2 = await getCoinData(crypto2);

        // Process data for the first cryptocurrency
        if (data1) {
            coinobject(setCoin1Data, data1);
        }

        // Process data for the second cryptocurrency
        if (data2) {
            coinobject(setCoin2Data, data2);
        }

        // If data is available for both cryptocurrencies, fetch price data and update the chart
        if (data1 && data2) {
            const prices1 = await getCoinPrice(crypto1, days, priceType);
            const prices2 = await getCoinPrice(crypto2, days, priceType);
            settingChartData(setChartData, prices1, prices2);

            setLoading(false);
        }
    }

    // Function to handle changes in the selected cryptocurrency
    const hadleCoinChange = async (event, isCoin2) => {
        setLoading(true);
        if (isCoin2) {
            setCrypto2(event.target.value);
            const data = await getCoinData(event.target.value);
            coinobject(setCoin2Data, data);

            const prices1 = await getCoinPrice(crypto1, days, priceType);
            const prices2 = await getCoinPrice(event.target.value, days, priceType);
            if (prices1 && prices2) {
                // settingChartData(setChartData, prices);
                setLoading(false);
            }
        } else {
            setCrypto1(event.target.value);
            const data = await getCoinData(event.target.value);
            coinobject(setCoin1Data, data);
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
                    <div className='coins-days-flex'>
                        {/* Component for selecting cryptocurrencies */}
                        <SelectCoins crypto1={crypto1} crypto2={crypto2} hadleCoinChange={hadleCoinChange} />

                        {/* Component for selecting the number of days */}
                        <SelectDays days={days} handleDaysChange={handleDaysChange} noPtag={true} />
                    </div>

                    {/* Component for displaying the first cryptocurrency */}
                    <div className='dark-grey-wrapper'>
                        <List coin={coin1Data} />
                    </div>

                    {/* Component for displaying the second cryptocurrency */}
                    <div className='dark-grey-wrapper'>
                        <List coin={coin2Data} />
                    </div>

                    <div className='dark-grey-wrapper-2'>
                        {/* Component for toggling between price types */}
                        <TogglePriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange} />

                        {/* Component for displaying the line chart */}
                        <LineChart chartData={chartData} priceType={priceType} multiAxis={true} />
                    </div>

                    {/* Component for displaying information about the first cryptocurrency */}
                    <Coininfo heading={coin1Data.name} desc={coin1Data.desc} />

                    {/* Component for displaying information about the second cryptocurrency */}
                    <Coininfo heading={coin2Data.name} desc={coin2Data.desc} />
                </>
            )}
        </div>
    );
}

export default Compare;
