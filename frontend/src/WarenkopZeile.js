import React, { useEffect, useState } from 'react'

export default function WarenkopZeile ({daten,delItem}) {

    const [artikel,setArtikel]=useState();
    const [menge,setMenge]=useState();
    const [id,setId]=useState();

    

    useEffect(()=>{
        setArtikel(daten.ar);
        setMenge(daten.mg);
        setId(daten.id);
    },[daten]);



  return (
    <>
    <li className="warenkorbli">
            <p>{artikel}</p>
            <p>{menge}</p>
            <p>{id}</p>
            <button onClick={()=>delItem()}>delete</button>
            <button>andern</button>
    </li>
    </>
  )
}
