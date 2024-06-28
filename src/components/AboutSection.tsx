import React from 'react';
import { workplaces } from './Experiences';
import "./AboutSection.scss";

const AboutSection: React.FC = () => {
    return (
        <div className="container">
            <h2 className="experience-text text-center mt-5">Experiences</h2>
            <div className="d-flex flex-column align-items-center">
                {workplaces.map((workplace) => (
                    <div key={workplace.title} className="col-md-10 d-flex flex-column align-items-center">
                        <div className="col-md-4 mb-4 d-flex justify-content-center align-items-center">
                            <img src={workplace.image} alt={workplace.title} className="workplace-image img-fluid" />
                        </div>
                        <div className="col-md-8">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="title-text">{workplace.jobTitle} at {workplace.title}</h5>
                                    <p className="card-text">{workplace.description}</p>
                                    <small className="date-text">
                                        {workplace.dateStart} - {workplace.dateEnd? workplace.dateEnd : "Current"}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutSection;
