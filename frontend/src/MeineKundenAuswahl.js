import React, { useEffect, useState } from "react";
import { ObjektAntwort, TextAntwort } from "./ServerCom";

export default function MeineKundenAuswahl() 
{
    const [liste, setListe]=useState([]);
    const [wahl, setWahl]=useState("");
    const [daten, setDaten]=useState("");
    const [benutzer, setBenutzer]=useState("");
    const [kennwort, setKennwort]=useState();
    const [kontotyp, setKontotyp]=useState();
    const [vorname,setVorname]=useState("");
    const [nachname,setNachname]=useState("");

    useEffect (
        ()=>{
            ObjektAntwort (
            "/kunde/abruf/alle",
            (antwort)=>{
                setListe(antwort);
                console.log(liste);
            },
            (fehler)=>{
                console.log(fehler);
            }
            );
        },
        []
    );

    function datenAnzeigen()
    {
        ObjektAntwort(
            "/kunde/neu/",
            (antwort)=>{
                setDaten(antwort);
            },
            (fehler)=>{
                console.log(fehler);
            }
        );
    }

    function abschicken()
    {
       // console.log("Route: ", `/kunde/neu/${wahl}/${text}`);
       if(benutzer && kennwort && kontotyp && vorname && nachname)
        {
        TextAntwort(
           `/kunde/neu/${benutzer}/${kennwort}/${kontotyp}/${vorname}/${nachname}`,
           (antwort)=>{
            console.log("erledig");
            datenAnzeigen()
           },
           (fehler) =>{
            console.log("abschicken fehler",fehler)
           }
        );
        }
    }

    return(
        <>
         <hr/>
         <h2>Kunden Wahlen</h2>
        <select size = "1" onChange={(e)=>setWahl(e.target.value)}>
            {
                liste.map(
                    (zeile)=>{
                        return <option value={zeile.KundenNr}>
                            {zeile.Vorname} {zeile.Nachname}
                        </option>
                    }
                )
            }
        </select>
        <hr/>
        <input type="text" placeholder="Benutzer" onKeyUp={(e)=>setBenutzer(e.target.value)}/>
        <input type="number" placeholder="Kenwort" onKeyUp={(e)=>setKennwort(e.target.value)}/>
        <input type="number" placeholder="Kontotype" onKeyUp={(e)=>setKontotyp(e.target.value)}/>
        <input type="text" placeholder="Vorname" onKeyUp={(e)=>setVorname(e.target.value)}/>
        <input type="text" placeholder="Nachname" onKeyUp={(e)=>setNachname(e.target.value)}/>
        
        <button onClick={()=>abschicken()}>send server</button>
        <hr/>
        <p> <b>KundenNr:</b> {wahl}</p>
        <p><b>Benutzer:</b> {benutzer}</p>
        </>
    )
}