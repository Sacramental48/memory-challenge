/* __placeholder__ */
export default (await import('vue')).defineComponent({
name: 'App',
data() {
return {
colors: ['red', 'green', 'blue', 'orange'],
rounds: 0,
step: [],
myChoose: [],
highlitedSquares: [],
// isWin: false,
isStartRound: false,
isNextStep: false,
isGameOver: false,
};
},
methods: {
getColor(id) {
return this.colors[id % this.colors.length];
},

startGame() {
this.rounds = 0;
this.isStartRound = true;
this.isGameOver = false;

setTimeout(() => {
this.generateSequence();
}, 300);

},

generateSequence() {
this.rounds++;

const randomIndex = Math.floor(Math.random() * 4);
this.step.push(randomIndex);
this.highlitedSquares.push(...this.step);
setTimeout(() => {
this.highlitedSquares = [];
}, 500);
return this.step;
},

endGame() {
this.isStartRound = false;
// this.isWin = false;
this.isNextStep = false;
this.step = [];
this.myChoose = [];
this.isGameOver = true;
},

// nextStep() {
//     this.rounds++
//     for(let i = 0; i < this.rounds; i++) {
//         setTimeout(() => {
//             this.generateSequence();
//         }, 1500)
//     }
// },
nextStep() {
// for(let i = 0; i < this.rounds; i++) {
// setTimeout(() => {
//     this.generateSequence();
}, 1500: 
    }
});
