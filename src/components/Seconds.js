import React from "react";
import PropTypes from "prop-types";

class Seconds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
        this.props.recUsersTime(this.state.seconds);
    }

    tick() {
        this.setState(state => ({seconds: state.seconds + 1}));
    }

    render() {
        return (
            <React.Fragment>
                <span className="seconds">
                    {String(this.state.seconds).padStart(3, "0")}
                </span>
                <small> Secs </small>
            </React.Fragment>
        );
    }
}

Seconds.propTypes = {
    recUsersTime: PropTypes.func.isRequired
};

export default Seconds;
