import React, { useState } from 'react';
import type { FormData } from '../App';

interface BookingFormProps {
  onSubmit: (data: FormData) => void;
  initialData: FormData;
}

export function BookingForm({ onSubmit, initialData }: BookingFormProps) {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
        Enter your details below to make a reservation.
        After submitting, you'll be able to choose your preferred table.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 space-y-4">
          <input
            type="text"
            placeholder="Name"
            required
            className="w-full px-4 py-3 bg-transparent border border-[#333] rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] transition-colors"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="date"
            placeholder="Date"
            required
            className="w-full px-4 py-3 bg-transparent border border-[#333] rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <input
            type="number"
            placeholder="Number of persons"
            required
            min="1"
            max="8"
            className="w-full px-4 py-3 bg-transparent border border-[#333] rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] transition-colors"
            value={formData.persons}
            onChange={(e) => setFormData({ ...formData, persons: e.target.value })}
          />
        </div>

        {/* Right Column */}
        <div className="flex-1 space-y-4">
          <input
            type="tel"
            placeholder="Phone number"
            required
            className="w-full px-4 py-3 bg-transparent border border-[#333] rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] transition-colors"
            value={formData.tel}
            onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
          />
          <input
            type="time"
            placeholder="Time"
            required
            className="w-full px-4 py-3 bg-transparent border border-[#333] rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
          <button
            type="submit"
            className="w-full px-4 py-3 bg-[#006400] text-white font-semibold rounded-md hover:bg-[#005000] transition-colors"
          >
            CONTINUE TO TABLE SELECTION
          </button>
        </div>
      </form>
    </>
  );
}