import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Grid from '../Grid';
import "./styles.css"
import List from '../List';
import Search from '../Search';

export default function TabsComponent({ coins }) {
    const [value, setValue] = React.useState('grid');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const style = {
        color: 'var(---white)',
        width: '50vw',
        fonstSize: '1.2rem',
        fontFamily: 'Inter',
        textTransform: 'capitalize',
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: "#3a80e9",
            },
        },
    })

    return (
        <ThemeProvider theme={theme}>
            <TabContext value={value}>
                <div>
                    <TabList onChange={handleChange} variant='fullWidth'>
                        <Tab label="Grid" value="grid" sx={style} />
                        <Tab label="List" value="list" sx={style} />
                    </TabList>
                </div>
                <TabPanel value="grid">
                    <div className='grid-flex'>
                        {coins.map((coin, i) => {
                            return (
                                <Grid coin={coin} key={i} />
                            )
                        })}
                    </div>
                </TabPanel>
                <TabPanel value="list">
                    <table>
                        <thead>
                            <tr className='heading-row'>
                                <th className='th-Name align-left'>Name</th>
                                <th className='th-empty align-left'></th>
                                <th className='th-Change align-left'>24h Change</th>
                                <th className='th-Price align-center'>Price</th>
                                <th className='th-Volume align-right'>24h Volume</th>
                                <th className='th-Cap align-right'>Market Cap</th>
                                <th className='watchlist'></th>
                            </tr>
                        </thead>
                    {coins.map((coin, i) => {
                            return(
                                <List coin={coin} key={i} />
                            )
                        })}
                    </table>
                </TabPanel>
            </TabContext>
        </ThemeProvider>
    );
}