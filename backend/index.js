/**
 * VibeCheck API (CPE 411L)
 * Updated with Tito Jokes & Real Talk Fortunes
 */

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// --- New Data Pools ---

// "Tito Wisdom" - Pragmatic advice for devs and students
const fortunes = [
  "🔮 Your back hurts? Inom ka ng tubig. Posture check muna.",
  "🔮 That error is not a bug. It's a 'surprise feature'.",
  "🔮 Stop overthinking. It works on my machine.",
  "🔮 You will be asked to fix the printer today because you 'know computers'.",
  "🔮 Pahinga ka muna. Even StackOverflow needs a break.",
  "🔮 Your next commit will conflict. Just accept your fate.",
  "🔮 Wag ka mag-deploy ng Friday. Bad feng shui yan.",
];

// "Tito Jokes" - Classic puns and groan-worthy humor
const jokes = [
  "Anong tawag sa computer na kumakanta? ... A Dell. 🎤",
  "Bakit bawal magutom sa EDSA? ... Kasi traffic JAM. 🍓",
  "Anong sabi ng 0 sa 8? ... 'Nice belt!' 👖",
  "Bakit malungkot ang kalendaryo? ... Kasi bilang na ang araw niya. 📅",
  "Anong favorite sport ng mga web developer? ... C-SS (Tennis). 🎾",
  "Saan nagpupunta ang mga pusa pag namatay sila? ... Sa Purrr-gatory. 😺",
  "Anong tawag sa maliit na tsunami? ... Tsunami-it. 🌊",
];

const vibeMap = {
  happy: { 
    emoji: "😎", 
    message: "Ayos! Tuloy ang grind. Don't forget to commit." 
  },
  tired: { 
    emoji: "💤", 
    message: "Idlip ka muna 5 minutes. (After 5 hours na gising niyan)." 
  },
  stressed: { 
    emoji: "💆‍♂️", 
    message: "Chill lang. The bug smells fear. Relax ka lang." 
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
      message: "Mood not found. Try happy, tired, or stressed.",
    });
  }
  res.json({ mood, ...vibe });
});

app.post("/api/smash", (req, res) => {
  smashes += 1;
  
  let flavorText = "Sige lang!";
  if (smashes > 10) flavorText = "Hala, sira na mouse mo.";
  if (smashes > 50) flavorText = "Tama na, mahal ang electric bill!";
  
  res.json({ smashes, message: flavorText });
});

app.get("/api/secret", (req, res) => {
  const code = req.query.code;
  if (code === "411L") {
    return res.json({ message: "🎉 Secret Unlocked: Libreng milk tea (joke lang)." });
  }
  res.status(403).json({ message: "⛔ Access Denied. Wrong code." });
});

app.listen(PORT, () => {
  console.log(`✨ VibeCheck API running at http://localhost:${PORT}`);
});