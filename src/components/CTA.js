import React from "react";
import styles from "./CTA.module.css";

const CTA = ({ title, subtitle, buttonText, onClick }) => (
  <section className={styles.ctaSection}>
    <div className={styles.ctaContent}>
      <h2 className={styles.ctaTitle}>{title}</h2>
      <p className={styles.ctaSubtitle}>{subtitle}</p>
      <button className={styles.ctaButton} onClick={onClick}>
        {buttonText}
      </button>
    </div>
  </section>
);

export default CTA;
