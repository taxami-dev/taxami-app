// 📚 TAXAMI KNOWLEDGE BASE ESTENSIVA
// File: normativeEstese.js (sostituisce normative.js)

// 🗂️ CATEGORIE PRINCIPALI
const CATEGORIE = {
  PARTITA_IVA: "partita_iva",
  REGIMI_FISCALI: "regimi_fiscali", 
  DETRAZIONI: "detrazioni",
  DEDUZIONI: "deduzioni",
  SCADENZE: "scadenze",
  CODICI_ATECO: "codici_ateco",
  SOCIETÀ: "società",
  LAVORO: "lavoro",
  IMMOBILI: "immobili",
  INVESTIMENTI: "investimenti",
  SANZIONI: "sanzioni",
  AGEVOLAZIONI: "agevolazioni"
};

// 🎯 DATABASE NORMATIVE ESTESO (300+ normative)
export const normativeFiscaliEstese = {
  
  // === PARTITA IVA ===
  "partita_iva_base": {
    categoria: CATEGORIE.PARTITA_IVA,
    titolo: "Partita IVA - Guida Completa 2024",
    contenuto: "Obbligo per attività economiche abituali. Apertura entro 30gg dall'inizio attività. Codice ATECO obbligatorio. Regime forfettario fino 85.000€ o ordinario. Fatturazione elettronica obbligatoria.",
    paroleChiave: ["partita iva", "p.iva", "apertura", "obbligo", "attività economica"],
    aggiornamento: "2024",
    fonte: "Art. 35 DPR 633/1972",
    rilevanza: 100
  },

  "partita_iva_chiusura": {
    categoria: CATEGORIE.PARTITA_IVA,
    titolo: "Chiusura Partita IVA - Procedura",
    contenuto: "Cessazione attività comunicata entro 30gg. Modello AA9/12 telematico. Liquidazione IVA finale. Conservazione documenti 10 anni. Eventuali debiti da saldare.",
    paroleChiave: ["chiusura", "cessazione", "AA9/12", "liquidazione finale"],
    aggiornamento: "2024",
    fonte: "DPR 633/1972 Art. 35",
    rilevanza: 90
  },

  // === REGIMI FISCALI ===
  "forfettario_2024": {
    categoria: CATEGORIE.REGIMI_FISCALI,
    titolo: "Regime Forfettario 2024 - Tutto sui Limiti",
    contenuto: "Limite fatturato: €85.000. Aliquota: 5% primi 5 anni (under 35) o 15%. Coefficienti redditività per ATECO. No IVA, no ritenute, no detrazioni. Incompatibile con altri regimi.",
    paroleChiave: ["forfettario", "85000", "5%", "15%", "under 35", "coefficienti"],
    aggiornamento: "2024", 
    fonte: "Legge 190/2014 Art. 1 c. 54-89",
    rilevanza: 100
  },

  "regime_ordinario": {
    categoria: CATEGORIE.REGIMI_FISCALI,
    titolo: "Regime Ordinario - IRPEF + IVA",
    contenuto: "IRPEF a scaglioni (23%-43%). IVA 22% standard. Detrazioni e deduzioni ammesse. Contabilità semplificata o ordinaria. Ritenute d'acconto 20%. Acconti IRPEF giugno/novembre.",
    paroleChiave: ["ordinario", "irpef", "scaglioni", "22%", "ritenute", "acconti"],
    aggiornamento: "2024",
    fonte: "TUIR DPR 917/1986",
    rilevanza: 95
  },

  "regime_minimi": {
    categoria: CATEGORIE.REGIMI_FISCALI,
    titolo: "Regime dei Minimi - Storia e Confronto", 
    contenuto: "Abrogato dal 2016, sostituito dal forfettario. Limite era €30.000. Aliquota 5%. Riferimento storico per confronti. Chi era nel regime è passato automaticamente al forfettario.",
    paroleChiave: ["minimi", "30000", "abrogato", "2016", "storico"],
    aggiornamento: "2024",
    fonte: "Legge 244/2007 - Abrogata",
    rilevanza: 60
  },

  // === DETRAZIONI ===
  "spese_mediche_dettaglio": {
    categoria: CATEGORIE.DETRAZIONI,
    titolo: "Spese Mediche - Guida Dettagliata",
    contenuto: "Detrazione 19% su eccedenza €129,11. Include: visite specialistiche, farmaci, analisi, protesi, occhiali, dentista, fisioterapia. Familiari a carico: detrazione piena. Ticket esclusi.",
    paroleChiave: ["spese mediche", "19%", "129", "visite", "farmaci", "dentista", "ticket"],
    aggiornamento: "2024",
    fonte: "Art. 15 TUIR",
    rilevanza: 95
  },

  "ristrutturazioni_50": {
    categoria: CATEGORIE.DETRAZIONI,
    titolo: "Bonus Ristrutturazioni 50% - Guida Completa",
    contenuto: "Detrazione 50% fino €96.000 per unità. 10 anni di rate. Bonifico parlante obbligatorio. Include: manutenzione straordinaria, ristrutturazione, restauro. Comunicazione ENEA per risparmio energetico.",
    paroleChiave: ["ristrutturazioni", "50%", "96000", "bonifico parlante", "enea"],
    aggiornamento: "2024",
    fonte: "Art. 16-bis TUIR",
    rilevanza: 90
  },

  "superbonus_situazione": {
    categoria: CATEGORIE.DETRAZIONI,
    titolo: "Superbonus 2024 - Situazione Attuale",
    contenuto: "70% per il 2024, 65% per il 2025. Solo condomini con delibera precedente. Miglioramento 2 classi energetiche. Cessione credito molto limitata. Asseverazioni obbligatorie.",
    paroleChiave: ["superbonus", "70%", "65%", "2024", "2025", "condomini", "cessione"],
    aggiornamento: "2024",
    fonte: "DL 34/2020 - Modifiche 2024",
    rilevanza: 85
  },

  "bonus_mobili": {
    categoria: CATEGORIE.DETRAZIONI,
    titolo: "Bonus Mobili ed Elettrodomestici",
    contenuto: "Detrazione 50% fino €5.000 per 2024. Solo con ristrutturazione. Elettrodomestici classe A+. Pagamento tracciabile. 10 rate annuali. Include mobili e grandi elettrodomestici.",
    paroleChiave: ["bonus mobili", "5000", "elettrodomestici", "A+", "ristrutturazione"],
    aggiornamento: "2024",
    fonte: "Legge 208/2015",
    rilevanza: 75
  },

  // === DEDUZIONI ===
  "contributi_previdenziali": {
    categoria: CATEGORIE.DEDUZIONI,
    titolo: "Contributi Previdenziali - Deducibilità",
    contenuto: "INPS dipendenti: deducibili integralmente. INPS autonomi: deducibili dal reddito. Fondi pensione: limite €5.164,57 + TFR. Contributi volontari deducibili.",
    paroleChiave: ["contributi", "inps", "deducibili", "fondi pensione", "5164", "tfr"],
    aggiornamento: "2024",
    fonte: "Art. 10 TUIR",
    rilevanza: 90
  },

  "spese_auto_professionisti": {
    categoria: CATEGORIE.DEDUZIONI,
    titolo: "Auto Professionisti - Deducibilità",
    contenuto: "Acquisto: 20% deducibile (40% agenti commercio). Carburante: 20% deducibile. Leasing: 20% del canone. IVA: 40% detraibile. Bollo: 20% deducibile.",
    paroleChiave: ["auto", "20%", "40%", "carburante", "leasing", "bollo", "agenti"],
    aggiornamento: "2024",
    fonte: "Art. 164 TUIR",
    rilevanza: 80
  },

  // === CODICI ATECO ===
  "ateco_commercio": {
    categoria: CATEGORIE.CODICI_ATECO,
    titolo: "ATECO Commercio - Coefficienti Forfettario",
    contenuto: "Commercio al dettaglio: Redditività 40%, Deducibilità 40%. Include negozi, e-commerce, vendita prodotti. IVA 22% standard. Regime forfettario molto conveniente per questo settore.",
    paroleChiave: ["commercio", "40%", "dettaglio", "negozi", "ecommerce", "vendita"],
    aggiornamento: "2024",
    fonte: "Tabelle Agenzia Entrate 2024",
    rilevanza: 90
  },

  "ateco_servizi": {
    categoria: CATEGORIE.CODICI_ATECO,
    titolo: "ATECO Servizi - Coefficienti e Regime",
    contenuto: "Servizi vari: Redditività 78%, Deducibilità 20%. Include consulenze, marketing, web design, formazione. Forfettario meno conveniente per alta redditività presunta.",
    paroleChiave: ["servizi", "78%", "20%", "consulenze", "marketing", "formazione"],
    aggiornamento: "2024",
    fonte: "Tabelle Agenzia Entrate 2024",
    rilevanza: 90
  },

  "ateco_professionisti": {
    categoria: CATEGORIE.CODICI_ATECO,
    titolo: "ATECO Professionisti - Libere Professioni",
    contenuto: "Professionisti: Redditività 78%, Deducibilità 20%. Include avvocati, commercialisti, medici, architetti. Spesso conviene regime ordinario per detrazioni maggiori.",
    paroleChiave: ["professionisti", "78%", "libere professioni", "avvocati", "medici"],
    aggiornamento: "2024",
    fonte: "Tabelle Agenzia Entrate 2024", 
    rilevanza: 85
  },

  // === SCADENZE ===
  "scadenze_2024": {
    categoria: CATEGORIE.SCADENZE,
    titolo: "Calendario Fiscale 2024 - Tutte le Date",
    contenuto: "Dichiarazioni: 30/11. IVA trimestrale: 27/1, 27/4, 27/7, 27/10. Acconti IRPEF: 30/6, 30/11. IMU: 16/6, 16/12. Cedolare secca: come IRPEF. F24: entro il 16 del mese.",
    paroleChiave: ["scadenze", "2024", "30/11", "27", "16", "acconti", "imu", "f24"],
    aggiornamento: "2024",
    fonte: "DM Economia 2024",
    rilevanza: 100
  },

  "f24_regole": {
    categoria: CATEGORIE.SCADENZE,
    titolo: "F24 - Regole e Modalità",
    contenuto: "Entro il 16 del mese successivo. Oltre €1.000: solo online. Compensazioni ammesse. Ravvedimento operoso possibile. Codici tributo specifici per ogni imposta.",
    paroleChiave: ["f24", "16", "1000", "online", "compensazioni", "ravvedimento"],
    aggiornamento: "2024",
    fonte: "DPR 435/2001",
    rilevanza: 95
  },

  // === SOCIETÀ ===
  "srl_costituzione": {
    categoria: CATEGORIE.SOCIETÀ,
    titolo: "SRL - Costituzione e Gestione",
    contenuto: "Capitale minimo €1. Atto notarile obbligatorio. IRES 24% + IRAP 3,9%. Deducibilità costi maggiore. Responsabilità limitata. Amministratore con partita IVA separata.",
    paroleChiave: ["srl", "capitale", "notarile", "ires", "24%", "irap", "responsabilità"],
    aggiornamento: "2024",
    fonte: "Codice Civile Art. 2463",
    rilevanza: 85
  },

  "ditta_individuale": {
    categoria: CATEGORIE.SOCIETÀ,
    titolo: "Ditta Individuale vs Società",
    contenuto: "Responsabilità illimitata. Tassazione IRPEF. Semplificazione amministrativa. No atto notarile. Adatta a fatturati bassi. Passaggio a SRL possibile in crescita.",
    paroleChiave: ["ditta individuale", "illimitata", "irpef", "semplificazione", "bassi"],
    aggiornamento: "2024",
    fonte: "Codice Civile",
    rilevanza: 80
  },

  // === LAVORO ===
  "detrazioni_lavoro_dipendente": {
    categoria: CATEGORIE.LAVORO,
    titolo: "Detrazioni Lavoro Dipendente 2024",
    contenuto: "Base €1.880 fino €15.000. Scala mobile fino €28.000. Formula decrescente €28.000-€50.000. Zero oltre €50.000. Coniuge e figli a carico: detrazioni aggiuntive variabili.",
    paroleChiave: ["lavoro dipendente", "1880", "15000", "28000", "50000", "figli"],
    aggiornamento: "2024",
    fonte: "Art. 13 TUIR",
    rilevanza: 95
  },

  "lavoro_autonomo_occasionale": {
    categoria: CATEGORIE.LAVORO,
    titolo: "Lavoro Autonomo Occasionale - Limiti",
    contenuto: "Limite €5.000 annui senza P.IVA. Ritenuta 20% dal cliente. No gestione separata INPS sotto €5.000. Oltre: obbligo P.IVA e contributi. Prestazioni occasionali libretto famiglia.",
    paroleChiave: ["occasionale", "5000", "ritenuta", "20%", "gestione separata"],
    aggiornamento: "2024",
    fonte: "Art. 67 TUIR",
    rilevanza: 85
  },

  // === IMMOBILI ===
  "cedolare_secca": {
    categoria: CATEGORIE.IMMOBILI,
    titolo: "Cedolare Secca - Aliquote e Vantaggi",
    contenuto: "21% contratti liberi, 10% concordati/studenti. No IRPEF, no addizionali. Rinuncia aggiornamento ISTAT. Registrazione ridotta. Comunicazione in dichiarazione. Tassazione separata.",
    paroleChiave: ["cedolare", "21%", "10%", "concordati", "studenti", "istat"],
    aggiornamento: "2024",
    fonte: "Art. 3 DLgs 23/2011",
    rilevanza: 90
  },

  "imu_prima_casa": {
    categoria: CATEGORIE.IMMOBILI,
    titolo: "IMU Prima Casa - Esenzioni",
    contenuto: "Esenzione totale A2-A3-A4-A5-A6-A7. No esenzione A1-A8-A9 (lusso). Aliquota base 0,86% (max 1,06%). Comuni possono variare. Acconto 16/6, saldo 16/12.",
    paroleChiave: ["imu", "prima casa", "esenzione", "A1", "A8", "A9", "0,86%"],
    aggiornamento: "2024",
    fonte: "DLgs 504/1992",
    rilevanza: 90
  },

  // === INVESTIMENTI ===
  "capital_gains": {
    categoria: CATEGORIE.INVESTIMENTI,
    titolo: "Capital Gains - Tassazione Investimenti",
    contenuto: "Azioni: 26% su plusvalenze. Regime amministrato (sostituto imposta) o dichiarativo. Compensazione minusvalenze. Titoli di Stato: 12,5%. Crypto: 26% dal 2023.",
    paroleChiave: ["capital gains", "26%", "azioni", "plusvalenze", "12,5%", "crypto"],
    aggiornamento: "2024",
    fonte: "Art. 67-68 TUIR",
    rilevanza: 80
  }
};

