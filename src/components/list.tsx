import './list.css'

type RateProps = {
  rates: Record<string, number>
  mayor: string[]
}

function List({ rates, mayor }: RateProps) {
  return (
    <table className="rates-table">
      <thead>
        <tr>
          <th>Currency</th>
          <th>Rate</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(rates)
          .filter(([abv]) => mayor.includes(abv))
          .map(([abv, value]) => (
            <tr key={abv}>
              <td>{abv}</td>
              <td>{value}</td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default List
