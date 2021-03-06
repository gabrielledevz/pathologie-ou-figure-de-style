import * as React from "react";
import styles from "../components/sharebuttons.module.css";

const FacebookIcon = (props) => (
  <svg
    data-name="Calque 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    height="40"
    {...props}
  >
    <title>{"Facebook icon"}</title>
    <circle cx={256} cy={256} r={256} className={styles.buttonBackground} />
    <path
      className={styles.socialMediaMain}
      d="M272 184a7.56 7.56 0 018-8h32v-48h-56a39.61 39.61 0 00-40 40v48h-24v48h24v120h56V264h32l8-48h-40z"
    />
  </svg>
);

export default FacebookIcon;
