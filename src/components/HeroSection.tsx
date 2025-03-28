
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, LineChart, Shield, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden pt-28 pb-20">
      {/* Video background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover opacity-30 dark:opacity-20"
          poster="https://images.unsplash.com/photo-1494522358652-f30e61a60313?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-highway-traffic-at-night-time-lapse-10652-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent z-10"></div>
      </div>
      
      {/* Animated traffic grid overlay */}
      <div 
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMyMDJCNDAiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNMzAgNjBWME0wIDMwaDYwIi8+PC9nPjwvc3ZnPg==')]"
        style={{ opacity: 0.15 }}
        aria-hidden="true"
        className="z-10"
      />

      {/* Futuristic particles overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {Array.from({ length: 18 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-70 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 7}s`
            }}
          />
        ))}
      </div>

      <div className="container px-4 sm:px-6 relative z-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center px-3 py-1.5 mb-6 text-sm font-medium rounded-full bg-accent/10 text-accent animate-pulse">
            <span className="flex items-center">
              <Zap className="w-3.5 h-3.5 mr-1.5 animate-pulse" />
              Smart traffic management
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up text-balance">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              Autonomous AI Traffic Management
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mx-auto max-w-2xl mb-8 animate-fade-up [animation-delay:400ms] text-balance">
            Our intelligent system analyzes traffic flow in real-time, optimizing signal timings and reducing congestion through advanced computer vision.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-up [animation-delay:600ms]">
            <Button asChild size="lg" className="h-12 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
              <Link to="/generator">
                Get API access
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-6 backdrop-blur border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 hover:scale-105">
              <Link to="/simulator">
                Try the simulator
              </Link>
            </Button>
          </div>
        </div>

        {/* Animated traffic metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-up [animation-delay:800ms]">
          <StatsCard 
            icon={<Globe className="w-5 h-5 text-blue-500" />}
            value="99.99%"
            label="Traffic recognition accuracy"
            gradient="from-blue-500/20 to-blue-600/5"
          />
          <StatsCard 
            icon={<LineChart className="w-5 h-5 text-green-500" />}
            value="500ms"
            label="Real-time response time"
            gradient="from-green-500/20 to-green-600/5"
          />
          <StatsCard 
            icon={<Shield className="w-5 h-5 text-purple-500" />}
            value="30%"
            label="Traffic congestion reduction"
            gradient="from-purple-500/20 to-purple-600/5"
          />
        </div>
      </div>
    </div>
  );
};

interface StatsCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  gradient: string;
}

const StatsCard = ({ icon, value, label, gradient }: StatsCardProps) => {
  return (
    <div className={cn(
      "relative rounded-xl overflow-hidden p-6 glass-panel transition-all duration-300 hover:scale-105 hover:shadow-lg",
      "before:absolute before:inset-0 before:opacity-20 before:bg-gradient-to-br",
      `before:${gradient}`
    )}>
      <div className="flex items-center gap-4">
        <div className="p-2.5 rounded-full bg-white dark:bg-gray-800 shadow-sm animate-pulse">
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
