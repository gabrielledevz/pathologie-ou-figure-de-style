import { FacebookShareButton, TwitterShareButton } from "react-share";
import facebookIcon from "../assets/facebook.svg";
import twitterIcon from "../assets/twitter.svg";
const ShareButtons = ({ title, url, twitterHandle, tags }) => {
  return (
    <div className="share-buttons">
      <FacebookShareButton
        className="facebook-button"
        quote="Show me the Google!"
        url={"https://www.google.com"}
      >
        <img src={facebookIcon} width="40px" alt="facebook-icon" />
      </FacebookShareButton>
      <TwitterShareButton
        className="twitter-button"
        quote="Show me the Google!"
        url={"https://www.google.com"}
      >
        <img src={twitterIcon} width="40px" alt="twitter-icon" />
      </TwitterShareButton>
    </div>
  );
};
export default ShareButtons;
