import React, { useEffect, useState } from "react";
import { ObjektAntwort ,TextAntwort } from "./ServerCom";

export default function BestellungKunde (){
const [kndNr,setKndNr]=useState("");
const [besNr,setBesNr]=useState("");
const [allKunList,setAllKunList]=useState([]);
const [allBestList,setBestList]=useState([]);
const [kundata,setKunData]=useState();
const [besdata,setBesData]=useState();


function alleKunden(){
    ObjektAntwort(
        `/kunde/abruf/alle`,
        (antwort)=>{
            setAllKunList(antwort);
        },
        (fehler)=>{
            console.log(fehler);
        }
    );
}

function alleBestellung(){
    ObjektAntwort(
        `/bestellung/all`,
        (antwort)=>{
            setBestList(antwort);
        },
        (fehler)=>{
            console.log(fehler);
        }
    );
}

function datenZeigen(){
    ObjektAntwort(
        `/adresse/kunden/alle/${kndNr}`,
        (antwort)=>{
            setKunData(antwort);
        },
        (fehler)=>{
            console.log(fehler);
        }
    );
}

function bestZeigen(){
    ObjektAntwort(
        `/bestellungen/alle/${kndNr}`,
        (antwort)=>{
            setBestList(antwort);
        },
        (fehler)=>{
            console.log(fehler);
        }
    );
}



useEffect(()=>{
    alleKunden();
    alleBestellung();
},[]
);

function welcherKunde(nummer){
    setKndNr(nummer);
    bestZeigen();
}

  return (
    <div>
        <h2>bestellung kunde</h2>
    <label><b>Kunden Number : </b></label>
    <select size="1" onChange={(e)=>welcherKunde(e.target.value)}>
            {allKunList.map((zeile)=>{
                return(
                    <option value={zeile.KundenNr}>
                        {zeile.Vorname} {zeile.Nachname}
                    </option>
                );
            })}
        </select>
        <label><b>Bestell Number : </b></label>
        <select size="1" onChange={(e)=>setBesData(e.target.value)}>
            {allBestList.map((zeile)=>{
                return(
                    <option value={zeile.BestellNr}>
                      {zeile.BestellNr}
                    </option>
                );
            })}
        </select>
        <div>
        <button onClick={()=>datenZeigen()}>anzeigen</button>
        {allBestList != undefined && allBestList.length > 0 ?(
            <>
            <table>
                <tr>
                    <th style={{border:"1px solid" }}>GNetto</th>
                    <th style={{border:"1px solid" }}>MwSt</th>
                    <th style={{border:"1px solid" }}>GBrutto</th>
                    <th style={{border:"1px solid" }}>Stand</th>
                    <th style={{border:"1px solid" }}>Datum</th>
                </tr>
                <tr>
                    <td style={{border:"1px solid" }}>{allBestList[0].GNetto}</td>
                    <td style={{border:"1px solid" }}>{allBestList[0].MwSt}</td>
                    <td style={{border:"1px solid" }}>{allBestList[0].GBrutto}</td>
                    <td style={{border:"1px solid" }}>{allBestList[0].Stand}</td>
                    <td style={{border:"1px solid" }}>{allBestList[0].Datum}</td>
                </tr>
            </table>
            </>
        ):("")}
    </div>
    </div>
  )
}
