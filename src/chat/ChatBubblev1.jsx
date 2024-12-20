import React, { useState } from 'react';

const ChatBubblev1 = (props) => {
  const { client, isMobile } = props;
  const [isTouching, setIsTouching] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const containerStyle = {
    position: 'absolute',
    borderRadius: '50px',
    display: 'flex',
    opacity: 1,
    visibility: 'visible',
    zIndex: 9999,
    ...(isMobile ? {
      bottom: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '400px',
      padding: '10px',
    } : {
      top: '70vh',
      left: '2.8vw',
      width: '20vw',
      height: 'auto',
    })
  };

  const textStyle = {
    fontSize: isMobile ? '16px' : '16px',
    margin: '5px',
    color: isTouching ? 'rgba(255,200,100,1)' : 'rgba(219,168,66,0.9)',
    cursor: 'pointer',
    padding: '15px',
    textAlign: 'center',
    width: '100%',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    transition: 'all 0.2s ease',
    backgroundColor: isTouching ? 'rgba(0,0,0,0.9)' : 'transparent',
    borderRadius: '8px',
  };

  const handleStartRecording = (e) => {
    e.preventDefault();
    if (client?.convaiClient?.current && !isRecording) {
      client.convaiClient.current.startAudioChunk();
      setIsTouching(true);
      setIsRecording(true);
    }
  };

  const handleStopRecording = (e) => {
    e.preventDefault();
    if (client?.convaiClient?.current && isRecording) {
      client.convaiClient.current.endAudioChunk();
      setIsTouching(false);
      setIsRecording(false);
    }
  };

  const buttonStyle = {
    ...textStyle,
    cursor: 'pointer',
    padding: '15px 30px',
    backgroundColor: isTouching ? '#4CAF50' : '#FFEB3B',
    border: 'none',
    borderRadius: '25px',
    color: isTouching ? '#fff' : '#000',
    transition: 'all 0.3s ease',
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '600',
    letterSpacing: '0.5px',
    display: 'block',
    opacity: 1,
    visibility: 'visible',
    fontSize: '18px',
  };

  return (
    <div style={containerStyle}>
      <button
        onMouseDown={handleStartRecording}
        onMouseUp={handleStopRecording}
        onMouseLeave={handleStopRecording}
        onTouchStart={handleStartRecording}
        onTouchEnd={handleStopRecording}
        onTouchCancel={handleStopRecording}
        style={buttonStyle}
      >
        {isTouching ? 'Recording...' : 'Try me! Hold to speak'}
      </button>
    </div>
  );
};

export default ChatBubblev1;