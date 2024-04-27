import React, { useEffect, useState } from 'react'

function Models() {

  let [models,setmodels] = useState([])

  useEffect( 
    () => {
      fetch( 'http://localhost:5000/api/v1/scenes' )
      .then( result => result.json().data.Scenes )
      .then( result => {
        console.log('fetched')
        console.log(models)
      let items = result.map( item => (
      <li>
      <h1>{item.name}</h1>
      <h3>{item.description}</h3>
      <img src={item.imageLink}></img>
      <button>see</button>
      </li> )
      )
      setmodels(items)
      console.log(models)
      }  
      )
    } , []
  )

  return (
    <ul>
      { (models) ? models : 'loading' }
    </ul>
  )
}

export default Models