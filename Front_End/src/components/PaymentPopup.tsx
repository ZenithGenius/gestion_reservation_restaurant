import { X } from 'lucide-react';
import { useState } from 'react';

interface PaymentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    name: string;
    tel: string;
    date: string;
    time: string;
    persons: string;
  };
  selectedTable: number;
}

export function PaymentPopup({ isOpen, onClose, formData, selectedTable }: PaymentPopupProps) {
  const [requestStatus, setRequestStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setRequestStatus('pending');
    setErrorMessage('');
    try {
      const response = await fetch('http://127.0.0.1:5000/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.tel,
          table: selectedTable,
          date: formData.date,
          time: formData.time,
          number_of_guests: parseInt(formData.persons, 10),
        }),
      });

      if (!response.ok) {
        let message = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          message = errorData.message || message;
        } catch (error) {
          console.error("Error parsing error response:", error);
        }
        throw new Error(message);
      }

      setRequestStatus('success');
      onClose();
    } catch (error: unknown) {
      setRequestStatus('error');
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
      console.error('Error confirming reservation:', error);
    } finally {
      //Optional Timeout
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1a1a1a] rounded-xl p-6 w-full max-w-2xl relative"> {/* Increased max-width for responsiveness */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-[#D4AF37] text-xl font-bold mb-4">Confirm Reservation</h2>

        <div className="space-y-4 mb-6">
          <div className="bg-[#222] p-4 rounded-lg">
            <h3 className="text-[#D4AF37] font-semibold mb-2">Reservation Details</h3>
            <div className="space-y-2 text-gray-300">
              <p><span className="text-gray-400">Name:</span> {formData.name}</p>
              <p><span className="text-gray-400">Table:</span> {selectedTable}</p>
              <p><span className="text-gray-400">Date:</span> {formData.date}</p>
              <p><span className="text-gray-400">Time:</span> {formData.time}</p>
              <p><span className="text-gray-400">Guests:</span> {formData.persons}</p>
            </div>
          </div>

          <div className="bg-[#222] p-4 rounded-lg">
            <h3 className="text-[#D4AF37] font-semibold mb-2">Contact Information</h3>
            <div className="space-y-2 text-gray-300">
              <p><span className="text-gray-400">Phone:</span> {formData.tel}</p>
            </div>
          </div>
        </div>

        {requestStatus === 'pending' && <p>Sending request...</p>}
        {requestStatus === 'success' && <p className="text-green-500">Reservation confirmed!</p>}
        {requestStatus === 'error' && <p className="text-red-500">{errorMessage}</p>}

        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 px-4 py-2 bg-[#333] text-white rounded-md hover:bg-[#444] transition-colors">
            Cancel
          </button>
          <button onClick={handleConfirm} className="flex-1 px-4 py-2 bg-[#006400] text-white rounded-md hover:bg-[#005000] transition-colors">
            Confirm Reservation
          </button>
        </div>
      </div>
    </div>
  );
}
