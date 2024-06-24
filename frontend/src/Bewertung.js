import React, { useState, useEffect } from "react";
import { ObjektAntwort, TextAntwort } from "./ServerCom";
import BewertungZeile from "./BewertungZeile";
import BewertungKunde from "./BewertungKunde";
import BewertungArtikel from "./BewertungArtikel";
export default function Bewertung() {

    const [bewList,setBewList]=useState([]);
    const [sterne,setSterne]=useState("");
    const [kunNr,setKunNr]=useState();
    const [artNr,setArtNr]=useState();
    const [bewNr,setBewNr]=useState();


    useEffect(() => {
        ObjektAntwort(
            `/bewertung/all`,
            (antwort)=>{
               // console.log("bewertung", antwort);
                setBewList(antwort);
            },
            (fehler)=>{
                console.log(fehler);
            }
        );
    }
    );

    const hinzufügen=()=>{
        TextAntwort(
            `/bewertung/neu/${kunNr}/${artNr}/${sterne}`
            ,
            (antwort)=>{
                //console.log("hizugefüge bewertung", antwort);
            },
            (fehler)=>{
                console.log(fehler);
            }
        )
    }

 
  return (
    <>
    <h1>Bewertung</h1>
    <label style={{marginLeft:"20px"}}>KundenNr:</label>
    <select size="1" onChange={(e) => setKunNr(e.target.value)}>
        {bewList.map((zeile)=>{
            return(
                <option value={zeile.KundenNr}>{zeile.KundenNr}</option>
            )
        })}
    </select>
    <label style={{marginLeft:"20px"}}>ArtikelNr:</label>
    <select size="1" onChange={(e) =>setArtNr(e.target.value)}>
        {bewList.map((zeile)=>{
            return(
                <option value={zeile.ArtikelNr}>{zeile.ArtikelNr}</option>
            )
        })}
    </select>
    <label style={{marginLeft:"20px"}}>Sterne:</label>
    <input type="number" placeholder="sterne" onKeyUp={(e)=>setSterne(e.target.value)}/>
    <button style={{marginLeft:"50px"}} onClick={()=>hinzufügen()}>Hinzufügen</button>
    <hr/>
    <table style={{border: '2px solid black'}}>
        <tr>
            <th style={{border: '2px solid black'}}>BewNr</th>
            <th style={{border: '2px solid black'}}>KundenNr</th>
            <th style={{border: '2px solid black'}}>ArtikelNr</th>
            <th style={{border: '2px solid black'}}>Sterne</th>
        </tr>
        {bewList.map((zeile)=>{
            {/*console.log("zeile--->",zeile);*/}
            return(
                <>
          <BewertungZeile daten={zeile}/>
         </>
            );
        })
        }
    </table>
    <hr/>
    <div>
        <BewertungKunde/>
    </div>
    <BewertungArtikel/>
    </>
  )
}
