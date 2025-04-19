import React from "react";
import CountUp from "react-countup";

const Card = ({ icon: Icon, blur: Blur, title, balance, style, desc }) => {
  return (
    <article
      className={`${
        style === "green"
          ? "border-l-green-600"
          : style === "red"
          ? "border-l-red-600"
          : "border-l-purple-600"
      } bg-white min-w-60 group transition-all duration-300 hover:scale-105 overflow-hidden relative rounded-2xl border-l-4 shadow-[0_0_8px_0_rgba(0,0,0,0.05)] flex-1 flex flex-col gap-y-2 p-5`}
    >
      <header className="flex items-center gap-x-5">
        <div
          className={`w-12 h-12 text-lg md:text-xl rounded-xl grid place-items-center
            ${
              style === "green"
                ? "text-emerald-600 bg-emerald-600/5"
                : style === "red"
                ? "text-rose-600 bg-rose-600/5"
                : "text-purple-600 bg-purple-600/5"
            }
            `}
        >
          <Icon />
        </div>
        <span className="text-gray-500 font-medium md:text-lg">{title}</span>
      </header>

      <main className="mt-2.5">
        <h3 className="font-semibold text-xl md:text-2xl">
          $
          <CountUp
            start={0}
            end={parseFloat(balance)}
            duration={1.5}
            decimals={2}
            separator=","
          />
        </h3>
        <span className="text-gray-500 text-sm">{desc}</span>

        <div className="opacity-[3%] group-hover:opacity-[5%] transition-all duration-300 text-[120px] absolute -rotate-45 -bottom-2 -right-2">
          <Blur />
        </div>
      </main>
    </article>
  );
};

export default Card;
