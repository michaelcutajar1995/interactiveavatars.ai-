import axios from 'axios';

export const uploadVoiceRecording = async (audioBlob) => {
  try {
    const formData = new FormData();
    formData.append('files[]', audioBlob, 'recording.mp3');
    formData.append('name', 'Custom Voice');
    formData.append('description', 'User recorded voice sample');
    formData.append('remove_background_noise', 'true');

    console.log('Uploading audio blob:', audioBlob);
    console.log('Content type:', audioBlob.type);

    const response = await axios.post(
      'https://api.elevenlabs.io/v1/voices/add',
      formData,
      {
        headers: {
          'xi-api-key': process.env.REACT_APP_ELEVEN_LABS_API_KEY,
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      }
    );

    return response.data.voice_id;
  } catch (error) {
    console.error('Error uploading voice recording:', error);
    throw error;
  }
};