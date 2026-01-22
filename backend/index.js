const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// --- Creative Data Pools ---

const fortunes = [
  "🔮 The spirits indicate your next git merge will have zero conflicts.",
  "🔮 You will solve a bug today by staring at the screen until it feels guilty.",
  "🔮 Beware of copying code from StackOverflow without reading the comments.",
  "🔮 A forgotten semicolon will haunt your dreams tonight.",
  "🔮 Your imposter syndrome is lying to you. You're doing great.",
  "🔮 You will finally understand why that one div won't center.",
];

const jokes = [
  "A SQL query walks into a bar, walks up to two tables, and asks... 'Can I join you?'",
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "I have a joke about CSS but... \n   it's \n      hard \n         to \n   align.",
  "Knock, knock.\nWho's there?\nRecursion.\nRecursion who?\nKnock, knock...",
  "!.false — It's funny because it's true.",
];

const vibeMap = {
  happy: { 
    emoji: "🚀", 
    message: "Velocity is high. Code is clean. Deploy to production on a Friday, I dare you." 
  },
  tired: { 
    emoji: "☕", 
    message: "System overheating. Insert caffeine to continue operation. Do not attempt complex logic." 
  },
  stressed: { 
    emoji: "🔥", 
    message: "This is fine. Everything is fine. Just close the laptop and touch some grass." 
  },
};

let smashes = 0;

// --- Endpoints ---

app.get("/api/fortune", (req, res) => {
  const pick = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.json({ fortune: pick });
});

app.get("/api/joke", (req, res) => {
  const pick = jokes[Math.floor(Math.random() * jokes.length)];
  res.json({ joke: pick });
});

app.get("/api/vibe", (req, res) => {
  const mood = (req.query.mood || "").toLowerCase();
  const vibe = vibeMap[mood];

  if (!vibe) {
    return res.status(400).json({
      message: "Vibe check failed. Try mood=happy, tired, or stressed.",
    });
  }
  res.json({ mood, ...vibe });
});

app.post("/api/smash", (req, res) => {
  smashes += 1;
  // Send back a funny message depending on how high the number gets
  let flavorText = "Ouch.";
  if (smashes > 10) flavorText = "Stop it!";
  if (smashes > 50) flavorText = "I'm calling the police.";
  
  res.json({ smashes, message: flavorText });
});

app.get("/api/secret", (req, res) => {
  const code = req.query.code;
  if (code === "411L") {
    return res.json({ message: "🎉 UNLOCKED: The answer to the exam is... just kidding. Good luck!" });
  }
  res.status(403).json({ message: "⛔ Access Denied. Wrong secret code." });
});

app.listen(PORT, () => {
  console.log(`✨ VibeCheck API running at http://localhost:${PORT}`);
});