import axios from 'axios';

export const generateVoice = async (text, voiceId) => {
    try {
        const response = await axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
            {
                text: text,
                model_id: 'eleven_monolingual_v1',
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.5
                }
            },
            {
                headers: {
                    'xi-api-key': process.env.REACT_APP_ELEVEN_LABS_API_KEY,
                    'Content-Type': 'application/json'
                },
                responseType: 'blob'
            }
        );
        return URL.createObjectURL(response.data);
    } catch (error) {
        console.error('Error generating voice:', error);
        throw error;
    }
}; 