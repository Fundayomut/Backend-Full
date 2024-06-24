import React, { useState, useEffect } from "react";
import { ObjektAntwort } from "./ServerCom";
import { TextAntwort } from './ServerCom';


function ArtikelZeile({ ANr, Art, Prs }) {

const [artikelNr,SetArtikelNr]=useState();
const [artikelName,SetArtikelName]=useState();
const [artikelPreis,SetArtikelPreis]=useState();
const [status,setStatus]=useState(false);


const bearbeiten=()=>{
    TextAntwort(
        `/artikel/update/${artikelNr}/${artikelName}/${artikelPreis}`,
        (antwort)=>{
            console.log(antwort);
            setStatus(false);
        },
        (fehler)=>{
            console.log(fehler);
        }       
    )
}

const handleDelete=()=>{
  ObjektAntwort(
    `/artikel/entfernen/${artikelNr}`,
    (antwort)=>{
      console.log(antwort)
    },
    (fehler)=>{
      console.log("entfernen fehler",fehler)
    }
  )
}

useEffect(
    () => {
        SetArtikelNr(ANr);
        SetArtikelName(Art);
        SetArtikelPreis(Prs);
    },
    [ANr,Art,Prs]
);

const HandleStatusTrue=()=>{
    setStatus(true);
}

  return (
    <>
    {!status ?(
        <tr>
        <td>{artikelNr}</td>
        <td>{artikelName}</td>
        <td>{artikelPreis}</td>
        <td><button onClick={HandleStatusTrue}>bearbeiten</button></td>
        <td><button onClick={handleDelete}>Delete</button></td>
      </tr>
    ):
    (
        <tr>
        <td>{ANr}</td>
        <td><input type="text" value={artikelName} onChange={(e)=>{SetArtikelName(e.target.value)}}/></td>
        <td><input type="number" value={artikelPreis} onChange={(e)=>{SetArtikelPreis(e.target.value)}}/></td>
        <td><button onClick={()=>bearbeiten()}>Andern</button></td>
        </tr>
    )}
   </>
  );
}


export default function AlleArtikel() 
{
const [alleArt, SetAlleArt] = useState([]);
const handleArtikel=()=>{
 
   SetAlleArt([]); 
    ObjektAntwort(
        "/artikel/abruf/alle",
        (antwort) => {
          console.log(antwort);
          SetAlleArt(antwort);
        },
        (fehler) => {
          console.log("fehler--->", fehler);
        }
      );
}

  useEffect(
    () => {
handleArtikel();
  },
   []
);

  return (
    <>
    <h1>Alle artikel</h1>
      <table>
        <tr>
          <th>ArtikelNr</th>
          <th>ArtikelName</th>
          <th>ArtikelPreis</th>
        </tr>
      {
      alleArt.map(
        (zeile) => {
        return (<>
            <ArtikelZeile
              ANr={zeile.ArtikelNr}
              Art={zeile.ArtikelName}
              Prs={zeile.ArtikelPreis}
            />
          </>);
      }
    )
      }
      </table>
      <button onClick={()=>handleArtikel()} >Aktualisiern</button>
    </>
  );
}
