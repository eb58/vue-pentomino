<script setup lang="js">
import { ref } from 'vue'
import PentominoTable from './PentominoTable.vue'
import calcSolutions from '@/services/pento-service'
const randomInRange = (min, max) => Math.random() * (max - min) + min
const randomIntInRange = (min, max) => Math.floor(randomInRange(min, max + 1))

const solution = ref(undefined)
const sizeOfPentomino = ref('4x15')
const cursor = ref('')

const getRandomSolution = (solutions) => solutions[randomIntInRange(0, solutions.length - 1)]
const nextSolution = () => (solution.value = getRandomSolution(solutions))

const changeModel = () => {
   cursor.value = 'cursor-wait'
   setTimeout(() => {
      solutions = calcSolutions(sizeOfPentomino.value, 53000)
      solution.value = getRandomSolution(solutions)
      cursor.value = ''
   }, 1000)
}

let solutions = calcSolutions(sizeOfPentomino.value, 53000)
solution.value = getRandomSolution(solutions)
</script>
<template>
   <div :class="`${cursor}`" class="pentomino">
      <h1 class="green">Pentomino</h1>
      <div>
         <v-btn-toggle @click="changeModel" v-model="sizeOfPentomino" color="primary" mandatory>
            <v-btn :class="`${cursor}`" value="4x15">4 x 15</v-btn>
            <v-btn :class="`${cursor}`" value="5x12">5 x 12</v-btn>
            <v-btn :class="`${cursor}`" value="6x10">6 x 10</v-btn>
         </v-btn-toggle>
         <pentomino-table :solution="solution"></pentomino-table>
         <v-btn :class="`${cursor}`" @click="nextSolution">Next Solution</v-btn>
      </div>
   </div>
</template>

<style scoped>
h1 {
   font-weight: 50;
   font-size: 2.6rem;

   top: -10px;
}

.pentomino {
   text-align: center;
}
</style>
