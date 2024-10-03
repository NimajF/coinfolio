"use client";
import { useState } from "react";

export default function SelectForApi({ option }) {
  const [selectedOption, setSelectedOption] = useState(0);

  return (
    <div className="flex flex-col items-end w-24">
      <label className="text-white text-sm mb-2 font-sans">Select Option</label>

      <div className="relative mb-5">
        <select
          className="block w-full text-sm text-white bg-gray-800 border border-gray-600 rounded-lg p-2.5"
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            option(e.target.value);
          }}
        >
          <option value={0}>Top Gainers</option>
          <option value={1}>Top Losers</option>
        </select>
      </div>
    </div>
  );
}
