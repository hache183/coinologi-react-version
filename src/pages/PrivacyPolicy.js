import React from 'react';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Informativa sulla privacy di Coinologi. Scopri come trattiamo i tuoi dati personali nel rispetto del GDPR."
        canonical="/privacy"
      />
      
      <div className="policy-page">
        <div className="container">
          <header className="policy-header">
            <h1>Privacy Policy</h1>
            <p className="last-updated">Ultimo aggiornamento: 27 Novembre 2025</p>
          </header>

          <div className="policy-content">
            <section>
              <h2>1. Titolare del Trattamento</h2>
              <p>
                Il Titolare del trattamento dei dati è <strong>Coinologi</strong>.<br />
                Per qualsiasi informazione o richiesta relativa alla privacy, puoi contattarci all'indirizzo email: <a href="mailto:info@coinologi.net">info@coinologi.net</a>.
              </p>
            </section>

            <section>
              <h2>2. Tipologia di Dati Raccolti</h2>
              <p>
                Raccogliamo diverse tipologie di dati personali per fornire e migliorare i nostri servizi:
              </p>
              <ul>
                <li><strong>Dati di contatto:</strong> Nome, cognome, indirizzo email, numero di telefono (forniti volontariamente tramite form di contatto).</li>
                <li><strong>Dati di navigazione:</strong> Indirizzo IP, tipo di browser, pagine visitate, tempo di permanenza (raccolti automaticamente tramite cookie tecnici e analitici).</li>
                <li><strong>Dati di utilizzo:</strong> Informazioni su come utilizzi i nostri servizi, corsi e segnali.</li>
              </ul>
            </section>

            <section>
              <h2>3. Finalità del Trattamento</h2>
              <p>I tuoi dati vengono trattati per le seguenti finalità:</p>
              <ul>
                <li>Fornire i servizi richiesti (consulenze, corsi, segnali).</li>
                <li>Rispondere alle tue richieste di supporto o informazioni.</li>
                <li>Inviare comunicazioni di servizio e aggiornamenti importanti.</li>
                <li>Inviare newsletter e comunicazioni promozionali (solo previo tuo esplicito consenso).</li>
                <li>Adempiere agli obblighi legali e fiscali.</li>
              </ul>
            </section>

            <section>
              <h2>4. Base Giuridica</h2>
              <p>Il trattamento dei tuoi dati si basa su:</p>
              <ul>
                <li><strong>Esecuzione di un contratto:</strong> per fornire i servizi richiesti.</li>
                <li><strong>Consenso:</strong> per l'invio di newsletter e marketing.</li>
                <li><strong>Obbligo legale:</strong> per adempimenti fiscali e amministrativi.</li>
                <li><strong>Legittimo interesse:</strong> per la sicurezza del sito e l'analisi statistica anonima.</li>
              </ul>
            </section>

            <section>
              <h2>5. Conservazione dei Dati</h2>
              <p>
                I tuoi dati personali saranno conservati solo per il tempo necessario a soddisfare le finalità per cui sono stati raccolti, 
                inclusi gli obblighi di legge. I dati per finalità di marketing saranno conservati fino alla revoca del consenso.
              </p>
            </section>

            <section>
              <h2>6. Condivisione dei Dati</h2>
              <p>
                Non vendiamo né cediamo i tuoi dati a terzi per finalità di marketing. I dati possono essere condivisi con:
              </p>
              <ul>
                <li>Fornitori di servizi tecnici (hosting, email provider) che agiscono come Responsabili del trattamento.</li>
                <li>Consulenti e professionisti per adempimenti legali/fiscali.</li>
                <li>Autorità competenti, se richiesto dalla legge.</li>
              </ul>
            </section>

            <section>
              <h2>7. I Tuoi Diritti (GDPR)</h2>
              <p>In conformità con il GDPR, hai il diritto di:</p>
              <ul>
                <li>Accedere ai tuoi dati personali.</li>
                <li>Chiedere la rettifica o la cancellazione dei dati.</li>
                <li>Limitare il trattamento o opporti ad esso.</li>
                <li>Richiedere la portabilità dei dati.</li>
                <li>Revocare il consenso in qualsiasi momento.</li>
                <li>Proporre reclamo all'autorità di controllo (Garante Privacy).</li>
              </ul>
            </section>

            <section>
              <h2>8. Cookie</h2>
              <p>
                Questo sito utilizza cookie tecnici per garantire il corretto funzionamento e cookie analitici anonimizzati per statistiche. 
                Puoi gestire le preferenze sui cookie tramite le impostazioni del tuo browser.
              </p>
            </section>
          </div>
        </div>
      </div>

      <style jsx>{`
        .policy-page {
          padding: var(--space-20) 0;
          background: var(--color-gray-50);
          min-height: 60vh;
        }

        .policy-header {
          text-align: center;
          margin-bottom: var(--space-12);
          opacity: 0;
          animation: fadeIn 0.6s ease-out forwards;
        }

        .policy-header h1 {
          font-size: var(--font-size-4xl);
          color: var(--color-gray-900);
          margin-bottom: var(--space-4);
        }

        .last-updated {
          color: var(--color-gray-500);
          font-size: var(--font-size-sm);
        }

        .policy-content {
          background: var(--color-white);
          padding: var(--space-10);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
          max-width: 800px;
          margin: 0 auto;
          opacity: 0;
          animation: slideInUp 0.6s ease-out 0.2s forwards;
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

        a {
          color: var(--color-primary);
          text-decoration: underline;
        }

        a:hover {
          color: var(--color-primary-dark);
        }

        @media (max-width: 768px) {
          .policy-content {
            padding: var(--space-6);
          }

          .policy-header h1 {
            font-size: var(--font-size-3xl);
          }
        }
      `}</style>
    </>
  );
};

export default PrivacyPolicy;
