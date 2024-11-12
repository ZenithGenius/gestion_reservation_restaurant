import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { BookingForm } from './components/BookingForm';
import { TableSelection } from './components/TableSelection';
import { PaymentPopup } from './components/PaymentPopup';

export type FormData = {
  name: string;
  tel: string;
  date: string;
  time: string;
  persons: string;
};

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    tel: '',
    date: '',
    time: '',
    persons: ''
  });

  const [showTableSelection, setShowTableSelection] = useState(false);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setShowTableSelection(true);
  };

  const handleTableSelect = (tableId: number) => {
    setSelectedTable(tableId);
    setShowPaymentPopup(true);
  };

  const handleConfirmReservation = () => {
    // Here you would typically make an API call to save the reservation
    console.log('Reservation confirmed:', { ...formData, tableId: selectedTable });
    setShowPaymentPopup(false);
    setShowTableSelection(false);
    setFormData({
      name: '',
      tel: '',
      date: '',
      time: '',
      persons: ''
    });
    setSelectedTable(null);
    alert('Reservation confirmed! You will receive a confirmation email shortly.');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-[#1a1a1a] rounded-2xl p-8 md:p-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          {showTableSelection && (
            <button
              onClick={() => setShowTableSelection(false)}
              className="absolute left-8 top-8 text-[#D4AF37] hover:text-[#E5C158] transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          <h1 className="text-[#D4AF37] text-2xl md:text-3xl font-bold tracking-wide">
            {showTableSelection ? 'SELECT A TABLE' : 'BOOK A TABLE'}
          </h1>
        </div>

        {showTableSelection ? (
          <TableSelection
            selectedTable={selectedTable}
            onTableSelect={handleTableSelect}
            persons={parseInt(formData.persons)}
          />
        ) : (
          <BookingForm onSubmit={handleFormSubmit} initialData={formData} />
        )}

        <PaymentPopup
          isOpen={showPaymentPopup}
          onClose={() => setShowPaymentPopup(false)}
          onConfirm={handleConfirmReservation}
          formData={formData}
          selectedTable={selectedTable!}
        />
      </div>
    </div>
  );
}

export default App;