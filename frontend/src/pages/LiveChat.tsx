import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const LiveChat = () => {
  const location = useLocation();
  const ALLOWED_PATH = "/contact"; // ← the ONE page

  useEffect(() => {
    const PROPERTY_ID = "672dfa7d2480f5b4f59acc0f";
    const WIDGET_ID = "1ic5pkvjt";

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    if (!document.getElementById("tawk-script")) {
      const script = document.createElement("script");
      script.id = "tawk-script";
      script.async = true;
      script.src = `https://embed.tawk.to/${PROPERTY_ID}/${WIDGET_ID}`;
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (!window.Tawk_API) return;

    if (location.pathname === ALLOWED_PATH) {
      window.Tawk_API.showWidget?.();
    } else {
      window.Tawk_API.hideWidget?.();
    }
  }, [location.pathname]);

  return null;
};

export default LiveChat;
