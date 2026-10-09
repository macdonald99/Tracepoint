# TracePoint Investigation System

## Student Details
* **Student Name:** Macdonald Mako
VIBE CODED

---

## Application Description
TracePoint is a full-stack web application designed for managing digital forensic cases and crime investigations[cite: 13]. The platform enables investigators to:
* Create and track active investigation cases[cite: 13].
* Log and manage suspects linked to specific cases[cite: 13].
* Record physical/digital evidence and examine condition details[cite: 13].
* Submit comprehensive investigation reports with findings and conclusions[cite: 13].
* Retrieve and view saved investigation reports stored in the database[cite: 13].

---

## Technologies Used
* **Frontend:** React.js, Vite, React Router, JavaScript (ES6+), CSS3[cite: 13]
* **Backend:** ASP.NET Core 8 Web API, Entity Framework Core, Dapper ORM[cite: 13]
* **Database:** Microsoft SQL Server[cite: 13]

---

## API Endpoints

### Cases (`/api/cases`)
* `GET /api/cases` - Fetch all active cases[cite: 13]
* `GET /api/cases/{id}` - Fetch a single case with associated suspects, evidence, and investigations[cite: 13]
* `POST /api/cases` - Create a new investigation case[cite: 13]

### Suspects (`/api/suspects`)
* `GET /api/suspects` - Retrieve all suspects[cite: 13]
* `GET /api/suspects/{id}` - Retrieve suspect details[cite: 13]
* `POST /api/suspects` - Add a new suspect to a case[cite: 13]

### Evidence (`/api/evidence`)
* `GET /api/evidence` - Retrieve all evidence items[cite: 13]
* `GET /api/evidence/{id}` - Retrieve specific evidence details[cite: 13]
* `POST /api/evidence` - Log new evidence under a case[cite: 13]

### Investigations (`/api/investigations`)
* `POST /api/investigations` - Submit an investigation conclusion report via EF Core[cite: 13]
* `GET /api/investigations/{id}` - Fetch investigation details[cite: 13]
* `GET /api/investigations/with-suspects` - Query investigations joined with suspect details using Dapper[cite: 13]

---

## Database Setup Instructions
1. Open **SQL Server Management Studio (SSMS)**[cite: 13].
2. Open and execute the SQL script located at `Database/schema.sql` to generate tables and sample records[cite: 13].
3. Verify or update the database connection string in `TracePointAPI/appsettings.json`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=localhost;Database=VenatorVeritatisDb;Trusted_Connection=True;TrustServerCertificate=True;"
   }
   ```[cite: 13]

---

## Instructions for Running the API
1. Navigate to the API directory:
   ```bash
   cd TracePointAPI
   ```[cite: 13]
2. Restore package dependencies:
   ```bash
   dotnet restore
   ```[cite: 13]
3. Launch the ASP.NET Core API server:
   ```bash
   dotnet run
   ```[cite: 13]
4. The API will start on `http://localhost:5012`[cite: 13].

---

## Instructions for Running React
1. Navigate to the React client directory:
   ```bash
   cd TracePointClient
   ```[cite: 13]
2. Install npm package dependencies:
   ```bash
   npm install
   ```[cite: 13]
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```[cite: 13]
4. Open your browser and navigate to `http://localhost:5173` or `http://localhost:5174`[cite: 13].

---

## Testing Instructions
1. Ensure both the **TracePointAPI** and **TracePointClient** services are running[cite: 13].
2. Open the React Web App in your browser[cite: 13].
3. Click **"Add Case"** to create a new case (e.g., "Missing Laptop Prototype")[cite: 13].
4. Click **"+ Add Suspect"** to attach suspects to the active case[cite: 13].
5. Click **"+ Add Evidence"** to log physical evidence items[cite: 13].
6. Scroll down to **"File Investigation Report"**, select a suspect, type a conclusion, and click **"Submit Investigation"**[cite: 13].
7. Verify that the new report appears immediately under **"Saved Investigations"** and persists in the SQL Server database[cite: 13].
