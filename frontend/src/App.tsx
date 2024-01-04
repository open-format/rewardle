import { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import LeaderboardPage from './leaderboard';
import Play from './Play';
import QuestsPage from './Quests';

function App() {
  const [address, setAddress] = useState("");
  async function connectMetaMask() {
    if (typeof (window as any).ethereum !== 'undefined') {
        try {
            const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
            localStorage.setItem("address", accounts[0])
            setAddress(accounts[0])
        } catch (error) {
            console.error("Error connecting to MetaMask", error);
        }
    } else {
        console.log("MetaMask is not installed");
    }
  }


    return (
      <Router>
        <div className="text-white">
          <nav className="flex space-between mx-5" >
            <ul className="flex space-between w-full space-x-5 p-5">
              <li><Link to="/">Play</Link></li>
              <li><Link to="/quests">Quests</Link></li>
              <li><Link to="/leaderboard">Leaderboard</Link></li>
            </ul>
            {address ? <p className='text-white'>Connected as {address}</p>: (
            <button className='text-white' onClick={connectMetaMask}>Connect Metamask</button>
          )}
          </nav>
  
          <Routes>
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/quests" element={<QuestsPage />} />
            <Route path="/" element={<Play />}/>
          </Routes>
        </div>
      </Router>
    );
  }
  
  export default App;
