import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookMessengerShareButton,
  EmailShareButton,
  WhatsappShareButton,
} from "react-share";
import FacebookIcon from "../assets/FacebookIcon";
import TwitterIcon from "../assets/TwitterIcon";
import FacebookMessengerIcon from "../assets/FacebookMessengerIcon";
import WhatsappIcon from "../assets/WhatsappIcon";
import EmailIcon from "../assets/EmailIcon";
import styles from "./sharebuttons.module.css";

const ShareButtons = ({ title, url, twitterHandle, tags }) => {
  return (
    <div className={styles.buttons}>
      <FacebookShareButton
        className={styles.socialMediaButton}
        url={"https://gabrielledevz.github.io/pathologie-ou-figure-de-style/"}
      >
        <FacebookIcon className={styles.socialMediaIcon} />
      </FacebookShareButton>
      <FacebookMessengerShareButton
        className={styles.socialMediaButton}
        title="Pathologie ou figure de style ?"
        url={"https://gabrielledevz.github.io/pathologie-ou-figure-de-style/"}
      >
        <FacebookMessengerIcon className={styles.socialMediaIcon} />
      </FacebookMessengerShareButton>
      <EmailShareButton
        className={styles.socialMediaButton}
        title="Pathologie ou figure de style ?"
        url={"https://gabrielledevz.github.io/pathologie-ou-figure-de-style/"}
      >
        <EmailIcon className={styles.socialMediaIcon} />
      </EmailShareButton>
      <WhatsappShareButton
        className={styles.socialMediaButton}
        title="Pathologie ou figure de style ?"
        url={"https://gabrielledevz.github.io/pathologie-ou-figure-de-style/"}
      >
        <WhatsappIcon className={styles.socialMediaIcon} />
      </WhatsappShareButton>
      <TwitterShareButton
        className={styles.socialMediaButton}
        title="Pathologie ou figure de style ?"
        url={"https://gabrielledevz.github.io/pathologie-ou-figure-de-style/"}
      >
        <TwitterIcon className={styles.socialMediaIcon} />
      </TwitterShareButton>
    </div>
  );
};
export default ShareButtons;
