import Navbar from './components/navbar/Navbar';
import './App.css';

import SimpleMap from './Map';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {AccountContext, LoadingContext} from './Context.js';

function App() {

  const [publicK, setPublicK] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  return (

      <Router>
        <AccountContext.Provider value={{publicK, setPublicK}}>
          <LoadingContext.Provider value={{loading, setLoading}}>
            <div className="App">
              <Navbar />

              <div className="content" style={{display: 'flex', flexDirection: 'column', alignItems : 'center'}}>
                <SimpleMap />
              </div>

            </div>
          </LoadingContext.Provider>
        </AccountContext.Provider>
      </Router>
  );
}

export default App;
