<script setup lang="js">
import { ref } from 'vue'
const props = defineProps({
   solution: Array
})
</script>
<template>
   <table v-if="solution?.length > 0">
      <tbody>
         <tr v-for="row in solution">
            <td v-for="ch in row" :class="ch"></td>
         </tr>
      </tbody>
   </table>
</template>

<style scoped>
table {
   background-color: rgb(20, 18, 18);
   margin-left: auto;
   margin-right: auto;
   border: 11px;
   margin-top: 10px;
   margin-bottom: 10px;
}

td {
   padding: 30px;
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
