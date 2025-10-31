import { Calendar } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Calendar className="h-6 w-6 text-indigo-400" />
            <span className="text-lg font-semibold">Timetable Buddy</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © 2025 Timetable Buddy. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Built with React, Express, and MongoDB
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;