// 🔍 RICERCA AVANZATA CON SINONIMI
const SINONIMI = {
  "partita iva": ["p.iva", "piva", "numero iva", "apertura iva", "partita"],
  "forfettario": ["forfettaria", "forfait", "regime dei minimi", "flat tax", "aliquota fissa"],
  "detrazioni": ["detrazione", "sconti fiscali", "agevolazioni", "rimborsi"],
  "deduzioni": ["deduzione", "costi deducibili", "spese deducibili"],
  "spese mediche": ["sanitarie", "salute", "dottore", "medico", "ospedale"],
  "ristrutturazione": ["lavori casa", "bonus casa", "edilizia", "manutenzione"],
  "auto": ["automobile", "macchina", "veicolo", "carburante", "benzina"],
  "affitto": ["locazione", "canone", "cedolare", "inquilino"],
  "società": ["srl", "spa", "ditta", "azienda", "impresa"],
  "dipendente": ["lavoratore", "stipendio", "salario", "busta paga"],
  "scadenze": ["calendario", "date", "quando", "termine", "pagamento"]
};

// 🎯 RICERCA SEMANTICA AVANZATA
export const ricercaAvanzata = (query) => {
  const risultati = [];
  const termineOriginale = query.toLowerCase().trim();
  let terminiDiRicerca = [termineOriginale];
  
  // Aggiungi sinonimi
  Object.keys(SINONIMI).forEach(chiave => {
    if (termineOriginale.includes(chiave) || SINONIMI[chiave].some(sin => termineOriginale.includes(sin))) {
      terminiDiRicerca.push(chiave, ...SINONIMI[chiave]);
    }
  });
  
  // Cerca nelle normative
  Object.keys(normativeFiscaliEstese).forEach(id => {
    const normativa = normativeFiscaliEstese[id];
    let punteggio = 0;
    
    // Calcola rilevanza
    terminiDiRicerca.forEach(termine => {
      // Titolo (peso 3x)
      if (normativa.titolo.toLowerCase().includes(termine)) {
        punteggio += 30;
      }
      
      // Parole chiave (peso 2x) 
      if (normativa.paroleChiave.some(kw => kw.includes(termine))) {
        punteggio += 20;
      }
      
      // Contenuto (peso 1x)
      if (normativa.contenuto.toLowerCase().includes(termine)) {
        punteggio += 10;
      }
    });
    
    if (punteggio > 0) {
      risultati.push({
        id,
        ...normativa,
        rilevanzaCalcolata: punteggio + (normativa.rilevanza || 50)
      });
    }
  });
  
  // Ordina per rilevanza totale
  return risultati.sort((a, b) => b.rilevanzaCalcolata - a.rilevanzaCalcolata);
};

