import React, { useEffect, useState } from 'react'
import { ObjektAntwort, TextAntwort } from './ServerCom'

export default function KundeKontakt  () {
    const[alleKun,setAlleKun]=useState([]);
    const[kunNum,setKundNum]=useState("");
    const[kunKon,setKunKon]=useState([]);


    function alleKunden(){
        ObjektAntwort(
            `/kunde/alle`,
            (antwort)=>{
                console.log("allekunden",antwort);
                setAlleKun(antwort);
            },
            (fehler)=>{
                console.log(fehler);
            }
        );
    }

    useEffect(()=>{
        alleKunden();
    },[]);


    function alleKundenundKontakt(){
        ObjektAntwort(
            `/kontakte/kunden/${kunNum}`,
            (antwort)=>{
                console.log("kunkon",antwort);
                setKunKon(antwort);
            },
            (fehler)=>{
                console.log(fehler);
            }
        );
    }

  return (
    <div>
        <select size="1" onChange={(e)=>setKundNum(e.target.value)}>
            {alleKun.map((ziele)=>{
                return(
                <option value={ziele.KundenNr}>{ziele.Vorname} {ziele.Nachname}</option>
                );
            })}
        </select>
        <div>
            <button onClick={()=>alleKundenundKontakt()}>Anzeigen</button>
           {kunKon !== undefined && kunKon.length > 0 ?(
            <>
            <p>vorname : {kunKon[0].Vorname}</p>
            <p>Nachname : {kunKon[0].Nachname}</p>
            <p>Telefon : {kunKon[0].Telefon}</p>
            <p>EMail : {kunKon[0].EMail}</p>
            </>
           ):("")}
        </div>
    </div>
  )
}
