function shuffleArray(a) {
    try {
        let arr = [...a];
        arr.sort(() => 0.5 - Math.random());
        return arr;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
}

const cardArray = [
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

export default Object.freeze({
    shuffleArray,
    cardArray
});
