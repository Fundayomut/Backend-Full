// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// export --> Macht die Funktion in anderen JavaScript-Dateien erreichbar
// async --> Sorgt dafür, dass die Funktion in der korrekten Reihenfolge
//           intern verwendet wird
// await --> Wird benötigt, um auf Antwort zu warten. Gehört zur async
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// Diese Funktion geht davon aus, dass der Server einen Objekt
// zurück schickt. Damit das Objekt weiter verarbeitet werden kann,
// muss es als antwort.json() gelesen werden.
//
// anfrage --> Das ist die Route, die aufgerufen wird
// erfolg  --> Ist die Callback-Funktion, die normalerweise geladen wird
// fehler  --> Ist die Callback-Funktion, die bei einem Fehler geladen wird
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

export const ObjektAntwort = async (anfrage, erfolg, fehler) =>
{
    // Versuchen, mit dem Server zu kommunizieren...
    try
    {
        // Anfrage an den Server schicken und auf Antwort warten ...
        const antwort = await fetch(`http://localhost:4000${anfrage}`);
        //console.log(antwort);
        // Überprüft, ob die Antowrt ein Fehler ist ...
        if(!antwort.ok)
        {
            // Der Server meldet einen Fehler ...
            fehler(antwort.statusText);
            throw new Error(`Der Server meldet Fehler: ${antwort.statusText}`);
        }
        // Die Anfrage war erfolgreich, wir bekommen eine gültige Antwort ...
        else
        {
            // Die Antwort wird als JSON-Objekt oder JSON-Array-Objekt ausgelesen
            const objekt = await antwort.json();
            // Die Antwort wird weitergeleitet an die Callback-Funktion "erfolg" ...
            erfolg(objekt);
        }
    }
    // Server antwortet nicht oder hat ein Fehler zurück geschickt...
    catch (wert)
    {
        fehler(wert);
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// Diese Funktion geht davon aus, dass der Server einen Text
// zurück schickt. Damit der Text weiter verarbeitet werden kann,
// muss es als antwort.text() gelesen werden.
//
// anfrage --> Das ist die Route, die aufgerufen wird
// erfolg  --> Ist die Callback-Funktion, die normalerweise geladen wird
// fehler  --> Ist die Callback-Funktion, die bei einem Fehler geladen wird
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

export const TextAntwort = async (anfrage, erfolg, fehler) =>
    {
        // Versuchen, mit dem Server zu kommunizieren...
        try
        {
            // Anfrage an den Server schicken und auf Antwort warten ...
            const antwort = await fetch(`http://localhost:4000${anfrage}`);
            // Überprüft, ob die Antowrt ein Fehler ist ...
            if(!antwort.ok)
            {
                // Der Server meldet einen Fehler ...
                fehler(antwort.statusText);
                throw new Error(`Der Server meldet Fehler: ${antwort.statusText}`);
            }
            // Die Anfrage war erfolgreich, wir bekommen eine gültige Antwort ...
            else
            {
                // Die Antwort wird als Text ausgelesen
                const text = await antwort.text();
                // Die Antwort wird weitergeleitet an die Callback-Funktion "erfolg" ...
                erfolg(text);
            }
        }
        // Server antwortet nicht oder hat ein Fehler zurück geschickt...
        catch (wert)
        {
            fehler(wert);
        }
    };

