import React, { createContext, useContext, useEffect, useState } from "react";
//import AlleKunden from "./AlleKunden";
//import AlleArtikel from "./AlleArtikel";
//import ArtikelHinzufügen from "./ArtikelHinzufügen";
//import MeineKundenAuswahl from "./MeineKundenAuswahl";
//import KundenHistorie from "./KundenHistorie";
//import BestimteKunden from "./BestimteKunden";
//import BestimmteKHistorie from "./BestimmteKHistorie";
//import BestimmteArtikel from "./BestimmteArtikel";
//import Bewertung from "./Bewertung";
//import AdressenHinzufügen from "./AdressenHinzufügen";
//import AlleKontakte1 from "./AlleKontakte1";
//import Bestellungen from "./Bestellungen";
//import BestellungDetails from "./BestellungDetails";
import Home from "./Home";
import Kontakt from "./Kontakt";
import Login from "./Login";
import Artikel from "./Artikel";
import Shoppen from "./Shoppen";
import Warenkorp from "./Warenkorp";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { AuthKontext, AuthDienst } from "./AnmeldeSteuerung";
import Eintstellungen from "./Eintstellungen";
import { Bestellung } from "./Bestellung";

function App() {
  const { istAuthentifiziert, kontoTypWert, logout } = useContext(AuthKontext);

  return (
    <>
      {/*<div className="App">
     <AlleArtikel/>
      <ArtikelHinzufügen/>
      <AlleKunden />
      <MeineKundenAuswahl/>
      <KundenHistorie/>
      <BestimteKunden/>
      <BestimmteKHistorie/>
      <BestimmteArtikel/>
      <Bewertung/>
      <AdressenHinzufügen/>
      <AlleKontakte1/>
      <Bestellungen />
      <BestellungDetails/>
    </div>*/}
      <div>
        <Router>
          <div>
            {
              /* Soll ein Menü erscheinen oder nicht?
               * Das Menü erscheint nur, wenn man eingeloggt ist! */
              istAuthentifiziert === true && kontoTypWert === 0 ? (
                <header>
                  <nav>
                    <div className="navleftdiv">
                      <ul>
                        <li>
                          <Link to="/Shoppen">Shoppen</Link>
                        </li>
                        <li>
                          <Link to="/Warenkorp">Warenkorp</Link>
                        </li>
                        <li><Link to="/Bestellung">Bestellungen</Link></li>
                        <li>
                          <Link to="/Eintstellungen">Einstellungen</Link>
                        </li>
                        <li><Link to="/Kontakt">Kontakt</Link></li>
                      </ul>
                    </div>
                    <div className="navrightdiv">
                      <p>
                        <button onClick={() => logout()}>Abmelden</button>
                      </p>
                    </div>
                  </nav>
                </header>
              ) : istAuthentifiziert === true && kontoTypWert === 1 ? (
                <header>
                  <nav>
                    <div className="navleftdiv">
                      <ul>
                        <li>
                          <Link to="/">Überschit</Link>
                        </li>
                        <li>
                          <Link to="/Kontakt">Kunden</Link>
                        </li>
                        <li><Link to="/Artikel">Artikel</Link></li>
                        <li>Bestellungen</li>
                        <li>
                          <Link to="/Eintstellungen">Eintstellungen</Link>
                        </li>
                        <li>Kontakt</li>
                      </ul>
                    </div>
                    <div className="navrightdiv">
                      <p>
                        <button onClick={() => logout()}>Abmelden</button>
                      </p>
                    </div>
                  </nav>
                </header>
              ) : (
                ""
              )
            }
            {/* Welcher Inhalt wird angezeigt? */}

            <main>
              <Routes>
                <Route path="/" element={
                    istAuthentifiziert === true && kontoTypWert === 0 ? (
                      <Home />
                    ) : istAuthentifiziert === true && kontoTypWert === 1 ? (
                      <Home />
                    ) : (
                      <Navigate to="/Login" />
                    )
                  }
                />
                <Route path="/Kontakt" element={
                  istAuthentifiziert ? <Kontakt /> : <Navigate to="/Login" />
                  }
                />
                <Route path="/Login" element={<Login />} />
                <Route path="/Eintstellungen" element={ istAuthentifiziert ? 
                (<Eintstellungen />                  
                ) : 
                (<Navigate to="/Login" />)
                  }
                />
                <Route path="/Artikel" element={istAuthentifiziert === true && kontoTypWert === 1 ? (
                  <Artikel/>
                ):(<Navigate to="/Home"/>)}/>
                <Route path="/Shoppen" element={istAuthentifiziert === true && kontoTypWert === 0 ? (
                  <Shoppen/>
                ):(<Navigate to="/Home"/>)}/>
                <Route path="/Warenkorp" element={istAuthentifiziert === true && kontoTypWert === 0 ? (
                  <Warenkorp/>
                ):(<Navigate to="/Home"/>)}/>
                <Route path="/Bestellung" element={istAuthentifiziert === true && kontoTypWert === 0 ? (
                  <Bestellung/>
                ):(<Navigate to="/Home"/>)}/>
              </Routes>
            </main>
          </div>
        </Router>
      </div>
    </>
  );
}

function AppKontrolle() {
  return (
    <AuthDienst>
      <App />
    </AuthDienst>
  );
}

export default AppKontrolle;