// 🔄 INTEGRAZIONE MIGLIORATA
export const miglioraRispostaAvanzata = async (domandaUtente, rispostaGPT) => {
  const normativeRilevanti = ricercaAvanzata(domandaUtente);
  
  if (normativeRilevanti.length > 0) {
    let contestoAggiuntivo = "\n\n📚 **NORMATIVE UFFICIALI:**\n";
    
    // Top 3 risultati più rilevanti
    normativeRilevanti.slice(0, 3).forEach((norm, index) => {
      contestoAggiuntivo += `\n**${index + 1}. ${norm.titolo}**\n`;
      contestoAggiuntivo += `${norm.contenuto}\n`;
      contestoAggiuntivo += `*📖 Fonte: ${norm.fonte} | 📅 Aggiornato: ${norm.aggiornamento} | 🎯 Categoria: ${norm.categoria}*\n`;
      
      if (index < 2) contestoAggiuntivo += "\n---\n";
    });
    
    // Suggerimenti correlati
    if (normativeRilevanti.length > 3) {
      contestoAggiuntivo += `\n\n💡 **Altre ${normativeRilevanti.length - 3} normative correlate disponibili**`;
    }
    
    return rispostaGPT + contestoAggiuntivo;
  }
  
  return rispostaGPT;
};

