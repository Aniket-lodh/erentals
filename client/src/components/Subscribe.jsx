import { BubblyLink } from "react-bubbly-transitions";
import "../scss/subscribe.scss";

function Subscribe() {

    return (
        <section className="Subscribe_wrapper animate-in" style={{ animationDelay: "900ms" }}>
            <div className="Subscribe_container">
                <div className="Subscribe_header">
                    <h4>Newsletter Sign Up <span className="ri-send-plane-fill" ></span></h4>
                    <p>Receive early exclusive discount offers, monthly freebies,
                        updates, and new products info.
                    </p>
                </div>
                <form className="Subscribe_form">
                    <input type="email" placeholder="Your email address" />
                    <BubblyLink to="/subscribe"><span>Subscribe</span></BubblyLink>
                </form>
            </div>
        </section>
    );
}
export default Subscribe;
