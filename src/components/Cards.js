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

    matchOrClose(fn) {
        const [card1, card2] = this.state.holdCards;
        const update = fn(card1, card2);
        this.setState({ cardClass: update, holdCards: [] });
    }

    checkCards() {
        const [card1, card2] = this.state.holdCards;
        if (card1.cardName === card2.cardName) {
            this.matchOrClose(
                // Match
                function match(card1, card2) {
                    return this.state.cardClass.map((el, i) => {
                        return card1.cardIndex === i || card2.cardIndex === i
                            ? "card open match"
                            : el;
                    });
                }.bind(this)
            );
        } else {
            window.setTimeout(
                () =>
                    this.matchOrClose(
                        // Close
                        function close(card1, card2) {
                            return this.state.cardClass.map((el, i) => {
                                return card1.cardIndex === i ||
                                    card2.cardIndex === i
                                    ? "card"
                                    : el;
                            });
                        }.bind(this)
                    ),
                600
            );
        }
    }

    componentDidUpdate(prevState) {
        if (prevState.holdCards === this.state.holdCards) {
            return;
        }
        if (this.state.holdCards.length > 1) {
            this.checkCards();
        }
    }

    openCard(obj) {
        const { cardName, cardIndex, cardClass } = obj;
        if (cardClass === "card open show" || cardClass === "card open match") {
            return;
        }
        const updateCardClass = this.state.cardClass.map((el, i) => {
            return i === cardIndex ? "card open show" : el;
        });
        this.setState(function(state) {
            return {
                holdCards: [
                    ...state.holdCards,
                    { cardName: cardName, cardIndex: cardIndex }
                ],
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
                                cardName: card,
                                cardIndex: i,
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
