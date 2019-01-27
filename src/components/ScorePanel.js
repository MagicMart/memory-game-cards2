import React from "react";

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
            <span className="moves">000</span>
            <small> Moves </small>
            <span className="seconds">000</span>
            <small> Secs </small>
            <div className="restart">
                <i className="fa fa-repeat" />
            </div>
        </div>
    );
}

export default ScorePanel;
