import React, {useState, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import { AuthKontext } from "./AnmeldeSteuerung";
import "./login.css";

export default function Login()
{
    // States für Benutzername und Kennwort-Felder
    const [benutzer, setBenutzer] = useState("");
    const [kennwort, setKennwort] = useState("");
    // Wenn ein erfolgreicher Login statt findet, wird
    // die gesamte Seite mit useNavigate neugeladen und
    // dabei der neue Inhalt (die eingeloggte Seite)
    // angezeigt.
    const Steuerung = useNavigate(); // window.location.href...
    // Diese Unterfunktion von AnmeldeSteuerung wird benötigt,
    // um den Login-Status zu setzen.
    const {login} = useContext(AuthKontext);

    function AnmeldungsVersuch(ereignisObjekt)
    {
        // Wird das direkte Senden des Formulars an den Server
        // verhindert, damit die Daten an dieser Stelle selbst
        // verarbeitet werden können.
        ereignisObjekt.preventDefault();
        // *** //
        // Die eingegebenen Werte in den beiden Feldern werden
        // in den localStorage hochgeladen.
        localStorage.setItem("user", benutzer);
        localStorage.setItem("pass", kennwort);
        // *** //
        // Nachdem der Logindaten eingegeben wurden sind,
        // wird der login-Status abgefragt.
        login();
        // Die Startseite wird neugeladen
        Steuerung("/");
    }

    return (
        <div className = "loginbox">
            <h3>Bitte anmelden</h3>
            <form onSubmit={(e)=>AnmeldungsVersuch(e)}>
                <div>Benutzername:</div>
                <input
                    type = "text"
                    placeholder = "Bitte Benutzername eintippen..."
                    onChange={(e) => setBenutzer(e.target.value)}
                    onKeyUp={(e) => setBenutzer(e.target.value)}
                />
                <div>Kennwort:</div>
                <input
                    type = "text"
                    placeholder = "Bitte Kennwort eintippen..."
                    onChange={(e) => setKennwort(e.target.value)}
                    onKeyUp={(e) => setKennwort(e.target.value)}
                />
                <div style = {{
                    display: "flex",
                    justifyContent: "flex-end"
                }}>
                    <button type = "submit">Anmelden</button>
                </div>
            </form>
            <div style = {{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between"
            }}>
                <Link to = "/neuesKonto">Neues Konto</Link>
                <Link to = "/kwVergessen">Kennwort vergessen?</Link>
            </div>
        </div>
    );
}