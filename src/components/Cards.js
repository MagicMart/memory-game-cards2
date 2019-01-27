import React from "react";
import api from "../utils/api";
const { shuffleArray } = api;

const cards = [
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb",
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb"
];

class Cards extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: []
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.setState({ cards: shuffleArray(cards) });
    }

    handleClick(e) {
        const event = e.target;
        event.classList.toggle("open");
        event.classList.toggle("show");
    }
    render() {
        const cards = this.state.cards.map(
            function(card, i) {
                return (
                    <li
                        key={card + i}
                        className="card"
                        onClick={function(e) {
                            this.handleClick(e);
                        }.bind(this)}
                    >
                        <i className={card} />
                    </li>
                );
            }.bind(this)
        );
        return <React.Fragment>{cards}</React.Fragment>;
    }
}

export default Cards;
