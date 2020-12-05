import { FacebookShareButton, TwitterShareButton } from "react-share";
import FacebookIcon from "../assets/FacebookIcon";
import TwitterIcon from "../assets/TwitterIcon";
import styles from "./sharebuttons.module.css";

const ShareButtons = ({ title, url, twitterHandle, tags }) => {
  return (
    <div className={styles.buttons}>
      <FacebookShareButton
        className={styles.socialMediaButton}
        quote="Show me the Google!"
        url={"https://gabrielledevz.github.io/pathologie-ou-figure-de-style/"}
      >
        <FacebookIcon className={styles.socialMediaIcon} />
      </FacebookShareButton>
      <TwitterShareButton
        className={styles.socialMediaButton}
        quote="Show me the Google!"
        url={"https://gabrielledevz.github.io/pathologie-ou-figure-de-style/"}
      >
        <TwitterIcon className={styles.socialMediaIcon} />
      </TwitterShareButton>
    </div>
  );
};
export default ShareButtons;
