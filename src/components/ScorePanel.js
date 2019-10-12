import React from "react";
import PropTypes from "prop-types";

import Seconds from "./Seconds";
// import Moves from "./Moves";

class Stars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: ["gold", "gold", "gold"]
        };
    }

    componentDidUpdate(prevProps) {
        const {moves} = this.props;
        if (prevProps.moves === moves) {
            return;
        }
        let update;
        if (moves === 0) {
            update = ["gold", "gold", "gold"];
        } else if (moves === 10) {
            update = ["gold", "gold", "grey"];
        } else if (moves === 15) {
            update = ["gold", "grey", "grey"];
        } else {
            return;
        }
        this.setState({colors: update});
    }

    render() {
        return (
            <ul className="stars">
                {this.state.colors.map((col, i) => {
                    return (
                        <li key={i}>
                            <i style={{color: col}} className="fa fa-star" />
                        </li>
                    );
                })}
            </ul>
        );
    }
}

Stars.propTypes = {
    moves: PropTypes.number.isRequired
};

function Moves(props) {
    return (
        <React.Fragment>
            <span className="moves">
                {String(props.moves).padStart(3, "0")}
            </span>
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
            <Stars moves={props.moves} />
            <Moves moves={props.moves} />
            {props.startTicking ? (
                <Seconds recUsersTime={props.recUsersTime} />
            ) : (
                <React.Fragment>
                    <span className="seconds">
                        {" "}
                        {String(props.usersTime).padStart(3, "0")}{" "}
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
    usersTime: PropTypes.number.isRequired
};

export default ScorePanel;
