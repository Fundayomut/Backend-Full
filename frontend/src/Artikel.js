import React, { useState,useContext,useEffect } from "react";
import {ObjektAntwort, TextAntwort} from "./ServerCom";
import ArtikelZeigen from "./ArtikelZeigen";

export default function Artikel () {

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
    
  return (
    <>
      <div>
        <div className="artikelhindiv">
      <p className="hinzupar">Bitte geben Sie Ihre Adresse ein</p>
      </div>
        <input type='text' placeholder='Artikel Name...' onKeyUp={(e)=>{SetArtikelName(e.target.value)}} />
        <input type='number' placeholder='Price...' onKeyUp={(e)=>{setArtikelPreis(e.target.value)}} />
        <button onClick={()=>hinzufügen()}>Hinzufügen</button>
    </div>
    <div>
        <ArtikelZeigen/>
    </div>
    </>
  )
}
