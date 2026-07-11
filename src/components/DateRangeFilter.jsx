import { useState } from "react";
import Button from "./Button";

const ranges = [
  { key: "today", label: "Today" },
  { key: "week", label: "Week" },
  { key: "month", label: "Month" },
  { key: "year", label: "Year" },
  { key: "custom", label: "Custom" },
];

function DateRangeFilter({ onChange }) {
  const [selectedRange, setSelectedRange] = useState("today");
  const [customDates, setCustomDates] = useState({
    from: "",
    to: "",
  });

  const handleRangeClick = (rangeKey) => {
    setSelectedRange(rangeKey);

    if (rangeKey !== "custom") {
      const now = new Date();
      let from = new Date();
      let to = new Date();

      switch (rangeKey) {
        case "today":
          from = new Date(now.setHours(0, 0, 0, 0));
          to = new Date(now.setHours(23, 59, 59, 999));
          break;
        case "week":
          from = new Date(now.setDate(now.getDate() - 7));
          break;
        case "month":
          from = new Date(now.setDate(now.getDate() - 30));
          break;
        case "year":
          from = new Date(now.setDate(now.getDate() - 365));
          break;
        default:
          break;
      }

      onChange({
        range: rangeKey,
        from: from.toISOString().split("T")[0],
        to: to.toISOString().split("T")[0],
      });
    }
  };

  const handleCustomApply = () => {
    if (customDates.from && customDates.to) {
      onChange({
        range: "custom",
        from: customDates.from,
        to: customDates.to,
      });
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {ranges.map((range) => (
          <button
            key={range.key}
            onClick={() => handleRangeClick(range.key)}
            className={`rounded-full px-5 py-2 text-sm font-medium border transition hover:bg-blue-50 ${
              selectedRange === range.key
                ? "bg-blue-700 text-white border-blue-700"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {selectedRange === "custom" && (
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#111827]">
              Start Date
            </span>
            <input
              type="date"
              value={customDates.from}
              onChange={(e) =>
                setCustomDates({ ...customDates, from: e.target.value })
              }
              className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#111827]">
              End Date
            </span>
            <input
              type="date"
              value={customDates.to}
              onChange={(e) =>
                setCustomDates({ ...customDates, to: e.target.value })
              }
              className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <div className="flex items-end">
            <Button className="w-full" onClick={handleCustomApply}>
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DateRangeFilter;