import React, { useState,useContext,useEffect } from "react";
import {ObjektAntwort, TextAntwort} from "./ServerCom";

export default function ArtikelZeigen () {

    const[alleartikel,setAlleartikel]=useState([]);

    const handleArtikel=()=>{
        ObjektAntwort(
            `/artikel/alle`,
            (antwort)=>{
                setAlleartikel(antwort);
                console.log("setAlleartikel",antwort);
            },
            (fehler)=>{
                console.log(fehler)
            }
        );
    }
    
    
useEffect(()=>{
    handleArtikel()
},[]
);
const aktualisieren=()=>{
handleArtikel()
}

  return (
   <>
   <table>
    <tr>
        <th>Artikel Name</th>
        <th>Artikel Preis</th>
        <button onClick={()=>aktualisieren()} >Aktualizieren</button>
    </tr>
    {alleartikel.map(
        (zeile)=>{
            return(
                <tr>
                    <td>{zeile.ArtikelName}</td>
                    <td>{zeile.ArtikelPreis}</td>
                </tr>
            )
        }
    )}
   </table>
   </>
  )
}
