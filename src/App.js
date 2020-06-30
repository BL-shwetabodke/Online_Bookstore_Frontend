import React from 'react';
import './App.css';
import Footer from "./components/utils/Footer";
import DefaultRoutes from "./route/RouterSwitch";

function App() {
    return (
        <div className="App">
            <div className="mainDiv">
                <DefaultRoutes/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;