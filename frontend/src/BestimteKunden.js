import React, { useEffect, useState } from "react";
import { ObjektAntwort } from "./ServerCom";

export default function BestimteKunden() {
  const [kundenNr, setKundenNr] = useState();
  const [liste, setListe] = useState([]);
  const [data,setData]=useState();

  function datenAnzeigen() {
    console.log(`/kunde/abruf/wer/${kundenNr}`);
    ObjektAntwort(
      `/kunde/abruf/wer/${kundenNr}`,
      (antwort) => {
        console.log("Test  ",antwort);
        setData(antwort);
      },
      (fehler) => {
        console.log(fehler);
      }
    );
  }

  function alleKunden() {
    setListe([]);
    ObjektAntwort(
        `/kunde/abruf/alle`,
        (antwort) => {
           setListe(antwort);
           console.log("kunden",liste);
        },
        (fehler) => {
          console.log(fehler);
        }
      );
  }
useEffect(
    () => { 
        alleKunden();
    },
    []
);

  return (
    <>
     <h1>bestimmkunden</h1>
      <hr />
      <select size="1" onChange={(e) => setKundenNr(e.target.value)}>
        {liste.map((zeile) => {
            //console.log(zeile);
          return (
            
            <option value={zeile.KundenNr}>
              {zeile.Vorname} {zeile.Nachname}
            </option>
          );
        }
        )}
        <p>{kundenNr}</p>
      </select>
      <button onClick={()=>datenAnzeigen()}>Anzeigen</button>
      <hr />
      {data ? 
      <>
        <p><b>Vorname:</b> {data[0].Vorname}</p>
        <p><b>Nachname:</b> {data[0].Nachname}</p>
        <p><b>Benutzer:</b> {data[0].Benutzer}</p>
        <p><b>Benutzer:</b> {data[0].KennWort}</p>
      </>
      : ""}
    </>
  );
}
