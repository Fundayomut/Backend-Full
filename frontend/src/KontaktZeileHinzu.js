import React, { useState,useContext,useEffect } from "react";
import {ObjektAntwort, TextAntwort} from "./ServerCom";
import { AuthKontext } from "./AnmeldeSteuerung";

export default function  () {

    const {kundeId}=useContext(AuthKontext);
    const [kontaktListe,setKontaktListe]=useState([]);
    const [tel,setTel]=useState();
    const [eMail,setEMail]=useState();


    function kontaktHinzu(){
        TextAntwort(
            `/kontakt/neu/${kundeId}/${tel}/${eMail}`,
            (antwort)=>{
                console.log("neu kontakt",antwort);
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
            <input type="tel" placeholder="Telefon..." onKeyUp={(e)=>{setTel(e.target.value)}}/>
            <input type="email" placeholder="E-Mail..." onKeyUp={(e)=>{setEMail(e.target.value)}}/>
            <button onClick={()=>kontaktHinzu()}>Hinzufügen</button>
            </div>
        </>
  )
}

