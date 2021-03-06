import React from "react";
import PropTypes from "prop-types";

import api from "../utils/api";

const { shuffleArray, cardArray } = api;

function Deck(props) {
    const { cards, cardClass, openCard } = props;
    return (
        <ul className="deck">
            {cards.map(function(card, i) {
                return (
                    <li
                        key={card + i}
                        className={cardClass[i]}
                        onClick={openCard.bind(null, {
                            cardName: card,
                            cardIndex: i,
                            cardClass: cardClass[i]
                        })}
                    >
                        <i className={card} />
                    </li>
                );
            })}
        </ul>
    );
}

Deck.propTypes = {
    cards: PropTypes.array.isRequired,
    cardClass: PropTypes.array.isRequired,
    openCard: PropTypes.func.isRequired
};

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
        this.props.updateMoves();
    }

    checkCards() {
        const [card1, card2] = this.state.holdCards;
        if (card1.cardName === card2.cardName) {
            this.props.addTwoMatched();
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

    componentDidUpdate(prevProps, prevState) {
        if (prevState.holdCards === this.state.holdCards) {
            return;
        }
        if (this.state.holdCards.length === 2) {
            this.checkCards();
        }
    }

    openCard(obj) {
        if (!this.props.startTicking) {
            this.props.handleStart();
        }
        // Don't allow more cards to be opened while open cards are being checked
        if (this.state.holdCards.length === 2) {
            return;
        }
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
        return (
            <Deck
                cards={this.state.cards}
                cardClass={this.state.cardClass}
                openCard={this.openCard}
            />
        );
    }
}

Cards.propTypes = {
    startTicking: PropTypes.bool.isRequired,
    handleStart: PropTypes.func.isRequired,
    updateMoves: PropTypes.func.isRequired,
    addTwoMatched: PropTypes.func.isRequired
};

export default Cards;
