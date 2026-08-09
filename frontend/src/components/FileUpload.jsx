import { useEffect, useRef, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function FileUpload() {
    const fileInputRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf"
    ];

    const maxSize = 5 * 1024 * 1024;

    // Clean up temporary preview URL
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const validateFile = (file) => {
        if (!allowedTypes.includes(file.type)) {
            setError("Only JPG, PNG, GIF and PDF files are allowed.");
            return false;
        }

        if (file.size > maxSize) {
            setError("File size must be less than 5 MB.");
            return false;
        }

        return true;
    };

    const handleFile = (file) => {
        if (!file) return;

        setError("");
        setUploadSuccess(false);
        setUploadedFile(null);
        setUploadProgress(0);

        if (!validateFile(file)) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        setSelectedFile(file);

        if (file.type.startsWith("image/")) {
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
        } else {
            setPreview(null);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        handleFile(file);
    };

    const handleDrop = (event) => {
        event.preventDefault();

        if (isUploading) return;

        setIsDragging(false);

        const file = event.dataTransfer.files[0];
        handleFile(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();

        if (!isUploading) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const openFilePicker = () => {
        if (!isUploading) {
            fileInputRef.current?.click();
        }
    };

    const removeFile = () => {
        if (isUploading) return;

        setSelectedFile(null);
        setPreview(null);
        setError("");
        setUploadProgress(0);
        setUploadSuccess(false);
        setUploadedFile(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const uploadFile = async () => {
        if (!selectedFile) {
            setError("Please select a file first.");
            return;
        }

        try {
            setIsUploading(true);
            setError("");
            setUploadProgress(0);
            setUploadSuccess(false);

            const formData = new FormData();
            formData.append("file", selectedFile);

            const response = await axios.post(
                `${API_URL}/api/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },

                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.total) {
                            const progress = Math.round(
                                (progressEvent.loaded * 100) /
                                progressEvent.total
                            );

                            setUploadProgress(progress);
                        }
                    }
                }
            );

            if (response.data.success) {
                setUploadProgress(100);
                setUploadSuccess(true);
                setUploadedFile(response.data.file);
            }
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Something went wrong while uploading the file."
            );

            setUploadProgress(0);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="upload-container">

            {/* Header */}
            <div className="upload-header">
                <div className="header-icon">
                    ☁
                </div>

                <h1>Upload your files</h1>

                <p className="subtitle">
                    Fast, simple and secure file uploads
                </p>
            </div>

            {/* Drop Zone */}
            {!uploadSuccess && (
                <div
                    className={`drop-zone ${isDragging ? "dragging" : ""} ${
                        isUploading ? "uploading-zone" : ""
                    }`}
                    onClick={openFilePicker}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    role="button"
                    tabIndex={0}
                    aria-label="Upload file"
                >
                    <div className="upload-icon">
                        ↑
                    </div>

                    <h2>
                        {isDragging
                            ? "Drop your file here"
                            : "Drag & drop your file here"}
                    </h2>

                    <p>or</p>

                    <button
                        type="button"
                        className="browse-button"
                        onClick={(event) => {
                            event.stopPropagation();
                            openFilePicker();
                        }}
                        disabled={isUploading}
                    >
                        Browse Files
                    </button>

                    <p className="file-info">
                        JPG, PNG, GIF or PDF
                        <span> • </span>
                        Maximum 5 MB
                    </p>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".jpg,.jpeg,.png,.gif,.pdf"
                        onChange={handleFileChange}
                        hidden
                    />
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="error-message">
                    <span className="status-icon">!</span>

                    <span>{error}</span>
                </div>
            )}

            {/* Selected File */}
            {selectedFile && !uploadSuccess && (
                <div className="selected-file">

                    <div className="section-title">
                        <h3>Selected file</h3>

                        <span className="ready-badge">
                            Ready
                        </span>
                    </div>

                    {/* Preview */}
                    {preview ? (
                        <img
                            src={preview}
                            alt={`Preview of ${selectedFile.name}`}
                            className="image-preview"
                        />
                    ) : (
                        <div className="file-icon">
                            <span>PDF</span>
                        </div>
                    )}

                    {/* File Information */}
                    <div className="file-details">

                        <div className="file-name-area">
                            <div className="file-small-icon">
                                {selectedFile.type.startsWith("image/")
                                    ? "IMG"
                                    : "PDF"}
                            </div>

                            <div>
                                <strong title={selectedFile.name}>
                                    {selectedFile.name}
                                </strong>

                                <span>
                                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* Buttons */}
                    {!isUploading && (
                        <div className="button-group">

                            <button
                                type="button"
                                className="upload-button"
                                onClick={uploadFile}
                            >
                                ↑ Upload File
                            </button>

                            <button
                                type="button"
                                className="remove-button"
                                onClick={removeFile}
                            >
                                Remove
                            </button>

                        </div>
                    )}

                </div>
            )}

            {/* Upload Progress */}
            {isUploading && (
                <div className="progress-container">

                    <div className="progress-top">

                        <div className="upload-status">
                            <span className="spinner"></span>

                            <div>
                                <strong>Uploading file...</strong>

                                <span>
                                    Please wait while your file is being uploaded.
                                </span>
                            </div>
                        </div>

                        <strong className="progress-number">
                            {uploadProgress}%
                        </strong>

                    </div>

                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{
                                width: `${uploadProgress}%`
                            }}
                        ></div>
                    </div>

                </div>
            )}

            {/* Success */}
            {uploadSuccess && uploadedFile && (
                <div className="success-container">

                    <div className="success-icon">
                        ✓
                    </div>

                    <h2>Upload Successful!</h2>

                    <p className="success-message">
                        Your file has been uploaded successfully.
                    </p>

                    {uploadedFile.mimetype.startsWith("image/") ? (
                        <img
                            src={`${API_URL}${uploadedFile.url}`}
                            alt={uploadedFile.originalName}
                            className="uploaded-image"
                        />
                    ) : (
                        <div className="uploaded-document">
                            <span>PDF</span>
                        </div>
                    )}

                    <div className="uploaded-file-name">
                        {uploadedFile.originalName}
                    </div>

                    <div className="success-actions">

                        <a
                            href={`${API_URL}${uploadedFile.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="view-button"
                        >
                            View / Download
                        </a>

                        <button
                            type="button"
                            className="new-upload-button"
                            onClick={removeFile}
                        >
                            Upload Another
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
}

export default FileUpload;