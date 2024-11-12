from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS
from twilio.rest import Client
from config import account_sid, auth_token, twilio_phone_number

account_sid = account_sid
auth_token = auth_token
twilio_phone_number = twilio_phone_number

app = Flask(__name__)
CORS(app) # Enable CORS for development

# Database credentials
mydb = mysql.connector.connect(
  host="localhost",
  user="admin",
  password="123456789",
  database="your_database_name"
)

def send_sms(message):
    client = Client(account_sid, auth_token)
    message = client.messages.create(
        body=message,
        from_=twilio_phone_number,
        to="+237672360583"
    )
    print(f"SMS sent: {message.sid}")

@app.route('/reserve', methods=['POST'])
def reserve():
    data = request.get_json()
    try:
        cursor = mydb.cursor()
        sql = "INSERT INTO reservations (name, phone, table_number, reservation_date, reservation_time, number_of_guests) VALUES (%s, %s, %s, %s, %s, %s)"
        val = (data['name'], data['phone'], data['table'], data['date'], data['time'], data['number_of_guests'])
        cursor.execute(sql, val)
        mydb.commit()
        reservation_details = f"Name: {data['name']}, Phone: {data['phone']}, Table: {data['table']}, Date: {data['date']}, Time: {data['time']}, Number of Guests: {data['number_of_guests']}"
        send_sms(reservation_details)  # Send SMS to the specified phone number
        return jsonify({"message": "Reservation successful!"})
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

if __name__ == '__main__':
    app.run(debug=True)

    # Table schema

# CREATE TABLE reservations (
#     id INT AUTO_INCREMENT PRIMARY KEY,
#     name VARCHAR(100) NOT NULL,
#     email VARCHAR(100),
#     reservation_date DATE NOT NULL,
#     reservation_time TIME NOT NULL,
#     number_of_guests INT NOT NULL
# );

