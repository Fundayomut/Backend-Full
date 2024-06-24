import React, { useState, useEffect } from "react";
import { ObjektAntwort, TextAntwort } from "./ServerCom";

export default function BewertungZeile({daten}) {
  const [sterne, setSterne] = useState("");
  const [kunNr, setKunNr] = useState();
  const [artNr, setArtNr] = useState();
  const [bewNr, setBewNr] = useState();
  const [status, setStatus] = useState(false);

  useEffect(()=>{
    setKunNr(daten.KundenNr);
    setArtNr(daten.ArtikelNr);
    setBewNr(daten.BewNr);
    setSterne(daten.Sterne);
  },[]);

  const bearbeiten=()=>{
    TextAntwort(
        `/bewertung/update/${bewNr}/${kunNr}/${artNr}/${sterne}`
        ,
        (antwort)=>{
            console.log("bew bearbeiten antwort",antwort);
            setStatus(false);
        },
        (fehler)=>{
            console.log("Bearbeiten fehler",fehler);
        }
    )
}

const HandleStatusTrue=()=>{
    setStatus(true);
}

const handleDelete=()=>{
    ObjektAntwort(
        `/bewertung/entfernen/${bewNr}`,
        (antwort)=>{
            console.log(antwort)
        },
        (fehler)=>{
            console.log(fehler)
        }
    )
}


  return (
    <>
      {!status ? (
        <tr>
          <td style={{ border: "1px solid black" }}>{bewNr}</td>
          <td style={{ border: "1px solid black" }}>{kunNr}</td>
          <td style={{ border: "1px solid black" }}>{artNr}</td>
          <td style={{ border: "1px solid black" }}>{sterne}</td>
          <td><button onClick={() => HandleStatusTrue()}>bearbeiten</button></td>
          <td><button onClick={() => handleDelete()}>Entfernen</button></td>
        </tr>
      ) : (
        <tr>
          <td>{bewNr}</td>
          <td>{kunNr}</td>
          <td>{artNr}</td>
          <td><input type="number" value={sterne} onChange={(e) => {setSterne(e.target.value);}}/></td>
          <td><button onClick={()=>bearbeiten()}>Ändern</button></td>
          <td><button onClick={()=>handleDelete()}>Entfernen</button></td>
        </tr>
      )}
    </>
  );
}
