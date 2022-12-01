import { BubblyLink } from "react-bubbly-transitions";
import "../scss/errorpage.scss";

const errorpage = () => {
    return (
        <section className="page_404">
            <div className="four_zero_four_bg">
                <h1>404</h1>
            </div>
            <div className="content_box_404">
                <h3>Looks Like You're Lost</h3>
                <p>The page you are looking for is not available</p>
                <BubblyLink to={"/"}>
                    <span>Go to Home</span>
                </BubblyLink>
            </div>
        </section>
    )
}

export default errorpage