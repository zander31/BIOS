"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/shared/SectionCard";
import { parts } from "@/lib/mock-data/parts";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Search, Plus } from "lucide-react";

const categories = ["All", ...Array.from(new Set(parts.map((p) => p.category)))];

export default function PartsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = parts.filter((p) => {
    const s = search.toLowerCase();
    const matchSearch =
      p.partNumber.toLowerCase().includes(s) ||
      p.name.toLowerCase().includes(s) ||
      p.customer.toLowerCase().includes(s) ||
      p.material.toLowerCase().includes(s);
    const matchCat = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div>
      <PageHeader
        title="Parts & Routings"
        subtitle={`${filtered.length} parts`}
        actions={
          <button className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-3.5 py-2 rounded-lg transition-colors">
            <Plus size={15} />
            Add Part
          </button>
        }
      />

      <SectionCard noPadding>
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-surface-200 flex-wrap">
          <div className="flex items-center gap-2 bg-surface-50 border border-surface-200 rounded-lg px-3 py-1.5 flex-1 max-w-xs">
            <Search size={13} className="text-ink-300 flex-shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search parts, materials, customers..."
              className="bg-transparent text-sm text-ink-900 placeholder-ink-300 outline-none flex-1 min-w-0"
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  category === cat
                    ? "bg-brand-500 text-white"
                    : "text-ink-500 hover:bg-surface-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-100">
              {["Part Number", "Name", "Material", "Customer", "Category", "Cycle Time", "Unit Cost", "Last Run", "Runs"].map((h) => (
                <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-ink-300 px-5 py-3 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {filtered.map((part) => (
              <tr key={part.id} className="hover:bg-surface-50 transition-colors cursor-pointer">
                <td className="px-5 py-3.5">
                  <Link href={`/parts/${part.id}`} className="text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors">
                    {part.partNumber}
                  </Link>
                  <p className="text-[10px] text-ink-400 mt-0.5">Rev {part.revision}</p>
                </td>
                <td className="px-5 py-3.5">
                  <p className="text-sm text-ink-900 max-w-[180px] truncate">{part.name}</p>
                  <p className="text-xs text-ink-400 mt-0.5 max-w-[180px] truncate">{part.description}</p>
                </td>
                <td className="px-5 py-3.5 text-sm text-ink-700 whitespace-nowrap">{part.material}</td>
                <td className="px-5 py-3.5 text-sm text-ink-700 whitespace-nowrap">{part.customer}</td>
                <td className="px-5 py-3.5">
                  <span className="text-xs bg-surface-100 text-ink-600 px-2 py-0.5 rounded-full font-medium">
                    {part.category}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-sm text-ink-700">{part.cycleTime} min</td>
                <td className="px-5 py-3.5 text-sm text-ink-700">{formatCurrency(part.unitCost)}</td>
                <td className="px-5 py-3.5 text-sm text-ink-500">{formatDate(part.lastRun)}</td>
                <td className="px-5 py-3.5 text-sm text-ink-700">{part.timesRun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </div>
  );
}
