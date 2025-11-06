import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os

# --- Configuration ---
# Replace 'path/to/your/serviceAccountKey.json' with the actual path to your Firebase service account key file.
# You can download this file from your Firebase project settings -> Service accounts.
SERVICE_ACCOUNT_KEY_PATH = 'path/to/your/serviceAccountKey.json'
# --- End Configuration ---


def initialize_firebase():
    """Initializes Firebase Admin SDK."""
    if not os.path.exists(SERVICE_ACCOUNT_KEY_PATH):
        print(f"Error: Service account key file not found at {SERVICE_ACCOUNT_KEY_PATH}")
        print("Please download your service account key from Firebase project settings (Service accounts tab) and update SERVICE_ACCOUNT_KEY_PATH.")
        return None

    try:
        cred = credentials.Certificate(SERVICE_ACCOUNT_KEY_PATH)
        firebase_admin.initialize_app(cred)
        print("Firebase Admin SDK initialized successfully.")
        return firestore.client()
    except Exception as e:
        print(f"Error initializing Firebase: {e}")
        return None

def create_firestore_collections(db):
    """Creates specified Firestore collections with dummy data."""
    if not db:
        print("Firestore client is not available. Skipping collection creation.")
        return

    print("\n--- Creating Firestore Collections ---")

    # 1. 'users' collection
    users_ref = db.collection('users')
    users_data = [
        {'id': 'user1', 'name': 'Alice Smith', 'email': 'alice@example.com', 'joined_date': firestore.SERVER_TIMESTAMP},
        {'id': 'user2', 'name': 'Bob Johnson', 'email': 'bob@example.com', 'joined_date': firestore.SERVER_TIMESTAMP}
    ]
    for user in users_data:
        try:
            users_ref.document(user['id']).set(user)
            print(f"Added user: {user['name']}")
        except Exception as e:
            print(f"Error adding user {user['name']}: {e}")

    # 2. 'services' collection
    services_ref = db.collection('services')
    services_data = [
        {'id': 'service_haircut', 'name': 'Haircut', 'duration_minutes': 60, 'price': 50.00, 'description': 'Standard haircut service.'},
        {'id': 'service_massage', 'name': 'Full Body Massage', 'duration_minutes': 90, 'price': 120.00, 'description': 'Relaxing full body massage.'}
    ]
    for service in services_data:
        try:
            services_ref.document(service['id']).set(service)
            print(f"Added service: {service['name']}")
        except Exception as e:
            print(f"Error adding service {service['name']}: {e}")

    # 3. 'appointments' collection
    appointments_ref = db.collection('appointments')
    appointments_data = [
        {'id': 'appt_001', 'user_id': 'user1', 'service_id': 'service_haircut', 'date': '2025-12-01', 'time': '10:00', 'status': 'booked', 'created_at': firestore.SERVER_TIMESTAMP},
        {'id': 'appt_002', 'user_id': 'user2', 'service_id': 'service_massage', 'date': '2025-12-02', 'time': '14:30', 'status': 'pending', 'created_at': firestore.SERVER_TIMESTAMP}
    ]
    for appointment in appointments_data:
        try:
            appointments_ref.document(appointment['id']).set(appointment)
            print(f"Added appointment: {appointment['id']}")
        except Exception as e:
            print(f"Error adding appointment {appointment['id']}: {e}")

    # 4. 'settings' collection (singular document)
    settings_ref = db.collection('settings')
    general_settings_data = {
        'app_name': 'My Service Booking App',
        'contact_email': 'support@example.com',
        'opening_hours': {'monday_friday': '09:00-18:00', 'saturday': '10:00-16:00'},
        'currency': 'USD'
    }
    try:
        settings_ref.document('general_settings').set(general_settings_data)
        print("Added general settings document.")
    except Exception as e:
        print(f"Error adding general settings: {e}")

    print("\nFirestore collection creation process completed.")

if __name__ == '__main__':
    db_client = initialize_firebase()
    if db_client:
        create_firestore_collections(db_client)
    else:
        print("Firebase initialization failed. Cannot create collections.")