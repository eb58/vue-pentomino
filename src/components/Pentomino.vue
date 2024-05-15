<script setup lang="js">
import { ref } from 'vue'
import PentominoTable from './PentominoTable.vue'
import pentomino from '../../../algorithms-js/src/pentomino/pentomino'
import * as dl from 'dancing-links'

const reshape = (xs, dim) =>
   xs.reduce((acc, x, i) => (i % dim ? acc[acc.length - 1].push(x) : acc.push([x])) && acc, [])
const randomInRange = (min, max) => Math.random() * (max - min) + min
const randomIntInRange = (min, max) => Math.floor(randomInRange(min, max + 1))

const prep = (s, dimc) => reshape(s.replace(/[ \n]/g, '').split(''), dimc)
const filledBoards = {
   '4x15': prep(
      ` l l x n n n i i i i i f v v v
        l x x x p n n w w z f f f t v
        l u x u p p w w y z z z f t v
        l u u u p p w y y y y z t t t`,
      15
   ),
   '5x12': prep(
      ` w l l l l y n f f p p p 
        w w z z l y n n f f p p 
        t w w z y y v n f x u u 
        t t t z z y v n x x x u
        t i i i i i v v v x u u `,
      12
   ),
   '6x10': prep(
      ` n w w y y y y p p p
        n n w w y u u u p p
        l n t w x u f u z z
        l n t x x x f f z v
        l t t t x f f z z v
        l l i i i i i v v v`,
      10
   )
}

const calcSolutions = (type) => {
   const dlxSolve = (p) =>
      dl
         .find(
            p.map((row) => ({ row })),
            20
         )
         .map((x) => x.map((o) => o.index))
   const pento = pentomino(filledBoards[type], dlxSolve)
   console.log('Start Calculation')
   const dimc = 0 + type.split('x')[1]
   const solutions = pento.solve().map((s) => reshape(s, dimc))
   console.log('End Calculation', solutions.length)
   return solutions
}

const solution = ref(undefined)
const toggle = ref('4x15')

const getRandomSolution = (solutions) => solutions[randomIntInRange(0, solutions.length - 1)]

const changeModel = () => {
   solutions = calcSolutions(toggle.value)
   solution.value = getRandomSolution(solutions)
}

let solutions = calcSolutions(toggle.value)
solution.value = getRandomSolution(solutions)
</script>
<template>
   <div class="greetings">
      <h1 class="green">Pentomino</h1>
      <div style="text-align: center">
         <v-btn-toggle @click="changeModel" v-model="toggle" color="primary" mandatory>
            <v-btn value="4x15">4 x 15</v-btn>
            <v-btn value="5x12">5 x 12</v-btn>
            <v-btn value="6x10">6 x 10</v-btn>
         </v-btn-toggle>
         <pentomino-table :solution="solution"></pentomino-table>
         <v-btn @click="solution.value = getRandomSolution(solutions)">Next Solution</v-btn>
      </div>
   </div>
</template>

<style scoped>
h1 {
   font-weight: 500;
   font-size: 2.6rem;
   position: relative;
   top: -10px;
}

h3 {
   font-size: 1.2rem;
}

.greetings {
   align-content: left;
}

.greetings h1,
.greetings h3 {
   text-align: center;
}
</style>
