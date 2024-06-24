import { motion } from 'framer-motion';
import "./Hero.scss"
const Hero = () => {
    return (
        <div className="hero-section vh-100 d-flex align-items-center justify-content-center text-center">
            <div className="container">
                <div className="row w-100">
                    <div className="col-md-6">
                        <motion.img
                            src="arthur.jpg"
                            alt="Profile Picture"
                            className="profile-image img-fluid rounded-circle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        />
                    </div>
                    <div className="col-md-6 d-flex flex-column align-items-start justify-content-center">
                        <h1 className="hero-title mb-3">Welcome to My Portfolio!</h1>
                        <p className="hero-subtitle">UCSC Computer Science: Game Design B.S. Graduate.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
