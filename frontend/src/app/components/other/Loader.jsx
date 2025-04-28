import React from "react";
import Container from "../layout/Container";

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

export const DashboardLoader = () => {
  return (
    <Container title="Dashboard">
      <div className="space-y-5">
        <section className="flex flex-wrap gap-5">
          {[...Array(3)].map((_, index) => (
            <article
              key={index}
              className="relative bg-white border-l-gray-200 min-w-60 rounded-2xl border-l-4 shadow-[0_0_8px_0_rgba(0,0,0,0.05)] flex-1 flex flex-col gap-y-2 p-5"
            >
              <header className="flex items-center gap-x-5">
                <div className="w-12 animate-pulse h-12 bg-gray-200 rounded-xl"></div>
                <div className="h-6 animate-pulse rounded-md w-24 bg-gray-200"></div>
              </header>

              <div className="w-24 animate-pulse rounded-4xl absolute top-1/2 right-7 -translate-y-1/2 h-24 bg-gray-200"></div>

              <div>
                <div className="h-8 animate-pulse bg-gray-200 rounded w-1/3"></div>{" "}
                <div className="h-4 animate-pulse bg-gray-200 rounded w-1/2 mt-4"></div>{" "}
              </div>
            </article>
          ))}
        </section>

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="bg-white rounded-xl p-5 flex flex-col gap-y-7 flex-1">
            <div className="h-8 animate-pulse bg-gray-200 rounded w-1/3"></div>

            <div className="grid gap-y-4">
              <div className="h-14 animate-pulse bg-gray-200 rounded"></div>
              <div className="h-14 animate-pulse bg-gray-200 rounded"></div>
              <div className="h-14 animate-pulse bg-gray-200 rounded"></div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 flex flex-col gap-y-7 flex-1">
            <div className="h-8 animate-pulse bg-gray-200 rounded w-1/3"></div>

            <div className="mx-auto animate-pulse w-40 h-40 rounded-full bg-gray-200"></div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export const ReportLoader = () => {
  return (
    <section className="bg-white px-4 py-6 rounded-lg">
      <header className="flex justify-between items-center">
        <div className="h-12 animate-pulse bg-gray-200 rounded w-1/3"></div>

        <div className="h-12 animate-pulse bg-gray-200 rounded w-1/8"></div>
      </header>

      <div className="md:grid hidden gap-y-4 mt-7">
        <div className="h-10 animate-pulse bg-gray-200 rounded"></div>
        <div className="h-10 animate-pulse bg-gray-200 rounded"></div>
        <div className="h-10 animate-pulse bg-gray-200 rounded"></div>
        <div className="h-10 animate-pulse bg-gray-200 rounded"></div>
        <div className="h-10 animate-pulse bg-gray-200 rounded"></div>
        <div className="h-10 animate-pulse bg-gray-200 rounded"></div>
      </div>
    </section>
  );
};

export const ContainerLoader = () => {
  return (
    <section className="bg-white px-4 py-6 rounded-lg">
      <header className="flex justify-between items-center">
        <div className="h-12 animate-pulse bg-gray-200 rounded w-1/3"></div>

        <div className="h-12 animate-pulse bg-gray-200 rounded w-1/8"></div>
      </header>

      <div className="md:grid hidden gap-y-4 mt-7">
        <div className="h-10 animate-pulse bg-gray-200 rounded"></div>
        <div className="h-10 animate-pulse bg-gray-200 rounded"></div>
        <div className="h-10 animate-pulse bg-gray-200 rounded"></div>
        <div className="h-10 animate-pulse bg-gray-200 rounded"></div>
        <div className="h-10 animate-pulse bg-gray-200 rounded"></div>
        <div className="h-10 animate-pulse bg-gray-200 rounded"></div>
      </div>

      <div className="grid mt-7 sm:grid-cols-2 md:hidden gap-y-5 gap-x-8">
        {[...Array(4)].map((_, index) => (
          <article key={index} className="flex-1 flex flex-col gap-y-2 p-5">
            <header className="flex justify-between items-center gap-x-5">
              <div className="w-1/6 animate-pulse h-10 bg-gray-200 rounded-xl"></div>
              <div className="h-10 w-1/4 animate-pulse rounded-md w-24 bg-gray-200"></div>
            </header>

            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <div className="h-8 animate-pulse bg-gray-200 rounded w-12"></div>
                <div className="h-4 animate-pulse bg-gray-200 rounded w-20 mt-2"></div>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-8 w-8 animate-pulse bg-gray-200 rounded w-1/2 mt-2"></div>
                <div className="h-8 w-8 animate-pulse bg-gray-200 rounded w-1/2 mt-2"></div>
                <div className="h-8 w-8 animate-pulse bg-gray-200 rounded w-1/2 mt-2"></div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Loader;
