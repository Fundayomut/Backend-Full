import React, { useEffect, useState } from "react";
import { ObjektAntwort } from "./ServerCom";

export default function AdressenKunde () {

    const [kndNr,setKunNr]=useState("");
    const [liste, setListe]=useState([]);
    const [data,setData]=useState();

    function datenZeigen(){
        ObjektAntwort(
            `/adresse/kunden/alle/${kndNr}`,
            (antwort)=>{
                setData(antwort);
            },
            (fehler)=>{
                console.log(fehler);
            }
        );
    }

    function alleKunden(){
        setListe([]);
        ObjektAntwort(
            `/kunde/abruf/alle`,
            (antwort)=>{
            setListe(antwort);
        },
        (fehler)=>{
            console.log(fehler);
        }
        );
    }

    useEffect(()=>{
        alleKunden();
    },[]
);


    return (
    <div>
        <select size="1" onChange={(e)=>setKunNr(e.target.value)}>
            {liste.map((zeile)=>{
                return(
                    <option value={zeile.KundenNr}>
                        {zeile.Vorname} {zeile.Nachname}
                    </option>
                );
            })}
        </select>
        <button onClick={()=>datenZeigen()}>anzeigen</button>
       {data != undefined && data.length > 0 ?(
            <>
            <p><b>Vorname: </b>{data[0].Vorname}</p>
            <p><b>Nachname: </b>{data[0].Nachname}</p>
            <p><b>Benutzer: </b>{data[0].Benutzer}</p>
            <p><b>Konto Type: </b>{data[0].KontoTyp}</p>
            <p><b>Adresse: </b>{data[0].Adresse}</p>
            <p><b>PLZ: </b>{data[0].PLZ}</p>
            <p><b>Ort: </b>{data[0].Ort}</p>
            </>
        ):("")}
    </div>
  )
}