import React, { useState } from "react";
import { Upload, AlertCircle } from "lucide-react";
import axios from "axios";

type UploadResult = {
    url: string;
    fileName: string;
    fileSizeMb: number;
    fileType: string;
    uploadTime: string;
};

interface ImageUploadProps {
    onUploadSuccess: (url: string, result: UploadResult) => void;
    acceptedTypes?: string; // e.g. 'image/*' or '.pdf,.docx'
    maxSize?: number;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onUploadSuccess,
    acceptedTypes = "image/*",
    maxSize = 10 * 1024 * 1024, // 10MB
    placeholder = "Kéo thả file vào đây hoặc click để chọn",
    className = "",
    disabled = false,
}) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileSelect = (file: File) => {
        if (file.size > maxSize) {
            setError(
                `File quá lớn. Tối đa ${(maxSize / 1024 / 1024).toFixed(1)}MB`
            );
            return;
        }
        setError(null);
        uploadFile(file);
    };

    const uploadFile = async (file: File) => {
        if (uploading || disabled) return;
        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const resData = await axios.post(
                "https://upload.autopass.blog/upload",
                formData
            );
            const res = resData.data;
            const { downloadUrl, fileName, fileSizeMb, fileType, uploadTime } =
                res.data;
            const resultObj: UploadResult = {
                url: downloadUrl,
                fileName,
                fileSizeMb,
                fileType,
                uploadTime,
            };
            onUploadSuccess(downloadUrl, resultObj);
        } catch (err: any) {
            setError("Lỗi khi tải lên: " + err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (disabled) return;
        if (e.type === "dragenter" || e.type === "dragover")
            setDragActive(true);
        if (e.type === "dragleave") setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (disabled || !e.dataTransfer.files[0]) return;
        handleFileSelect(e.dataTransfer.files[0]);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled || !e.target.files?.[0]) return;
        handleFileSelect(e.target.files[0]);
    };

    return (
        <div className={`w-full ${className}`}>
            {/* Luôn hiển thị khu vực upload */}
            <div
                className={`relative rounded-lg border-2 border-dashed p-6 text-center transition-all duration-200 ${
                    disabled
                        ? "cursor-not-allowed border-gray-200 bg-gray-50"
                        : dragActive
                        ? "border-blue-400 bg-blue-50"
                        : uploading
                        ? "border-green-400 bg-green-50"
                        : "cursor-pointer border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept={acceptedTypes}
                    onChange={handleInputChange}
                    disabled={disabled || uploading}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />

                {!uploading ? (
                    <div className="space-y-2">
                        <Upload className="mx-auto h-10 w-10 text-gray-400" />
                        <p className="text-sm text-gray-600">{placeholder}</p>
                        <p className="text-xs text-gray-500">
                            Tối đa {(maxSize / 1024 / 1024).toFixed(1)}MB
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                        <p className="text-sm font-medium text-blue-600">
                            Đang tải lên...
                        </p>
                    </div>
                )}
            </div>

            {error && (
                <div className="mt-3 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
