import { useState, useEffect } from 'react'
import axios from 'axios';
import './box.css'



function List(base) {
    const [baseCurrency, setBaseCurrency] = useState(base)
    const api = axios.create(
      {
        baseURL: 'https://api.frankfurter.dev/v1'
      });
      
      useEffect(()  => {
        const fetchData = async () => {
          const response = await api.get('/currencies')
          setData(response.data);
        }
        fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || Number.isNaN(amount)) return;
    
    if (to == from) setResult(Number(amount));

    try {const res = await api.get('/latest', {
      params: {
        from: from,
        to: to
      },
    })
    setResult(res.data.rates[to]);
  }catch(e){
      console.log(e);
      console.log(from);
    }
    
  }



  return (
    <>
    <div className='box'>

      <form id='currencyForm' onSubmit={handleSubmit}>
        <label>Base</label>
        <label>Target</label>
        <input type='text' value={amount} onChange={(e) => setAmount(e.target.value)}></input>
        <select value={from} onChange={(e) => setFrom(e.target.value)}>
            {Object.entries(data).map(([abv, name]) => (
            <option key={abv} value={abv}>
              {abv} — {name}
            </option>
            ))}
        </select>
        <select value={to} onChange={(e) => setTo(e.target.value)}>
            {Object.entries(data).map(([abv, name]) => (
              <option key={abv} value={abv}>
              {abv} — {name}
            </option>
            ))}
        </select>
        <button type="submit">Convert</button>
      </form> 

    </div>
    
    <div >
    <p>
      Converted Amount:<br/> <p className='result'>{result}</p>
    </p>
  </div>
    </>
  )
}

export default Box
