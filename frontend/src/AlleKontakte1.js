import React, { useEffect, useState } from 'react'
import { TextAntwort,ObjektAntwort } from './ServerCom';
import KundeKontakt from './KundeKontakt';


export default function AlleKontakte1 () {
    const[kunListe,setKunListe]=useState([]);
    const[ktel,setKTel]=useState();
    const[kMail,setKMail]=useState();
    const[kunNumber,setKunNumber]=useState();
    const[kunUndKont,setKunUndKont]=useState([]);
    const[KVName,setKVname]=useState();
    const[KNName,setKNName]=useState();
    const[kontaktNr,setKontaktNr]=useState();
    const[status,setStatus]=useState();
   
    
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

    useEffect(() => {
        alleKunden();
        kundenUndKontakte();
    }, []);

    

function kontakteHinzu(){
    TextAntwort(
        `/kontakt/neu/${kunNumber}/${ktel}/${kMail}`
        ,
        (antwort)=>{
            console.log("alle kontakt---> kontakt hinzu",antwort);
            kundenUndKontakte();
        },
        (fehler)=>{
            console.log("alle kuontakte--->fehler",fehler);
        }
    );
}

function kundenUndKontakte(){
    ObjektAntwort(
        `/kontakte/kunden/alle`,
        (antwort)=>{
            setKunUndKont(antwort);
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
            setStatus(false);
            kundenUndKontakte();
        },
        (fehler)=>{
            console.log(fehler);
        }
    );
}
const handleStatusTrue=()=>{
    setStatus(true);
}

const handleDelete=(zeile)=>{
    TextAntwort(
      `/kontakt/entfernen/${kontaktNr}`,
      (antwort)=>{
        console.log("alleadressedeleteantwort",antwort);
        kundenUndKontakte();
      },
      (fehler)=>{
        console.log(fehler);
      }
    );
  }

  const handleEdit = (zeile) => {
    setKontaktNr(zeile.KontaktNr);
    setKunNumber(zeile.KundenNr); 
    setKTel(zeile.Telefon); 
    setKMail(zeile.EMail);
    setStatus(true);
  };

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
          <th style={{border:"1px solid" }}>Vorname</th>
          <th style={{border:"1px solid" }}>Nachname</th>
          <th style={{border:"1px solid" }}>Telefon</th>
          <th style={{border:"1px solid" }}>EMail</th>
        </tr> 
        {kunUndKont.map((zeile) => (
              <tr key={zeile.KontaktNr}>
                <td>{zeile.Vorname}</td>
                <td>{zeile.Nachname}</td>
                <td>
                  {!status ? (
                    zeile.Telefon
                  ) : (
                    <input
                      type="number"
                      value={ktel}
                      onChange={(e) => setKTel(e.target.value)} 
                    />
                  )}
                </td>
                <td>
                  {!status ? (
                    zeile.EMail
                  ) : (
                    <input
                      type="email"
                      value={kMail}
                      onChange={(e) => setKMail(e.target.value)}
                    />
                  )}
                </td>
                <td>
                  {!status || kontaktNr !== zeile.KontaktNr ? (
                    <>
                      <button onClick={() => handleEdit(zeile)}>Bearbeiten</button>
                      <button onClick={() => handleDelete(zeile.KontaktNr)}>Entfernen</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => bearbeiten()}>Speichern</button> 
                      <button onClick={() => setStatus(false)}>Abbrechen</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
      </table>
      <button onClick={() => kundenUndKontakte()}>aktualisieren</button>
      <div>
        <KundeKontakt />
      </div>
        </div>
        </>
      )
    }