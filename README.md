# Restaurant Reservation System

This project consists of a frontend (React) and a backend (Flask) application for managing restaurant reservations.

## Frontend (Front_End)

The frontend is built using React, Tailwind CSS, and Lucide React for icons.  It provides a user interface for:

* **Booking a Table:**  A form to enter customer details, date, time, and number of guests.
* **Table Selection:**  A visual representation of tables, allowing users to select an available table.
* **Payment/Confirmation:** A popup to confirm the reservation details before submission.

**Technologies Used:**

* React
* Tailwind CSS
* Lucide React

**Directory Structure:**

```
Front_End/src/
├── App.tsx             // Main application component
├── components/         // Reusable UI components
│   ├── BookingForm.tsx
│   ├── PaymentPopup.tsx
│   └── TableSelection.tsx
├── index.css           // Styles
├── main.tsx            // Entry point
└── vite-env.d.ts       // Vite environment declarations
```

## Backend (Backend_End)

The backend is a Flask application that handles:

* **Reservation Storage:** Stores reservation data in a MySQL database.
* **SMS Notifications:** Sends SMS confirmations using Twilio.

**Technologies Used:**

* Flask
* MySQL
* Twilio
* Python

**Directory Structure:**

```
Backend_End/
├── app.py              // Main Flask application
├── config.py           // Configuration (database credentials, Twilio keys)
├── requirements.txt    // Project dependencies
└── venv/               // Virtual environment
```

**Database Schema (reservations table):**

```sql
CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    table_number INT NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    number_of_guests INT NOT NULL
);
```

**To run the application:**

1. **Backend:**
   - Install dependencies: `pip install -r Backend_End/requirements.txt`
   - Set up environment variables in `.env.local` (Twilio credentials, database credentials).  **Replace placeholders with your actual credentials.**  Example:
     ```
     twillio_key=YOUR_TWILIO_KEY
     twillio_phone=+1YOUR_TWILIO_NUMBER
     ```
   - Run the Flask app: `python Backend_End/app.py`

2. **Frontend:**
   - Navigate to the `Front_End` directory.
   - Install dependencies: `npm install`
   - Run the development server: `npm run dev`

The frontend will connect to the backend at `http://127.0.0.1:5000/reserve`.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request.


## License

[Specify your license here, e.g., MIT License]
