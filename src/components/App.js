import React from "react";
import ScorePanel from "./ScorePanel";
import Cards from "./Cards";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: false,
            howLong: 0,
            moves: 0,
            resetCards: false
        };
        this.finishTime = this.finishTime.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.updateMoves = this.updateMoves.bind(this);
        this.handleRestart = this.handleRestart.bind(this);
    }

    handleStart() {
        this.setState({ start: true });
    }

    handleRestart() {
        this.setState({ start: false, howLong: 0, moves: 0, resetCards: true });
        setTimeout(
            function() {
                this.setState({ resetCards: false }), 100;
            }.bind(this)
        );
    }

    updateMoves() {
        this.setState(function(prevState) {
            return { moves: prevState.moves + 1 };
        });
    }

    finishTime(howLong) {
        this.setState({ howLong });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <header>
                        <h1>Matching Game</h1>
                    </header>
                    <ScorePanel
                        finishTime={this.finishTime}
                        start={this.state.start}
                        moves={this.state.moves}
                        handleRestart={this.handleRestart}
                    />
                    <ul className="deck">
                        {this.state.resetCards ? null : (
                            <Cards
                                handleStart={this.handleStart}
                                updateMoves={this.updateMoves}
                            />
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;
