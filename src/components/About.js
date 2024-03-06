import '../Navbar.css'; // Import your custom CSS for styling
import Footer from './Footer';

const About = () => {
    return (
        <div className='about' style={{height:'480px'}}>
            <div className="about-content">
                <div className="about-text">
                    <h1 style={{fontSize:'50px', fontWeight:'bold'}}>About us</h1>
                    <h2 style={{fontSize:'20px'}}>Discover A Seamless Parking Experience
                        With Spotfinder. Our User-Friendly App,
                        Powered By Advanced APIs, Is Designed
                        To Make Finding And Securing Parking
                        Spaces A Breeze. Say Goodbye To the
                        Frustration Of Circling The Block
                        Endlessly Or Scrambling For Parking
                        Spots In Crowded Areas In Colombo
                    </h2>
                </div>
            </div>
            <div className="about-image"></div>
            <Footer/>
        </div>
    );
};

export default About;
