const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="relative">
        {/* Animated Text Container */}
        <div className="flex items-center gap-3 overflow-hidden">
          {['K', 'E', 'Z', 'I'].map((letter, index) => (
            <span
              key={index}
              className="text-5xl font-serif italic font-bold tracking-tighter text-slate-950 animate-reveal-letter"
              style={{
                animationDelay: `${index * 0.1}s`,
                opacity: 0
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Minimalist Progress Line */}
        <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-slate-100 overflow-hidden">
          <div className="h-full bg-slate-950 w-1/3 animate-progress-slide" />
        </div>
      </div>

      {/* Subtext */}
      <p className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 animate-pulse">
        Loading
      </p>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes reveal-letter {
          0% {
            opacity: 0;
            transform: translateY(20px) skewY(5deg);
          }
          50% {
            opacity: 1;
            transform: translateY(0) skewY(0deg);
          }
          100% {
            opacity: 0.3;
            transform: translateY(0) skewY(0deg);
          }
        }

        @keyframes progress-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }

        .animate-reveal-letter {
          animation: reveal-letter 2s ease-in-out infinite;
        }

        .animate-progress-slide {
          animation: progress-slide 1.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}} />
    </div>
  );
};

export default Loading;