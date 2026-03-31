import Page1 from "../imports/1";
import Page2 from "../imports/2";
import Page3 from "../imports/3";
import Page4 from "../imports/4";
import Page5 from "../imports/5";
import Page6 from "../imports/6";
import Page7 from "../imports/7";
import Page8 from "../imports/8";
import Page9 from "../imports/9";
import { useState } from "react";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const pages = [
    { number: 1, component: <Page1 />, title: "Обложка" },
    { number: 2, component: <Page2 />, title: "Введение" },
    { number: 3, component: <Page3 />, title: "Бейсбол" },
    { number: 4, component: <Page4 />, title: "Баскетбол" },
    { number: 5, component: <Page5 />, title: "Бокс" },
    { number: 6, component: <Page6 />, title: "Велосипед" },
    { number: 7, component: <Page7 />, title: "Серфинг" },
    { number: 8, component: <Page8 />, title: "Теннис" },
    { number: 9, component: <Page9 />, title: "Финал" },
  ];

  const currentPageData = pages.find(p => p.number === currentPage);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Top Menu */}
      <div className="sticky top-0 bg-white/70 backdrop-blur-md shadow-md z-10">
        <div className="max-w-[1200px] mx-auto px-4 py-4">
          {/* Page Navigation */}
          <div className="flex justify-center items-center gap-6">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-8 py-4 rounded-lg font-['Unbounded:Medium',sans-serif] text-2xl transition-all ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#00b2b7] text-white hover:bg-[#009499] shadow-lg"
              }`}
            >
              ← 
            </button>
            <span className="font-['Unbounded:Regular',sans-serif] text-lg text-[#2c2c2c] min-w-[120px] text-center">
              {currentPage} / {pages.length}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(pages.length, currentPage + 1))}
              disabled={currentPage === pages.length}
              className={`px-8 py-4 rounded-lg font-['Unbounded:Medium',sans-serif] text-2xl transition-all ${
                currentPage === pages.length
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#00b2b7] text-white hover:bg-[#009499] shadow-lg"
              }`}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Current Page Display */}
      <div className="max-w-[595px] mx-auto py-8 px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden relative h-[843px]">
          {currentPageData?.component}
        </div>
      </div>
    </div>
  );
}