import React from 'react';

const FeaturesBlock = () => {
  return (
    <section className="features-block">
      <div className="feature-box">
        <div className="feature-icon">🌐</div>
        <h3 className="feature-title">Simplify Technology</h3>
        <p className="feature-desc">
          We strip away the complexity to deliver clean, intuitive web solutions that empower your business and engage your audience.
        </p>
      </div>
      
      <div className="feature-box">
        <div className="feature-icon">⚙️</div>
        <h3 className="feature-title">Integrate Systems</h3>
        <p className="feature-desc">
          Seamlessly connect your operations with custom systems and smart access control tailored exactly to your workflow.
        </p>
      </div>
      
      <div className="feature-box">
        <div className="feature-icon">🚀</div>
        <h3 className="feature-title">Unlock Growth</h3>
        <p className="feature-desc">
          Scale your enterprise confidently with robust IT infrastructure and digital foundations built for the future.
        </p>
      </div>
    </section>
  );
};

export default FeaturesBlock;
