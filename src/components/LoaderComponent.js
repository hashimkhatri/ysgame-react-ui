import React from 'react';
import styles from './LoaderComponent.module.css'; // CSS module for styles

const LoaderComponent = ({ visible, onHide }) => {
  if (!visible) return null;

  return (
    <div className={styles.overlay} onClick={onHide}>
      <div className={styles.loaderContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    </div>
  );
};

export default LoaderComponent;
