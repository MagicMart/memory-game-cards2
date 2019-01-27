import React from "react";
import ScorePanel from "./ScorePanel";
import Cards from "./Cards";

class App extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <header>
                        <h1>Matching Game</h1>
                    </header>
                    <ScorePanel />
                    <ul className="deck">
                        <Cards />
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;
