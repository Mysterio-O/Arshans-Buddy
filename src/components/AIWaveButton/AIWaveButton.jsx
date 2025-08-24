// AIWaveButton.jsx (Updated: Only Speech, No AI Text Bubble)
import React, { useState, useRef} from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

const AIWaveButton = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [userMessage, setUserMessage] = useState(""); // Optional: show what child said
  const [aiState, setAiState] = useState(""); // 'loading', 'speaking'
  const audioRef = useRef(null);

  const startListening = () => {
    if (isListening) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("দুঃখিত, আপনার ব্রাউজার ভয়েস সাপোর্ট করে না। Chrome বা Edge ব্যবহার করুন।");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'bn-BD';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    setIsListening(true);

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript.trim();
      if (!transcript) return;

      console.log("🎙️ আপনি বলেছেন:", transcript);
      setUserMessage(transcript); // Optional: show child's words
      setIsListening(false);

      try {
        setAiState("loading");

        // Step 1: Ask AI
        const aiRes = await fetch("http://localhost:5000/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: transcript }),
        }).then(r => r.json());

        const aiText = aiRes.response?.trim();
        if (!aiText) throw new Error("No AI response");

        setAiState("speaking");

        // Step 2: Get TTS audio
        const ttsRes = await fetch("http://localhost:5000/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: aiText }),
        }).then(r => r.json());

        // Step 3: Play audio — no text shown
        if (ttsRes.audioUrl) {
          const audio = new Audio(`http://localhost:5000${ttsRes.audioUrl}`);
          audioRef.current = audio;

          audio.onended = () => {
            setAiState("");
            audioRef.current = null;
          };

          audio.play().catch(err => {
            console.error("Playback failed:", err);
            setAiState("");
            alert("আমিনা আপা কথা বলতে পারছে না। আবার চেষ্টা করুন।");
          });
        }
      } catch (err) {
        console.error("AI Pipeline Error:", err);
        setAiState("");
        alert("দুঃখিত, কিছু ভুল হয়েছে। আবার চেষ্টা করুন।");
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      console.error("Speech error:", event.error);
      // Handle errors (no bubble)
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    navigate("/");
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm z-50 p-6"
      onClick={handleClose}
    >
      {/* Optional: Show child's speech bubble */}
      {userMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 bg-blue-500 text-white px-6 py-3 rounded-2xl rounded-tl-none max-w-xs shadow-lg"
          style={{ alignSelf: "flex-start", left: "50%" }}
        >
          {userMessage}
        </motion.div>
      )}

      {/* Main Button */}
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="relative rounded-full shadow-2xl cursor-pointer flex items-center justify-center overflow-hidden"
        style={{
          width: "min(240px, 60vw, 60vh)",
          height: "min(240px, 60vw, 60vh)",
          background: isListening
            ? "radial-gradient(circle at 30% 30%, #FF5722, #F44336)"
            : "radial-gradient(circle at 30% 30%, #4CAF50, #8BC34A)",
          border: "4px solid #FFCC80",
          boxShadow: isListening
            ? "0 0 30px rgba(255, 87, 34, 0.5)"
            : "0 10px 30px rgba(76, 175, 80, 0.4)",
        }}
      >
        {/* Sound Waves */}
        {isListening &&
          Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2 border-red-400 opacity-50"
              style={{
                width: "70%",
                height: "70%",
                top: "15%",
                left: "15%",
              }}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.6, 0, 0],
              }}
              transition={{
                duration: 1.5 + i * 0.4,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.3,
              }}
            />
          ))}

        {/* Voice Bars */}
        {isListening && (
          <div className="absolute inset-8 flex items-center justify-center">
            <div className="flex space-x-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-red-400 rounded-full"
                  animate={{
                    scaleY: [0.5, 1.6, 0.5],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.15,
                  }}
                  style={{ originY: 1 }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Center Button */}
        <div
          className="relative z-10 flex flex-col items-center justify-center space-y-1"
          onClick={startListening}
        >
          <motion.div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold shadow-md"
            animate={{
              scale: isListening ? [1, 1.15, 1] : 1,
              rotate: isListening ? [0, 8, -8, 0] : 0,
            }}
            transition={{ repeat: isListening ? Infinity : 0, duration: 0.8 }}
            style={{
              background: isListening
                ? "linear-gradient(135deg, #D32F2F, #FF5722)"
                : "linear-gradient(135deg, #388E3C, #4CAF50)",
            }}
          >
            <span className="text-lg">{isListening ? "●" : "🎤"}</span>
          </motion.div>
          <motion.span
            className="text-sm font-medium text-white drop-shadow-sm"
            animate={{ y: isListening ? [0, -2, 0] : 0 }}
            transition={{ repeat: isListening ? Infinity : 0 }}
          >
            {isListening ? "Listening..." : "Tap to Speak"}
          </motion.span>
        </div>

        {/* Status */}
        {aiState === "loading" && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full animate-pulse">
            Thinking...
          </div>
        )}
        {aiState === "speaking" && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-3 py-1 rounded-full animate-pulse">
            Speaking...
          </div>
        )}
      </motion.div>

      {/* Close Button */}
      <button
        className="absolute top-6 right-6 text-white bg-black bg-opacity-40 hover:bg-opacity-60 rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
        onClick={handleClose}
        aria-label="Close"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default AIWaveButton;