import React from "react";
import { Film, Languages, AlertTriangle, Dice1 } from "lucide-react";

export function Suggestions({ onSuggestionClick }) {
  const suggestions = [
    
    {
      icon: <Languages className="w-5 h-5" />,
      text: "Translate an email",
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      text: "Troubleshoot deployment problems",
    },
    {
      icon: <Dice1 className="w-5 h-5" />,
      text: "Help me write an SQL script",
    },
  ];

  return (
    <div className="space-y-5">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSuggestionClick(suggestion.text)}
          className="flex items-center space-x-3 text-gray-400 hover:text-gray-200 transition-colors"
        >
          {suggestion.icon}
          <span className="text-[15px]">{suggestion.text}</span>
        </button>
      ))}
    </div>
  );
}
