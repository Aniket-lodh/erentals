import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import {BubblyContainer} from "react-bubbly-transitions";
import 'remixicon/fonts/remixicon.css';
import Home from "./pages/home";
import Subscribe from "./pages/subscribe";
import Why from "./pages/why";
import Faq from "./pages/faq";
import Login from "./pages/login";
import "./App.css";


function App() {

    return (
        <BrowserRouter>

            <BubblyContainer/>

            <Routes>
                <Route path="/" element={<Outlet/>}>
                    <Route index element={<Home/>}/>
                    <Route path="subscribe" element={<Subscribe/>}/>
                    <Route path="why" element={<Why/>}/>
                    <Route path="faq" element={<Faq/>}/>
                    <Route path="signin" element={<Login/>}/>
                    <Route path="*" element={<>No match</>}/>
                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;
