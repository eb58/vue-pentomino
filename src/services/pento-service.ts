import pentomino from './pentomino'
import * as dl from 'dancing-links'

const reshape = (xs: any[], dim: number) =>
  xs.reduce((acc: [], x: number, i: number) => (i % dim ? acc[acc.length - 1].push(x) : acc.push([x])) && acc, [])

const calcSolutions = (type: string, count: number) => {
  const dlxSolve = (p: any) =>
    dl
      .find(
        p.map((row: any) => ({ row })),
        count
      )
      .map((x) => x.map((o) => o.index))
  const [dimr, dimc] = [...type.split('x').map((x) => Number(x))]
  const pento = pentomino()
  console.log('Start Calculation')
  const solutions = pento.solve(dimr, dimc, dlxSolve).map((s: any) => reshape(s, dimc))
  console.log('End Calculation', solutions.length)
  return solutions
}

export default calcSolutions
