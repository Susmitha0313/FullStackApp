
---

# **FullStackApp Documentation**

## **Project Setup Instructions**

### **Backend Setup**
1. **Clone the Repository**  
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```
2. **Install Dependencies**  
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**  
   Create a `.env` file in the root directory with the following variables:  
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017
   ```
4. **Start the Backend Server**  
   ```bash
   npm start
   ```
5. **Verify the Server**  
   Access the server at [http://localhost:3000](http://localhost:3000).

---

### **Frontend Setup (Using Vite)**

1. **Create a New React App**  
   ```bash
   npm create vite@latest frontend --template react
   ```
2. **Navigate to the Project Directory**  
   ```bash
   cd frontend
   ```
3. **Install Dependencies**  
   ```bash
   npm install
   ```
4. **Configure Proxy for Backend API**  
   Update `vite.config.js` to set up a proxy for API requests:  
   ```javascript
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
     plugins: [react()],
     server: {
       proxy: {
         '/api': {
           target: 'http://localhost:3000',
           changeOrigin: true,
           secure: false,
         },
       },
     },
   });
   ```
5. **Start the Development Server**  
   ```bash
   npm run dev
   ```
6. **Access the Frontend**  
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## **API Documentation**

### **Appointment Booking**
1. **Get All Booking Slots**  
   **Endpoint:** `GET /api/booking/slots`  
   **Description:** Fetches all available slots for booking.

2. **Book an Appointment**  
   **Endpoint:** `POST /api/booking/book`  
   **Request Body:**  
   ```json
   {
     "name": "John Doe",
     "phone": "9876543210",
     "date": "2025-01-10",
     "timeSlot": "10:00 AM - 11:00 AM"
   }
   ```  
   **Response (Success):**  
   ```json
   {
     "status": "success",
     "message": "Appointment booked successfully!",
     "appointment": {
       "_id": "64d96e2a579af317a936d35b",
       "name": "John Doe",
       "phone": "9876543210",
       "date": "2025-01-10",
       "timeSlot": "10:00 AM - 11:00 AM",
       "createdAt": "2025-01-08T07:58:05.651Z"
     }
   }
   ```  
   **Response (Error):**  
   ```json
   { "error": "This slot is already booked." }
   ```

---

### **Task Management**
1. **Add a New Task**  
   **Endpoint:** `POST /api/addTask`  
   **Request Body:**  
   ```json
   {
     "title": "Work out",
     "description": "Waking up at 5 and going to the gym for a workout."
   }
   ```  
   **Response (Success):**  
   ```json
   {
     "_id": "677e300db3fcd74de36b525d",
     "title": "Work out",
     "description": "Waking up at 5 and going to the gym for a workout.",
     "createdAt": "2025-01-08T07:58:05.651Z",
     "updatedAt": "2025-01-08T07:58:05.651Z"
   }
   ```  
   **Response (Error):**  
   ```json
   { "error": "Failed to add task." }
   ```

2. **Fetch All Tasks**  
   **Endpoint:** `GET /api/:taskId`  

3. **Update a Task by ID**  
   **Endpoint:** `PUT /api/:taskId`  

4. **Delete a Task by ID**  
   **Endpoint:** `DELETE /api/:taskId`  

---

## **Edge Cases**
- **Empty Inputs:** Ensure required fields are validated (e.g., `{ "title": "" }` for tasks).  
- **Duplicate Records:** Prevent duplication, such as booking the same slot twice or adding tasks with the same title.

---

## **Test Cases Documentation**

### **Appointment Booking**
1. **Test Case 1:** Successful Appointment Booking  
   **Input:**  
   ```json
   {
     "name": "Alice",
     "phone": "9876543210",
     "date": "2025-01-10",
     "timeSlot": "11:00 AM - 12:00 PM"
   }
   ```  
   **Expected Output:**  
   ```json
   {
     "status": "success",
     "message": "Appointment booked successfully!",
     "appointment": {
       "_id": "12345abcd",
       "name": "Alice",
       "phone": "9876543210",
       "date": "2025-01-10",
       "timeSlot": "11:00 AM - 12:00 PM"
     }
   }
   ```

2. **Test Case 2:** Duplicate Booking  
   **Input:**  
   ```json
   {
     "name": "Bob",
     "phone": "8765432109",
     "date": "2025-01-10",
     "timeSlot": "11:00 AM - 12:00 PM"
   }
   ```  
   **Expected Output:**  
   ```json
   { "error": "This slot is already booked." }
   ```

---
