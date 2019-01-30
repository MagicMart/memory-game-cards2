import React from "react";
import ScorePanel from "./ScorePanel";
import Cards from "./Cards";
import EndOfGame from "./EndOfGame";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: false,
            howLong: 0,
            moves: 0,
            resetCards: false,
            finishGame: false,
            cardsMatched: 0
        };
        this.finishTime = this.finishTime.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.updateMoves = this.updateMoves.bind(this);
        this.handleRestart = this.handleRestart.bind(this);
        this.numMatched = this.numMatched.bind(this);
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

    numMatched() {
        this.setState(function(state) {
            return { cardsMatched: state.cardsMatched + 2 };
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.cardsMatched === 16) {
            return;
        }
        if (this.state.cardsMatched === 16) {
            this.setState({ finishGame: true, start: false });
        }
    }

    render() {
        return (
            <div>
                {this.state.finishGame && <EndOfGame />}
                <div className="container">
                    <header>
                        <h1>Matching Game</h1>
                    </header>

                    <ScorePanel
                        finishTime={this.finishTime}
                        start={this.state.start}
                        moves={this.state.moves}
                        handleRestart={this.handleRestart}
                        howLong={this.state.howLong}
                        finishGame={this.state.finishGame}
                    />
                    <ul className="deck">
                        {this.state.resetCards ? null : (
                            <Cards
                                handleStart={this.handleStart}
                                updateMoves={this.updateMoves}
                                numMatched={this.numMatched}
                            />
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;
