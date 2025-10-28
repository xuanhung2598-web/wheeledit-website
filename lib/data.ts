import fs from 'fs';
import path from 'path';
import { Service } from '../types';

const dataDirectory = path.join(process.cwd(), '_data');

export function getServices(): Service[] {
  const fullPath = path.join(dataDirectory, 'services.json');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.services;
}

export function getTestimonials() {
  const fullPath = path.join(dataDirectory, 'testimonials.json');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.testimonials;
}

export function getSocialLinks() {
  const fullPath = path.join(dataDirectory, 'socialLinks.json');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(fileContents);
}
