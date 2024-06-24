import React, { useState,useContext,useEffect } from "react";
import {ObjektAntwort, TextAntwort} from "./ServerCom";
import { AuthKontext } from "./AnmeldeSteuerung";


export default function EinstellungenZeile ({daten}) {

    const {kundeId}=useContext(AuthKontext);
    const [adNr,setAdNr]=useState();
    const [adr,setAdr]=useState();
    const [plz,setPlz]=useState();
    const [ort,setOrt]=useState();
    const [vorname,setVorname]=useState();
    const [status,setStatus]=useState(false);

    useEffect(()=>{
        setAdNr(daten.AdressNr);
        setAdr(daten.Adresse);
        setPlz(daten.PLZ);
        setOrt(daten.Ort);
        setVorname(daten.Vorname);
    },[daten]);

    const bearbeiten=()=>{
        console.log("bearbeiten",`/adresse/update/${adNr}/${kundeId}/${adr}/${plz}/${ort}`)
        TextAntwort(
          `/adresse/update/${adNr}/${kundeId}/${adr}/${plz}/${ort}`
          ,
          (antwort)=>{
            console.log("alleadresbearbeitenantwort",antwort);
            setStatus(false);
          },
          (fehler)=>{
            console.log(fehler)
          }
        );
      }
    
      const HandleStatusTrue=()=>{
        setStatus(true);
    }
    

function entfernen(){
    TextAntwort(
        `/adresse/entfernen/${adNr}`,
        (antwort)=>{
            console.log(antwort);
        },
        (fehler)=>{
            console.log(fehler);
        }
    )
}
  return (
    <>
        {!status?(
                <tr>
                        <td>{adNr}</td>
                        <td>{kundeId}</td>
                        <td>{adr}</td>
                        <td>{plz}</td>
                        <td>{ort}</td>
                        <td>{vorname}</td>
                        <td><button onClick={()=>HandleStatusTrue()}>Bearbeiten</button></td>
                        <td><button onClick={()=>entfernen()}>Löschen</button></td>
                    </tr>
        ):(
            <tr>
               <td>{adNr}</td>
               <td>{kundeId}</td>
               <td>
                <input type="text" value={adr} onChange={(e)=>setAdr(e.target.value)} /></td>
               <td>
                <input type="number" value={plz} onChange={(e)=>setPlz(e.target.value)} /></td>
               <td>
                <input type="text" value={ort} onChange={(e)=>setOrt(e.target.value)} /></td>
                <td>{vorname}</td>
               <td><button onClick={()=>bearbeiten()}>Ändern</button></td>
               <td><button onClick={()=>entfernen()}>Entfernen</button></td>
            </tr>
        )}
    </>
  )
}