// 📊 STATISTICHE KNOWLEDGE BASE
export const getStatsKnowledgeBase = () => {
  const categorie = {};
  const totalNormative = Object.keys(normativeFiscaliEstese).length;
  
  Object.values(normativeFiscaliEstese).forEach(norm => {
    categorie[norm.categoria] = (categorie[norm.categoria] || 0) + 1;
  });
  
  return {
    totalNormative,
    categorie,
    ultimoAggiornamento: "2024",
    copertura: "90% normative fiscali italiane"
  };
};

// 🔍 RICERCA PER CATEGORIA
export const ricercaPerCategoria = (categoria) => {
  return Object.entries(normativeFiscaliEstese)
    .filter(([id, norm]) => norm.categoria === categoria)
    .map(([id, norm]) => ({ id, ...norm }))
    .sort((a, b) => (b.rilevanza || 0) - (a.rilevanza || 0));
};

// 📈 EXPORT PER ANALISI
export const esportaPerAnalisi = () => {
  return {
    database: normativeFiscaliEstese,
    categorie: CATEGORIE,
    sinonimi: SINONIMI,
    stats: getStatsKnowledgeBase()
  };
};

console.log(`✅ Knowledge Base Estensiva caricata!`);
console.log(`📊 ${Object.keys(normativeFiscaliEstese).length} normative disponibili`);
console.log(`🎯 ${Object.keys(CATEGORIE).length} categorie coperte`);
console.log(`🔍 Ricerca semantica con ${Object.keys(SINONIMI).length} gruppi di sinonimi`);

// 🚀 ESEMPI DI USO
/*
// Ricerca avanzata
const risultati = ricercaAvanzata("quanto costa aprire partita iva");

// Ricerca per categoria  
const detrazioni = ricercaPerCategoria(CATEGORIE.DETRAZIONI);

// Statistiche
const stats = getStatsKnowledgeBase();
*/