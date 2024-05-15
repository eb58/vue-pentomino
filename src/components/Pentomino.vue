<script setup lang="js">
import { ref } from 'vue'
import pentomino from '../../../algorithms-js/src/pentomino/pentomino'
import * as dl from 'dancing-links'

const reshape = (xs, dim) =>
   xs.reduce((acc, x, i) => (i % dim ? acc[acc.length - 1].push(x) : acc.push([x])) && acc, [])
const randomInRange = (min, max) => Math.random() * (max - min) + min
const randomIntInRange = (min, max) => Math.floor(randomInRange(min, max + 1))

const dlxSolve = (p) =>
   dl
      .find(
         p.map((row) => ({ row })),
         20
      )
      .map((x) => x.map((o) => o.index))

// console.log('PENTOMINO', pentomino)
// console.log('dancing-links', dl)
// console.log('MYDLX', myDlx)

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

const mapType2Dims = {
   '4x15': { dimr: 4, dimc: 15 },
   '5x12': { dimr: 5, dimc: 12 },
   '6x10': { dimr: 6, dimc: 10 }
}

const calcSolutions = (type) => {
   const pento = pentomino(filledBoards[type], dlxSolve)
   console.log('Start Calculation')
   const solutions = pento.solve().map((s) => reshape(s, mapType2Dims[type].dimc))
   console.log('End Calculation', solutions.length)
   return solutions
}

let solutions = calcSolutions('4x15')

const sol = ref(solutions[randomIntInRange(0, solutions.length - 1)])
const toggle = ref('4x15')

const nextSolution = () => (sol.value = solutions[randomIntInRange(0, solutions.length - 1)])

const changeModel = () => {
   console.log(toggle.value)
   sol.value = []
   //setImmediate(() => {
   solutions = calcSolutions(toggle.value)
   nextSolution()
   //})
}
</script>
<template>
   <div class="greetings">
      <h1 class="green">Pentomino</h1>
      <div v-if="sol?.length" style="text-align: center">
         <v-btn-toggle @click="changeModel" v-model="toggle" color="primary" mandatory>
            <v-btn value="4x15">4 x 15</v-btn>
            <v-btn value="5x12">5 x 12</v-btn>
            <v-btn value="6x10">6 x 10</v-btn>
         </v-btn-toggle>
         <table style="background-color: black">
            <tbody>
               <tr v-for="row in sol">
                  <td v-for="ch in row" :class="ch"></td>
               </tr>
            </tbody>
         </table>
         <div>
            <v-btn @click="nextSolution">Next Solution</v-btn>
         </div>
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

table {
   margin-left: auto;
   margin-right: auto;
   border: 11px;
   margin-top: 10px;
   margin-bottom: 10px;
}

td {
   padding: 25px;
}

.l {
   background-color: red;
}
.x {
   background-color: green;
}
.n {
   background-color: azure;
}
.i {
   background-color: bisque;
}
.f {
   background-color: #777;
}
.u {
   background-color: blueviolet;
}
.p {
   background-color: chartreuse;
}
.w {
   background-color: darksalmon;
}
.y {
   background-color: magenta;
}
.z {
   background-color: chocolate;
}
.t {
   background-color: gold;
}
.v {
   background-color: turquoise;
}
</style>
