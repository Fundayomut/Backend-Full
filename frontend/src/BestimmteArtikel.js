import React, { useEffect, useState } from "react";
import { ObjektAntwort } from "./ServerCom";

export default function BestimteKunden() {
    const [artNr, setArtNr] = useState();
    const [liste, setListe] = useState([]);
    const [data,setData]=useState();

    function datenAnzeigen() {
        console.log(`/khistorie/abruf/artikel/${artNr}`);
        ObjektAntwort(
          `/khistorie/abruf/artikel/${artNr}`,
          (antwort) => {
            console.log("basArtikel",antwort);
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
    <h1>Bestimmartikel</h1>
      <hr />
      <select size="1" onChange={(e) => setArtNr(e.target.value)}>
        {liste.map((zeile) => {
            //console.log(zeile);
          return (
            <option value={zeile.ArtikelNr}>
              {zeile.ArtikelNr}
            </option>
          );
        }
        )}
      </select>
      <button onClick={()=>datenAnzeigen()}>Anzeigen</button>
      <hr />
      {data ? 
      <>
        <p><b>ArtikelNr:</b>{data[0].ArtikelNr}</p>
        <p><b>Artikel Name:</b>{data[0].ArtikelName}</p>
        <p><b>Artikel Preis:</b> {data[0].ArtikelPreis}</p>
        <p><b>Menge:</b> {data[0].Menge}</p>
        <p><b>Menge:</b> {data[0].Datum}</p>
      </>
      : ""}
    </>
  );
}