import { useState, useEffect } from "react";

export default function Timer({ initialMinutes = 20, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp(); // Cancela o envía el examen
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimeUp]);

  // Formato mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <span>
      ⏱️ {minutes}:{seconds.toString().padStart(2, "0")}
    </span>
  );
}
