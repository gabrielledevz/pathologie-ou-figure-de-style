import { FacebookShareButton, TwitterShareButton } from "react-share";
import FacebookIcon from "../assets/FacebookIcon";
import TwitterIcon from "../assets/TwitterIcon";

const ShareButtons = ({ title, url, twitterHandle, tags }) => {
  return (
    <div className="share-buttons">
      <FacebookShareButton
        className="social-media-button"
        quote="Show me the Google!"
        url={"https://www.google.com"}
      >
        <FacebookIcon className="social-media-icon" />
      </FacebookShareButton>
      <TwitterShareButton
        className="social-media-button"
        quote="Show me the Google!"
        url={"https://www.google.com"}
      >
        <TwitterIcon className="social-media-icon" />
      </TwitterShareButton>
    </div>
  );
};
export default ShareButtons;
