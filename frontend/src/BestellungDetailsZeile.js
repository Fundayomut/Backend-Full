import React, { useEffect, useState } from 'react';
import { TextAntwort,ObjektAntwort } from './ServerCom';

export default function BestellungDetailsZeile  ({daten}) {

    const[bestDetNr,setBestDetNr]=useState();
    const[bestNum,setBestNum]=useState();
    const[kunNr,setKunNr]=useState();
    const[artNr,setArtNr]=useState();
    const[menge,setMenge]=useState();
    const[status,setStatus]=useState();
    const[data,setData]=useState();

    useEffect(()=>{
        setBestDetNr(daten.BestDetNr);
        setBestNum(daten.BestellNr);
        setKunNr(daten.KundenNr);
        setArtNr(daten.ArtikelNr);
        setMenge(daten.Menge);
    },[])


    const handleDelete=()=>{
        console.log(".....>",  `/bestdetail/entfernen/${bestDetNr}`);
        TextAntwort(
            `/bestdetail/entfernen/${bestDetNr}`,
            (antwort)=>{
                console.log("bestdetail entfernen antwort",antwort);
            },
            (fehler)=>{
              console.log(fehler);
            }
          );
        }
    
        const bearbeiten=()=>{
            TextAntwort(
                `/bestdetail/update/${bestDetNr}/${bestNum}/${kunNr}/${artNr}/${menge}`
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

  return (
    <>
    {!status?(
        <tr>
            <td style={{border:"1px solid" }}>{artNr}</td>
            <td style={{border:"1px solid" }}>{menge}</td>
            <td style={{border:"1px solid" }}><button onClick={()=>HandleStatusTrue()}>Bearbeiten</button></td>
            <td style={{border:"1px solid" }}><button onClick={()=>handleDelete()}>Entfernen</button></td>
        </tr>
    ):(
        <tr>
            <td style={{border:"1px solid" }}>{artNr}</td>
            <td style={{border:"1px solid" }}>
            <input type='number' defaultValue={menge} onChange={(e)=>setMenge(e.target.value)}/>
            </td>
            <td><button onClick={()=>bearbeiten()}>Ändern</button></td>       
            <td><button onClick={()=>handleDelete()}>Entfernen</button></td>
        </tr>
    )}
    </>
  )
}
