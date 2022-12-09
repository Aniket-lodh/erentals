import Navbar from "../components/Navbar";
import Showcase from "../components/Showcase";
import Subscribe from "../components/Subscribe";
import Marketplace from "../components/Marketplace";
import Footer from "../components/Footer";

function Home() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <Showcase />
                <Subscribe/>
                <Marketplace/>
                <Footer/>
            </main>
        </>
    )
}

export default Home;