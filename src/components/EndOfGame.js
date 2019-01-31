import React from "react";
import PropTypes from "prop-types";

function EndOfGame(props) {
    return (
        <div className="modal-background">
            <div className="modal-message">
                <div onClick={props.handleRestart} className="close">
                    X
                </div>
                <h1>End of Game</h1>
            </div>
        </div>
    );
}

EndOfGame.propTypes = {
    handleRestart: PropTypes.func.isRequired
};

export default EndOfGame;
