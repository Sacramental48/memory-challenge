<template>
    <div class="wrapper">
        <div class="wrapper__container">
            <button class="wrapper__start">Начать игру!</button>
            <p>Счет: {{ rounds }}</p>
            <div class="wrapper__field">
                <span class="wrapper__square" :style="{'backgroundColor': getColor(index)}" v-for="(_, index) in 4" :key="index"></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            colors: ['red', 'green', 'blue', 'yellow'],
            rounds: 0,
        }
    },
    methods: {
        getColor(id) {
            return this.colors[id % this.colors.length];
        }
    }
}
</script>