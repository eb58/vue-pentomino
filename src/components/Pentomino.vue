<script setup lang="js">
import { ref } from 'vue'
import PentominoTable from './PentominoTable.vue'
import calcSolutions from '@/services/pento-service'
const randomInRange = (min, max) => Math.random() * (max - min) + min
const randomIntInRange = (min, max) => Math.floor(randomInRange(min, max + 1))

const solution = ref(undefined)
const toggle = ref('4x15')

const getRandomSolution = (solutions) => solutions[randomIntInRange(0, solutions.length - 1)]

const changeModel = () => {
   solutions = calcSolutions(toggle.value)
   solution.value = getRandomSolution(solutions)
}

const nextSolution = () => (solution.value = getRandomSolution(solutions))

let solutions = calcSolutions(toggle.value)
solution.value = getRandomSolution(solutions)
</script>
<template>
   <div class="pentomino">
      <h1 class="green">Pentomino</h1>
      <div>
         <v-btn-toggle @click="changeModel" v-model="toggle" color="primary" mandatory>
            <v-btn value="4x15">4 x 15</v-btn>
            <v-btn value="5x12">5 x 12</v-btn>
            <v-btn value="6x10">6 x 10</v-btn>
         </v-btn-toggle>
         <pentomino-table :solution="solution"></pentomino-table>
         <v-btn @click="nextSolution">Next Solution</v-btn>
      </div>
   </div>
</template>

<style scoped>
h1 {
   font-weight: 500;
   font-size: 2.6rem;

   top: -10px;
}

.pentomino {
   text-align: center;
}
</style>
