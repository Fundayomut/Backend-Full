import React, { createContext, useState } from "react";
import {ObjektAntwort} from "./ServerCom";

/*
    Diese Komponente organisiert das Anmelden und Abmelden.
*/

// Neue Inhaltobjekt erstellt
const AuthKontext = createContext();

// Prüfen ob eine gültige Login vorhanden ist
const AuthDienst = ({children}) => {

    // Hat sich ein Benutzer erfolgreich angemeldet?
    // ja = true, nein = false
    const [istAuthentifiziert, setzeAuthentification] = useState(false);
    const [kontoTypWert, setzekontoTypWert] = useState(0);
    const[kundeId,setKundeID]=useState();

    function login()
    {
            // Aus dem Login.js, die beiden Eingabefelder für Benutzername
            // und Kennwort, werden im localStorage gespeichert und hier
            // ausgelesen, damit die Daten an den Server geschickt werden
            // können, um zu überprüfen, ob der Benutzer im System
            // registrierst ist!
            const benutzer = localStorage.getItem("user");
            const kennwort = localStorage.getItem("pass");
            // *** //
            ObjektAntwort(
                `/login/${benutzer}/${kennwort}`,
                (antwort) =>
                {
                    if(typeof antwort === "object")
                    {
                        if(antwort.ak !== undefined && antwort.id !== undefined)
                        {
                            localStorage.setItem(`userid`, antwort.id);
                            localStorage.setItem(`autkey`, antwort.ak);
                            localStorage.setItem(`kontot`, antwort.kt);
                            localStorage.setItem(`vnname`, antwort.nm);
                            // *** //
                            setzeAuthentification(true);
                            // *** //
                            setzekontoTypWert(Number(antwort.kt));
                            setKundeID(Number(antwort.id));
                        }
                    }
                },
                (fehler) => console.error(fehler)
            );
    }

    function logout()
    {
        setzeAuthentification(false);
        setzekontoTypWert(0);
        localStorage.setItem(`userid`, '');
        localStorage.setItem(`autkey`, '');
        localStorage.setItem(`kontot`, '');
        localStorage.setItem(`vnname`, '');
        localStorage.setItem(`user`, '');
        localStorage.setItem(`pass`, '');
    }

    /*
        Alle Seiten die aufgerufen werden, werden automatisch an dieser
        Stelle neugeladen
    */






    return(
        <AuthKontext.Provider value={{istAuthentifiziert, kontoTypWert, login, logout , kundeId}}>
            {children}
        </AuthKontext.Provider>
    )
};

export {AuthKontext, AuthDienst};