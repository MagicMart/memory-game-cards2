import React from "react";
import ScorePanel from "./ScorePanel";
import Cards from "./Cards";
import EndOfGame from "./EndOfGame";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startTicking: false,
            usersTime: 0,
            moves: 0,
            resetCards: false,
            cardsMatched: 0
        };
        this.recUsersTime = this.recUsersTime.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.updateMoves = this.updateMoves.bind(this);
        this.handleRestart = this.handleRestart.bind(this);
        this.addTwoMatched = this.addTwoMatched.bind(this);
    }

    handleStart() {
        this.setState({ startTicking: true });
    }

    handleRestart() {
        this.setState({
            startTicking: false,
            usersTime: 0,
            moves: 0,
            resetCards: true,
            cardsMatched: 0
        });
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

    recUsersTime(usersTime) {
        if (this.state.cardsMatched === 16) {
            this.setState({ usersTime });
        }
    }

    addTwoMatched() {
        this.setState(function(state) {
            return { cardsMatched: state.cardsMatched + 2 };
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.cardsMatched === 16) {
            return;
        }
        if (this.state.cardsMatched === 16) {
            setTimeout(() => this.setState({ startTicking: false }), 1000);
        }
    }

    render() {
        return (
            <div>
                {this.state.usersTime !== 0 && (
                    <EndOfGame handleRestart={this.handleRestart} />
                )}
                <div className="container">
                    <header>
                        <h1>Matching Game</h1>
                    </header>

                    <ScorePanel
                        recUsersTime={this.recUsersTime}
                        startTicking={this.state.startTicking}
                        moves={this.state.moves}
                        handleRestart={this.handleRestart}
                        usersTime={this.state.usersTime}
                    />

                    {this.state.resetCards ? null : (
                        <Cards
                            startTicking={this.state.startTicking}
                            handleStart={this.handleStart}
                            updateMoves={this.updateMoves}
                            addTwoMatched={this.addTwoMatched}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default App;
