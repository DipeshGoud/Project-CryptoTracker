import React from 'react'
import "./styles.css"
import Button from '../../Common/Button'
import iphone from '../../../assets/iphone.png'
import gradient from '../../../assets/gradient.png'
import { motion } from "framer-motion";
import { Link } from 'react-router-dom'

function MainComponent() {

    // Function to handle the Share button click
    const handleShareClick = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Crypto Tracker',
                    text: 'Check out Crypto Tracker for real-time crypto tracking!',
                    url: window.location.href
                });
            } else {
                // Fallback for browsers that don't support Web Share API
                alert('Web Share API is not supported in your browser.');
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <div className='flex-info'>
            <div className='left-component'>
                <motion.h1 className='track-crypto-heading'
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        type: 'smooth',
                        duration: 1,
                    }}
                >Track Crypto</motion.h1>
                <motion.h1 className='real-time-heading'
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        type: 'smooth',
                        duration: 1,
                        delay: 0.5
                    }}
                >Real Time.</motion.h1>
                <motion.p className='info-text'
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        type: 'smooth',
                        duration: 1,
                        delay: 1
                    }}
                >
                    Track crypto through a public api in real time. Visit the dashboard to do so!
                </motion.p>
                <motion.div className='btn-flex'
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        type: 'smooth',
                        duration: 1,
                        delay: 1.5
                    }}
                >
                    <Link to="/dashboard">
                        <Button text={'Dashboard'} onClick={() => console.log('Hii')} />
                    </Link>
                    <Button text={'Share'} outline={true} onClick={handleShareClick} />
                </motion.div>
            </div>
            <motion.div className='phone-container'
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                    type: 'smooth',
                    duration: 1,
                    delay: 2
                }}
            >
                <motion.img src={iphone} className='iphone'
                    initial={{ y: -10 }}
                    animate={{ y: 10 }}
                    transition={{
                        type: 'smooth',
                        repeatType: 'mirror',
                        duration: 2,
                        repeat: Infinity
                    }}
                />
                <img src={gradient} className='gradient' />
            </motion.div>
        </div>
    )
}

export default MainComponent
