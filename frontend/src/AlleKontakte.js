import React, { useEffect, useState } from 'react'
import { TextAntwort,ObjektAntwort } from './ServerCom';
import KontaktInfo from './KontaktInfo';


export default function AlleKontakte() {
    //const[kunListe,setKunListe]=useState([]);
    //const[ktel,setKTel]=useState();
    //const[kMail,setKMail]=useState();
    //const[kunNumber,setKunNumber]=useState();
    //const[kunUndKon,setKunUndKon]=useState();
    const[kontaktNr,setKontaktNr]=useState();
    const [status,setStatus]=useState(false);


    /*
    function alleKunden(){
        ObjektAntwort(
            `/kunde/alle`
            ,
            (antwort)=>{
                setKunListe(antwort);
                console.log("alle kontakte --> kunListe antwort",antwort);
            },
            (fehler)=>{
                console.log("alle kontakte --> kunListe fehler",fehler);
            }
        );
    }
*/
    useEffect(
        ()=>{
        alleKunden();
        kundenUndKontakte();
    },
    []
);

/*
function kontakteHinzu(){
    TextAntwort(
        `/kontakt/neu/${kunNumber}/${ktel}/${kMail}`
        ,
        (antwort)=>{
            console.log("alle kontakt---> kontakt hinzu",antwort);
        },
        (fehler)=>{
            console.log("alle kuontakte--->fehler",fehler);
        }
    );
}*/

function kundenUndKontakte(){
    ObjektAntwort(
        `/kontakte/kunden/alle`,
        (antwort)=>{
            setKunUndKon(antwort);
            console.log("kunundkon antwoert",antwort)
        },
        (fehler)=>{
            console.log(fehler);
        }
    );
}

const bearbeiten=()=>{
    TextAntwort(
        `/kontakt/update/${kontaktNr}/${kunNumber}/${ktel}/${kMail}`
        ,
        (antwort)=>{
            console.log("allekontaktebearbeiten",antwort);
            setStatus(false)
        },
        (fehler)=>{
            console.log(fehler);
        }
    );
}

const handleStatusTrue=()=>{
    setStatus(true);
}

const handleDelete=()=>{
    TextAntwort(
      `/kontakt/entfernen/${kontaktNr}`,
      (antwort)=>{
        console.log("alleadressedeleteantwort",antwort);
      },
      (fehler)=>{
        console.log(fehler);
      }
    );
  }

  return (
    <>
    <div>
        <h1>Alle Kontakte</h1>
        <select size="1" onChange={(e)=>setKunNumber(e.target.value)}>
            {kunListe.map((zeile)=>{
                return(
                <option value={zeile.KundenNr}>
                    {zeile.Vorname} {zeile.Nachname}
                    </option>
                    )
            })}
        </select>
        <input type='number' placeholder='Telefon' onKeyUp={(e)=>setKTel(e.target.value)}/>
        <input  type='email' placeholder='E-Mail' onKeyUp={(e)=>setKMail(e.target.value)}/>
        <button onClick={kontakteHinzu}>Hinzufügen</button>
    </div>
    <div>
        <table>
            <tr>
                <th>Vorname</th>
                <th>Nachname</th>
                <th>Telefon</th>
                <th>Email</th>
            </tr>
            {
                kunUndKon.map(
                    (zeile)=>{
                        return <>
                            <KontaktInfo zeile={zeile} 
                            />
                        </>
                    }
                )
            }
        </table>
        <button onClick={()=>kundenUndKontakte()} >Aktualisiern</button> 
    </div>
    </>
  )
}

