// Heart 
const heartCountEl = document.getElementById("heartCount");
let heartCount = 0;

// Copy 
let copyCount = 0;
const copyCountEl = document.getElementById("copyCount");

const incCopy = () => {
  copyCount++;
  copyCountEl.textContent = copyCount;
};

// Clipboard 
const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    return true;
  } catch (e) {
    console.error("Copy failed", e);
    return false;
  }
};

// Coins 
let coins = 100;
const coinCountEl = document.getElementById("coinCount");
const setCoins = (val) => {
  coins = val;
  coinCountEl.textContent = coins;
};

//  History 
const historyList = document.getElementById("historyList");
const emptyHistory = document.getElementById("emptyHistory");

const addHistoryItem = (card) => {
  emptyHistory.classList.add("hidden");

  const nameEl = card.querySelector("h3");
  const numberEl = card.querySelector(".text-2xl");

  const li = document.createElement("li");
  li.className = "flex items-start justify-between gap-2 rounded-xl border border-emerald-100 p-3";

  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  li.innerHTML = `
    <div>
      <p class="font-medium">${nameEl ? nameEl.textContent : ""}</p>
      <p class="text-xs text-gray-500">${numberEl ? numberEl.textContent : ""}</p>
      
    </div>
    <span class="text-xs px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">${timeStr}</span>
  `;

  historyList.prepend(li);
};

// Clear history
document.getElementById("clearHistoryBtn").addEventListener("click", () => {
  historyList.innerHTML = "";
  emptyHistory.classList.remove("hidden");
});

//Event  
document.addEventListener("click", async (e) => {
  const card = e.target.closest(".card");
  if (!card) return;

  // Heart Button 
  const heartBtn = e.target.closest(".heartBtn");
  if (heartBtn) {
    const icon = heartBtn.querySelector("i");
    if (icon.classList.contains("fa-regular")) {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid", "text-rose-600");
      heartCount++;
    } else {
      icon.classList.remove("fa-solid", "text-rose-600");
      icon.classList.add("fa-regular");
      heartCount = Math.max(0, heartCount - 1);
    }
    heartCountEl.textContent = heartCount;
    return;
  }

  //  Copy Button 
  const copyBtn = e.target.closest(".copyBtn");
  if (copyBtn) {
    const numberEl = card.querySelector(".text-2xl");
    const nameEl = card.querySelector("h3");
    const number = numberEl ? numberEl.textContent.trim() : "";
    const name = nameEl ? nameEl.textContent.trim() : "";

    const ok = await copyToClipboard(number);
    if (ok) {
      incCopy();
      alert(`Copied ${number} (${name}) to clipboard!`);
    } else {
      alert(`Copy failed. Please copy manually: ${number}`);
    }
    return;
  }

  //  Call Button 
  const callBtn = e.target.closest(".callBtn");
  if (callBtn) {
    if (coins < 20) {
      alert("Not enough coins to place a call. You need 20 coins.");
      return;
    }

    const numberEl = card.querySelector(".text-2xl");
    const nameEl = card.querySelector("h3");

    alert(`Calling ${nameEl ? nameEl.textContent : ""} at ${numberEl ? numberEl.textContent : ""}…`);

    setCoins(coins - 20);
    addHistoryItem(card);
    return;
  }
});
