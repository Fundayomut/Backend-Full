import React, { useEffect, useState } from "react";
import { ObjektAntwort } from "./ServerCom";


export default function BewertungKunde  () {

    const [kunNr,setKunNr]=useState("");
    const [liste, setListe]=useState([]);
    const [data,setData]=useState();

    function datenZeigen(){
        console.log("Kunde richtig erkannt?", `/bewertung/kunde/${kunNr}`);
        if(kunNr != "" && kunNr != undefined)
        {
        ObjektAntwort(
            `/bewertung/kunde2/${kunNr}`,
            (antwort)=>{
                setData(antwort);
                console.log("Infos von Kunde: ",antwort);
            },
            (fehler)=>{
                console.log(fehler);
            }
        );
        }
    }

    function alleKunden(){
        setListe([]);
        ObjektAntwort(
            `/kunde/abruf/alle`,
            (antwort)=>{
                setListe(antwort);
                console.log("bewertungkundeliste",antwort)
            },
            (fehler)=>{
                console.log(fehler);
            }
        );
    }

    useEffect(
        ()=>{
            alleKunden();
        },[]
    );

  return (
    <div>
        <h1>Bewertung Kunde</h1>
        <label><b>KundenNr : </b></label>
        <select size="1" onChange={(e)=>setKunNr(e.target.value)}>
            {liste.map((zeile)=>{
                return(
                    <option value={zeile.KundenNr}>
                        {zeile.Vorname}
                    </option>
                );
            })
            }
        </select>
        <button onClick={()=>datenZeigen()}>Anzeigen</button>
        {data != undefined && data.length > 0 ?(
            <>
            <p><b>Kunden number: </b>{data[0].KundenNr}</p>
            <p><b>Artikel Number: </b>{data[0].ArtikelNr}</p>
            <p><b>Sterne: </b>{data[0].Sterne}</p>
            <p><b>Benutzer: </b>{data[0].Benutzer}</p>
            <p><b>KennWort: </b>{data[0].KennWort}</p>
            <p><b>Vorname: </b>{data[0].Vorname}</p>
            <p><b>Nachname: </b>{data[0].Nachname}</p>
            </>
        ):("")}
    </div>
  )
}
