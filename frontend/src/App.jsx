import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [products,setProducts] = useState([])
  const [error,setError]= useState(false);
  const [loading,setLoading]= useState(false);
  const [search,setSearch]= useState('')

  useEffect(() => {
  
    //use controller from axios lib. to cancle previous request from a single url. 

    const controller= new AbortController()

    ;(async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get('/api/products?search='+ search,{
          signal: controller.signal
        })
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        if(axios.isCancel(error)){
          log('Request cancelled', error.message)
          return
        }
        setError(true);
        setLoading(false);
      }
    })()
    //cleanup code
    return () => {
      controller.abort();
    }
  },[search])

  // if(error){
  //   return <h1>something went wrong</h1>
  // }

  // if(loading){
  //   return <h1>Loading...</h1>
  // }

  return (
    <>
      <h1>chai aur code in react</h1>
      <input type="text" placeholder='search' 
      value={search}
      onChange={(e) => setSearch(e.target.value)
        
      }
      
      />
      {loading && <h1>Loading...</h1>}
      {error && (<h1>Something went wrong</h1>)}
      
      <h2>Number of products are: {products.length}</h2>
    </>
  )
}

export default App
