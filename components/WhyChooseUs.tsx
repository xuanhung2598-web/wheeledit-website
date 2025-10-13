import React from 'react';

const uspData = [
    {
        icon: 'fas fa-rocket',
        title: 'Fast Turnaround',
        description: 'Get your edited photos back within 12-24 hours, so you can list your properties sooner.',
    },
    {
        icon: 'fas fa-gem',
        title: 'Quality Results',
        description: 'Our meticulous process ensures every detail is perfect, from color correction to window pulls.',
    },
    {
        icon: 'fas fa-dollar-sign',
        title: 'Affordable Pricing',
        description: 'Top-tier editing services at competitive prices to maximize your return on investment.',
    }
]

const WhyChooseUs: React.FC = () => {
  return (
    <section id="about" className="section-padding bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="section-title">Why Choose Us?</h2>
        <p className="text-center max-w-3xl mx-auto mb-12 text-lg text-gray-600 leading-relaxed">
            We are a dedicated team of editors who use wheelchairs. Our passion for this work comes from the fact that it is not only what we excel at, but also what helps us sustain ourselves and provide for our families. With years of experience and exceptional skills, we are committed to delivering the highest-quality results tailored to your needs — with the best speed and pricing in the market.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {uspData.map((item, index) => (
                <div key={index} className="p-6">
                    <i className={`${item.icon} text-4xl text-blue-500 mb-4`}></i>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;