import React from "react";
import PropTypes from "prop-types";

import Seconds from "./Seconds";
// import Moves from "./Moves";

function Stars(props) {
    return (
        <ul className="stars">
            {props.colors.map((col, i) => {
                return (
                    <li key={i}>
                        <i style={{ color: col }} className="fa fa-star" />
                    </li>
                );
            })}
        </ul>
    );
}

Stars.propTypes = {
    colors: PropTypes.array.isRequired
};

class StarsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: ["gold", "gold", "gold"]
        };
    }

    componentDidUpdate(prevProps) {
        const { moves } = this.props;
        if (prevProps.moves === moves) {
            return;
        }
        if (moves !== 5 && moves !== 10 && moves !== 0) {
            return;
        }
        let update;
        if (moves === 0) {
            update = ["gold", "gold", "gold"];
        }
        if (moves === 5) {
            update = ["gold", "gold", "grey"];
        }
        if (moves === 10) {
            update = ["gold", "grey", "grey"];
        }
        this.setState({ colors: update });
    }

    render() {
        return <Stars colors={this.state.colors} />;
    }
}

StarsContainer.propTypes = {
    moves: PropTypes.number.isRequired
};

function Moves(props) {
    return (
        <React.Fragment>
            <span className="moves">{String(props.moves).padStart(3, 0)}</span>
            <small> Moves </small>
        </React.Fragment>
    );
}

Moves.propTypes = {
    moves: PropTypes.number.isRequired
};

function ScorePanel(props) {
    return (
        <div className="score-panel">
            <StarsContainer moves={props.moves} />
            <Moves moves={props.moves} />
            {props.startTicking ? (
                <Seconds recUsersTime={props.recUsersTime} />
            ) : (
                <React.Fragment>
                    <span className="seconds">
                        {" "}
                        {/* finish game is true when all cards are matched */}
                        {props.displayEnd
                            ? String(props.usersTime).padStart(3, 0)
                            : "000"}{" "}
                    </span>
                    <small> Secs </small>
                </React.Fragment>
            )}

            <div onClick={props.handleRestart} className="restart">
                <i className="fa fa-repeat" />
            </div>
        </div>
    );
}

ScorePanel.propTypes = {
    recUsersTime: PropTypes.func.isRequired,
    startTicking: PropTypes.bool.isRequired,
    moves: PropTypes.number.isRequired,
    handleRestart: PropTypes.func.isRequired,
    usersTime: PropTypes.number.isRequired,
    displayEnd: PropTypes.bool.isRequired
};

export default ScorePanel;
