import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import TabsComponent from '../components/DashboardPage/Tabs';
import Loader from '../components/Common/Loader';
import BackToTop from '../components/Common/BackToTop';
import { getCoins } from '../functions/getCoins';

function WatchList() {
    // State variables
    const [coins, setCoins] = useState([]); // Holds all coins data
    const [loading, setLoading] = useState(true); // Holds the loading state

    // Fetch data from the API when the component mounts
    useEffect(() => {
        getData();
    }, []);

    // Fetch the list of coin IDs from local storage
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    // Filter the coins based on the coin IDs in the watchlist
    const filteredCoins = coins.filter((coin) => watchlist.includes(coin.id));

    const getData = async () => {
        const myCoins = await getCoins();
        if (myCoins) {
            setCoins(myCoins);
            setLoading(false);
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
                    <TabsComponent coins={filteredCoins} /> {/* Display filtered coins */}
                </>
            )}
        </div>
    );
}

export default WatchList;
