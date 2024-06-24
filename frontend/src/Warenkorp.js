import React, { useEffect, useState } from "react";
import WarenkopZeile from "./WarenkopZeile";

export default function Warenkorp() {
  const [warenkorb, setWarenkorp] = useState([]);

  useEffect(() => {
    const leseWarenkorb = JSON.parse(localStorage.getItem("warenkorb"));
    setWarenkorp(leseWarenkorb);
  }, []);

const deleteItem=(id)=>{
  const neuWarenkorp= warenkorb.filter((item)=>item.id !== id);
  localStorage.setItem("warenkorb",JSON.stringify(neuWarenkorp));
  setWarenkorp(neuWarenkorp);
};




  return (
    <div>
     {/*<p>warenkorp</p>*/}
      <ul>
       {warenkorb.length >0 ?(
        warenkorb.map((zeile)=>{
          return(
            <>
            <WarenkopZeile 
            daten={zeile}
            delItem={()=>deleteItem(zeile.id)}
            />
            </>
          )
        })
       ):("")}
      </ul>
    </div>
  );
}
