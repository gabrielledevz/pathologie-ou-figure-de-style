import * as React from "react";
import styles from "../components/sharebuttons.module.css";

const FacebookMessengerIcon = (props) => (
  <svg
    viewBox="0 0 1000 1000"
    xmlns="http://www.w3.org/2000/svg"
    height="40"
    {...props}
  >
    <title>{"Facebook messenger icon"}</title>

    <path
      className={styles.buttonBackground}
      d="M500 0c276.1 0 500 223.9 500 500s-223.9 500-500 500S0 776.1 0 500 223.9 0 500 0z"
    />

    <path
      d="M499.5 162.1c-185 0-335 140.3-335 313.3 0 98.4 48.5 186.2 124.5 243.7V839l114.3-63.4c30.5 8.5 62.8 13.1 96.2 13.1 185 0 335-140.3 335-313.3s-150-313.3-335-313.3zm35.3 420.1l-86.6-90-166.9 92.3 182.9-194.1 86.6 90L717.7 388 534.8 582.2z"
      className={styles.socialMediaMain}
    />
  </svg>
);

export default FacebookMessengerIcon;
