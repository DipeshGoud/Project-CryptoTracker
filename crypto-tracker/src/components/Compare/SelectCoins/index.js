import React, { useEffect } from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getCoins } from '../../../functions/getCoins';
import './styles.css';

function SelectCoins({crypto1, crypto2, hadleCoinChange}) {

    const [allCoins, setAllCoins] = React.useState([]);

    const styles = {
        height: "2.5rem",
        color: "var(--white)",
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--white)"
        },
        "& .MuiSvgIcon-root": {
            color: "var(--white)"
        },
        "&:hover": {
            "& fieldset": {
                borderColor: "#3a80eg"
            },
        },
    }

    useEffect(() => {   
        getData();
    }, []);

    async function getData() {  
        const myCoins = await getCoins();
        setAllCoins(myCoins);
    }


    return (
        <div className='coins-flex'>
            <p>Crypto 1</p>
            <Select
                sx={styles}
                value={crypto1}
                label="Crypto 1"
                onChange={(event) => hadleCoinChange(event, false)}
            >
                {allCoins.filter(item => item.id != crypto2).map((coin , i) => (
                <MenuItem key={i } value={coin.id}>{coin.name}</MenuItem>
                ))} 
            </Select>
            <p>Crypto 2</p>
            <Select
                sx={styles}
                value={crypto2}
                label="Crypto 2"
                onChange={(event) => hadleCoinChange(event, true)}
            >
                {allCoins.filter((item) => item.id != crypto1).map((coin) => (
                <MenuItem value={coin.id}>{coin.name}</MenuItem>
                ))} 
            </Select>
        </div>
    )
}

export default SelectCoins;
