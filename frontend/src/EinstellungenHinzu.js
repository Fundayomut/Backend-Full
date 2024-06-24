import React, { useState,useContext,useEffect } from "react";
import {ObjektAntwort, TextAntwort} from "./ServerCom";
import { AuthKontext } from "./AnmeldeSteuerung";

export default function EinstellungenHinzu  () {

    const {kundeId}=useContext(AuthKontext);
    const [kListe,setKListe]=useState([]);
    const [adresse,setAdresse]=useState("");
    const [adrPlz,setPlz]=useState();
    const [adrOrt,setOrt]=useState("");
;

    function adressHinzu(){
        TextAntwort(
            `/adresse/neu/${kundeId}/${adresse}/${adrPlz}/${adrOrt}`,
            (antwort)=>{
                console.log("neu adress",antwort);
            },
            (fehler)=>{
                console.log(fehler);
            }
           );
    }

  return (
    <>
    <p className="hinzupar">Bitte geben Sie Ihre Adresse ein</p>
        <div> 
            <input type="text" placeholder="Adresse..." onKeyUp={(e)=>{setAdresse(e.target.value)}}/>
            <input type="text" placeholder="PLZ..." onKeyUp={(e)=>{setPlz(e.target.value)}}/>
            <input className="inputort" type="text" placeholder="Ort..." onKeyUp={(e)=>{setOrt(e.target.value)}}/>
            <button onClick={()=>adressHinzu()}>Hinzufügen</button>
            </div>
        </>
  )
}
