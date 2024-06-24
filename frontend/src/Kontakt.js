import React, { useState,useContext,useEffect } from "react";
import { ObjektAntwort } from './ServerCom';
import { AuthKontext } from "./AnmeldeSteuerung";
import KontaktSeiteZiele from "./KontaktSeiteZiele";
import KontaktZeileHinzu from "./KontaktZeileHinzu";

export default function Kontakt  ()  {

    const {kundeId}=useContext(AuthKontext);
    const[data,setData]=useState();
    

    function alleKontaktKunde(){
        console.log("kontakt kunden --->",`/kontakte/kunden/${kundeId}`)
        ObjektAntwort(
            `/kontakte/kunden/${kundeId}`,
            (antwort)=>{
                setData(antwort);
                console.log("kontaktkunde -->data",antwort)
            },
            (fehler)=>{
                console.log(fehler);
            }
        );
    }

    useEffect(()=>{
        alleKontaktKunde()
    },[])
    return(
        <div className="einstellungendiv">
        <table>
            <tr>
                <th>Vorname</th>
                <th>Nachname</th>
                <th>Telefon</th>
                <th>Email</th>
            </tr>
            {typeof data === "object" && data.length > 0 ? (
            data.map((zeile) => {
                return (
                    <>
                    <KontaktSeiteZiele daten={zeile}/>
                    </>
                )
            })
        ) : <p>Keine Datei</p>}
    </table>
         <>
         <KontaktZeileHinzu/>
        </>
    </div>
    )
  };
