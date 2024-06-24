import React, { useEffect } from "react";
import { ObjektAntwort, TextAntwort } from "./ServerCom";
import { useState } from "react";
import KundenHistorieZiele from "./KundenHistorieZiele";

export default function KundenHistorie()
{
    const [liste, setListe]=useState([]);
    const [wahlKunden,setWahlKunden]=useState();
    const [wahlArtikel,setWahlArtikel]=useState();
    const [menge,setMenge]=useState();
    const [datum, setDatum]=useState();
    const [kunHiNr,setKuHiNr]=useState();
    const [kundenListe, setKundenListe]=useState([]);
    const [artikelListe, setArtikelListe]=useState([]);
    const [status,Setstatus]=useState(false);

    function HistorieNeuLaden()
    {
        setListe([]);
        ObjektAntwort(
            "/khistorie/abruf/alle",
            (antwort)=>{
                setListe(antwort);
                console.log(liste);
            },
            (fehler)=>{
                console.log(fehler);
            }
        );
    }

    useEffect(
        ()=>{
            ObjektAntwort(
                "/khistorie/abruf/alle",
                (antwort)=>{
                    setListe(antwort);
                    console.log(liste);
                },
                (fehler)=>{
                    console.log(fehler);
                }
            );
            ObjektAntwort(
                "/kunde/abruf/alle",
                (antwort)=>{
                    setKundenListe(antwort);
                    console.log(kundenListe);
                },
                (fehler)=>{
                    console.log(fehler);
                }
            );
            ObjektAntwort(
                "/artikel/abruf/alle",
                (antwort)=>{
                    setArtikelListe(antwort);
                    console.log(artikelListe);
                },
                (fehler)=>{
                    console.log(fehler);
                }
            );
        },
        []
    );

const hinzufügen=()=>{
    TextAntwort(
        `/khistorie/neu/${wahlKunden}/${wahlArtikel}/${menge}/${datum}`
        ,
        (antwort)=>{
            console.log("hinantwort",antwort);
            /*
            Yeni bir satir veri tabanina eklendikten sonra
            eski listesi bosaltip, tekrar sunucudan okumali
            */
            setListe([]);
            ObjektAntwort(
                "/khistorie/abruf/alle",
                (antwort)=>{
                    setListe(antwort);
                    console.log(liste);
                },
                (fehler)=>{
                    console.log(fehler);
                }
            );
            
        },
        (fehler)=>{
            console.log(fehler);
        }
    )
    ObjektAntwort(
        `/khistorie/update/${kunHiNr}/${wahlKunden}/${wahlArtikel}/${menge}/${datum}`
        ,
        (antwort)=>{
            console.log(antwort);
            setListe(antwort);
        },
        (fehler)=>{
            console.log(fehler);
        }
    )
}



return(
    <>
    <hr/>
    <h2>KundenHistorie</h2>
    <select size={1} onChange={(e)=>setWahlKunden(e.target.value)}>
        {kundenListe.map(
            (zeile)=>{
                return <option value={zeile.KundenNr}>
                    {zeile.KundenNr}
                </option>
            }
        )}
    </select>
    <select size={1} onChange={(e)=>setWahlArtikel(e.target.value)}>
        {artikelListe.map(
            (zeile)=>{
                return <option value={zeile.ArtikelNr}>
                    {zeile.ArtikelNr}
                </option>
            }
        )}
    </select>
    <input type="number" value={menge} onChange={(e)=>setMenge(e.target.value)}/>
       
    <input type="date" value={datum} onChange={(e)=>setDatum(e.target.value)}/>
    
    <button onClick={()=>hinzufügen()}>Hinzufügen</button>
    <hr/>
    <table>
            {liste.map(
                    (zeile)=>{
                        return(
                            <>
                            <KundenHistorieZiele 
                            zeile={zeile}
                            aktualisieren={()=>HistorieNeuLaden()}
                            />
                            </>
                        )
                    }
                )
            }
    </table>
    </>
)
}
