'use client';

import React from 'react';
import AnimateOnScroll from './AnimateOnScroll';

const CtaSection = () => {
    const openModal = () => {
        window.dispatchEvent(new CustomEvent('open-modal'));
    };

    return (
        <AnimateOnScroll>
            <div className="mt-16 py-12 px-6 bg-gray-100 rounded-lg text-center border border-gray-200 shadow-sm">
                <h2 className="text-3xl font-bold text-gray-800">Ready to Elevate Your Listings?</h2>
                <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
                    Experience the difference professional editing makes. Send us your photos and get your first edit completely free.
                </p>
                <button
                    onClick={openModal}
                    className="mt-8 cta-button bg-[#007BFF] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-[#0056b3] transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                    Get Your Free Test Edit
                </button>
            </div>
        </AnimateOnScroll>
    );
};

export default CtaSection;
