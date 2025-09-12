import React from "react";
import styles from "./Hero.module.css";

const Hero = ({ title, subtitle, ctaText, onCtaClick, children }) => (
  <section className={styles.hero}>
    <div className={styles.heroContent}>
      <h1 className={styles.heroTitle}>{title}</h1>
      <p className={styles.heroSubtitle}>{subtitle}</p>
      {ctaText && (
        <button className={styles.heroButton} onClick={onCtaClick}>
          {ctaText}
        </button>
      )}
      {children}
    </div>
  </section>
);

export default Hero;
