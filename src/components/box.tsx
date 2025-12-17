import { useState, useEffect } from 'react'
import axios from 'axios';
import List from './list';
import './box.css'

function omit<T extends object, K extends keyof T>(
  obj: T,
  key: K
): Omit<T, K> {
  const { [key]: _, ...rest } = obj;
  return rest;
}
function Box() {
    const [rates, setRates] = useState({});
    const [currencies, setCurrencies] = useState([]);
    const [result, setResult] = useState(0.0);
    const [amount, setAmount] = useState('');
    const [from, setFrom] = useState('USD')
    const [to, setTo] = useState('USD')
    const [mode, setMode] = useState('')
    const mayor_currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'AUD', 'CAD', 'CNY', 'HKD', 'SGD', 'NZD']
    const api = axios.create(
      {
        baseURL: 'https://api.frankfurter.dev/v1'
      });
      
      useEffect(()  => {
        const fetchData = async () => {
          const response = await api.get('/currencies')
          setCurrencies(response.data);
          //console.log(data);
          //console.log("SUS");
        }
        fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) =>  {
    e.preventDefault();
    if (mode == 'convert'){

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
      
    }else if (mode == 'show'){
      try {const res = await api.get('/latest', {
        params: {
          from: from
        },
      })
      setRates(omit(res.data.rates, from))


    }catch(e){
        console.log(e);
        console.log(from);
      }
    }
  }



  return (
    <>
    <div className='box'>

      <form id='currencyForm' onSubmit={handleSubmit}>
        <label>Base</label>
        <label>Target</label>
        <input type='text' value={amount} onChange={(e) => setAmount(e.target.value)}></input>
        <p></p>
        <select value={from} onChange={(e) => setFrom(e.target.value)}>
            {Object.entries(currencies).map(([abv, name]) => (
            <option key={abv} value={abv}>
              {abv} — {name}
            </option>
            ))}
        </select>
        <select value={to} onChange={(e) => setTo(e.target.value)}>
            {Object.entries(currencies).map(([abv, name]) => (
              <option key={abv} value={abv}>
              {abv} — {name}
            </option>
            ))}
        </select>
        <button type="submit" onClick={() => setMode('show')}>Show</button>
        <button type="submit" onClick={() => setMode('convert')}>Convert</button>
       
       
       
      
      
      
      </form>

      
    </div>
            {mode=='show' && amount && <List rates={rates} mayor={mayor_currencies}/>}
    <div >
      {
        mode == 'convert' && amount &&
    <p>
      Converted Amount:<br/> <p className='result'>{result}</p>
    </p>
      }
  </div>
    </>
  )
}

export default Box
