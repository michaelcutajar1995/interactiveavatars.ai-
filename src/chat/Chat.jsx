import React from "react";
import { useState, useEffect, useRef } from "react";
import ChatBubblev1 from "./ChatBubblev1";
import ChatHistory from "./ChatHistory";
import "../index.css";

const ResetButton = (props) => {
  const { chatHistory, client, isMobile } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [history, setHistory] = useState(1);
  const [session, setSession] = useState("-1");
  const [messages, setMessages] = useState([]);
  const [errorResponse, setErrorResponse] = useState(false);
  const timer = useRef(null);
  const errorMessage = " Error in retrieving response. Please reset session.";
  //Toggle History panel
  const showHistory = () => {
    setHistory(!history);
  };

  //Takes User text from the textBox
  const userInput = (text) => {
    client?.setUserText(text);
  };

  //Reset Session
  const ResetHistory = () => {
    const storedData = localStorage.getItem("messages");
    if (storedData) {
      // Parse the retrieved data from JSON format
      const parsedData = JSON.parse(storedData);
      // Update the messages for the current character ID in the stored data
      parsedData[client?.characterId] = {
        sessionID: -1,
        message: [""],
      };
      // Update the stored data in localStorage
      localStorage.setItem("messages", JSON.stringify(parsedData));
    }
    if (client?.convaiClient?.current) {
      client?.convaiClient.current.resetSession();
    }
    setSession("-1");
    setMessages([]);
    client?.setUserText("");
    client?.setNpcText("");
  };

  //Retrieve Latest chat history of a particular character
  useEffect(() => {
    // Retrieve stored data from localStorage
    const storedData = localStorage.getItem("messages");

    if (client?.characterId) {
      try {
        if (storedData) {
          // Parse the retrieved data from JSON format
          const parsedData = JSON.parse(storedData);

          if (parsedData && typeof parsedData === 'object') {
            const characterIDs = Object.keys(parsedData);

            // Check if character ID matches the stored character ID
            if (characterIDs.includes(client?.characterId)) {
              // Retrieve the sessionID for the current character ID
              const parsedSessionID = parsedData[client?.characterId].sessionID;
              if (parsedSessionID) {
                // Update the sessionID state
                setSession(parsedSessionID);
              }

              // Retrieve the messages for the current character ID
              const parsedMessage = parsedData[client?.characterId].message;
              if (parsedMessage) {
                try {
                  const storedMessages = JSON.parse(parsedMessage);
                  if (Array.isArray(storedMessages)) {
                    // Update the messages state
                    setMessages(storedMessages);
                  } else {
                    setMessages([]);
                  }
                } catch (e) {
                  console.warn('Failed to parse messages:', e);
                  setMessages([]);
                }
              }
            } else {
              // No stored messages for the current character ID
              setMessages([]);
            }
          }
        } else {
          // No stored data
          setSession("-1");
          setMessages([]);
        }
      } catch (e) {
        console.warn('Failed to parse stored data:', e);
        setSession("-1");
        setMessages([]);
      }
    }
  }, [client?.characterId]);

  //Store latest User and Npc Messages into the chat history
  useEffect(() => {
    //Used to set the session Id on the 1st interaction
    if (
      client?.convaiClient?.current &&
      session === "-1" &&
      client?.convaiClient?.current?.sessionId
    ) {
      setSession(client.convaiClient.current.sessionId);
    }
    if (client?.characterId && messages.length) {
      const messagesJSON = JSON.stringify(messages);
      const storedData = localStorage.getItem("messages");

      if (storedData) {
        // Parse the retrieved data from JSON format
        const parsedData = JSON.parse(storedData);

        // Update the messages for the current character ID in the stored data
        parsedData[client.characterId] = {
          sessionID: session,
          message: messagesJSON,
        };
        // Update the stored data in localStorage
        localStorage.setItem("messages", JSON.stringify(parsedData));
      } else {
        // No stored data, create a new entry for the current character ID
        const messagesData = {
          [client.characterId]: {
            sessionID: session,
            message: messagesJSON,
          },
        };
        localStorage.setItem("messages", JSON.stringify(messagesData));
      }
    }
  }, [client?.characterId, messages, session]);

  // Stores User message
  useEffect(() => {
    const newMessage = {
      sender: "user",
      content: client?.userText,
    };
    if (client?.userText !== "" && client?.userEndOfResponse) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      client?.setUserEndOfResponse(false);
      timer.current = setTimeout(() => {
        setErrorResponse(true);
      }, 7000);
    }
  }, [client?.userEndOfResponse, client?.userText]);

  // Stores Npc's message
  useEffect(() => {
    if (errorResponse && !client?.npcText) {
      client.npcText = errorMessage;
      const newMessage = {
        sender: "npc",
        content: errorMessage,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setErrorResponse(false);
    } else {
      const newMessage = {
        sender: "npc",
        content: client?.npcText,
      };
      if (client?.npcText !== "") {
        setErrorResponse(false);
        clearTimeout(timer.current);
      }
      if (client?.npcText !== "" && !client?.isTalking) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    }
  }, [client?.isTalking, errorResponse, client?.npcText]);

  const buttonStyles = {
    position: 'absolute',
    zIndex: 9999,
    ...(isMobile ? {
      top: '-420px',
      right: '30px',
      transform: 'scale(0.9)',
    } : {
      top: '-700px',
      right: '320px',
    })
  };

  const resetButtonStyles = {
    backgroundColor: isHovered ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.7)",
    borderRadius: "5px",
    padding: isMobile ? "6px 12px" : "8px 16px",
    color: "#000",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const imageStyles = {
    width: isMobile ? "8px" : "10px",
    height: isMobile ? "8px" : "10px",
    marginRight: isMobile ? "6px" : "8px",
    filter: "brightness(0)"
  };

  const textStyles = {
    fontSize: isMobile ? "10px" : "11px",
    fontWeight: "500"
  };

  return (
    <section className="ResetButton" style={{ position: 'relative' }}>
      <div style={buttonStyles}>
        <div
          style={resetButtonStyles}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={ResetHistory}
        >
          {/* Commented out image to avoid undefined error
          <img 
            src={reset} 
            alt="Reset"
            style={imageStyles}
          />
          */}
          <span style={textStyles}>
            Reset Session
          </span>
        </div>
      </div>
    </section>
  );
};

export default ResetButton;