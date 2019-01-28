function shuffleArray(a) {
    try {
        let arr = [...a];
        const length = arr.length;
        let shuffledArray = [];
        while (shuffledArray.length !== length) {
            const randNum = Math.floor(Math.random() * arr.length);
            const cut = arr[randNum];
            arr = arr.filter((el, i) => i !== randNum);
            shuffledArray = [...shuffledArray, cut];
        }
        return shuffledArray;
    } catch (error) {
        throw error;
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
