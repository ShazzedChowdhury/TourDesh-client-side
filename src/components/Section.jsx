import React from 'react';

const Section = ({children, style}) => {
    return (
      <section className={`max-w-7xl mx-auto p-5 pt-0 md:p-10 md:pt-0 ${style && style}`}>
        {children}
      </section>
    );
};

export default Section;