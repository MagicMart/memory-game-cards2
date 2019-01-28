import React from "react";
import api from "../utils/api";

const { shuffleArray, cardArray } = api;

class Cards extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [],
            holdCards: [],
            heldCards: 0
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.setState({ cards: shuffleArray(cardArray) });
    }

    handleClick(e) {
        const target = e.currentTarget;
        if (
            target.className === "card open show" ||
            target.className === "card open match"
        ) {
            return;
        }
        target.className = "card open show";
        this.setState(function(state) {
            return {
                holdCards: [...state.holdCards, target],
                heldCards: state.heldCards + 1
            };
        });
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
