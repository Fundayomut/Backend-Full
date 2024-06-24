import React, { useState,useContext,useEffect } from "react";
import {ObjektAntwort, TextAntwort} from "./ServerCom";
import { AuthKontext } from "./AnmeldeSteuerung";

export default function KontaktSeiteZiele ({daten}) {

    const {kundeId}=useContext(AuthKontext);
    const [vorname,setVorname]=useState();
    const [nachname,setNachname]=useState();
    const [tel,setTel]=useState();
    const [eMail,setEMail]=useState();
    const [status,setStatus]=useState(false);
    const[kontaktNr,setKontaktNr]=useState();

    useEffect(()=>{
        setVorname(daten.Vorname);
        setNachname(daten.Nachname);
        setTel(daten.Telefon);
        setEMail(daten.EMail);
        setKontaktNr(daten.KontaktNr);
    },[daten]);

    const bearbeiten=()=>{
        TextAntwort(
          `/kontakt/update/${kontaktNr}/${kundeId}/${tel}/${eMail}`
          ,
          (antwort)=>{
            console.log("konkat update",antwort);
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
        `/kontakt/entfernen/${kontaktNr}`,
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
                <td>{vorname}</td>
                <td>{nachname}</td>
                <td>{tel}</td>
                <td>{eMail}</td>
                <td><button onClick={()=>HandleStatusTrue()}>Bearbeiten</button></td>
                <td><button onClick={()=>entfernen()}>Löschen</button></td>
            </tr>
        ):(
            <tr>
                <td>{vorname}</td>
                <td>{nachname}</td>
                <td><input type="tel" value={tel} onChange={(e)=>setTel(e.target.value)}/></td>
                <td><input type="mail" value={eMail} onChange={(e)=>setEMail(e.target.value)} /></td>
                <td><button onClick={()=>bearbeiten()}>Ändern</button></td>
               <td><button onClick={()=>entfernen()}>Entfernen</button></td>
            </tr>
        )}
    </>
  )
}
