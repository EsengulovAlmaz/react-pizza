import React from 'react';

import styles from "./NotFoundBlock.module.scss";

export default function NotFoundBlock() {
  return (
    <div className={styles.notFound}>
      <span className={styles.notFound__icon}>😥</span>
      <h1 className={styles.notFound__title}>Ничего не найдено</h1>
    </div>
  )
};
