import React from "react";
import { Link } from "react-router-dom";

export default function Public() {
  const content = (
    <section className="public">
      <header>
        <h2>Welcome</h2>
      </header>
      <main>
        <p>Lorem ,ldfmskdfdsfsdfsd</p>
        <p>&nbsp;</p>
        <address>
          fmsdklfmsdkf
          <br />
          fmsdklfmsdkf
          <br />
          fmsdklfmsdkf
          <br />
          <a href="tel:+963932444357">+963932444357</a>
        </address>
      </main>
      <footer>
        <Link to="/login">Login</Link>
      </footer>
    </section>
  );
  return content;
}
