import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <Twitter className="h-5 w-5" />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <Instagram className="h-5 w-5" />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <Linkedin className="h-5 w-5" />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Youtube className="h-5 w-5" />, href: 'https://youtube.com', label: 'YouTube' }
  ];

  const quickLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Courses', href: '/courses' },
    { label: 'Premium', href: '/premium' },
    { label: 'Blog', href: '/articles' },
    { label: 'Contact', href: '/contact' }
  ];

  const resources = [
    { label: 'Documentation', href: '#' },
    { label: 'Certification', href: '#' },
    { label: 'Community', href: '/community' },
    { label: 'Forum', href: '/forum' },
    { label: 'Help Center', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <h3 className="text-white text-lg font-semibold">Agile Learning Platform</h3>
            </div>
            <p className="text-gray-400">
              Empowering professionals with comprehensive Agile methodology training and certification.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="hover:text-white transition-colors block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <Link
                    to={resource.href}
                    className="hover:text-white transition-colors block py-1"
                  >
                    {resource.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-1" />
                <div>
                  <p className="hover:text-white transition-colors">support@agilelearning.com</p>
                  <p className="hover:text-white transition-colors">info@agilelearning.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-1" />
                <div>
                  <p className="hover:text-white transition-colors">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-400">Mon-Fri from 8am to 6pm</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1" />
                <address className="not-italic">
                  123 Agile Street<br />
                  San Francisco, CA 94105<br />
                  United States
                </address>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p>&copy; {currentYear} Agile Learning Platform. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;