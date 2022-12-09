import { BubblyLink } from "react-bubbly-transitions";
import "../scss/marketplace.scss";

function Marketplace() {

    return (
        <section className="marketplace_wrapper animate-in" style={{ animationDelay: "900ms" }}>
            <h1>Why our Marketplace?</h1>
            <div className="marketplace_container">
                <div className="marketplace_contents">
                    <i className="ri-check-double-line"></i>
                    <div className="marketplace_contents_text">
                        <h4>Quality Guarantee</h4>
                        <p>Quality checked by our team</p>
                    </div>
                </div>
                <div className="marketplace_contents">
                    <i className="ri-customer-service-line"></i>
                    <div className="marketplace_contents_text">
                        <h4>Customer Support</h4>
                        <p>Friendly 24/7 customer support</p>
                    </div>
                </div>
                <div className="marketplace_contents">
                    <i className="ri-repeat-2-line"></i>
                    <div className="marketplace_contents_text">
                        <h4>Lifetime Free Updates</h4>
                        <p>Never pay for an update</p>
                    </div>
                </div>
                <div className="marketplace_contents">
                    <i className="ri-secure-payment-line"></i>
                    <div className="marketplace_contents_text">
                        <h4>Secure Payments</h4>
                        <p>We posess SSL/Secure certificate</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Marketplace;
