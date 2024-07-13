import Footer from "../components/HomePageComponents/Footer";
import Hero from "../components/HomePageComponents/Hero";
import Nav from "../components/HomePageComponents/Nav";

const HomePage = () => {
    return (
        <>
            <div className="relative">
                <div className="absolute inset-0">
                    <Nav />
                </div>
                <Hero/>
                <Footer />
                <div className="h-screen">

                </div>
            </div>
        </>
    )
}


export default HomePage;