import './App.css';
import DashboardPage from './pages/Dashboard';
import HomePage from './pages/Home';
import ComparePage from './pages/Compare';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes className="App">
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        {/* <Route path='/coin/:id' element={<CoinPage />} /> */}
        <Route path='/compare' element={<ComparePage />} />
        {/* <Route path='/watchlist' element={<WatchlistPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
