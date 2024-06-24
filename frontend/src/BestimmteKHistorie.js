import React, { useEffect, useState } from "react";
import { ObjektAntwort } from "./ServerCom";

export default function BestimteKunden() {
    const [kundenNr, setKundenNr] = useState();
    const [liste, setListe] = useState([]);
    const [data,setData]=useState();

    function datenAnzeigen() {
        console.log(`/khistorie/abruf/kunde/${kundenNr}`);
        ObjektAntwort(
          `/khistorie/abruf/kunde/${kundenNr}`,
          (antwort) => {
            console.log("bestimte khistorie",liste);
            setData(antwort);
          },
          (fehler) => {
            console.log(fehler);
          }
        );
      }
    
      function alleKhistorie() {
        setListe([]);
        ObjektAntwort(
            `/khistorie/abruf/alle`,
            (antwort) => {
               setListe(antwort);
               console.log("antwort",antwort);
            },
            (fehler) => {
              console.log(fehler);
            }
          );
      }
    useEffect(
        () => { 
            alleKhistorie();
        },
        []
    );
   return(
    <>
    <h1>bestimmkhistorie</h1>
      <hr />
      <select size="1" onChange={(e) => setKundenNr(e.target.value)}>
        {liste.map((zeile) => {
            //console.log(zeile);
          return (
            <option value={zeile.KundenNr}>
              {zeile.KundenNr}
            </option>
          );
        }
        )}
      </select>
      <button onClick={()=>datenAnzeigen()}>Anzeigen</button>
      <hr />
      {data ? 
      <>
        <p><b>KundenHistorieNr:</b> {data[0].KuHiNr}</p>
        <p><b>ArtikelNr:</b> {data[0].ArtikelNr}</p>
        <p><b>Menge:</b> {data[0].Menge}</p>
        <p><b>Datum:</b> {data[0].Datum}</p>
      </>
      : ""}
    </>
  );
}
