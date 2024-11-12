import React from 'react';
import { Check, X } from 'lucide-react';

interface Table {
  id: number;
  seats: number;
  isAvailable: boolean;
  position: { x: number; y: number };
}

interface TableSelectionProps {
  selectedTable: number | null;
  onTableSelect: (tableId: number) => void;
  persons: number;
}

const tables: Table[] = [
  { id: 1, seats: 2, isAvailable: true, position: { x: 20, y: 20 } },
  { id: 2, seats: 4, isAvailable: false, position: { x: 20, y: 50 } },
  { id: 3, seats: 6, isAvailable: true, position: { x: 50, y: 20 } },
  { id: 4, seats: 4, isAvailable: true, position: { x: 50, y: 50 } },
  { id: 5, seats: 2, isAvailable: true, position: { x: 80, y: 20 } },
  { id: 6, seats: 8, isAvailable: false, position: { x: 80, y: 50 } },
];

export function TableSelection({ selectedTable, onTableSelect, persons }: TableSelectionProps) {
  return (
    <>
      <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
        Select a table that matches your party size. Available tables are shown in green.
        Tables that are too small for your party or already reserved are disabled.
      </p>

      <div className="relative w-full h-[400px] bg-[#111] rounded-lg p-4 mb-6">
        <div className="absolute top-4 right-4 flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#006400]"></div>
            <span className="text-sm text-gray-300">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#8B0000]"></div>
            <span className="text-sm text-gray-300">Reserved/Unavailable</span>
          </div>
        </div>
        
        {tables.map((table) => {
          const isValidSize = table.seats >= persons;
          const isSelectable = table.isAvailable && isValidSize;

          return (
            <button
              key={table.id}
              onClick={() => isSelectable && onTableSelect(table.id)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-24 h-16 rounded-lg flex flex-col items-center justify-center transition-all
                ${isSelectable 
                  ? selectedTable === table.id
                    ? 'bg-[#008000] ring-2 ring-[#D4AF37]' 
                    : 'bg-[#006400] hover:bg-[#007000]'
                  : 'bg-[#8B0000] cursor-not-allowed'}`}
              style={{ left: `${table.position.x}%`, top: `${table.position.y}%` }}
              disabled={!isSelectable}
            >
              <span className="text-white font-semibold">Table {table.id}</span>
              <span className="text-sm text-gray-300">{table.seats} seats</span>
              {isSelectable ? (
                selectedTable === table.id && <Check className="absolute -top-2 -right-2 w-5 h-5 text-[#D4AF37]" />
              ) : (
                <X className="absolute -top-2 -right-2 w-5 h-5 text-red-500" />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}