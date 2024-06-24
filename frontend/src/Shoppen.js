import React, { useState,useContext,useEffect } from "react";
import {ObjektAntwort, TextAntwort} from "./ServerCom";
import "./style.css";


function ArtikelAngebot({Daten})
{
    const[name, setName] = useState("");
    const[menge, setMenge] = useState(0);
    const[anr, setANr] = useState(0);

    useEffect(
        () => {
            setName(Daten.ArtikelName);
            setANr(Daten.ArtikelNr);

        }, []
    );

    function InDenWarenkorb()
    {
        // Gibt es ein localStorage-Key "warenkorb" ?   // LocalStorage anahtarı "alışveriş sepeti" var mı?
        // Wenn ja, lies den warenkorb und erstelle daraus einen JSON-Array  // Evetse, alışveriş sepetini okuyun ve ondan bir JSON dizisi oluşturun
        // Wenn nicht, dann gibt ein leeres Array zurück // Değilse boş bir dizi döndürür
       
        let warenkorb = localStorage.getItem("warenkorb") === null ||
                        localStorage.getItem("warenkorb") === "" ?
                        [] :
                        JSON.parse(localStorage.getItem("warenkorb") );
        // *** //
        // Wenn im JSON-Array noch nicht drin ist, dann tu das neue Artilel rein
         // JSON dizisi henüz orada değilse, yeni makaleyi içine yerleştirin
        if(warenkorb.length == 0)
        {
            warenkorb.push(
                {
                    id : anr,
                    ar : name,
                    mg : menge
                }
            );
        }
        // Wenn schon was drin ist...
        else
        {
            // Merken, welche Zeile im Array diesen Artikel schon hat
            let nummer = undefined;
            // *** //
            // Array durchlaufen...
            for(let e = 0; e < warenkorb.length; e++)
            {
                // Zeile finden
                if(warenkorb[e].id === anr)
                {
                    // Zeilennummer notieren und Schleife verlassen
                    nummer = e; break;
                }
            }
            // *** //
            // Wenn keine Zeiel gefunden, dann neues Objekt hinzufügen
            if(nummer == undefined)
            {
                warenkorb.push(
                    {
                        id : anr,
                        ar : name,
                        mg : menge
                    }
                );
            }
            // Wenn Zeile gefunden, dann durch neues Objekt ersetzen
            else
            {
                warenkorb[nummer] = {
                    id : anr,
                    ar : name,
                    mg : menge
                };
            }
        }
        // *** //
        // Neuen JSON-Array-Zustand zurück in den localStorage speichern
        localStorage.setItem("warenkorb", JSON.stringify(warenkorb));
    }

    return (
        <>
               
               <li className="nebeneinander">
                        <label>
                            {name}
                        </label>
                        <div>
                            <input type = "number" placeholder="Menge..." onChange={(e)=>setMenge(e.target.value)} />
                        </div>
                        <button onClick={()=>InDenWarenkorb()}>In den Warenkorb</button>
                    </li>
                
        </>
    )
}

export default function Shoppen () {
    const[alleartikel,setAlleartikel]=useState([]);

    const handleArtikel=()=>{
        ObjektAntwort(
            `/artikel/alle`,
            (antwort)=>{
                setAlleartikel(antwort);
                console.log("setAlleartikel",antwort);
            },
            (fehler)=>{
                console.log(fehler)
            }
        );
    }
    
    
useEffect(()=>{
    handleArtikel()
},[]
);


  return (
   <>
   <ul>
    {alleartikel.map(
        (zeile)=>{
            return(
                        <ArtikelAngebot Daten={zeile} />
           )
        }
    )}
    </ul>
   </>
  )
}