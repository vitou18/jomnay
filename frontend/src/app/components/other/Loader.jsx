import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center absolute top-0 left-0 z-20 bg-purple-600/4 backdrop-blur-md">
      <div className="relative flex items-center justify-center w-10 h-10 border-4 border-purple-600/40 rounded-full shadow-md shadow-purple-600/20 inset-shadow">
        <span className="absolute w-2 h-2 bg-purple-600 rounded-full shadow-dot animate-orbit [animation-delay:0.02s]"></span>
        <span className="absolute w-2 h-2 bg-purple-600 rounded-full shadow-dot animate-orbit [animation-delay:0.04s]"></span>
        <span className="absolute w-2 h-2 bg-purple-600 rounded-full shadow-dot animate-orbit [animation-delay:0.06s]"></span>
        <span className="absolute w-2 h-2 bg-purple-600 rounded-full animate-orbit"></span>

        <style>
          {`
          @keyframes orbit {
            from {
              transform: rotate(0deg) translateX(18px) rotate(0deg);
            }
            to {
              transform: rotate(360deg) translateX(18px) rotate(-360deg);
            }
          }
          .animate-orbit {
            animation: orbit 1s linear infinite;
          }
          .shadow-dot {
            box-shadow: 0 0 3px #9333EA, 0 0 3px #9333EA inset;
          }
          .inset-shadow {
            box-shadow: inset 0 0 3px #9333EA;
          }
        `}
        </style>
      </div>
    </div>
  );
};

export default Loader;
