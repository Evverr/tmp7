import Page1 from "../imports/1";
import Page2 from "../imports/2";
import Page3 from "../imports/3";
import Page4 from "../imports/4";
import Page5 from "../imports/5";
import Page6 from "../imports/6";
import Page7 from "../imports/7";
import Page8 from "../imports/8";
import Page9 from "../imports/9";
import { useEffect, useState } from "react";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedPage, setDisplayedPage] = useState(1);
  const [isPageVisible, setIsPageVisible] = useState(true);

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

  const displayedPageData = pages.find((p) => p.number === displayedPage);

  useEffect(() => {
    if (currentPage === displayedPage) {
      return;
    }

    setIsPageVisible(false);

    const switchTimer = window.setTimeout(() => {
      setDisplayedPage(currentPage);
      setIsPageVisible(true);
    }, 180);

    return () => window.clearTimeout(switchTimer);
  }, [currentPage, displayedPage]);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Top Menu */}
      <div className="sticky top-0 bg-white/70 backdrop-blur-md shadow-md z-10">
        <div className="max-w-[1200px] mx-auto px-3 py-3">
          {/* Page Navigation */}
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-6 py-3 rounded-lg font-['Unbounded',sans-serif] font-medium text-lg transition-all ${
                currentPage === 1
                  ? "bg-white text-gray-300 cursor-not-allowed border border-gray-200"
                  : "bg-white text-[#00b2b7] hover:bg-gray-50 shadow-lg border border-[#d9eeef]"
              }`}
            >
              ← 
            </button>
            <span className="font-['Unbounded',sans-serif] font-normal text-base text-[#2c2c2c] min-w-[84px] text-center">
              {currentPage} / {pages.length}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(pages.length, currentPage + 1))}
              disabled={currentPage === pages.length}
              className={`px-6 py-3 rounded-lg font-['Unbounded',sans-serif] font-medium text-lg transition-all ${
                currentPage === pages.length
                  ? "bg-white text-gray-300 cursor-not-allowed border border-gray-200"
                  : "bg-white text-[#00b2b7] hover:bg-gray-50 shadow-lg border border-[#d9eeef]"
              }`}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Current Page Display */}
      <div className="max-w-[595px] mx-auto py-8 px-4">
        <div
          className={`bg-white shadow-lg rounded-lg overflow-hidden relative h-[843px] transition-opacity duration-200 ${
            isPageVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {displayedPageData?.component}
        </div>
      </div>
    </div>
  );
}
