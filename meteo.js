document.addEventListener("DOMContentLoaded", () => {
  const boxMeteo = document.getElementById("contenuto-meteo");
  if (!boxMeteo) return;

  const URL_METEO =
    "https://api.open-meteo.com/v1/forecast?latitude=45.0703&longitude=7.6869&current=temperature_2m,wind_speed_10m&timezone=Europe%2FRome";

  function formattaOra(isoString) {
    const data = new Date(isoString);
    return data.toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  async function caricaMeteo() {
    try {
      boxMeteo.textContent = "Caricamento meteo attuale...";

      const risposta = await fetch(URL_METEO);
      if (!risposta.ok) {
        throw new Error(`Errore HTTP: ${risposta.status}`);
      }

      const dati = await risposta.json();
      const temperatura = dati.current.temperature_2m;
      const vento = dati.current.wind_speed_10m;
      const ora = formattaOra(dati.current.time);

      boxMeteo.innerHTML = `
        <p><strong>Temperatura attuale:</strong> ${temperatura} °C · <strong>Vento:</strong> ${vento} km/h</p>
        <p class="event-place">Rilevamento delle ${ora} (condizioni attuali a Torino, non previsioni per i giorni del festival). Fonte: <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo</a>, CC BY 4.0.</p>
      `;
    } catch (errore) {
      console.error(errore);
      boxMeteo.textContent = "Dati meteo al momento non disponibili.";
    }
  }

  caricaMeteo();
});