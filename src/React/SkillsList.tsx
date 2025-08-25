import { useState } from "react";

const CategoryIcons = {
  "Agentic AI": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-[var(--sec)] opacity-70"
    >
      <path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM20 11H4V19H20V11ZM20 5H4V9H20V5ZM11 6V8H9V6H11ZM7 6V8H5V6H7Z"></path>
    </svg>
  ),
  "End-to-End Projects": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-[var(--sec)] opacity-70"
    >
      <path d="M 21 3 C 21.5523 3 22 3.4477 22 4 V 20 C 22 20.5523 21.5523 21 21 21 H 3 C 2.4477 21 2 20.5523 2 20 V 4 C 2 3.4477 2.4477 3 3 3 H 21 Z M 20 11 H 4 V 19 H 20 V 11 Z M 20 5 H 4 V 9 H 20 V 5 Z M 11 6 V 8 H 9 V 6 H 11 Z M 15 8 M 15 6 M 15 8 M 15 8 M 13 8 V 6 M 13 8 M 13 6 L 15 6 L 15 8 L 13 8 Z"></path>
    </svg>
  ),
  "Leadership & Innovation": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-[var(--sec)] opacity-70"
    >
      <path d="M 21 3 C 21.5523 3 22 3.4477 22 4 V 20 C 22 20.5523 21.5523 21 21 21 H 3 C 2.4477 21 2 20.5523 2 20 V 4 C 2 3.4477 2.4477 3 3 3 H 21 Z M 20 11 H 4 V 19 H 20 V 11 Z M 20 5 H 4 V 9 H 20 V 5 Z M 17 6 L 17 8 L 19 8 L 19 6 Z M 15 8 M 15 6 M 15 8 M 15 8 M 13 8 V 6 M 13 8 M 13 6 L 15 6 L 15 8 L 13 8 Z"></path>
    </svg>
  ),
};

const SkillsList = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const skills = {
    "Agentic AI": [
      "RAG Architectures",
      "Generative AI Applications",
      "MCP | A2A Protocols",
      "Classic ML & NLP Tools",
      "AI Evaluation"
    ],
    "End-to-End Projects": [
      "Gathering Requirements | Client Delivery",
      "Concepts -> POCs -> MVPs -> Services",
      "Backend development & Frontend (vibecoding :D)",
      "DevOps & MLOps | CI/CD"
    ],
    "Leadership & Innovation": [
      "Lead AI Projects",
      "AI Mentorship",
      "Technical Outreach",
      "Research & Development"
      
    ],
  };

  const toggleItem = (item: string) => {
    setOpenItem(openItem === item ? null : item);
  };

  return (
    <div className="text-left pt-3 md:pt-9">
      <h3 className="text-[var(--white)] text-3xl md:text-4xl font-semibold md:mb-6">
        My day to day
      </h3>
      <ul className="space-y-4 mt-4 text-lg">
        {Object.entries(skills).map(([category, items]) => (
          <li key={category} className="w-full">
            <div
              onClick={() => toggleItem(category)}
              className="md:w-[400px] w-full bg-[#1414149c] rounded-2xl text-left hover:bg-opacity-80 transition-all border border-[var(--white-icon-tr)] cursor-pointer overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4">
                {CategoryIcons[category]}
                <div className="flex items-center gap-2 flex-grow justify-between">
                  <div className="min-w-0 max-w-[200px] md:max-w-none overflow-hidden">
                    <span className="block truncate text-[var(--white)] text-lg">
                      {category}
                    </span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-6 h-6 text-[var(--white)] transform transition-transform flex-shrink-0 ${
                      openItem === category ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                  </svg>
                </div>
              </div>

              <div
                className={`transition-all duration-300 px-4 ${
                  openItem === category
                    ? "max-h-[500px] pb-4 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-2 text-[var(--white-icon)] text-sm">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className="pl-1">•</span>
                      <li className="pl-3">{item}</li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsList;
