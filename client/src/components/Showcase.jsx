import "../scss/showcase.scss";
import showcase_car from "../images/showcase_car.svg";
//TODO: work on the showcase 
function Showcase() {
    return (
        <section className="showcase_wrapper animate-in" style={{animationDelay:"900ms"}}>
            <div className="showcase_img_container">
                <img src={showcase_car} alt="showcase_car_img" className="showcase_img" />
            </div>
            <div className="showcase_headings">
                <h1>
                    ACCOMPANY YOUR<br/> JOURNEY WITH COMFORT
                </h1>
                <p>
                    Car rent services for various terrain with guaranteed quality
                </p>
            </div>
           
        </section>

    );
}
export default Showcase;
