import { Check, X } from 'lucide-react';

interface Table {
  id: number;
  seats: number;
  isAvailable: boolean;
  position: { x: number; y: number };
}

interface TableMapProps {
  selectedTable: number | null;
  onTableSelect: (tableId: number) => void;
}

const tables: Table[] = [
  { id: 1, seats: 2, isAvailable: true, position: { x: 20, y: 20 } },
  { id: 2, seats: 4, isAvailable: false, position: { x: 120, y: 20 } },
  { id: 3, seats: 6, isAvailable: true, position: { x: 220, y: 20 } },
  { id: 4, seats: 4, isAvailable: true, position: { x: 20, y: 120 } },
  { id: 5, seats: 2, isAvailable: true, position: { x: 120, y: 120 } },
  { id: 6, seats: 8, isAvailable: false, position: { x: 220, y: 120 } },
  // { id: 7, seats: 4, isAvailable: true, position: { x: 20, y: 220 } },
  // { id: 8, seats: 6, isAvailable: false, position: { x: 120, y: 220 } },
  // { id: 9, seats: 2, isAvailable: true, position: { x: 220, y: 220 } },
];

export function TableMap({ selectedTable, onTableSelect }: TableMapProps) {
  return (
    <div className="relative w-[300px] h-[300px] bg-[#111] rounded-lg p-4 mb-6">
      <div className="absolute top-4 right-4 flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#006400]"></div>
          <span className="text-sm text-gray-300">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#8B0000]"></div>
          <span className="text-sm text-gray-300">Reserved</span>
        </div>
      </div>

      {tables.map((table) => (
        <button
          key={table.id}
          onClick={() => table.isAvailable && onTableSelect(table.id)}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-24 h-16 rounded-lg flex flex-col items-center justify-center transition-all
            ${table.isAvailable
              ? selectedTable === table.id
                ? 'bg-[#008000] ring-2 ring-[#D4AF37]'
                : 'bg-[#006400] hover:bg-[#007000]'
              : 'bg-[#8B0000] cursor-not-allowed'}`}
          style={{ left: `${table.position.x}px`, top: `${table.position.y}px` }}
          disabled={!table.isAvailable}
        >
          <span className="text-white font-semibold">Table {table.id}</span>
          <span className="text-sm text-gray-300">{table.seats} seats</span>
          {table.isAvailable ? (
            selectedTable === table.id && <Check className="absolute -top-2 -right-2 w-5 h-5 text-[#D4AF37]" />
          ) : (
            <X className="absolute -top-2 -right-2 w-5 h-5 text-red-500" />
          )}
        </button>
      ))}
    </div>
  );
}
