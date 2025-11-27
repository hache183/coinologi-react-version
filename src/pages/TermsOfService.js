import React from 'react';
import SEO from '../components/SEO';

const TermsOfService = () => {
  return (
    <>
      <SEO
        title="Termini di Servizio"
        description="Termini e condizioni di utilizzo dei servizi Coinologi. Leggi attentamente il disclaimer finanziario e le condizioni di fornitura."
        canonical="/terms"
      />
      
      <div className="terms-page">
        <div className="container">
          <header className="terms-header">
            <h1>Termini di Servizio</h1>
            <p className="last-updated">Ultimo aggiornamento: 27 Novembre 2025</p>
          </header>

          <div className="terms-content">
            <div className="alert-box">
              <h3>⚠️ DISCLAIMER IMPORTANTE</h3>
              <p>
                <strong>Coinologi NON fornisce consulenza finanziaria.</strong><br />
                Tutti i contenuti, i segnali, i corsi e le informazioni fornite hanno scopo esclusivamente <strong>educativo e informativo</strong>. 
                Il trading di criptovalute comporta un alto livello di rischio e può comportare la perdita totale del capitale investito. 
                Non investire mai denaro che non puoi permetterti di perdere.
              </p>
            </div>

            <section>
              <h2>1. Accettazione dei Termini</h2>
              <p>
                Accedendo al sito web Coinologi e utilizzando i nostri servizi (inclusi, a titolo esemplificativo, Crypto Academy, VIP Trading Signals, Web3 Consulting), 
                l'utente accetta di essere vincolato dai presenti Termini di Servizio. Se non accetti questi termini, ti preghiamo di non utilizzare i nostri servizi.
              </p>
            </section>

            <section>
              <h2>2. Descrizione del Servizio</h2>
              <p>
                Coinologi offre servizi di formazione, analisi di mercato e consulenza tecnica in ambito blockchain e criptovalute. 
                Nello specifico:
              </p>
              <ul>
                <li><strong>Crypto Academy:</strong> Corsi e materiali didattici.</li>
                <li><strong>VIP Trading Signals:</strong> Analisi tecniche e idee di trading a scopo didattico.</li>
                <li><strong>Web3 Consulting:</strong> Consulenza tecnica per progetti blockchain.</li>
              </ul>
              <p>
                Ci riserviamo il diritto di modificare, sospendere o interrompere qualsiasi parte del servizio in qualsiasi momento.
              </p>
            </section>

            <section>
              <h2>3. Esclusione di Responsabilità (Disclaimer)</h2>
              <p>
                L'utente riconosce e accetta che:
              </p>
              <ul>
                <li><strong>Nessuna Consulenza Finanziaria:</strong> Nessuna informazione fornita da Coinologi costituisce un consiglio di investimento, una raccomandazione o una sollecitazione all'acquisto o alla vendita di asset finanziari.</li>
                <li><strong>Rischio:</strong> Il mercato delle criptovalute è altamente volatile e non regolamentato. Le performance passate non sono garanzia di risultati futuri.</li>
                <li><strong>Responsabilità Personale:</strong> L'utente è l'unico responsabile delle proprie decisioni finanziarie e delle operazioni di trading effettuate. Coinologi non si assume alcuna responsabilità per eventuali perdite o danni derivanti dall'utilizzo delle informazioni fornite.</li>
              </ul>
            </section>

            <section>
              <h2>4. Proprietà Intellettuale</h2>
              <p>
                Tutti i contenuti presenti sul sito e nei materiali forniti (testi, grafiche, loghi, video, corsi) sono di proprietà esclusiva di Coinologi 
                e sono protetti dalle leggi sul diritto d'autore. È vietata la riproduzione, distribuzione o vendita non autorizzata dei nostri materiali.
              </p>
            </section>

            <section>
              <h2>5. Account e Sicurezza</h2>
              <p>
                Se crei un account o accedi a servizi riservati, sei responsabile della riservatezza delle tue credenziali di accesso. 
                Sei responsabile di tutte le attività che avvengono sotto il tuo account.
              </p>
            </section>

            <section>
              <h2>6. Rimborsi e Cancellazioni</h2>
              <p>
                Le politiche di rimborso variano a seconda del servizio acquistato. Per i servizi in abbonamento, è possibile disdire il rinnovo in qualsiasi momento. 
                Per i prodotti digitali (corsi), i rimborsi sono valutati caso per caso in conformità con le leggi a tutela dei consumatori.
              </p>
            </section>

            <section>
              <h2>7. Modifiche ai Termini</h2>
              <p>
                Coinologi si riserva il diritto di aggiornare questi Termini di Servizio in qualsiasi momento. Le modifiche saranno effettive dalla pubblicazione su questa pagina. 
                L'uso continuato del servizio dopo tali modifiche costituisce accettazione dei nuovi termini.
              </p>
            </section>

            <section>
              <h2>8. Legge Applicabile e Foro Competente</h2>
              <p>
                I presenti termini sono regolati dalla legge italiana. Per qualsiasi controversia sarà competente in via esclusiva il Foro di Milano.
              </p>
            </section>
          </div>
        </div>
      </div>

      <style jsx>{`
        .terms-page {
          padding: var(--space-20) 0;
          background: var(--color-gray-50);
          min-height: 60vh;
        }

        .terms-header {
          text-align: center;
          margin-bottom: var(--space-12);
          opacity: 0;
          animation: fadeIn 0.6s ease-out forwards;
        }

        .terms-header h1 {
          font-size: var(--font-size-4xl);
          color: var(--color-gray-900);
          margin-bottom: var(--space-4);
        }

        .last-updated {
          color: var(--color-gray-500);
          font-size: var(--font-size-sm);
        }

        .terms-content {
          background: var(--color-white);
          padding: var(--space-10);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
          max-width: 800px;
          margin: 0 auto;
          opacity: 0;
          animation: slideInUp 0.6s ease-out 0.2s forwards;
        }

        .alert-box {
          background: #fff5f5;
          border-left: 4px solid #e53e3e;
          padding: var(--space-6);
          margin-bottom: var(--space-8);
          border-radius: var(--radius-md);
        }

        .alert-box h3 {
          color: #c53030;
          font-size: var(--font-size-lg);
          margin-bottom: var(--space-2);
        }

        .alert-box p {
          color: #742a2a;
          margin-bottom: 0;
          font-size: var(--font-size-sm);
        }

        section {
          margin-bottom: var(--space-8);
        }

        section:last-child {
          margin-bottom: 0;
        }

        h2 {
          font-size: var(--font-size-xl);
          color: var(--color-gray-900);
          margin-bottom: var(--space-4);
          border-bottom: 2px solid var(--color-gray-100);
          padding-bottom: var(--space-2);
        }

        p, li {
          color: var(--color-gray-700);
          line-height: 1.8;
          margin-bottom: var(--space-4);
        }

        ul {
          padding-left: var(--space-6);
          margin-bottom: var(--space-4);
        }

        li {
          margin-bottom: var(--space-2);
        }

        @media (max-width: 768px) {
          .terms-content {
            padding: var(--space-6);
          }

          .terms-header h1 {
            font-size: var(--font-size-3xl);
          }
        }
      `}</style>
    </>
  );
};

export default TermsOfService;
