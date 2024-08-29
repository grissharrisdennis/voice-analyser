<template>
  <div class="file-upload">
    <div v-if="!files" class="dropzone" @dragover.prevent="handleDragOver" @drop="handleDrop">
      <h1>Drag and Drop Files</h1>
      <h1>or</h1>
      <input type="file" @change="handleFileChange" ref="inputRef" hidden />
      <button @click="triggerFileSelect">Select Files</button>
    </div>

    <div v-else class="uploads">
      <h3>Selected File:</h3>
      <ul>
        <li v-for="(file, idx) in Array.from(files)" :key="idx">{{ file.name }}</li>
      </ul>

      <div v-if="audioPreview">
        <h3>Audio Preview:</h3>
        <audio controls :src="audioPreview"></audio>
      </div>

      <div>
        <button @click="handleCancel">Cancel</button>
        <button @click="handleFileUpload">Transcribe</button>
      </div>
      <p v-if="uploadStatus">{{ uploadStatus }}</p>
    </div>

    <div v-if="transcription" class="transcription-container">
      <h3>Transcription:</h3>
      <p id="transcript">{{ transcription }}</p>
      <button @click="copyToClipboard">Copy Transcription</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../store/auth.js';
import { useRouter } from 'vue-router';

export default {
  name: 'FileUpload',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const files = ref(null);
    const audioPreview = ref(null);
    const transcription = ref('');
    const uploadStatus = ref('');
    const inputRef = ref(null);

    const handleDragOver = (event) => {
      event.preventDefault();
    };

    const handleDrop = (event) => {
      event.preventDefault();
      const droppedFiles = event.dataTransfer.files;
      files.value = droppedFiles;
      audioPreview.value = URL.createObjectURL(droppedFiles[0]); // Preview the first file
    };

    const handleFileChange = (event) => {
      const selectedFiles = event.target.files;
      files.value = selectedFiles;
      audioPreview.value = URL.createObjectURL(selectedFiles[0]); // Preview the first file
    };

    const handleFileUpload = async () => {
      if (!files.value) return;

      // Ensure CSRF token is set before uploading files
      await authStore.setCsrfToken();

      const formData = new FormData();
      Array.from(files.value).forEach((file) => {
        formData.append('audio', file);
      });

      try {
        const response = await axios.post('http://localhost:8000/api/audiofiles/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': authStore.csrfToken, // Use the CSRF token from the store
          },
          withCredentials: true,
        });

        if (response.status === 201) {
          uploadStatus.value = 'Files uploaded successfully!';
          transcription.value = response.data.text || 'No transcription available';
        } else {
          uploadStatus.value = 'File upload failed.';
        }
      } catch (error) {
        console.error('Error uploading files:', error);
        uploadStatus.value = 'File upload failed.';
      }
    };

    const handleCancel = () => {
      files.value = null;
      audioPreview.value = null;
      uploadStatus.value = '';
      transcription.value = '';
    };

    const triggerFileSelect = () => {
      inputRef.value.click();
    };

    const copyToClipboard = () => {
      const element = document.getElementById('transcript');
      const range = document.createRange();
      range.selectNode(element);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
    };

    return {
      authStore,
      router,
      files,
      audioPreview,
      transcription,
      uploadStatus,
      inputRef,
      handleDragOver,
      handleDrop,
      handleFileChange,
      handleFileUpload,
      handleCancel,
      triggerFileSelect,
      copyToClipboard
    };
  },
  mounted() {
    this.authStore.fetchUser();
  }
};
</script>


<style scoped>
.dropzone {
  display: flex;
  background-color: white;
  color: #000;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 280px;
  width: 700px;
  border: 4px dashed rgb(117, 112, 112);
  padding: 20px;
}
.transcription-container {
  margin-top: 20px;
  padding: 10px;
  width:900px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}

.transcription-container p {
  white-space: pre-wrap;
  word-wrap: break-word;
  color:black;
}

.transcription-container button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.transcription-container button:hover {
  background-color: #45a049;
}
</style>

  
