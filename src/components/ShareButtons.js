import { FacebookShareButton, TwitterShareButton } from "react-share";
import FacebookIcon from "../assets/FacebookIcon";
import TwitterIcon from "../assets/TwitterIcon";
import "./sharebuttons.css";

const ShareButtons = ({ title, url, twitterHandle, tags }) => {
  return (
    <div className="share-buttons">
      <FacebookShareButton
        className="social-media-button"
        quote="Show me the Google!"
        url={"https://gabrielledevz.github.io/pathologie-ou-figure-de-style/"}
      >
        <FacebookIcon className="social-media-icon" />
      </FacebookShareButton>
      <TwitterShareButton
        className="social-media-button"
        quote="Show me the Google!"
        url={"https://gabrielledevz.github.io/pathologie-ou-figure-de-style/"}
      >
        <TwitterIcon className="social-media-icon" />
      </TwitterShareButton>
    </div>
  );
};
export default ShareButtons;
