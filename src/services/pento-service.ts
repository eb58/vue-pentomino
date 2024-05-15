import pentomino from '../../../algorithms-js/src/pentomino/pentomino'
import * as dl from 'dancing-links'

const reshape = (xs, dim) =>
   xs.reduce((acc, x, i) => (i % dim ? acc[acc.length - 1].push(x) : acc.push([x])) && acc, [])

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

const calcSolutions = (type: string, count: number) => {
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

export default calcSolutions
