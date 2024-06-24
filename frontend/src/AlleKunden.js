import React, { useState, useEffect } from "react";
import { ObjektAntwort, TextAntwort } from "./ServerCom";

function KundenZeile({ KNr, Ben, Kwt, Ktp, Vnm, Nnm }) {
  const [status, neuStatus] = useState(false);
  const [kundenNr, setKundenNr] = useState();
  const [benutzer, setBenutzer] = useState();
  const [kennwort, setKennwort] = useState();
  const [kontotyp, setKontotyp] = useState();
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");

    useEffect(
        () => {
            console.log("test:",KNr);
            setKundenNr(KNr);
            setBenutzer(Ben);
            setKennwort(Kwt);
            setKontotyp(Ktp);
            setVorname(Vnm);
            setNachname(Nnm);
        }, []
    );

    function speichern()
    {
        neuStatus(false);
        TextAntwort(
            "",
            (antwort)=>{
                neuStatus(false);
            },
            (fehler)=>{}
        )
    }
    const handleDelete = () => {
        console.log(`/kunde/entfernen/${kundenNr}`);
       TextAntwort(
          `/kunde/entfernen/${kundenNr}`,
          (antwort) => {
            console.log(antwort);
          },
          (fehler) => {
            console.log("entfernen fehler", fehler);
          }
        );
      };
    
  return (
    <>
      {status === false ? (
        <tr>
          <td>{kundenNr}</td>
          <td>{benutzer}</td>
          <td>{kennwort}</td>
          <td>{kontotyp}</td>
          <td>{vorname}</td>
          <td>{nachname}</td>
          <td><button onClick={()=>neuStatus(true)}>Bearbeiten</button></td>
          <td><button onClick={handleDelete}>Delete</button></td>
        </tr>
      ) : (
        <tr>
          <td>{kundenNr}</td>
          <td><input placeholder="Benutzer" type = "text"  onKeyUp={(e)=>setBenutzer(e.target.value)} /></td>
          <td>{Kwt}</td>
          <td><input type = "text" placeholder="Kennwort" onKeyUp={(e)=>setKennwort(e.target.value)} /></td>
          <td>{Ktp}</td>
          <td><input type = "number" placeholder="KontoType"  onKeyUp={(e)=>setKontotyp(e.target.value)} /></td>
          <td>{Vnm}</td>
          <td><input type = "text" placeholder="Vorname"  onKeyUp={(e)=>setVorname(e.target.value)} /></td>
          <td>{Nnm}</td>
          <td><input type = "text" placeholder="Nachname"  onKeyUp={(e)=>setNachname(e.target.value)} /></td>
          <td><button onClick={()=>speichern()}>Ändnern</button></td>
        </tr>
      )}
    </>
  );
}

export default function AlleKunden() {
  const [hallo, setHallo] = useState("");
  const [alleK, setAlleK] = useState([]);


  useEffect(() => {
    ObjektAntwort(
      // Die Route
      "/kunde/abruf/alle",
      // Beim Erfolg, ...
      (antwort) => {
        setAlleK(antwort);
      },
      // Beim Fehler, ...
      (fehler) => {
        console.log(fehler);
      }
    );

    TextAntwort(
      // Die Route
      "/",
      // Beim Erfolg, ...
      (antwort) => {
        setHallo(antwort);
      },
      // Beim Fehler, ...
      (fehler) => {
        console.log(fehler);
      }
    );
  }, []);

  const handleKunden = () => {
    setAlleK([]);
    ObjektAntwort(
      "/kunde/abruf/alle",
      (antwort) => {
        console.log(antwort);
        setAlleK(antwort);
      },
      (fehler) => {
        console.log("fehler--->", fehler);
      }
    );
  };

  useEffect(() => {
    handleKunden();
  }, []);

  return (
    <>
      <hr />
      <table>
        <tr>
          <th>KundenNr</th>
          <th>Benutzer</th>
          <th>Passwort</th>
          <th>Konto</th>
          <th>Vorname</th>
          <th>Nachname</th>
        </tr>
        {alleK.map((Zeile) => {
          return (
            <>
                <KundenZeile
                  KNr={Zeile.KundenNr}
                  Ben={Zeile.Benutzer}
                  Kwt={Zeile.Kennwort}
                  Ktp={Zeile.KontoTyp}
                  Vnm={Zeile.Vorname}
                  Nnm={Zeile.Nachname}
                />
          
            </>
          );
        })}
      </table>
      <button onClick={() => handleKunden()}>Aktualisiern</button>
    </>
  );
}
