
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CarFront, Activity, Airplay, File, KeyRound } from 'lucide-react';

const CustomNavbar = () => {
  const location = useLocation();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-800 hover:scale-105 transition-all duration-300">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-md p-1.5 relative group">
            <CarFront className="h-5 w-5 text-white relative z-10" />
            <div className="absolute inset-0 bg-blue-400 rounded-md filter blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
          </div>
          <span>Autonomous AI Traffic Management</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Button 
            variant={location.pathname === "/" ? "default" : "ghost"}
            size="sm" 
            asChild
            className={`transition-all duration-300 hover:scale-105 ${location.pathname === "/" ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"}`}
          >
                    <Link to="/">
          <Airplay className="mr-1 h-4 w-4" />
          Home
        </Link>
          </Button>
          <Button 
            variant={location.pathname === "/simulator" ? "default" : "ghost"}
            size="sm" 
            asChild
            className={`transition-all duration-300 hover:scale-105 ${location.pathname === "/simulator" ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"}`}
          >
            <Link to="/simulator">
<Activity className="mr-1 h-4 w-4" /> {/* className defined here: margin-right: 0.25rem (mr-1), height: 1rem (h-4), width: 1rem (w-4) */}
              Simulator
            </Link>
          </Button>
          {/* Wave icon imported from lucide-react as Activity */}
          <Button 
            variant={location.pathname === "/docs" ? "default" : "ghost"}
            size="sm" 
            asChild
            className={`transition-all duration-300 hover:scale-105 ${location.pathname === "/docs" ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"}`}
          >
           
            <Link to="/docs"> <File className="mr-1 h-4 w-4" />API Docs
            </Link>
            
          </Button>
          <Button 
            variant={location.pathname === "/generator" ? "default" : "ghost"}
            size="sm" 
            asChild
            className={`transition-all duration-300 hover:scale-105 ${location.pathname === "/generator" ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"}`}
          >
            <Link to="/generator"><KeyRound className='mr-1 h-4 h-4' />API Keys</Link>
            
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default CustomNavbar;
