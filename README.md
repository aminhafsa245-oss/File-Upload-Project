# File Upload System

A modern full-stack file upload application built with React, Node.js, Express, and Multer. Users can upload images and PDF files through a smooth drag-and-drop interface or a styled file picker.

## Features

* Drag-and-drop file upload
* Styled file picker
* Image preview before upload
* PDF file support
* Frontend file validation
* Backend file validation
* Maximum file size of 5 MB
* Real-time upload progress
* Upload success feedback
* Uploaded image preview
* View/download uploaded files
* Error handling
* Responsive design
* Secure generated filenames
* Local file storage using Multer

## Technologies Used

### Frontend

* React
* Vite
* Axios
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* Multer
* CORS

## Supported Files

The application currently supports:

* JPG
* JPEG
* PNG
* GIF
* PDF

Maximum file size:

**5 MB**

## How It Works

```text
User
  ↓
Drag & Drop / Browse Files
  ↓
Frontend Validation
  ↓
File Preview
  ↓
Upload
  ↓
Axios
  ↓
Express API
  ↓
Multer
  ↓
uploads/
  ↓
Success Response
  ↓
Display / Download File
```

## Project Structure

```text
File Upload Project/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── FileUpload.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
├── backend/
│   ├── uploads/
│   ├── server.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

## Installation

### 1. Clone the repository

```bash
https://github.com/aminhafsa245-oss/File-Upload-Project.git

cd "File Upload Project"
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Configure frontend environment

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:5000
```

### 4. Install backend dependencies

Open another terminal:

```bash
cd backend
npm install
```

### 5. Start the backend

```bash
node server.js
```

The API will run at:

```text
http://localhost:5000
```

### 6. Start the frontend

In the frontend terminal:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

## API Endpoint

### Upload File

```text
POST /api/upload
```

The file must be sent using:

```text
multipart/form-data
```

with the field name:

```text
file
```

### Example Response

```json
{
  "success": true,
  "message": "File uploaded successfully",
  "file": {
    "originalName": "image.jpg",
    "filename": "generated-file-name.jpg",
    "size": 245678,
    "mimetype": "image/jpeg",
    "url": "/uploads/generated-file-name.jpg"
  }
}
```

## Validation

The application validates files on both the frontend and backend.

### Frontend

Checks:

* File type
* File size
* User-friendly error messages

### Backend

Checks:

* MIME type
* File size
* Upload availability

This provides a better user experience while also adding server-side protection.

## Key Learning Areas

Through this project, I practiced:

* React state management
* File handling in JavaScript
* Drag-and-drop functionality
* FormData
* Axios file uploads
* Upload progress tracking
* Express REST APIs
* Multer file handling
* File validation
* Local file storage
* Environment variables
* Responsive UI design
* Error handling
* Git and GitHub workflow

## Future Improvements

Possible future enhancements include:

* Cloudinary or Amazon S3 storage
* Multiple file uploads
* Upload cancellation
* Authentication
* File deletion
* Database-backed file records
* Cloud deployment
* File management dashboard

## Author

**Hafsa Amin**

Computer Science Student | Full Stack Developer

---

## License

This project was created for learning and portfolio purposes.
