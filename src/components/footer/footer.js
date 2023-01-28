import React from "react";
import "./footer.css";

function Footer({ error, isLoading }) {
  return (
    <>
      <footer
        style={
          error || isLoading
            ? { position: "absolute", bottom: "0", width: "100%" }
            : null
        }
      >
        Footer
      </footer>
    </>
  );
}

export default Footer;
