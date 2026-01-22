const out = document.getElementById("out");
const statusBar = document.getElementById("status-bar");
const API_BASE = "http://localhost:3000";

// --- UI Helpers ---

function setLoading(isLoading) {
  if (isLoading) {
    out.style.opacity = "0.5";
    statusBar.textContent = "Fetching data...";
    statusBar.className = "status-loading";
    document.body.style.cursor = "wait";
  } else {
    out.style.opacity = "1";
    statusBar.textContent = "System Ready";
    statusBar.className = "status-ready";
    document.body.style.cursor = "default";
  }
}

function displayResult(data) {
  // If it's a simple object, formatting it nicely
  let displayParams = "";
  
  // Custom formatting based on what keys we get back
  if (data.fortune) displayParams = `🔮 ${data.fortune}`;
  else if (data.joke) displayParams = `😂 ${data.joke}`;
  else if (data.smashes) displayParams = `💥 Server Smashed: ${data.smashes} times`;
  else if (data.message && data.mood) displayParams = `Mood: ${data.mood}\n${data.emoji} ${data.message}`;
  else if (data.message) displayParams = `> ${data.message}`;
  else displayParams = JSON.stringify(data, null, 2);

  out.textContent = displayParams;
  
  // Add a flash effect
  out.animate([
    { backgroundColor: '#38bdf822' },
    { backgroundColor: '#000000' }
  ], { duration: 300 });
}

function displayError(err) {
  console.error(err);
  statusBar.textContent = "Connection Error";
  statusBar.className = "status-error";
  out.textContent = `❌ Error: ${err.message}\nCheck if your Node server is running on port 3000.`;
}

// --- API Wrapper ---

async function fetchAPI(endpoint, options = {}) {
  setLoading(true);
  try {
    // Add a tiny artificial delay so the user feels the interaction
    await new Promise(r => setTimeout(r, 300)); 
    
    const res = await fetch(`${API_BASE}${endpoint}`, options);
    
    if (!res.ok) {
      // Handle 403/404/500 errors gracefully
      const errData = await res.json();
      throw new Error(errData.message || `Status ${res.status}`);
    }
    
    const data = await res.json();
    displayResult(data);
  } catch (err) {
    displayError(err);
  } finally {
    setLoading(false);
  }
}

// --- Event Listeners ---

document.getElementById("btnFortune").addEventListener("click", () => {
  fetchAPI("/api/fortune");
});

document.getElementById("btnJoke").addEventListener("click", () => {
  fetchAPI("/api/joke");
});

document.querySelectorAll(".btnMood").forEach(btn => {
  btn.addEventListener("click", () => {
    const mood = btn.dataset.mood;
    fetchAPI(`/api/vibe?mood=${mood}`);
  });
});

document.getElementById("btnSmash").addEventListener("click", () => {
  fetchAPI("/api/smash", { method: "POST" });
});

document.getElementById("btnSecret").addEventListener("click", () => {
  fetchAPI("/api/secret?code=411L");
});