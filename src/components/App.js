import React from "react";
import PropTypes from "prop-types";

import ScorePanel from "./ScorePanel";
import Cards from "./Cards";
import EndOfGame from "./EndOfGame";

function AppPresentation(props) {
    const {
        displayEnd,
        handleRestart,
        recUsersTime,
        startTicking,
        moves,
        usersTime,
        handleStart,
        updateMoves,
        addTwoMatched,
        resetCards
    } = props;
    return (
        <div>
            {displayEnd && <EndOfGame handleRestart={handleRestart} />}
            <div className="container">
                <header>
                    <h1>Matching Game</h1>
                </header>

                <ScorePanel
                    recUsersTime={recUsersTime}
                    startTicking={startTicking}
                    moves={moves}
                    handleRestart={handleRestart}
                    usersTime={usersTime}
                    displayEnd={displayEnd}
                />

                {resetCards ? null : (
                    <Cards
                        handleStart={handleStart}
                        updateMoves={updateMoves}
                        addTwoMatched={addTwoMatched}
                    />
                )}
            </div>
        </div>
    );
}

AppPresentation.propTypes = {
    recUsersTime: PropTypes.func.isRequired,
    startTicking: PropTypes.bool.isRequired,
    moves: PropTypes.number.isRequired,
    handleRestart: PropTypes.func.isRequired,
    usersTime: PropTypes.number.isRequired,
    displayEnd: PropTypes.bool.isRequired,
    handleStart: PropTypes.func.isRequired,
    updateMoves: PropTypes.func.isRequired,
    addTwoMatched: PropTypes.func.isRequired,
    resetCards: PropTypes.bool.isRequired
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startTicking: false,
            usersTime: 0,
            moves: 0,
            resetCards: false,
            displayEnd: false,
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
            cardsMatched: 0,
            displayEnd: false
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
        if (this.state.displayEnd) {
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
            this.setState({ displayEnd: true, startTicking: false });
        }
    }

    render() {
        return (
            <AppPresentation
                recUsersTime={this.recUsersTime}
                startTicking={this.state.startTicking}
                moves={this.state.moves}
                handleRestart={this.handleRestart}
                usersTime={this.state.usersTime}
                displayEnd={this.state.displayEnd}
                handleStart={this.handleStart}
                updateMoves={this.updateMoves}
                addTwoMatched={this.addTwoMatched}
                resetCards={this.state.resetCards}
            />
        );
    }
}

export default App;
