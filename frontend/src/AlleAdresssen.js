import React, { useState, useEffect } from "react";
import { ObjektAntwort } from "./ServerCom";
import { TextAntwort } from './ServerCom';
import AdressenZeile from "./AdressenZeile";
import AdressenKunde from "./AdressenKunde";


export default function AlleAdresssen(){
const [alleAdressen,setalleAdressen]=useState([]);

const handleAdresse=()=>{
    ObjektAntwort(
        `/adresse/all`,
        (antwort)=>{
            setalleAdressen(antwort);
            console.log("adresseallantwort",antwort);
        },
        (fehler)=>{
            console.log(fehler)
        }
    );
}

useEffect(()=>{
    handleAdresse()
},[]
);

return(
    <>
    <hr/>
    <table>
        <tr>
          <th style={{border:"1px solid" }}>AdresseNr</th>
          <th style={{border:"1px solid" }}>KundenNr</th>
          <th style={{border:"1px solid" }}>Vorname</th>
          <th style={{border:"1px solid" }}>Nachname</th>
          <th style={{border:"1px solid" }}>Adresse</th>
          <th style={{border:"1px solid" }}>PLZ</th>
          <th style={{border:"1px solid" }}>Ort</th>
        </tr>       
      {
      alleAdressen.map(
        (zeile) => {
        return (
          <>
      <AdressenZeile daten={zeile}/>
        </>
        );
      }
    )
      }
      </table>
      <button onClick={()=>handleAdresse()} >Aktualisiern</button>
      <div>
        <hr/>
        <AdressenKunde/>
      </div>
    </>
)
}