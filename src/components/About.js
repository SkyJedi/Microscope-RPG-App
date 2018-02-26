import React from 'react';

const About = () => {
    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <p>Created by SkyJedi</p>
            </div>
            <div className='row justify-content-center'>

                <p>Questions? Comments? <a href="mailto:skyjedi@gmail.com?subject=Genesys%20Emporium%20Feedback"
                                           target="_blank" rel="noopener noreferrer">Contact Me</a></p>
            </div>
            <div className='row justify-content-center'>
                <p>A Timeline Editor for <a href='http://www.lamemage.com/' target="_blank" rel="noopener noreferrer">Lame
                    Mage Productions</a>, <a href='http://www.lamemage.com/microscope/' target="_blank"
                                             rel="noopener noreferrer">Microscope</a>
                </p>
            </div>
            <div className='row justify-content-center'>

                <p><a href="https://paypal.me/SkyJedi" target="_blank" rel="noopener noreferrer">Donate</a></p>
            </div>
        </div>
    )
};
export default About;
