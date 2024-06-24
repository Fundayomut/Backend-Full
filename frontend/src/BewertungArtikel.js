import React, { useEffect, useState } from "react";
import { ObjektAntwort } from "./ServerCom";


export default function BewertungKunde  () {

    const [artNr,setKunNr]=useState("");
    const [liste, setListe]=useState([]);
    const [data,setData]=useState();

    function datenZeigen(){
        ObjektAntwort(
            `/bewertung/artikel2/${artNr}`,
            (antwort)=>{
                setData(antwort);
                console.log("bewertungdata",antwort)
            },
            (fehler)=>{
                console.log(fehler);
            }
        );
    }

    function alleKunden(){
        setListe([]);
        ObjektAntwort(
            `/artikel/abruf/alle`,
            (antwort)=>{
                setListe(antwort);
                console.log("bewertungliste",antwort)
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
        <h1>Bewertung Artikel</h1>
        <label><b>Artikel : </b></label>
        <select size="1" onChange={(e)=>setKunNr(e.target.value)}>
            {liste.map((zeile)=>{
                return(
                    <option value={zeile.ArtikelNr}>
                        {zeile.ArtikelName}
                    </option>
                );
            })}
        </select>
        <button onClick={()=>datenZeigen()}>Anzeigen</button>
        {data != undefined && data.length > 0 ?(
            <>
            <p><b>Kunden number: </b>{data[0].KundenNr}</p>
            <p><b>Artikel Number: </b>{data[0].ArtikelNr}</p>
            <p><b>Sterne: </b>{data[0].Sterne}</p>
            <p><b>Artikel Name: </b>{data[0].ArtikelName}</p>
            <p><b>Artikel Preis: </b>{data[0].ArtikelPreis}</p>
            </>
        ):("")}
    </div>
  )
}
