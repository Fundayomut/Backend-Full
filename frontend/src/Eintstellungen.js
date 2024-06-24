import React, { useState,useContext,useEffect } from "react";
import {ObjektAntwort, TextAntwort} from "./ServerCom";
import { AuthKontext } from "./AnmeldeSteuerung";
import EinstellungenZeile from "./EinstellungenZeile";
import EinstellungenHinzu from "./EinstellungenHinzu";


export default function Eintstellungen()
{
    const {kundeId}=useContext(AuthKontext);
    const[data,setData]=useState();
   // const [adNr,setAdNr]=useState();
   // const [adr,setAdr]=useState();
    //const [plz,setPlz]=useState();
   // const [ort,setOrt]=useState();
    //const [status,setStatus]=useState(false);


useEffect(()=>{
    adressenKunde();
},[]);

    function adressenKunde(){
        console.log("data kunden adress-->",`/adresse/kunden/alle/${kundeId}`);
        ObjektAntwort(
            `/adresse/kunden/alle/${kundeId}`,
            (antwort)=>{
                setData(antwort);
                console.log("adrressenkunde -->data",antwort)
            },
            fehler=>{
                console.log(fehler);
            }
        )
    }

    

    return (
        <div className="einstellungendiv">
        <table>
            <tr>
            <th>Address Nr</th>
            <th>Kunden Nr</th>
            <th>Adresse</th>
            <th>PLZ</th>
            <th>Ort</th>
            <th> Vorname</th>
            </tr>
            {typeof data === "object" && data.length > 0 ? (
            data.map((zeile) => {
                return (
                    <>
                    <EinstellungenZeile daten={zeile}/>
                    </>
                )
            })
        ) : <p>Keine Datei</p>}
    </table>
         <>
            <EinstellungenHinzu/>
        </>
    </div>
    )
};
/*
return 
<>
 <p><b>Address Nr: </b>{data[0].AdressNr}</p>
 <p><b>Kunden Nr: </b>{data[0].KundenNr}</p>
 <p><b>PLZ: </b>{data[0].PLZ}</p>
 <p><b>Ort: </b>{data[0].Ort}</p>
 <p><b>Vorname: </b>{data[0].Vorname}</p>
</>;
*/

