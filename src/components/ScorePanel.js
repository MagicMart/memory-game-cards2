import React from "react";
import PropTypes from "prop-types";

import Seconds from "./Seconds";

function ScorePanel(props) {
    const zeroes = (
        <React.Fragment>
            <span className="seconds"> 000 </span>
            <small> Secs </small>
        </React.Fragment>
    );
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
            <span className="moves">000</span>
            <small> Moves </small>
            {props.start ? <Seconds finishTime={props.finishTime} /> : zeroes}

            <div className="restart">
                <i className="fa fa-repeat" />
            </div>
        </div>
    );
}

ScorePanel.propTypes = {
    finishTime: PropTypes.func.isRequired,
    start: PropTypes.bool.isRequired
};

export default ScorePanel;
