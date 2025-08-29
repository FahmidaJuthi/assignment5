const heartCount = document.getElementById("heartCount");

document.addEventListener("click", function (e) {
  const btn = e.target.closest(".heartBtn");
  if (!btn) return;

  const icon = btn.querySelector("i");
  let count = parseInt(heartCount.textContent);

  if (icon.classList.contains("fa-regular")) {
    // like
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid", "text-rose-600");
    heartCount.textContent = count + 1;
  } else {
    // unlike
    icon.classList.remove("fa-solid", "text-rose-600");
    icon.classList.add("fa-regular");
    heartCount.textContent = Math.max(0, count - 1);
  }
});
