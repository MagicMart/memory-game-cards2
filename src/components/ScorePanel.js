import React from "react";
import PropTypes from "prop-types";

import Seconds from "./Seconds";
// import Moves from "./Moves";

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
            <ul className="stars">
                <li>
                    <i className="fa fa-star" />
                </li>
                <li>
                    <i className="fa fa-star" />
                </li>
                <li>
                    <i className="fa fa-star" />
                </li>
            </ul>
            <Moves moves={props.moves} />
            {props.start ? (
                <Seconds finishTime={props.finishTime} />
            ) : (
                <React.Fragment>
                    <span className="seconds"> 000 </span>
                    <small> Secs </small>
                </React.Fragment>
            )}

            <div className="restart">
                <i className="fa fa-repeat" />
            </div>
        </div>
    );
}

ScorePanel.propTypes = {
    finishTime: PropTypes.func.isRequired,
    start: PropTypes.bool.isRequired,
    moves: PropTypes.number.isRequired
};

export default ScorePanel;
