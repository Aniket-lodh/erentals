import showcase_car from "../assets/images/showcase_car.svg";
import { BubblyLink } from "react-bubbly-transitions";
import "../scss/showcase.scss";


function Showcase() {


    return (
        <section className="showcase_wrapper animate-in" style={{ animationDelay: "900ms" }}>
            <div className="showcase_img_container">
                <img src={showcase_car} alt="showcase_car_img" className="showcase_img" />
            </div>
            <div className="showcase_headings">
                <h1>
                    ACCOMPANY YOUR<br /> JOURNEY WITH COMFORT
                </h1>
                <p>
                    Car rent services for various terrain with guaranteed quality
                </p>
            </div>
            <section className="showcase_search">
                <div className="showcase_search_item">
                    <div className="left">
                        <div className="location">
                            <p>Location</p>
                            <div>
                                <i className="ri-map-pin-line"></i>
                                <span>Choose location</span>
                            </div>
                        </div>
                        <div className="car_type">
                            <p>Car Type</p>
                            <div>
                                <i className="ri-car-line"></i>
                                <span>Select car</span>
                            </div>
                        </div>
                    </div>
                    <div className="right"> {/*TODO:The date has to be two separate single input date  */}
                        <div className="pickup">
                            <p>Pick up</p>
                            <div>
                                <i className="ri-calendar-2-line"></i>
                                <span>Data pickup</span>
                            </div>
                        </div>
                        <div className="return">
                            <p>Return </p>
                            <div>
                                <i className="ri-calendar-event-fill"></i>
                                <span>Date return</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cta_button">
                    <BubblyLink to={"/search"}>
                        <span className="cta_buttons_primary">Book Now</span>
                    </BubblyLink>
                </div>
            </section>
        </section>
    );
}
export default Showcase;
