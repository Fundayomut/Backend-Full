import React, { useState, useEffect } from "react";
import { ObjektAntwort } from "./ServerCom";
import { TextAntwort } from './ServerCom';


export default function AdressenZeile  ({daten}) {

    const [status,setStatus]=useState(false);
    const [adNr,setAdNr]=useState();
    const [kunNr,setKunNr]=useState();
    const [adr,setAdr]=useState();
    const [plz,setPlz]=useState();
    const [ort,setOrt]=useState();
    const [vorname,setVorname]=useState();
    const [nachname,setNachname]=useState();
    const [data,setData]=useState();

    useEffect(()=>{
        setAdNr(daten.AdressNr);
        setKunNr(daten.KundenNr);
        setAdr(daten.Adresse);
        setPlz(daten.PLZ);
        setOrt(daten.Ort);
        setVorname(daten.Vorname);
        setNachname(daten.Nachname);
        datenZeigen();
    },[daten]);
    
const bearbeiten=()=>{
  TextAntwort(
    `/adresse/update/${adNr}/${kunNr}/${adr}/${plz}/${ort}`
    ,
    (antwort)=>{
      console.log("alleadresbearbeitenantwort",antwort);
      setStatus(false)
    },
    (fehler)=>{
      console.log(fehler)
    }
  );
}

const HandleStatusTrue=()=>{
    setStatus(true);
}

const handleDelete=()=>{
  TextAntwort(
    `/adresse/entfernen/${adNr}`,
    (antwort)=>{
      console.log("alleadressedeleteantwort",antwort);
    },
    (fehler)=>{
      console.log(fehler);
    }
  );
}

function datenZeigen(){
  ObjektAntwort(
      `/adresse/kunden/alle/${kunNr}`,
      (antwort)=>{
          setData(antwort);
      },
      (fehler)=>{
          console.log(fehler);
      }
  );
}

  return (
    <>
          {!status ?(
            <tr>
        <td style={{border:"1px solid" }}>{adNr}</td>
        <td style={{border:"1px solid" }}>{kunNr}</td>
        <td style={{ border: "1px solid" }}>
        {data !== undefined && data.length > 0 ? data[0].Vorname : ""}
        </td>
        <td style={{ border: "1px solid" }}>
        {data !== undefined && data.length > 0 ? data[0].Nachname : ""}
        </td>
        <td style={{border:"1px solid" }}>{adr}</td>
        <td style={{border:"1px solid" }}>{plz}</td>
        <td style={{border:"1px solid" }}>{ort}</td>
        <td><button onClick={()=>HandleStatusTrue()}>bearbeiten</button></td>
        <td><button onClick={()=>handleDelete()}>Entfernen</button></td>
        </tr>
          ):(
            <tr>
            <td style={{border:"1px solid" }}>{adNr}</td>
            <td style={{border:"1px solid" }}>{kunNr}</td>
            <td style={{border:"1px solid" }}>{vorname}</td>
            <td style={{border:"1px solid" }}>{nachname}</td>
            <td><input type="text" value={adr} onChange={(e)=>setAdr(e.target.value)} /></td>
            <td><input type="number" value={plz} onChange={(e)=>setPlz(e.target.value)} /></td>
            <td><input type="text" value={ort} onChange={(e)=>setOrt(e.target.value)} /></td>
            <td><button onClick={() => bearbeiten()}>Ändern</button>
            <button onClick={()=>handleDelete()}>Entfernen</button></td>
            </tr>
          )}
    </>
  )
}

