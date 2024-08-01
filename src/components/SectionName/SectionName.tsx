import { JSX } from 'react';

import './SectionName.scss'

type SectionNameProps = {
    title: string;
    subtitle: string;
}

const SectionName = ({ title, subtitle }: SectionNameProps): JSX.Element => {
    return (
        <div className='section-name'>
            <h4>{subtitle}</h4>
            <h2>{title}</h2>
        </div>
    );
};

export default SectionName;