import { first } from 'lodash'

export const MinimalLodashImportTest = () => {
  const fruits = ['banana', 'mango', 'avocado']

  return (
    <div>
      <p>MinimalLodashImportTest</p>
      <div>{first(fruits)}</div>
    </div>
  )
}
