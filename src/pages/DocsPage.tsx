
import React from 'react';
import CustomNavbar from '@/components/CustomNavbar';
import Documentation from '@/components/Documentation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DocsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomNavbar />
      <main className="flex-grow pt-24 pb-20">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">API Documentation</h1>
            <p className="text-xl text-muted-foreground mx-auto max-w-2xl mb-8">
              Everything you need to know about integrating with the Traffic Manager API.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link to="/generator" className="h-12 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 border-2 border-blue-400">
                  Get API Key
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <Documentation />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DocsPage;
