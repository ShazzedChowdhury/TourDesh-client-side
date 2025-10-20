import React from 'react';

const Section = ({children}) => {
    return (
        <section className='max-w-7xl mx-auto p-5 pt-0 md:p-10 md:pt-0'>
            {children}
        </section>
    );
};

export default Section;