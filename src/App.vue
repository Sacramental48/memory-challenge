<template>
    <div class="wrapper">
        <div class="wrapper__container">
            <h1>Simon Says</h1>
            <button v-if="!step.length" class="wrapper__start" @click="startGame">Начать игру!</button>
            <div class="wrapper__group" v-else>
                <h2 v-if="isStartRound === false">Игра окончена!</h2>
                <div class="wrapper__buttons">
                    <button v-if="isStartRound === true" class="wrapper__end" @click="endGame">Закончить!</button>
                </div>
            </div>
            <div class="wrapper__output">
                <p v-if="isGameOver === true">Вы достигли: {{ rounds }} раунда!</p>
                <p v-else>Счет: {{ rounds }}</p>
            </div>
            <div class="wrapper__field">
                <span 
                    class="wrapper__square" 
                    :style="{
                        'backgroundColor': getColor(index), 
                        'opacity': highlitedSquares.includes(index) ? 1 : 0.4,
                    }" 
                    @click="chooseCorrectSquare(index)"
                    v-for="(_, index) in 4" :key="index"
                ></span>
            </div>
            <div class="wrapper__complexity" v-for="item in complexity">
                <input type="radio" :id="item.difficult" name="difficulty" v-model="selectedDifficulty" :value="item.value" :checked="selectedDifficulty === item.value" />
                <label :for="item.difficult">{{item.name}}</label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            colors: ['green', 'red', 'orange', 'blue'],
            rounds: 0,
            step: [],
            myChoose: [],
            highlitedSquares: [],
            isStartRound: false,
            isNextStep: false,
            isGameOver: false,
            timer: {
                easy: 1500, 
                medium: 1000, 
                hard: 400
            },
            complexity: [
                {difficult: 'easy', name: 'Easy', value: 'easy', checked: true},
                {difficult: 'medium', name: 'Medium', value: 'medium', checked: false},
                {difficult: 'hard', name: 'Hard', value: 'hard', checked: false}
            ],
            selectedDifficulty: 'easy',
            timeouts: [],
                
        }
    },
    methods: {
        getColor(id) {
            return this.colors[id % this.colors.length];
        },

        startGame() {
            if(this.isStartRound === false) {
                this.rounds = 0;
                this.isStartRound = true;
                this.isGameOver = false;

                setTimeout(() => {
                    this.generateSequence();
                }, 0);
            }
        },

        async generateSequence() {
            this.rounds++;

            const randomIndex = Math.floor(Math.random() * 4);
            this.step.push(randomIndex);

            for(let item of this.step) {

                await new Promise(resolve => {
                    const timeoutIdPush = setTimeout(() => {
                        this.highlitedSquares.push(item);
                        resolve();
                    }, this.selectedTimer);
                    this.timeouts.push(timeoutIdPush);
                });
                await new Promise(resolve => {
                    const timeoutIdColor = setTimeout(() => {
                        this.highlitedSquares = [];
                        resolve();
                    }, 400);
                    this.timeouts.push(timeoutIdColor);
                });
            }
            return this.step;
        },

        endGame() {
            this.isStartRound = false;
            this.isNextStep = false;
            this.step = [];
            this.myChoose = [];
            this.isGameOver = true;
            this.highlitedSquares = [];
            this.timeouts.forEach(timeoutId => {
                clearTimeout(timeoutId);
            });
        },

        nextStep() {
            setTimeout(() => {
                this.generateSequence();
                this.myChoose = [];
            }, 1000);
        },

        chooseCorrectSquare(index) {
             if (this.isStartRound) {
                console.log(this.selectedTimer);
                this.myChoose.push(index);
                if (this.myChoose.length === this.step.length) {
                    if (this.isArrayEqual(this.myChoose, this.step)) {
                        this.isNextStep = true;
                        this.nextStep();
                        return true;
                    } else {
                        this.isStartRound = false;
                        this.isGameOver = true;
                        return false;
                    }
                }
            }
        },
        isArrayEqual(arr1, arr2) {
            for(let i = 0; i < arr1.length; i++) {
                if(arr1[i] !== arr2[i]) {
                    return false;
                }
            }
            return true;
        }
    },
    computed: {
        selectedTimer() {
            return this.timer[this.selectedDifficulty];
        }
    },
}
</script>