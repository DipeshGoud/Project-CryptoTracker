import React, { useEffect } from 'react'
import Header from '../components/Header'
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

function Compare() {

    const [crypto1, setCrypto1] = React.useState('bitcoin');
    const [crypto2, setCrypto2] = React.useState('ethereum');
    const [coin1Data, setCoin1Data] = React.useState({});
    const [coin2Data, setCoin2Data] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [days, setDays] = React.useState(30);
    const [priceType, setPriceType] = React.useState('prices');
    const [chartData, setChartData] = React.useState({});


    async function handleDaysChange(event) {
        setLoading(true);
        setDays(event.target.value);
        const prices1 = await getCoinPrice(crypto1, event.target.value, priceType);
        const prices2 = await getCoinPrice(crypto2, event.target.value, priceType);
        settingChartData(setChartData, prices1, prices2);
        setLoading(false);
    }

    const handlePriceTypeChange = async (event, newType) => {
        setPriceType(newType);
        const prices1 = await getCoinPrice(crypto1, days, newType);
        const prices2 = await getCoinPrice(crypto2, days, newType);
        settingChartData(setChartData, prices1, prices2);
        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        setLoading(true);
        const data1 = await getCoinData(crypto1);
        const data2 = await getCoinData(crypto2);
        if (data1) {
            coinobject(setCoin1Data, data1);
        }
        if (data2) {
            coinobject(setCoin2Data, data2);
        }

        if (data1 && data2) {
            const prices1 = await getCoinPrice(crypto1, days, priceType);
            const prices2 = await getCoinPrice(crypto2, days, priceType);
            settingChartData(setChartData, prices1, prices2);

            setLoading(false);
        }
    }

    const hadleCoinChange = async (event, isCoin2) => {
        setLoading(true);
        if (isCoin2) {
            setCrypto2(event.target.value);
            const data = await getCoinData(event.target.value);
            coinobject(setCoin2Data, data);

            const prices1 = await getCoinPrice(crypto1, days, priceType);
            const prices2 = await getCoinPrice(crypto2, days, priceType);
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
            {loading || !coin1Data?.id || !coin2Data?.id ?(
                <Loader />
                ) : <>
                    <div className='coins-days-flex'>
                        <SelectCoins crypto1={crypto1} crypto2={crypto2} hadleCoinChange={hadleCoinChange} />
                        <SelectDays days={days} handleDaysChange={handleDaysChange} noPtag={true} />
                    </div>
                    <div className='dark-grey-wrapper'>
                        <List coin={coin1Data} />
                    </div>
                    <div className='dark-grey-wrapper'>
                        <List coin={coin2Data} />   
                    </div>

                    <div className='dark-grey-wrapper-2'>
                        <TogglePriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange} />
                        <LineChart chartData={chartData} priceType={priceType} multiAxis={true} />
                    </div>

                    <Coininfo heading={coin1Data.name} desc={coin1Data.desc} />
                    <Coininfo heading={coin2Data.name} desc={coin2Data.desc} />
                </>}
        </div>
    )
}

export default Compare;