<script setup lang="ts">
import matrix from '../../../algorithms-js/src/ol/ol.matrix'
import pentomino from '../../../algorithms-js/src/pentomino/pentomino'
// const matrix = require('../../../algorithms-js/src/ol/ol.matrix')
// const pentomino = require('../../../algorithms-js/src/pentomino/pentomino')
// const myDlx = require('../../../algorithms-js/src/dlx')

import * as dlxlib from 'dlxlib'
import * as dl from 'dancing-links'
import myDlx from '../../../algorithms-js/src/dlx'

const dlxSolve1 = (p: [][]) => dlxlib.solve(p) // ok
const dlxSolve2 = (p: any) =>
  dl
    .find(
      p.map((row: any) => ({ row })),
      10
    )
    .map((x) => x.map((o) => o.index)) // ok
const dlxSolve3 = (p: [][]) => myDlx(p, 328) // ok
const dlxSolve = dlxSolve2

console.log('MATRIX', matrix)
console.log('PENTOMINO', pentomino)
console.log('DLXLIB', dlxlib)
console.log('dancing-links', dl)
// console.log('MYDLX', myDlx)

const prep = (s: string, dimc: number) => matrix.reshape(s.replace(/[ \n]/g, '').split(''), dimc)
const filledBoards = {
  '4x15': prep(
    `   l l x n n n i i i i i f v v v
        l x x x p n n w w z f f f t v
        l u x u p p w w y z z z f t v
        l u u u p p w y y y y z t t t`,
    15
  ),
  '6x10': prep(
    `   n w w y y y y p p p
        n n w w y u u u p p
        l n t w x u f u z z
        l n t x x x f f z v
        l t t t x f f z z v
        l l i i i i i v v v`,
    10
  )
}

const pento = pentomino(filledBoards['4x15'], dlxSolve)
console.log('PENTO', pento)
const solutions = pento.solve().map((s: []) => matrix.reshape(s, 15))
console.log('SOLUTIONS', solutions)

const sol = solutions[9]

defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <table style="background-color: black; color: lightcyan">
      <tbody>
        <tr v-for="row in sol">
          <td v-for="ch in row" :class="ch"></td>
        </tr>
      </tbody>
    </table>
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

.greetings h1,
.greetings h3 {
  text-align: center;
}

table {
  border: 11px;
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
