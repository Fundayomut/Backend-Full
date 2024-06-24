// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// Server-Modul wird geladen
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

const express = require("express");

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// Aus dem Server-Modul wird ein Programminstanz erzeugt
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

const app = express();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// Zugriffskontrolle-Modul wird geladen
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

const cors = require("cors");

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// Das Programminstanz aktiviert die Zugriffskontrolle
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

app.use(cors());

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// Portnummer zur Kommunikation mit dem Server definieren
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

const Portnummer = 4000;  //                             -->     http://localhost:4000/

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// Datenbank-Modul wird geladen
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

const sqlite3 = require("sqlite3");

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// Verbindung zum Datenbank erstellen
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

let db = new sqlite3.Database(
    "./datenbank.db", // Datenbank-Datei
    (fehler) => {     // Callback-Funktion gibt Statusinformation
        if(fehler)
            console.error(fehler.message);
        else
            console.log("Verbindung zum Datenbank hergestellt :-)");
    }
);


function neueAK()
{
    return "";
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// Die Startseite ist Root. Der Root wird mit einem / definiert
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

app.get(
    "/", // Route, Pfad
    (anfrage, antwort) => { // Callback-Funktion die aufgerufen wird, wenn die Route angefragt wird...
        antwort.send("Hallo Welt");
    }
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// Neue Kunde hinzufügen
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

app.get(
    "/kunde/neu/:b/:k/:t/:v/:n",
    (anfrage, antwort) =>
    {
        db.run(
            `
                INSERT INTO KundenStamm
                ( Benutzer, Kennwort, KontoTyp, Vorname, Nachname )
                VALUES
                (
                    '${anfrage.params.b}',
                    '${anfrage.params.k}',
                    '${anfrage.params.t}',
                    '${anfrage.params.v}',
                    '${anfrage.params.n}'
                 );
            `,
            (fehler) => console.error(fehler)
        );
        // *** //
        antwort.send("Kunde hinzugefügt.");
    }
);

//- - - - - - - Kunden abruf alle- - - - - - - - - - - - //

app.get(
    "/kunde/abruf/alle",
    (anfrage,antwort)=>{
        db.all(
            `
            SELECT * FROM KundenStamm
            `,
            (fehler,zeilen)=>{
                if(fehler)
                    {
                        console.error(fehler);
                        antwort.send("[]");
                    }
                    else
                    {
                        antwort.send(JSON.stringify(zeilen));
                    }
            }
        );
    }
);




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// Bestehende Kunde aktualisieren
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

app.get(
    "/kunde/update/:i/:b/:k/:t/:v/:n",
    (anfrage, antwort) => {
        db.run(
            `
                UPDATE KundenStamm SET
                    Benutzer = '${anfrage.params.b}',
                    Kennwort = '${anfrage.params.k}',
                    KontoTyp = '${anfrage.params.t}',
                    Vorname = '${anfrage.params.v}',
                    Nachname = '${anfrage.params.n}'
                WHERE
                    KundenNr = '${anfrage.params.i}'
            `
        );
        // *** //
        antwort.send("Kunde aktualisiert");
    }
);


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// Bestehende Kunde löschen
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

app.get(
    "/kunde/entfernen/:i",
    (anfrage, antwort) => {
        db.run(
            `
                DELETE FROM
                    KundenStamm
                WHERE
                    KundenNr = '${anfrage.params.i}'
            `
        );
        // *** //
        antwort.send("Kunde entfernt");
    }
);


app.get(
    "/artikel/neu/:a/:p",
    (anfrage, antwort) =>
    {
        db.run(
            `
                INSERT INTO ArtikelStamm
                (ArtikelName, ArtikelPreis)
                VALUES
                (
                    '${anfrage.params.a}',
                    '${anfrage.params.p}'
                 );
            `,
            (fehler) => console.error(fehler)
        );
        // *** //
        antwort.send("artikel hinzugefügt.");
    }
);

app.get(
    "/artikel/abruf/alle",
    (anfrage,antwort)=>{
        db.all(
            `
            SELECT * FROM ArtikelStamm
            `,
            (fehler,zeilen)=>{
                if(fehler)
                    {
                        console.error(fehler);
                        antwort.send("[]");
                    }
                    else
                    {
                        antwort.send(JSON.stringify(zeilen));
                    }
            }
        );
    }
);

app.get(
    "/artikel/update/:i/:a/:p",
    (anfrage, antwort) => {
        db.run(
            `
                UPDATE ArtikelStamm SET
                    ArtikelName = '${anfrage.params.a}',
                    ArtikelPreis = '${anfrage.params.p}'
                WHERE
                    ArtikelNr = '${anfrage.params.i}'
            `
        );
        // *** //
        antwort.send("Artikel aktualisiert");
    }
);

app.get(
    "/artikel/entfernen/:i",
    (anfrage, antwort) => {
        db.run(
            `
                DELETE FROM
                    ArtikelStamm
                WHERE
                    ArtikelNr = '${anfrage.params.i}'
            `
        );
        // *** //
        antwort.send("Artikel entfernt");
    }
);



app.get (
    "/khistorie/neu/:knr/:anr/:m/:d",
    (anfrage, antwort) => 
        {
        db.run(
            `
        INSERT INTO KuundenHistorie
        (KundenNr,ArtikelNr,Menge,Datum)
        VALUES
        (
        '${anfrage.params.knr}',
        '${anfrage.params.anr}',
        '${anfrage.params.m}',
        '${anfrage.params.d}'
        );
            `,
            (fehler) => console.log(fehler)
        );
        antwort.send("KundenHistorie hinzugefügt");
    }
);

app.get(
    "/khistorie/abruf/alle",
    (anfrage,antwort)=>{
        db.all(
            `
            SELECT * FROM KuundenHistorie
            `,
            (fehler,zeilen)=>{
                if(fehler)
                    {
                        console.error(fehler);
                        antwort.send("[]");
                    }
                    else
                    {
                        antwort.send(JSON.stringify(zeilen));
                    }
            }
        );
    }
);

app.get (
"/khistorie/update/:nr/:knr/:anr/:m/:d",
(anfrage,antwort) => {
    db.run(
        `
        UPDATE KuundenHistorie SET
             KundenNr='${anfrage.params.knr}',
             ArtikelNr='${anfrage.params.anr}',
             Menge='${anfrage.params.m}',
             Datum='${anfrage.params.d}'
        WHERE 
             KuHiNr= '${anfrage.params.nr}'
        `
    );
    antwort.send("KundenHistorie Update");
}
);


app.get (
    "/khistorie/entfernen/:i",
    (anfrage,antwort) => {
        db.run(
            `
            DELETE FROM 
            KuundenHistorie
            WHERE 
            KuHiNr = '${anfrage.params.i}'
            `
        );
        antwort.send("KundenHistorie Entfernen")
    }
);

app.get (
    "/bewertung/neu/:knr/:anr/:sterne",
    (anfrage,antwort)=>{
        db.run(
            `
            INSERT INTO Bewertungen
            (KundenNr,ArtikelNr,Sterne)
            VALUES( 
           '${anfrage.params.knr}',
           '${anfrage.params.anr}',
           '${anfrage.params.sterne}'
        );
            `,
            (fehler) => console.log(fehler)
        );
        antwort.send("Bewertund Hinzugefügt")
    }
);

app.get (
    "/bewertung/update/:nr/:knr/:anr/:sterne",
    (anfrage,antwort)=>{
        db.run(
            `
            UPDATE Bewertungen SET
            KundenNr='${anfrage.params.knr}',
            ArtikelNr='${anfrage.params.anr}',
            Sterne='${anfrage.params.sterne}'

            WHERE 
            BewNr='${anfrage.params.nr}'
            `
        );
        antwort.send("Berwertung Update")
    }
);

app.get (
    "/bewertung/entfernen/:nr",
    (anfrage,antwort)=>{
    db.run(
        `
        DELETE FROM 
            Bewertungen
        WHERE
            BewNr='${anfrage.params.nr}'
        `
    );
    antwort.send("Bewertung Entfernen");
}
);


app.get (
    "/adresse/neu/:knr/:adr/:plz/:ort",
    (anfrage,antwort)=>{
        db.run(
        `
        INSERT INTO Adressen
        (Kundennr,Adresse,PLZ,Ort)
        VALUES(
        '${anfrage.params.knr}',
        '${anfrage.params.adr}',
        '${anfrage.params.plz}',
        '${anfrage.params.ort}'
    );
        `,
        (fehler)=> console.log(fehler)
    );
        antwort.send("Adresse Hinzugefügt");
    }
);

app.get(
    "/adresse/update/:nr/:knr/:adr/:plz/:ort",
    (anfrage,antwort)=>{
    db.run(
        `
        UPDATE Adressen SET
        KundenNr='${anfrage.params.knr}',
        Adresse='${anfrage.params.adr}',
        Plz='${anfrage.params.plz}',
        Ort='${anfrage.params.ort}'
        WHERE 
        AdressNr='${anfrage.params.nr}'
        `,
        (fehler)=>console.log(fehler)
    );
    antwort.send("Adresse Update");
}
);

app.get(
    "/adresse/entfernen/:nr",
    (anfrage,antwort)=>{
        db.run(
            `
            DELETE FROM 
            Adressen
            WHERE 
            AdressNr= '${anfrage.params.nr}'
            `,
            (fehler)=>console.log(fehler)
        );
        antwort.send("Adresse Entfernen")
    }
);

app.get(
    "/kontakt/neu/:knr/:t/:e",
    (anfrage,antwort)=>{
        db.run(
            `
            INSERT INTO Kontakte
            (KundenNr,Telefon,Email)
            VALUES
            (
            '${anfrage.params.knr}',
            '${anfrage.params.t}',
            '${anfrage.params.e}'
            );
            `,
            (fehler)=>console.log(fehler)
        );
        antwort.send("Kontakt Hizufügen")
    }
);

app.get(
    "/kontakt/update/:nr/:knr/:t/:e",
    (anfrage,antwort)=>{
    db.run(
        `
        UPDATE Kontakte SET
        KundenNr='${anfrage.params.knr}',
        Telefon='${anfrage.params.t}',
        EMail='${anfrage.params.e}'
        WHERE 
        KontaktNr='${anfrage.params.nr}'
        `,
        (fehler)=>console.log(fehler)
    );
    antwort.send("Kontakte Update");
}
);

app.get(
    "/kontakt/entfernen/:nr",
    (anfrage,antwort)=>{
        db.run(
            `
            DELETE FROM 
            Kontakte
            WHERE 
            KontaktNr= '${anfrage.params.nr}'
            `
        );
        antwort.send("Kontakt Entfernen");
    }
);
app.get(
    "/bestellung/neu/:knr/:n/:m/:b/:s/:d",
    (anfrage,antwort)=>{
        db.run(
            `
            INSERT INTO Bestellungen
            (KundenNr,GNetto,MwSt,GBrutto,Stand,Datum)
            VALUES
            (
            '${anfrage.params.knr}',
            '${anfrage.params.n}',
            '${anfrage.params.m}',
            '${anfrage.params.b}',
            '${anfrage.params.s}',
            '${anfrage.params.d}'
            );
            `,
            (fehler)=>console.log(fehler)
        );
        antwort.send("Bestellungen Hizufügen")
    }
);

app.get(
    "/bestellung/update/:nr/:knr/:n/:m/:b/:s/:d",
    (anfrage,antwort)=>{
    db.run(
        `
        UPDATE Bestellungen SET
        KundenNr='${anfrage.params.knr}',
        GNetto='${anfrage.params.n}',
        MwSt='${anfrage.params.m}',
        GBrutto='${anfrage.params.b}',
        Stand='${anfrage.params.s}',
        Datum='${anfrage.params.d}'
        WHERE 
        BestellNr='${anfrage.params.nr}'
        `,
        (fehler)=>console.log(fehler)
    );
    antwort.send("Bestellungen Update");
}
);

app.get(
    "/bestellung/entfernen/:nr",
    (anfrage,antwort)=>{
        db.run(
            `
            DELETE FROM 
            Bestellungen
            WHERE 
            BestellNr= '${anfrage.params.nr}'
            `
        );
        antwort.send("Bestellungen Entfernen");
    }
);

app.get(
    "/bestdetail/neu/:bnr/:knr/:anr/:m",
    (anfrage,antwort)=>{
        db.run(
            `
            INSERT INTO BestellungsDetails
            (BestellNr,KundenNr,ArtikelNr,Menge)
            VALUES
            (
            '${anfrage.params.bnr}',
            '${anfrage.params.knr}',
            '${anfrage.params.anr}',
            '${anfrage.params.m}'
            );
            `,
            (fehler)=>console.log(fehler)
        );
        antwort.send("BestellungsDetails Hizufügen")
    }
);

app.get(
    "/bestdetail/update/:nr/:bnr/:knr/:anr/:m",
    (anfrage,antwort)=>{
    db.run(
        `
        UPDATE BestellungsDetails SET
        BestellNr='${anfrage.params.bnr}',
        KundenNr='${anfrage.params.knr}',
        ArtikelNr='${anfrage.params.anr}',
        Menge='${anfrage.params.m}'
        WHERE 
         BestDetNr='${anfrage.params.nr}'
        `,
        (fehler)=>console.log(fehler)
    );
    antwort.send("BestellungenDetail Update");
}
);

app.get(
    "/bestdetail/entfernen/:nr",
    (anfrage,antwort)=>{
        db.run(
            `
            DELETE FROM 
            BestellungsDetails
            WHERE 
            BestDetNr= '${anfrage.params.nr}'
            `
        );
        antwort.send("BestellungsDetails Entfernen");
    }
);

app.get(
    "/kunde/alle",
    (anfrage,antwort) => {
        db.all(
            `
            SELECT * FROM KundenStamm
            `,
            (fehler,zeilen)=>{
                if(fehler)
                {
                    console.log(fehler);
                    antwort.send("[]");
                }
                else
                {
                    antwort.send ( JSON.stringify(zeilen) );
                }
            }
        );
    }
);
app.get(
    "/kunde/abruf/wer/:id",
    (anfrage,antwort) => {
        db.all(
            `
            SELECT * FROM KundenStamm
            WHERE KundenNr = '${anfrage.params.id}'
            `,
            (fehler,zeilen)=>{
                if(fehler)
                {
                    console.error(fehler);
                    antwort.send("[]");
                }
                else
                {
                    antwort.send ( JSON.stringify(zeilen) );
                }
            }
        );
    }
);
/******************************************/

app.get (
    "/artikel/alle",
    (anfrage,antwort)=>{
        db.all(
            `
            SELECT * FROM ArtikelStamm
            `
            ,
            (fehler,zeilen)=>{
                if(fehler){
                    console.error(fehler);
                    antwort.send("[]");
                }
                else
                {
                    antwort.send( JSON.stringify(zeilen));
                }
            }
        );
    }
);

app.get(
    "/artikel/abruf/wer/:id",
    (anfrage,antwort)=>{
        db.all(
            `
            SELECT * FROM ArtikelStamm
            WHERE ArtikelNr = '${anfrage.params.id}'
            `
            ,
            (fehler,zeilen)=>{
                if(fehler){
                    console.error(fehler)
                    antwort.send("[]")
                }
                else
                {
                    antwort.send(JSON.stringify(zeilen));
                }
            }
        );
    }
);
/*********************************************************/
app.get(
    "/khistorie/all",
    (anfrage,antwort)=>{
        db.all(
            `
            SELECT * FROM KuundenHistorie
            `,
            (fehler, zeilen) => {
                if(fehler){
                    console.error(fehler)
                    antwort.send('[]')
                }
                else
                {
                    antwort.send( JSON.stringify(zeilen) );
                }
            }
        );
    }
);

app.get(
    "/khistorie/kunde/:i",
    (anfrage,antwort)=>{
        db.all(
            `
            SELECT * FROM KuundenHistorie
            WHERE KundenNr='${anfrage.params.i}'
            `,
            (fehler,zeile)=>{
                if(fehler){
                    console.error(fehler)
                    antwort.send("[]")
                }
                else
                {
                    antwort.send( JSON.stringify(zeile) );
                }
            }
        );
    }
);
app.get(
    "/khistorie/artikel/:i",
    (anfrage,antwort)=>{
        db.all(
            `
            SELECT * FROM KuundenHistorie
            WHERE ArtikelNr='${anfrage.params.i}'
            `,
            (fehler,zeile)=>{
                if(fehler){
                    console.error(fehler)
                    antwort.send("[]")
                }
                else
                {
                    antwort.send( JSON.stringify(zeile) );
                }
            }
        );
    }
);
/*******************************************/
app.get(
    "/bewertung/all",
    (anfrage,antwort)=>{
        db.all(
            `
            SELECT * FROM Bewertungen
            `,
            (fehler, zeilen) => {
                if(fehler){
                    console.error(fehler)
                    antwort.send('[]')
                }
                else
                {
                    antwort.send( JSON.stringify(zeilen) );
                }
            }
        );
    }
);

app.get(
    "/bewertung/kunde/:i",
    (anfrage,antwort)=>{
        db.all(
            `
            SELECT * FROM Bewertungen
            WHERE KundenNr='${anfrage.params.i}'
            `,
            (fehler,zeile)=>{
                if(fehler){
                    console.error(fehler)
                    antwort.send("[]")
                }
                else
                {
                    antwort.send( JSON.stringify(zeile) );
                }
            }
        );
    }
);
app.get(
    "/bewertung/artikel/:i",
    (anfrage,antwort)=>{
        db.all(
            `
            SELECT * FROM Bewertungen
            WHERE ArtikelNr='${anfrage.params.i}'
            `,
            (fehler,zeile)=>{
                if(fehler){
                    console.error(fehler)
                    antwort.send("[]")
                }
                else
                {
                    antwort.send( JSON.stringify(zeile) );
                }
            }
        );
    }
);
/*****************************************************************/

app.get(
    "/adresse/all",
    (anfrage,antwort)=>{
        db.all(
            `
            SELECT * FROM Adressen
            `,
            (fehler, zeilen) => {
                if(fehler){
                    console.error(fehler)
                    antwort.send('[]')
                }
                else
                {
                    antwort.send( JSON.stringify(zeilen) );
                }
            }
        );
    }
);

app.get(
    "/adresse/kunde/:i",
    (anfrage,antwort)=>{
        db.all(
            `
            SELECT * FROM Adressen
            WHERE KundenNr='${anfrage.params.i}'
            `,
            (fehler,zeile)=>{
                if(fehler){
                    console.error(fehler)
                    antwort.send("[]")
                }
                else
                {
                    antwort.send( JSON.stringify(zeile) );
                }
            }
        );
    }
);

/*************************************************/

app.get(
    "/kontakt/all",
    (anfrage,antwort)=>{
        db.all(
            `
            SELECT * FROM Kontakte
            `,
            (fehler, zeilen) => {
                if(fehler){
                    console.error(fehler)
                    antwort.send('[]')
                }
                else
                {
                    antwort.send( JSON.stringify(zeilen) );
                }
            }
        );
    }
);

app.get(
    "/kontakt/kunde/:i",
    (anfrage,antwort)=>{
        db.all(
            `
            SELECT * FROM Kontakte
            WHERE KundenNr='${anfrage.params.i}'
            `,
            (fehler,zeile)=>{
                if(fehler){
                    console.error(fehler)
                    antwort.send("[]")
                }
                else
                {
                    antwort.send( JSON.stringify(zeile) );
                }
            }
        );
    }
);

/*************************************/
app.get(
    "/bestellung/all",
    (anfrage,antwort)=>{
        db.all(
            `
            SELECT * FROM Bestellungen
            `,
            (fehler, zeilen) => {
                if(fehler){
                    console.error(fehler)
                    antwort.send('[]')
                }
                else
                {
                    antwort.send( JSON.stringify(zeilen) );
                }
            }
        );
    }
);

app.get(
    "/bestellung/dieser/:i",
    (anfrage,antwort)=>{
        db.all(
            `
            SELECT * FROM Bestellungen
            WHERE KundenNr='${anfrage.params.i}'
            `,
            (fehler,zeile)=>{
                if(fehler){
                    console.error(fehler)
                    antwort.send("[]")
                }
                else
                {
                    antwort.send( JSON.stringify(zeile) );
                }
            }
        );
    }
);

/************************************************/

app.get(
    "/bestdetail/all",
    (anfrage,antwort)=>{
        db.all(
            `
            SELECT * FROM BestellungsDetails
            `,
            (fehler, zeilen) => {
                if(fehler){
                    console.error(fehler)
                    antwort.send('[]')
                }
                else
                {
                    antwort.send( JSON.stringify(zeilen) );
                }
            }
        );
    }
);

app.get(
    "/bestdetail/dieser/:i",
    (anfrage,antwort)=>{
        db.all(
            `
            SELECT * FROM BestellungsDetails
            WHERE BestDetNr='${anfrage.params.i}'
            `,
            (fehler,zeile)=>{
                if(fehler){
                    console.error(fehler)
                    antwort.send("[]")
                }
                else
                {
                    antwort.send( JSON.stringify(zeile) );
                }
            }
        );
    }
);

app.get(
   "/kunde/abruf/wer/:id",
   (anfrage,antwort)=>{
    db.all(
        `SELECT
        KundenStamm.Vorname,KundenStamm.Nachname,
        ArtikelStamm.ArtikelName,ArtikelStamm.ArtikelPreis,
        KuundenHistorie.Menge,KuundenHistorie.Datum
        FROM KundenStamm
        INNER JOIN 
        KuundenHistorie ON KundenStamm.KundenNr=KuundenHistorie.KundenNr
        INNER JOIN 
        ArtikelStamm ON ArtikelStamm.ArtikelNr=KuundenHistroie.ArtikelNr
        WHERE KundenStamm.KundenNr='${anfrage.params.id}'
        `,
        (fehler,zeile)=>{
            if(fehler){
                console.error(fehler)
                antwort.send("[]")
            }
            else
            {
                antwort.send(JSON.stringify(zeile));
            }
        }
    )
   }
)

app.get(
    "/khistorie/abruf/kunde/:id",
    (anfrage,antwort)=>{
     db.all(
         `SELECT
         KundenStamm.Vorname,KundenStamm.Nachname,
         KuundenHistorie.Menge,KuundenHistorie.Datum,KuundenHistorie.ArtikelNr,
         KuundenHistorie.KuHiNr
         FROM KundenStamm
         INNER JOIN 
         KuundenHistorie ON KundenStamm.KundenNr=KuundenHistorie.KundenNr
         WHERE KundenStamm.KundenNr='${anfrage.params.id}'
         `,
         (fehler,zeile)=>{
             if(fehler){
                 console.error(fehler)
                 antwort.send("[]")
             }
             else
             {
                 antwort.send(JSON.stringify(zeile));
             }
         }
     )
    }
 )

 app.get(
    "/khistorie/abruf/artikel/:id",
    (anfrage,antwort)=>{
     db.all(
         `SELECT
         ArtikelStamm.ArtikelNr,ArtikelStamm.ArtikelName,ArtikelStamm.ArtikelPreis,
         KuundenHistorie.Menge,KuundenHistorie.Datum,KuundenHistorie.ArtikelNr
         FROM ArtikelStamm
         INNER JOIN 
         KuundenHistorie ON ArtikelStamm.ArtikelNr=KuundenHistorie.ArtikelNr
         WHERE ArtikelStamm.ArtikelNr='${anfrage.params.id}'
         `,
         (fehler,zeile)=>{
             if(fehler){
                 console.error(fehler)
                 antwort.send("[]")
             }
             else
             {
                 antwort.send(JSON.stringify(zeile));
             }
         }
     )
    }
 )

 app.get(
    "/bewertung/kunde2/:id",
    (anfrage,antwort)=>{
     db.all(
         `SELECT
         Bewertungen.BewNr,Bewertungen.KundenNr,Bewertungen.ArtikelNr,Bewertungen.Sterne,
         KundenStamm.KundenNr,KundenStamm.Benutzer,KundenStamm.KennWort,
         KundenStamm.KontoTyp,KundenStamm.Vorname,KundenStamm.Nachname
         FROM KundenStamm
         INNER JOIN 
         Bewertungen ON Bewertungen.KundenNr=KundenStamm.KundenNr
         WHERE Bewertungen.KundenNr='${anfrage.params.id}'
         `,
         (fehler,zeile)=>{
             if(fehler){
                 console.error(fehler)
                 antwort.send("[]")
             }
             else
             {
                 antwort.send(JSON.stringify(zeile));
             }
         }
     )
    }
 )

 app.get(
    "/bewertung/artikel2/:id",
    (anfrage,antwort)=>{
     db.all(
         `SELECT
         Bewertungen.BewNr,Bewertungen.KundenNr,Bewertungen.ArtikelNr,Bewertungen.Sterne,
         ArtikelStamm.ArtikelNr,ArtikelStamm.ArtikelName,ArtikelStamm.ArtikelPreis
         FROM ArtikelStamm
         INNER JOIN 
         Bewertungen ON Bewertungen.ArtikelNr=ArtikelStamm.ArtikelNr
         WHERE Bewertungen.ArtikelNr='${anfrage.params.id}'
         `,
         (fehler,zeile)=>{
             if(fehler){
                 console.error(fehler)
                 antwort.send("[]")
             }
             else
             {
                 antwort.send(JSON.stringify(zeile));
             }
         }
     )
    }
 )


 app.get(
    "/adresse/kunden/alle/:id",
    (anfrage,antwort)=>{
     db.all(
         `SELECT
         Adressen.AdressNr,Adressen.KundenNr,Adressen.Adresse,Adressen.PLZ,
         Adressen.Ort,
         KundenStamm.Vorname,KundenStamm.Nachname,KundenStamm.Benutzer,KundenStamm.KontoTyp
         FROM Adressen
         INNER JOIN KundenStamm ON Adressen.KundenNr=KundenStamm.KundenNr
         WHERE Adressen.KundenNr='${anfrage.params.id}'
         `,
         (fehler,zeile)=>{
             if(fehler){
                 console.error(fehler)
                 antwort.send("[]")
             }
             else
             {
                 antwort.send(JSON.stringify(zeile));
             }
         }
     )
    }
 )

 app.get(
    "/kontakte/kunden/alle",
    (anfrage,antwort)=>{
     db.all(
         `SELECT
         Kontakte.KontaktNr,Kontakte.KundenNr,Kontakte.Telefon,Kontakte.EMail,
         KundenStamm.Vorname,KundenStamm.Nachname,KundenStamm.Benutzer,KundenStamm.KontoTyp
         FROM Kontakte
         INNER JOIN KundenStamm ON Kontakte.KundenNr=KundenStamm.KundenNr
         `,
         (fehler,zeile)=>{
             if(fehler){
                 console.error(fehler)
                 antwort.send("[]")
             }
             else
             {
                 antwort.send(JSON.stringify(zeile));
             }
         }
     )
    }
 )

 app.get(
    "/kontakte/kunden/:id",
    (anfrage,antwort)=>{
     db.all(
         `SELECT
         Kontakte.KontaktNr,Kontakte.KundenNr,Kontakte.Telefon,Kontakte.EMail,
         KundenStamm.Vorname,KundenStamm.Nachname,KundenStamm.Benutzer,KundenStamm.KontoTyp
         FROM Kontakte
         INNER JOIN KundenStamm ON Kontakte.KundenNr=KundenStamm.KundenNr
         WHERE Kontakte.KundenNr='${anfrage.params.id}'
         `,
         (fehler,zeile)=>{
             if(fehler){
                 console.error(fehler)
                 antwort.send("[]")
             }
             else
             {
                 antwort.send(JSON.stringify(zeile));
             }
         }
     )
    }
 )

 app.get(
    "/bestellung/kunden/alle",
    (anfrage,antwort)=>{
     db.all(
         `SELECT
         Bestellungen.BestellNr,Bestellungen.KundenNr,Bestellungen.GNetto,Bestellungen.MwSt,
         Bestellungen.GBrutto,Bestellungen.Stand,Bestellungen.Datum,
         KundenStamm.Vorname,KundenStamm.Nachname,KundenStamm.Benutzer,KundenStamm.KontoTyp
         FROM Bestellungen
         INNER JOIN KundenStamm ON Bestellungen.KundenNr=KundenStamm.KundenNr
         `,
         (fehler,zeile)=>{
             if(fehler){
                 console.error(fehler)
                 antwort.send("[]")
             }
             else
             {
                 antwort.send(JSON.stringify(zeile));
             }
         }
     )
    }
 )
 
 app.get(
    "/bestellungen/alle/:id",
    (anfrage,antwort)=>{
     db.all(
         `SELECT
         Bestellungen.BestellNr,Bestellungen.KundenNr,Bestellungen.GNetto,Bestellungen.MwSt,
         Bestellungen.GBrutto,Bestellungen.Stand,Bestellungen.Stand,Bestellungen.Datum,
         KundenStamm.Vorname,KundenStamm.Nachname,KundenStamm.Benutzer,KundenStamm.KontoTyp
         FROM Bestellungen
         INNER JOIN KundenStamm ON Bestellungen.KundenNr=KundenStamm.KundenNr
         WHERE Bestellungen.KundenNr='${anfrage.params.id}'
         `,
         (fehler,zeile)=>{
             if(fehler){
                 console.error(fehler)
                 antwort.send("[]")
             }
             else
             {
                 antwort.send(JSON.stringify(zeile));
             }
         }
     )
    }
 )

 app.get(
    "/bestellungen/besNum/:id",
    (anfrage,antwort)=>{
     db.all(
         `SELECT
         Bestellungen.BestellNr,Bestellungen.KundenNr,Bestellungen.GNetto,Bestellungen.MwSt,
         Bestellungen.GBrutto,Bestellungen.Stand,Bestellungen.Stand,Bestellungen.Datum,
         BestellungsDetails.BestDetNr, BestellungsDetails.BestellNr, BestellungsDetails.KundenNr,
         BestellungsDetails.ArtikelNr, BestellungsDetails.Menge
         FROM Bestellungen
         INNER JOIN BestellungsDetails ON Bestellungen.BestellNr=BestellungsDetails.BestellNr,
         INNER JOIN ArtiklelStamm ON Bestellungen.ArtikelNr=ArtikelStamm.ArtikelNr
         WHERE Bestellungen.KundenNr='${anfrage.params.id}'
         `,
         (fehler,zeile)=>{
             if(fehler){
                 console.error(fehler)
                 antwort.send("[]")
             }
             else
             {
                 antwort.send(JSON.stringify(zeile));
             }
         }
     )
    }
 )

 // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// (1) Anmeldevorgang durchführen
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

app.get(
    // Der KundenNr und die "noch" aktuelle Authentification Key
    // werden angegeben, um eine neue AK anzufordern!
    //// Yeni bir AK istemek için müşteri numarası ve "hala" 
    //geçerli kimlik doğrulama anahtarı belirtilir!
    "/login/:b/:k",
    (anfrage, antwort) => {
        console.log("Login....");
        db.all(
            `
                SELECT * FROM
                    KundenStamm
                WHERE
                    Benutzer = '${anfrage.params.b}'
                AND
                    Kennwort = '${anfrage.params.k}';
            `,
            (fehler, zeilen) => {
                if(fehler) // Falls es Fehler gibt ...
                {
                    console.error(fehler); // Fehlernummer auf Konsole anzeigen
                    antwort.send("{}");    // Dem Client einen leeren JSON schicken
                }
                else // Wenn keine Fehler sind ...
                {
                    if(zeilen.length > 0)
                    {
                        let neu = {
                            ak : neueAK(),                                    // Authentifiation Key notieren
                            id : zeilen[0].KundenNr,                          // Kundennummer, IdentifikationsID
                            kt : zeilen[0].KontoTyp,                          // Typ des Benutzerkontos (Normal, Admin, Chef, ...)
                            nm : `${zeilen[0].Vorname} ${zeilen[0].Nachname}` // Anzeigetext : Vorname Nachname --> Max Mustermann
                        };
                        // *** //
                        antwort.send(
                            JSON.stringify(neu)
                        );
                        // *** //
                        console.log("Vom Datenbank:", zeilen);
                        console.log("Als JSON: ", neu);
                    }
                    else
                    {
                        console.error(fehler); // Fehlernummer auf Konsole anzeigen
                        antwort.send("{}");    // Dem Client einen leeren JSON schicken
                    }
                }
            }
        );
    }
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// (2) Die Authentifizerung beim Login das erste Mal einrichten!
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

app.get(
    "/zugriffskontrolle/vorbereiten/:kn/:ak",
    (anfrage, antwort) => {
        db.run(
            `
                DELETE FROM
                    Zugriffskontrolle
                WHERE
                    KundenNr = '${anfrage.params.kn}';
                INSERT INTO Zugriffskontrolle
                    ( KundenNr, AKCode )
                VALUES
                    ( '${anfrage.params.kn}', '${anfrage.params.ak}' );
            `,
            (fehler) => console.error(fehler)
        );
        // *** //
        antwort.send("");
    }
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// (3) Fordert eine neue Authentification Key an und speichert es
// auch sofort in der Datenbank zum jeweiligen Benutzer
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

app.get(
    // Der KundenNr und die "noch" aktuelle Authentification Key
    // werden angegeben, um eine neue AK anzufordern!
    "/zugriffskontrolle/aktualisieren/:kn/:ak",
    (anfrage, antwort) => {
        let neu = neueAK();
        // *** //
        db.run(
            `
                DELETE FROM
                    Zugriffskontrolle
                WHERE
                    KundenNr = '${anfrage.params.kn}'
                    AND
                    AKCode = '${anfrage.params.ak}';
                INSERT INTO Zugriffskontrolle
                    ( KundenNr, AKCode )
                VALUES
                    ( '${anfrage.params.kn}', '${neu}' );
            `,
            (fehler) => console.error(fehler)
        );
        // *** //
        antwort.send(neu);
    }
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// Die Startseite ist Root. Der Root wird mit einem / definiert
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //








// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// Server wird gestartet...
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

const server = app.listen(
    Portnummer,
    () => {
        console.log(`Der Backend-Server mit der Adresse http://localhost:${Portnummer}/ ist aktiv!`);
    }
);