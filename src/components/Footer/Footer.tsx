import { JSX } from 'react';

import './Footer.scss'

import museumLogo from '../../assets/museum-logo.svg';
import modsenLogo from '../../assets/logo modsen-02 2.svg';

const Footer = (): JSX.Element => {
    return (
        <footer>
            <div className='footer-wrapper'>
                <img src={museumLogo} alt='Museum Logo' />
                <img src={modsenLogo} alt='Modsen Logo' />
            </div>
        </footer>
    );
}

export default Footer;