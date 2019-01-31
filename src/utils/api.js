function shuffleArray(a) {
    try {
        let arr = [...a];
        const length = arr.length;
        let shuffledArray = [];
        while (shuffledArray.length !== length) {
            const randNum = Math.floor(Math.random() * arr.length);
            const cut = arr[randNum];
            arr.splice(randNum, 1);
            shuffledArray.push(cut);
        }
        return shuffledArray;
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
