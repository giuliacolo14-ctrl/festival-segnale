document.addEventListener("DOMContentLoaded", () => {
  const stato = document.getElementById("stato-programma");
  const griglia = document.getElementById("griglia-eventi");

  if (!stato || !griglia) return;

  function formattaData(dataISO) {
    const [anno, mese, giorno] = dataISO.split("-").map(Number);
    const dataObj = new Date(anno, mese - 1, giorno);
    const testo = dataObj.toLocaleDateString("it-IT", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });
    return testo.charAt(0).toUpperCase() + testo.slice(1);
  }

  async function caricaProgramma() {
    try {
      // 1. Stato di caricamento
      stato.textContent = "Caricamento del programma...";
      stato.hidden = false;
      griglia.innerHTML = "";

      const [rispostaEventi, rispostaSedi] = await Promise.all([
        fetch("dati/eventi.json"),
        fetch("dati/sedi.json")
      ]);

      if (!rispostaEventi.ok || !rispostaSedi.ok) {
        throw new Error("Impossibile leggere i file dei dati.");
      }

      const eventi = await rispostaEventi.json();
      const sedi = await rispostaSedi.json();

      // 2. Stato vuoto (eventi.json è [])
      if (!Array.isArray(eventi) || eventi.length === 0) {
        stato.textContent = "Nessun evento in programma.";
        stato.hidden = false;
        return;
      }

      // 3. Stato di successo
      stato.textContent = "";
      stato.hidden = true;

      const mappaSedi = new Map(sedi.map((sede) => [sede.id, sede.nome]));

      eventi.forEach((evento) => {
        const nomeSede = mappaSedi.get(evento.sede_id) || "Sede da definire";
        const dataFormattata = formattaData(evento.data);

        const scheda = document.createElement("article");
        scheda.className = "event-card";

        const img = document.createElement("img");
        img.src = evento.immagine;
        img.alt = evento.immagine_alt;
        img.width = 900;
        img.height = 600;

        const corpo = document.createElement("div");
        corpo.className = "event-body";

        const meta = document.createElement("p");
        meta.className = "event-meta";
        meta.textContent = `${dataFormattata} · ${evento.orario} · ${evento.categoria}`;

        const titolo = document.createElement("h3");
        titolo.textContent = evento.titolo;

        const descrizione = document.createElement("p");
        descrizione.textContent = evento.descrizione;

        const luogo = document.createElement("p");
        luogo.className = "event-place";
        luogo.innerHTML = `<strong>Sede:</strong> `;
        luogo.append(document.createTextNode(nomeSede));

        corpo.append(meta, titolo, descrizione, luogo);
        scheda.append(img, corpo);
        griglia.appendChild(scheda);
      });
    } catch (errore) {
      // 4. Stato di errore
      console.error(errore);
      griglia.innerHTML = "";
      stato.textContent = "Il programma non è disponibile.";
      stato.hidden = false;
    }
  }

  caricaProgramma();
});