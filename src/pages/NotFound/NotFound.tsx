import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function NotFound() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 animate-float"
            style={{
              backgroundColor: '#9FCC66',
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 10 + 10 + 's',
            }}
          />
        ))}
      </div>

      {/* Parallax effect */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
        }}
      >
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl opacity-50" style={{ backgroundColor: '#9FCC66' }} />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-50" style={{ backgroundColor: '#7AB855' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Animated 404 */}
          <div className="relative mb-8">
            <h1 className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-black text-transparent bg-clip-text leading-none animate-gradient-x select-none" style={{ backgroundImage: 'linear-gradient(to right, #9FCC66, #7AB855, #A8D878)' }}>
              404
            </h1>
            <div className="absolute inset-0 blur-2xl opacity-50">
              <h1 className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-black text-transparent bg-clip-text leading-none animate-gradient-x" style={{ backgroundImage: 'linear-gradient(to right, #9FCC66, #7AB855, #A8D878)' }}>
                404
              </h1>
            </div>
          </div>

          {/* Pearl-themed decorative elements */}
          <div className="relative mb-8">
            <div className="absolute -left-16 -top-8">
              <div className="w-12 h-12 rounded-full opacity-80 animate-bounce-slow shadow-xl" style={{ background: 'linear-gradient(to bottom right, white, #9FCC66)' }} />
            </div>
            <div className="absolute -right-20 top-4">
              <div className="w-8 h-8 rounded-full opacity-70 animate-bounce-slow shadow-xl" style={{ background: 'linear-gradient(to bottom right, white, #9FCC66)', animationDelay: '0.5s' }} />
            </div>
          </div>

          {/* Main content */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up">
            Oops! Page Not Found
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Looks like this pearl slipped away. The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Interactive pearl illustration */}
          <div className="mb-12 relative group">
            <div className="w-48 h-48 relative animate-pulse-slow">
              <div className="absolute inset-0 rounded-full opacity-80 blur-xl group-hover:scale-110 transition-transform duration-500" style={{ background: 'linear-gradient(to bottom right, white, #9FCC66, #B5DC88)' }} />
              <div className="absolute inset-4 rounded-full shadow-2xl transition-shadow duration-500" style={{ background: 'linear-gradient(to bottom right, white, #E8F5D9)', boxShadow: '0 25px 50px -12px rgba(159, 204, 102, 0.5)' }} />
              <div className="absolute inset-8 bg-white rounded-full opacity-60" />
              <div className="absolute top-12 left-12 w-8 h-8 bg-white rounded-full opacity-80 blur-sm" />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => navigate('/')}
              className="group relative px-8 py-4 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ 
                background: 'linear-gradient(to right, #9FCC66, #7AB855)',
                boxShadow: isHovering ? '0 25px 50px -12px rgba(159, 204, 102, 0.5)' : 'none'
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </span>
              <div className={`absolute inset-0 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`} style={{ background: 'linear-gradient(to right, #7AB855, #9FCC66)' }} />
            </button>

            <button
              onClick={() => navigate('/shop')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-full border-2 hover:bg-white/20 hover:scale-105 transition-all duration-300 hover:shadow-xl"
              style={{ 
                borderColor: 'rgba(159, 204, 102, 0.3)',
                boxShadow: '0 0 20px rgba(159, 204, 102, 0.2)'
              }}
            >
              Explore Shop
            </button>
          </div>

          {/* Additional helpful links */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-gray-400 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">
              About Us
            </button>
            <span className="text-gray-600">•</span>
            <button onClick={() => navigate('/contact-us')} className="hover:text-white transition-colors">
              Contact Support
            </button>
            <span className="text-gray-600">•</span>
            <button onClick={() => navigate(-1)} className="hover:text-white transition-colors">
              Go Back
            </button>
          </div>
        </div>
      </div>

      {/* Custom animations styles */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default NotFound;