import React from "react";
import api from "../utils/api";

const { shuffleArray, cardArray } = api;

class Cards extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [],
            holdCards: [],
            cardClass: []
        };
        this.openCard = this.openCard.bind(this);
    }

    componentDidMount() {
        this.setState({
            cards: shuffleArray(cardArray),
            cardClass: new Array(16).fill("card")
        });
    }

    matchCards() {
        const { holdCards } = this.state;
        const update = this.state.cardClass.map((el, j) => {
            return holdCards[0].i === j || holdCards[1].i === j
                ? "card open match"
                : el;
        });
        this.setState({ cardClass: update, holdCards: [] });
    }

    closeCards() {
        const { holdCards } = this.state;
        const update = this.state.cardClass.map((el, j) => {
            return holdCards[0].i === j || holdCards[1].i === j ? "card" : el;
        });
        this.setState({ cardClass: update, holdCards: [] });
    }

    checkCards() {
        const { holdCards } = this.state;
        if (holdCards[0].card === holdCards[1].card) {
            this.matchCards();
        } else {
            window.setTimeout(() => this.closeCards(), 600);
        }
    }

    componentDidUpdate(prevState) {
        if (prevState.holdCards === this.state.holdCards) {
            return;
        }
        if (this.state.holdCards.length > 1) {
            this.checkCards();
        } else {
            return;
        }
    }

    openCard(obj) {
        const { card, i, cardClass } = obj;
        if (cardClass === "card open show" || cardClass === "card open match") {
            return;
        }
        const updateCardClass = this.state.cardClass.map((el, j) => {
            return j === i ? "card open show" : el;
        });
        this.setState(function(state) {
            return {
                holdCards: [...state.holdCards, { card: card, i: i }],
                // heldCards: state.heldCards + 1,
                cardClass: updateCardClass
            };
        });
    }

    render() {
        const cards = this.state.cards.map(
            function(card, i) {
                return (
                    <li
                        key={card + i}
                        className={this.state.cardClass[i]}
                        onClick={function() {
                            this.openCard({
                                card: card,
                                i: i,
                                cardClass: this.state.cardClass[i]
                            });
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
