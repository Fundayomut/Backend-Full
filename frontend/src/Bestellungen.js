import React, { useEffect, useState } from 'react';
import { TextAntwort,ObjektAntwort } from './ServerCom';
import BestellungenZiele from "./BestellungenZiele";
import BestellungKunde from './BestellungKunde';
import BestellungDetails from './BestellungDetails';


export default function Bestellungen () {

    const [kunNr,setKunNr]=useState();
    const [kunListe,setKunListe]=useState([]);
    const [netto,setNetto]=useState();
    const [mwst,setMwst]=useState();
    const [gbrutto,setGbrutto]=useState();
    const [stand, setStand]=useState();
    const [datum,setDatum]=useState();
    const [bestInput,setBestInput]=useState();
    const [allBestUndKont,setAllBestUndKont]=useState([]);

    function alleKunden(){
        ObjektAntwort(
            `/kunde/alle`
            ,
            (antwort)=>{
                setKunListe(antwort);
                console.log("alle kontakte --> bestellungen antwort",antwort);
            },
            (fehler)=>{
                console.log("alle kontakte --> bestellungen fehler",fehler);
            }
        );
    }

useEffect(()=>{
alleKunden();
},[])



function besthinzu(){
    TextAntwort(
        `/bestellung/neu/${kunNr}/${netto}/${mwst}/${gbrutto}/${stand}/${datum}`
        ,
        (antwort)=>{
            setBestInput(antwort);
        },
        (fehler)=>{
            console.log(fehler)
        }
    )
}

function bestellUndKont(){
    ObjektAntwort(
        `/bestellung/kunden/alle`,
        (antwort)=>{
            setAllBestUndKont(antwort);
            console.log("best und kont",antwort);
        },
        (fehler)=>{
            console.log(fehler)
        }
    )
}



  return (
    <>
    <div>
        <h3>Bestellungen</h3>
    </div>
    <div>
        <select size="1" onChange={(e)=>setKunNr(e.target.value)}>
            {kunListe.map((zeile)=>{
                return(
                    <option value={zeile.KundenNr}>
                        {zeile.Vorname} {zeile.Nachname}
                    </option>
                )
            })}
        </select>
        <input type='number' placeholder='netto' onKeyUp={(e)=>setNetto(e.target.value)}/>
        <input type='number' placeholder='mwst' onKeyUp={(e)=>setMwst(e.target.value)}/>
        <input type='number' placeholder='Gbrutto' onKeyUp={(e)=>setGbrutto(e.target.value)}/>
        <select onKeyUp={(e)=>setStand(e.target.value)}>
            <option value={false}>0</option>
            <option value={true}>1</option>
        </select>
        <input type='date' placeholder='Datum' onKeyUp={(e)=>setDatum(e.target.value)}/>
        <button onClick={()=>besthinzu()}>Hinzufügen</button>
        <h3>bestellungenzeile</h3>
    </div>
    <table>
        <tr>
            <th style={{border:"1px solid" }}>Bestellnumber</th>
            <th style={{border:"1px solid" }}>KundeNr</th>
            <th style={{border:"1px solid" }}>Vorname</th>
            <th style={{border:"1px solid" }}>Nachname</th>
            <th style={{border:"1px solid" }}>Gnetto</th>
            <th style={{border:"1px solid" }}>NwSt</th>
            <th style={{border:"1px solid" }}>GBrutto</th>
            <th style={{border:"1px solid" }}>Stand</th>
            <th style={{border:"1px solid" }}>Datum</th>
        </tr>
        {allBestUndKont.map((zeile)=>{
            return(
                <>
                  <BestellungenZiele daten={zeile}/>
                </>
            )
        })}
      
    </table>
    <button onClick={()=>bestellUndKont()} >Aktualisiern</button>
    <div>
        <hr/>
        <BestellungKunde/>
    </div>
    <div>
        <hr/>
    </div>
    </>
  )
}
