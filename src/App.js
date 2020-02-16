import React from 'react';
import './App.css';

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

/*callRouteId = async(name) => {
    let url = new URL("localhost:3001/api/getID");
    url.search = new URLSearchParams({
        type: "route",
        name: name.toString()
    });

    const response = await fetch(url);
    return await response.json();
};*/


class App extends React.Component{
    render(){
        return(
            <div>
              Hello world!
            </div>
        )
    }
}

export default App;
