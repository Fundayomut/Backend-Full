import React, { useState, useEffect } from "react";
import { ObjektAntwort } from "./ServerCom";
import { TextAntwort } from './ServerCom';

export default function KundenHistorieZiele({zeile, aktualisieren}){

    const [status,setStatus]=useState(false);
    const [kunHiNr,setKuHiNr]=useState();
    const [wahlKunden,setWahlKunden]=useState();
    const [wahlArtikel,setWahlArtikel]=useState();
    const [menge,setMenge]=useState();
    const [datum, setDatum]=useState();

    useEffect(
        ()=>{
            setKuHiNr(zeile.KuHiNr);
            setWahlKunden(zeile.KundenNr);
            setWahlArtikel(zeile.ArtikelNr);
            setMenge(zeile.Menge);
            setDatum(zeile.Datum);
        },
        []
    );
    
    const speichern = () => {
        console.log(` /khistorie/update/${kunHiNr}/${wahlKunden}/${wahlArtikel}/${menge}/${datum}`)
        TextAntwort(
          `/khistorie/update/${kunHiNr}/${wahlKunden}/${wahlArtikel}/${menge}/${datum}`,
          (antwort) => {
            console.log(antwort);
            setStatus(false);
          },
          (fehler) => {
            console.log(fehler);
          }
        );
      };
    
      const handleDelete = () => {
      // console.log( `/khistorie/entfernen/${kunHiNr}`,)
        TextAntwort(
          `/khistorie/entfernen/${kunHiNr}`,
          (antwort) => {
            console.log(antwort);
            if(aktualisieren !== undefined) aktualisieren();
          },
          (fehler) => {
            console.log("entfernen fehler", fehler);
          }
        );
      };
    

    return (
        <>
          {!status ? (
            <tr>
              <td>{zeile.kunHiNr}</td>
              <td>{zeile.KundenNr}</td>
              <td>{zeile.ArtikelNr}</td>
              <td>{zeile.Menge}</td>
              <td>{zeile.Datum}</td>
              <td>
                <button onClick={()=>setStatus(true)}>bearbeiten</button>
              </td>
              <td>
                <button onClick={()=>handleDelete()}>Entfernen</button>
              </td>
            </tr>
          ) : (
            <tr>
              <td>{kunHiNr}</td>
              <td>{zeile.KundenNr}</td>
              <td>{zeile.ArtikelNr}</td>
              <td>
                <input
                  type="number"
                  value={menge}
                  onChange={(e) => {
                    setMenge(e.target.value);
                  }}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={datum}
                  onChange={(e) => {
                    setDatum(e.target.value);
                  }}
                />
              </td>
              <td>
                <button onClick={() => speichern()}>Ändern</button>
              </td>
              <td>
                <button onClick={()=>handleDelete()}>Entfernen</button>
              </td>
            </tr>
          )}
        </>
)
}
