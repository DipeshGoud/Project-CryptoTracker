import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import TabsComponent from '../components/DashboardPage/Tabs';
import Search from '../components/DashboardPage/Search';
import PaginationComponent from '../components/DashboardPage/Pagination';
import Loader from '../components/Common/Loader';
import BackToTop from '../components/Common/BackToTop';
import { getCoins } from '../functions/getCoins';

function DashboardPage() {
    // State variables
    let [coins, setCoins] = useState([]); // Holds all coins data
    let [PaginationCoins, setPaginationCoins] = useState([]); // Holds coins data for the current page
    const [search, setSearch] = useState(''); // Holds the search input value
    const [page, setPage] = useState(1); // Holds the current page number
    const [loading, setLoading] = useState(true); // Holds the loading state


    // Function to handle page changes
    const handlePageChange = (event, value) => {
        setPage(value); // Update the current page number
        var previousIndex = (value - 1) * 12; // Calculate the starting index for the current page
        setPaginationCoins(coins.slice(previousIndex, previousIndex + 12)); // Set the coins data for the current page
    };

    // Function to handle search input changes
    const onSearchChange = (e) => {
        setSearch(e.target.value); // Update the search input value
    }

    // Filter coins based on search input
    var filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );

    // Fetch data from the API when the component mounts
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const myCoins = await getCoins();
        if (myCoins) {
            setCoins(myCoins);
            setPaginationCoins(myCoins.slice(0, 12));
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
                    <Search search={search} onSearchChange={onSearchChange} />
                    <TabsComponent coins={search ? filteredCoins : PaginationCoins} />
                    {!search && <PaginationComponent page={page} handlePageChange={handlePageChange} />}
                </>
            )}
        </div>
    );
}

export default DashboardPage;
