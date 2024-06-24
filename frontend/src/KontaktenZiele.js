import React, { useState, useEffect } from "react";
import { ObjektAntwort } from "./ServerCom";
import { TextAntwort } from './ServerCom';



export default function KontaktenZiele ({daten}){
 const[KVName,setKVname]=useState();
 const [KNName,setKNName]=useState();
 const [kTel,SetKTel]=useState();
 const[eMail,SetEMail]=useState();
 const [data,setData]=useState();
 const[status,setStatus]=useState(false);

useEffect(()=>{
    setKVname(daten.Vorname);
    setKNName(daten.KNName);
    SetKTel(daten.Telefon);
    SetEMail(daten.EMail);
},[daten])

function datenZeigen(){
    ObjektAntwort(
        `/kontakte/kunden/alle`,
        (antwort)=>{
            setData(antwort);
        },
        (fehler)=>{
            console.log(fehler)
        }
    )
}

  return (
    <>
    <div>
        {!status?(
            <tr>
            <td style={{ border: "1px solid" }}>
            {KVName}
        </td>
        <td style={{ border: "1px solid" }}>
            {KNName}
        </td>
        <td style={{ border: "1px solid" }}>
            {kTel}
        </td>
        <td style={{ border: "1px solid" }}>
            {eMail}
        </td>
        {/*<td><button onClick={()=>handleStatusTrue()}>Bearbeiten</button></td>
        <td><button onClick={()=>handleDelete()}>Entfernen</button></td>*/}
        </tr>
        ):(
            <tr>
                <td style={{border:"1px solid" }}> {KVName}</td>
                <td style={{border:"1px solid" }}> {KNName}</td>
                <td><input type="number" value={kTel} onChange={(e)=>SetKTel(e.target.value)} /></td>
                <td><input type="email" value={eMail} onChange={(e)=>SetEMail(e.target.value)} /></td>
                {/*<td><button onClick={() => bearbeiten()}>Ändern</button>
                <button onClick={()=>handleDelete()}>Entfernen</button></td>*/}
            </tr>
        )}
    </div>
     </>
  )
}
