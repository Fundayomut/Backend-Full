import React, { useEffect, useState } from 'react';
import { TextAntwort,ObjektAntwort } from './ServerCom';

export default function Bestellungen ({daten}) {
 
    const [kunNr,setKunNr]=useState();
    const [netto,setNetto]=useState();
    const [mwst,setMwst]=useState();
    const [gbrutto,setGbrutto]=useState();
    const [stand, setStand]=useState();
    const [datum,setDatum]=useState();
    const [status,setStatus]=useState(false);
    const [bestNum,setBestNum]=useState();
    const [data,setData]=useState();
    const [konName,setKonName]=useState();
    const [konNName,setKonNName]=useState();
    

    useEffect(()=>{
        setBestNum(daten.BestellNr);
        setKunNr(daten.KundenNr);
        setNetto(daten.GNetto);
        setMwst(daten.MwSt);
        setGbrutto(daten.GBrutto);
        setStand(daten.Stand);
        setDatum(daten.Datum);
        setKonName(daten.Vorname);
        setKonNName(daten.Nachname);
        datenZeigen();
    },[daten]);
    
const handleDelete=()=>{
    console.log(".....>",  `/bestellung/entfernen/${bestNum}`);
    TextAntwort(
        `/bestellung/entfernen/${bestNum}`,
        (antwort)=>{
            console.log("bestzeile entfernen antwort",antwort);
        },
        (fehler)=>{
          console.log(fehler);
        }
      );
    }

    const bearbeiten=()=>{
        TextAntwort(
            `/bestellung/update/${bestNum}/${kunNr}/${netto}/${mwst}/${gbrutto}/${stand}/${datum}`
            ,
            (antwort)=>{
                console.log("allekontaktebearbeiten",antwort);
                setStatus(false);
            },
            (fehler)=>{
                console.log(fehler);
            }
        );
    }
    const HandleStatusTrue=()=>{
        setStatus(true);
    }

    function datenZeigen(){
        ObjektAntwort(
            `/bestdetail/dieser/${kunNr}`,
            (antwort)=>{
                setData(antwort);
            },
            (fehler)=>{
                console.log(fehler);
            }
        )
    }

    return (
        <>
           {!status ?(
            <tr>
                <td style={{border:"1px solid" }}>{bestNum}</td>
                    <td style={{border:"1px solid" }}> {kunNr}</td>
                    <td style={{border:"1px solid" }}> {konName}</td>
                    <td style={{border:"1px solid" }}> {konNName}</td>
                    <td style={{border:"1px solid" }}>{netto}</td>
                    <td style={{border:"1px solid" }}>{mwst}</td>
                    <td style={{border:"1px solid" }}>{gbrutto}</td>
                    <td style={{border:"1px solid" }}>{stand}</td>
                    <td style={{border:"1px solid" }}>{datum}</td>
                    <td style={{border:"1px solid" }}><button onClick={()=>HandleStatusTrue()}>bearbeiten</button></td>
                    <td style={{border:"1px solid" }}><button onClick={()=>handleDelete()}>Entfernen</button></td>
            </tr>
           ):(
            <tr>
                <td style={{border:"1px solid" }}>{bestNum}</td>
                <td style={{border:"1px solid" }}>{kunNr}</td>
                <td style={{border:"1px solid" }}>{konName}</td>
                <td style={{border:"1px solid" }}>{konNName}</td>
                <td style={{border:"1px solid" }}>
                <input type='number' defaultValue={netto} onKeyUp={(e)=>setNetto(e.target.value)}/>
                </td>
                <td style={{border:"1px solid" }}>
                <input type='number' defaultValue={mwst} onKeyUp={(e)=>setMwst(e.target.value)}/>
                    </td>
                <td style={{border:"1px solid" }}>
                <input type='number' defaultValue={gbrutto} onKeyUp={(e)=>setGbrutto(e.target.value)}/>
                    </td>
                <td style={{border:"1px solid" }}>
                <select onChange={(e)=>setStand(e.target.value)}>
                <option value={0} selected>0</option>
                <option value={1}>1</option>
                </select>
                    </td>
                <td style={{border:"1px solid" }}>
                <input type='date' onChange={(e)=>setDatum(e.target.value)}/>
                    </td>
                <td style={{border:"1px solid" }}><button onClick={() => bearbeiten()}>Ändern</button></td>       
                <td style={{border:"1px solid" }}> 
                <button onClick={()=>handleDelete()}>Entfernen</button></td>
            </tr>
           )}
        </>
      )

    };
