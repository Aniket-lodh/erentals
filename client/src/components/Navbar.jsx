import { BubblyLink } from "react-bubbly-transitions";
import "../scss/navbar.scss";

const MyBubblyLink = ({ to = "", text = "" }) => (
  <BubblyLink to={to} colorStart="#8f44fd" colorEnd="#ffffff">
    {text}
  </BubblyLink>
);

function Navbar() {
  return (
    <nav className="Navbar">
      <h1 className="title animate-in" style={{ animationDelay: "600ms" }}>
        eRentals
      </h1>
      <div className="animate-in" style={{ animationDelay: "800ms" }}>
        <ul className="nav_links">
          <li className="links">
            <MyBubblyLink to="/subscribe" text="Subscribe" />
          </li>
          <li className="links">
            <MyBubblyLink to="/why" text="why" />
          </li>
          <li className="links">
            <MyBubblyLink to="/faq" text="FAQ" />
          </li>
        </ul>
        <div className="cta_buttons">
          <BubblyLink to={"/signin"} className="cta_secondary">
            Sign in
          </BubblyLink>
          <BubblyLink to={"/signup"} className="cta_primary">
            Sign up
          </BubblyLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
