import { FacebookShareButton, TwitterShareButton } from "react-share";
import facebookIcon from "../assets/facebook-icon.png";
import twitterIcon from "../assets/twitter-icon.png";
const ShareButtons = ({ title, url, twitterHandle, tags }) => {
  return (
    <div className="share-buttons">
      <FacebookShareButton
        className="facebook-button"
        quote="Show me the Google!"
        url={"https://www.google.com"}
      >
        <img src={facebookIcon} alt="facebook-icon" />
      </FacebookShareButton>
      <TwitterShareButton
        className="twitter-button"
        quote="Show me the Google!"
        url={"https://www.google.com"}
      >
        <img src={twitterIcon} alt="twitter-icon" />
      </TwitterShareButton>
    </div>
  );
};
export default ShareButtons;
