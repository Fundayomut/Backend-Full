import React from 'react'
import { useState } from "react"
import { TextAntwort } from './ServerCom';


export default function ArtikelHinzufügen()
{
    const [artikelName,SetArtikelName]=useState("");
    const [artikelPreis,setArtikelPreis]=useState("");

 const hinzufügen =()=>{
    console.log(artikelName,artikelPreis);
    TextAntwort(
        `/artikel/neu/${artikelName}/${artikelPreis}`
        ,
        (antwort)=>{
            console.log("hizugefügt", antwort)
        },
        (fehler)=>{
            console.log(fehler)
        }
    )
 }
    
    
  return(
    <>
    <div>
        <input type='text' placeholder='Artikel Name...' onKeyUp={(e)=>{SetArtikelName(e.target.value)}} />
        <input type='number' placeholder='Price...' onKeyUp={(e)=>{setArtikelPreis(e.target.value)}} />
        <button onClick={()=>hinzufügen()}>Hinzufügen</button>
    </div>
    </>
  )
}