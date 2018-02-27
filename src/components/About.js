import React from 'react';
import {Row} from 'reactstrap';


const About = () => {
    return (
        <div>
            <Row>
                <p>Created by SkyJedi</p>
            </Row>
            <Row>
                <p>Questions? Comments? <a href="mailto:skyjedi@gmail.com?subject=Genesys%20Emporium%20Feedback"
                                           target="_blank" rel="noopener noreferrer">Contact Me</a></p>
            </Row>
            <Row>
                <p>A Timeline Editor for <a href='http://www.lamemage.com/' target="_blank" rel="noopener noreferrer">Lame
                    Mage Productions</a>, <a href='http://www.lamemage.com/microscope/' target="_blank"
                                             rel="noopener noreferrer">Microscope</a></p>
            </Row>
            <Row className='justify-content-center'>
                <p><a href="https://paypal.me/SkyJedi" target="_blank" rel="noopener noreferrer">Donate</a></p>
            </Row>
        </div>
    )
};
export default About;
