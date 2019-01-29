import React from "react";
import PropTypes from "prop-types";

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

export default Moves;
