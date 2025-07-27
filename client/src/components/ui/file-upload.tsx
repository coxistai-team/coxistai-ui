import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Image as ImageIcon, File, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface UploadedFile {
  file: File;
  preview?: string;
  type: 'image' | 'pdf' | 'document' | 'other';
}

interface FileUploadProps {
  onFilesChange: (files: UploadedFile[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
}

const FileUpload = ({ 
  onFilesChange, 
  maxFiles = 5, 
  maxSize = 10,
  acceptedTypes = ['image/*', '.pdf', '.doc', '.docx', '.txt']
}: FileUploadProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileType = (file: File): UploadedFile['type'] => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type === 'application/pdf') return 'pdf';
    if (file.type.includes('document') || file.type.includes('text')) return 'document';
    return 'other';
  };

  const createFilePreview = async (file: File): Promise<string | undefined> => {
    if (file.type.startsWith('image/')) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    }
    return undefined;
  };

  const handleFiles = async (files: FileList) => {
    const newFiles: UploadedFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is ${maxSize}MB.`);
        continue;
      }
      
      // Check file count
      if (uploadedFiles.length + newFiles.length >= maxFiles) {
        alert(`Maximum ${maxFiles} files allowed.`);
        break;
      }
      
      const fileType = getFileType(file);
      const preview = await createFilePreview(file);
      
      newFiles.push({
        file,
        preview,
        type: fileType
      });
    }
    
    const updatedFiles = [...uploadedFiles, ...newFiles];
    setUploadedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const getFileIcon = (type: UploadedFile['type']) => {
    switch (type) {
      case 'image': return <ImageIcon className="w-5 h-5" />;
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'document': return <FileText className="w-5 h-5 text-blue-500" />;
      default: return <File className="w-5 h-5" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <motion.div
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer ${
          isDragActive 
            ? 'border-warm-600 bg-warm-500/15' 
            : 'border-warm-400/40 hover:border-warm-500/60 bg-warm-200/20'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
        />
        
        <div className="space-y-2">
          <div className="mx-auto w-12 h-12 gradient-warm rounded-full flex items-center justify-center shadow-medium">
            <File className="w-6 h-6 text-warm-50" />
          </div>
          <div>
            <p className="text-warm-800 font-medium">
              {isDragActive ? 'Drop files here' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-sm text-warm-600">
              Images, PDFs, Documents up to {maxSize}MB each
            </p>
          </div>
        </div>
      </motion.div>

      {/* Uploaded Files */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <p className="text-sm text-warm-600 font-medium">
              Uploaded Files ({uploadedFiles.length}/{maxFiles})
            </p>
            
            <div className="space-y-2">
              {uploadedFiles.map((uploadedFile, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glassmorphism rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    {getFileIcon(uploadedFile.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-warm-800 text-sm font-medium truncate">
                        {uploadedFile.file.name}
                      </p>
                      <p className="text-warm-600 text-xs">
                        {formatFileSize(uploadedFile.file.size)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {uploadedFile.preview && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 hover:bg-warm-200/50"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl glassmorphism-strong border-warm-400/30">
                          <DialogHeader>
                            <DialogTitle className="text-warm-800">
                              {uploadedFile.file.name}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            <img
                              src={uploadedFile.preview}
                              alt={uploadedFile.file.name}
                              className="w-full h-auto rounded-lg"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="p-2 hover:bg-destructive/20 text-destructive hover:text-destructive/80"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUpload;