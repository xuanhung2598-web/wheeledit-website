import { Service } from '../types';
import servicesData from '../_data/services.json';
import testimonialsData from '../_data/testimonials.json';


export const services: Service[] = servicesData.services;

export const testimonials = testimonialsData.testimonials;

export const socialLinks = {
    facebook: 'https://facebook.com/your-page',
    instagram: 'https://instagram.com/your-profile',
    youtube: 'https://youtube.com/your-channel',
    whatsapp: 'https://wa.me/84334925969',
};
