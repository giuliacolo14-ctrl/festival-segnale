# Scheda dati — Festival Segnale

## 1. Entità
Il modello dati è composto da due entità principali:
- **Sede**: rappresenta i luoghi fisici che ospitano il festival.
- **Evento**: rappresenta i singoli appuntamenti in calendario.

## 2. Campi, tipi ed esempi

### Entità `Sede` (`dati/sedi.json`)
| Campo | Tipo | Descrizione | Esempio |
| :--- | :--- | :--- | :--- |
| `id` | Numero intero | Identificativo univoco della sede | `1` |
| `nome` | Stringa | Denominazione dello spazio e del plesso | `"Officina Nord – Sede centrale"` |
| `indirizzo` | Stringa | Indirizzo stradale completo a Torino | `"Corso Duca degli Abruzzi 24, Torino"` |

### Entità `Evento` (`dati/eventi.json`)
| Campo | Tipo | Descrizione | Esempio |
| :--- | :--- | :--- | :--- |
| `id` | Numero intero | Identificativo univoco dell'evento | `1` |
| `titolo` | Stringa | Titolo dell'appuntamento | `"Lettere in movimento"` |
| `data` | Stringa (ISO `YYYY-MM-DD`) | Giorno di svolgimento | `"2026-06-12"` |
| `orario` | Stringa (`HH:MM`) | Ora di inizio | `"10:00"` |
| `categoria` | Stringa | Tipologia di attività | `"Incontro"` |
| `descrizione` | Stringa | Testo di presentazione dell'evento | `"Come cambia un messaggio quando cambiano le lettere?..."` |
| `immagine` | Stringa (percorso relativo) | Percorso dell'illustrazione SVG | `"assets/lettere-in-movimento.svg"` |
| `immagine_alt` | Stringa | Testo alternativo per l'accessibilità | `"Lettere geometriche disposte su una griglia"` |
| `sede_id` | Numero intero | Riferimento all'ID della sede ospitante | `1` |

## 3. Chiavi primarie ed esterne
- **Chiave primaria di `Sede`**: `id` (numerico, univoco e stabile).
- **Chiave primaria di `Evento`**: `id` (numerico, univoco e stabile).
- **Chiave esterna di `Evento`**: `sede_id`, che collega ciascun evento al campo `id` della rispettiva sede in `sedi.json`.

## 4. Relazione
Una sede può ospitare zero o più eventi; ogni evento si svolge in una sola sede. Il collegamento avviene tramite `Evento.sede_id` che fa riferimento a `Sede.id`.

## 5. Quantità
- **6 eventi** (tre previsti venerdì 12 giugno 2026 e tre sabato 13 giugno 2026).
- **3 sedi** distribuite sul territorio di Torino.

## 6. Aggiornamento e pubblicazione
I dati vengono aggiornati modificando direttamente i file `dati/eventi.json` e `dati/sedi.json` all'interno della repository Git (senza intervenire sul codice HTML) ed eseguendo il commit/push per aggiornare la pubblicazione su GitHub Pages.

## 7. Che cosa mostra la pagina
La pagina `programma.html` legge dinamicamente i due file JSON tramite JavaScript e genera la griglia degli appuntamenti, mostrando per ogni evento l'illustrazione, la data formattata, l'orario, la categoria, il titolo, la descrizione e il nome della sede associata (recuperato incrociando `sede_id` con `sedi.json`).

---

## Schema relazionale (Mermaid)

```mermaid
erDiagram
    SEDE ||--o{ EVENTO : ospita
    SEDE {
        number id PK
        string nome
        string indirizzo
    }
    EVENTO {
        number id PK
        string titolo
        string data
        string orario
        string categoria
        string descrizione
        string immagine
        string immagine_alt
        number sede_id FK
    }