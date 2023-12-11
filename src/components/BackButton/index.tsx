import React from 'react'
import { IoArrowBack } from "react-icons/io5";
import styles from "./backButton.module.scss";

const BackButton = () => {
  return (
    <button title='go back' className={styles['back-button']} onClick={() => window.history.back()}>
      <IoArrowBack />
    </button>
  )
}

export default BackButton