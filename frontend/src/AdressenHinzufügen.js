import React, { useState, useEffect } from "react";
import { ObjektAntwort, TextAntwort } from "./ServerCom";
import AlleAdresssen from "./AlleAdresssen";



export default function AdressenHinzufügen(){

    const [kNumber,setKNumber]=useState("");
    const [kListe,setKListe]=useState([]);
    const [adresse,setAdresse]=useState("");
    const [adrPlz,setPlz]=useState();
    const [adrOrt,setOrt]=useState("");
    
    function alleKunden(){
        ObjektAntwort(
            `/kunde/alle`
            ,
            (antwort)=>{
                setKListe(antwort);
                console.log("KundenlisteAntwort",antwort);
            },
            (fehler)=>{
                console.log(fehler);
            }
        );
    }

    useEffect(
        ()=>{
            alleKunden();
        },
        []
    );

    function adressHinzu(){
       TextAntwort(
        `/adresse/neu/${kNumber}/${adresse}/${adrPlz}/${adrOrt}`,
        (antwort)=>{
            console.log("neu adress",antwort);
        },
        (fehler)=>{
            console.log(fehler);
        }
       );
    }


    return(
        <>
        <p>Adresse hinzufügen</p>
        <div>
        <select size="1" onChange={(e)=>setKNumber(e.target.value)}>
            {kListe.map((ziele)=> {
                return(
                    <option value={ziele.KundenNr}>
                        {ziele.Vorname} {ziele.Nachname}
                    </option>
                )
            })}
        </select>
            <input type="text" placeholder="Adresse..." onKeyUp={(e)=>{setAdresse(e.target.value)}}/>
            <input type="text" placeholder="PLZ..." onKeyUp={(e)=>{setPlz(e.target.value)}}/>
            <input type="text" placeholder="Ort..." onKeyUp={(e)=>{setOrt(e.target.value)}}/>
            <button onClick={()=>adressHinzu()}>Hinzufügen</button>
            </div>
            <div>
                <AlleAdresssen/>
            </div>
        </>
    )

}

