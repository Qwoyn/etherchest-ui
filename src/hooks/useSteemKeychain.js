import {useState, useEffect} from "react";

export default function() {
  const [hasKeychain, setHasKeychain] = useState(
    window && window.steem_keychain
  );

  useEffect(() => {
    window.onload = () => {
      if (window && window.steem_keychain) {
        setHasKeychain(true);
      }
    };
  }, []);

  function checkKeychain() {
    if (hasKeychain) return true;
    if (window && window.steem_keychain) {
      setHasKeychain(true);
      return true;
    } else {
      return false;
    }
  }

  return checkKeychain;
}
