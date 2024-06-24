import React, { useEffect, useState } from 'react';
import { TextAntwort,ObjektAntwort } from './ServerCom';
import BestellungDetailsZeile from './BestellungDetailsZeile';

export default function BestellungDetails  () {
    
    const[artikelList,setArtikelList]=useState([]);
    const[artikelNr,setArtikelNr]=useState();
    const[bestDetInput,setBestDetInput]=useState();
    const[bestNr,setBestNr]=useState();
    const[kunNr,setKunNr]=useState();
    const[menge,setMenge]=useState();
    const[bestDetNr,setBestDetNr]=useState();
    const [bestDetailAll,setbestDetailAll]=useState([]);
   
    function alleArtikel(){
        ObjektAntwort(
            `/artikel/alle`
            ,
            (antwort)=>{
                setArtikelList(antwort);
                console.log("setArtikelList",antwort);
            },
            (fehler)=>{
                console.log("setArtikelList",fehler);
            }
        );
    }

    function alleBestDetail(){
        ObjektAntwort(
            `/bestdetail/all`
            ,
            (antwort)=>{
                setbestDetailAll(antwort);
                console.log("bestdetails", antwort);
            },
            (fehler)=>{
                console.log(fehler);
            }
        );
    }


function bestdetHinzu(){
    TextAntwort(
        `/bestdetail/neu/${bestNr}/${kunNr}/${artikelNr}/${menge}`
        ,
        (antwort)=>{
            setBestDetInput(antwort);
        },
        (fehler)=>{
            console.log(fehler)
        }
    )
}

    useEffect(()=>{
        alleArtikel();
        alleBestDetail();
    });

  return (
    <>
        <h2>BestellungDetails</h2>
        <div>
        <select size="1" onChange={(e)=>setArtikelNr(e.target.value)}>
            {artikelList.map((zeile)=>{
                return(
                    <option value={zeile.ArtikelNr}>
                        {zeile.ArtikelNr}
                    </option>
                
                )
            })}
        </select>
        <input type='number' placeholder='Menge' onKeyUp={(e)=>setMenge(e.target.value)}/>
        <button onClick={()=>bestdetHinzu()}>Hinzufügen</button>
        <h3>bestellung deteilszeile</h3>
    </div>
    <table>
        <tr>
            <th style={{border:"1px solid" }}>Artikel</th>
            <th style={{border:"1px solid" }}>Menge</th>
        </tr>
        {bestDetailAll.map((zeile)=>{
            return(
                <>
                <BestellungDetailsZeile daten={zeile}/>
                </>
            )
        })}
    </table>
    </>
  )

}
