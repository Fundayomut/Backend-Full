import React, { useEffect, useState } from 'react'
import { TextAntwort,ObjektAntwort } from './ServerCom';

export default function KontaktInfo  ({zeile}) {

    const[kunListe,setKunListe]=useState([]);
    const[ktel,setKTel]=useState();
    const[kMail,setKMail]=useState();
    const[kunNumber,setKunNumber]=useState();
    const[kunUndKon,setKunUndKon]=useState();
    const[kontaktNr,setKontaktNr]=useState();
    const [status,setStatus]=useState();


    useState(()=>{
        setKunListe
    })
    
    function alleKunden(){
        ObjektAntwort(
            `/kunde/alle`
            ,
            (antwort)=>{
                console.log("alle kontakte --> kunListe antwort",antwort);
            },
            (fehler)=>{
                console.log("alle kontakte --> kunListe fehler",fehler);
            }
        );
    }

    useEffect(() => {
        alleKunden();
    }, []);

    const handleStatusTrue = () => {
        setStatus(true);
    }

    const handleDelete = () => {
        // handleDelete logic
    }

    const bearbeiten = () => {
        // bearbeiten logic
    }
    
  return (

    <div>
            {
                kunListe.map(
                    (zeile)=>{
                        return <>
                            <KontaktInfo zeile={zeile} />
                        </>
                    }
                )
            }

            {!status ?(
                                <tr>
                <td style={{ border: "1px solid" }}>
                    {zeile !== undefined ? zeile.Vorname : ""}
                </td>
                <td style={{ border: "1px solid" }}>
                    {zeile !== undefined ? zeile.Nachname : ""}
                </td>
                <td style={{ border: "1px solid" }}>
                    {zeile !== undefined  ? zeile.Telefon : ""}
                </td>
                <td style={{ border: "1px solid" }}>
                    {zeile !== undefined  ? zeile.EMail : ""}
                </td>
                <td><button onClick={()=>handleStatusTrue()}>Bearbeiten</button></td>
                <td><button onClick={()=>handleDelete()}>Entfernen</button></td>
                </tr>
                
            ):(
                <tr>
                <td style={{border:"1px solid" }}> {zeile !== undefined? zeile.Vorname : ""}</td>
                <td style={{border:"1px solid" }}> {zeile !== undefined ? zeile.Nachname : ""}</td>
                <td><input type="number" value={zeile.ktel} onChange={(e)=>setKTel(e.target.value)} /></td>
                <td><input type="email" value={zeile.kMail} onChange={(e)=>setKMail(e.target.value)} /></td>
                <td><button onClick={() => bearbeiten()}>Ändern</button>
                <button onClick={()=>handleDelete()}>Entfernen</button></td>
                </tr>
           
            )}
        <button onClick={()=>kundenUndKontakte()} >Aktualisiern</button>
    </div>
  )
}
