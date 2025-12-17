import './list.css'

type rateProps = {
  rates: object,
  mayor: Array<string>,
}

function List({rates, mayor}: rateProps) {



  return (
    <>
    <ul>
            {Object.entries(rates)
            .filter(([a]) => mayor.includes(a))
            .map(([abv, value]) => (
            <li key={abv} value={abv}>
              {abv} - {value}
            </li>
            ))}
      </ul>
    </>
  )
}
export default List
