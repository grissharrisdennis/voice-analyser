import { useRef, useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [files, setFiles] = useState(null);
    const [audioPreview, setAudioPreview] = useState(null);
    const [transcription, setTranscription] = useState('');
    const [uploadStatus, setUploadStatus] = useState('');
    const inputRef = useRef();
    axios.defaults.baseURL = 'http://localhost:8000';

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        setFiles(droppedFiles);
        setAudioPreview(URL.createObjectURL(droppedFiles[0])); // Preview the first file
    };

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        setFiles(selectedFiles);
        setAudioPreview(URL.createObjectURL(selectedFiles[0])); // Preview the first file
    };
    const handleFileUpload = async () => {
        // console.log(target.files)
        if (!files) return;
       
        const formData = new FormData();
        Array.from(files).forEach((file) => {
            console.log(file)
            formData.append('audio', file);
        });
    
        try {
            const response = await axios.post('/api/audiofiles/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 201) {
                setUploadStatus('Files uploaded successfully!');
    
                // Use the transcription text directly from the response
                setTranscription(response.data.transcription || 'No transcription available');
            } else {
                setUploadStatus('File upload failed.');
            }
        } catch (error) {
            console.error('Error uploading files:', error);
            setUploadStatus('File upload failed.');
        }
    };
    

    const handleCancel = () => {
        setFiles(null);
        setAudioPreview(null);
        setUploadStatus('');
        setTranscription('');
    };

    return (
        <div className='file-upload'>
            {!files && (
                <div className='dropzone' onDragOver={handleDragOver} onDrop={handleDrop}>
                    <h1>Drag and Drop Files</h1>
                    <h1>or</h1>
                    <input type="file" onChange={handleFileChange} hidden ref={inputRef} />
                    <button onClick={() => inputRef.current.click()}>Select Files</button>
                </div>
            )}

            {files && (
                <div className='uploads'>
                    <h3>Selected File:</h3>
                    <ul>
                        {Array.from(files).map((file, idx) => <li key={idx}> {file.name}</li>)}
                    </ul>

                    {audioPreview && (
                        <div>
                            <h3>Audio Preview:</h3>
                            <audio controls src={audioPreview}></audio>
                        </div>
                    )}

                    <div>
                        <button onClick={handleCancel}>Cancel</button>
                        <button onClick={handleFileUpload}>Transcribe</button>
                    </div>
                    {uploadStatus && <p>{uploadStatus}</p>}
                </div>
            )}

            {transcription && (
                <div>
                    <h3>Transcription:</h3>
                    <p>{transcription}</p>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
