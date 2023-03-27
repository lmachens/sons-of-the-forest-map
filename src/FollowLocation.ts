import { getItem, setItem } from "./lib/storage";

export default function FollowLocation() {
  let followLocation = getItem("follow_location", true);
  const followLocationCheckbox =
    document.querySelector<HTMLInputElement>("#follow_location")!;
  followLocationCheckbox.checked = followLocation;
  followLocationCheckbox.onchange = () => {
    followLocation = followLocationCheckbox.checked;
    setItem("follow_location", followLocation);
  };

  return {
    isFollowing: () => followLocation,
  };
}
