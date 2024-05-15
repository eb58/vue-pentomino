<script setup lang="js">
import { ref } from 'vue'
import pentomino from '../../../algorithms-js/src/pentomino/pentomino'
import * as dl from 'dancing-links'

const reshape = (xs, dim) =>
   xs.reduce((acc, x, i) => (i % dim ? acc[acc.length - 1].push(x) : acc.push([x])) && acc, [])
const randomInRange = (min, max) => Math.random() * (max - min) + min
const randomIntInRange = (min, max) => Math.floor(randomInRange(min, max + 1))

const N = 200
const dlxSolve = (p) =>
   dl
      .find(
         p.map((row) => ({ row })),
         N
      )
      .map((x) => x.map((o) => o.index))

console.log('PENTOMINO', pentomino)
console.log('dancing-links', dl)
// console.log('MYDLX', myDlx)

const prep = (s, dimc) => reshape(s.replace(/[ \n]/g, '').split(''), dimc)
const filledBoards = {
   '4x15': prep(
      `   l l x n n n i i i i i f v v v
        l x x x p n n w w z f f f t v
        l u x u p p w w y z z z f t v
        l u u u p p w y y y y z t t t`,
      15
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

const pento = pentomino(filledBoards['6x10'], dlxSolve)
const solutions = pento.solve().map((s) => reshape(s, 10))
const isBookmarked = true
let sol = ref(solutions[randomIntInRange(0, N)])
const nextSolution = () => (sol.value = solutions[randomIntInRange(0, N)])
</script>
<template>
   <div class="greetings">
      <h1 class="green">Pentomino</h1>
      <div style="text-align: center">
         <table style="background-color: black">
            <tbody>
               <tr v-for="row in sol">
                  <td v-for="ch in row" :class="ch"></td>
               </tr>
            </tbody>
         </table>
         <v-btn @click="nextSolution">Next Solution</v-btn>
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
