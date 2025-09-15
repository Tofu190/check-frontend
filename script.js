// 🔗 URL Backend บน Render
const API_URL = "https://check-backend.onrender.com"; // แก้เป็นของจริงคุณ

// ⏺ ฟอร์มเช็คชื่อ
document.getElementById("checkinForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const status = document.getElementById("status").value;

  try {
    const res = await fetch(`${API_URL}/checkin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, status })
    });

    const data = await res.json();
    alert(data.message);

    document.getElementById("name").value = "";
    loadReport();
  } catch (error) {
    alert("❌ เกิดข้อผิดพลาด: " + error.message);
  }
});

// 📊 โหลดรายงาน
async function loadReport() {
  try {
    const res = await fetch(`${API_URL}/report`);
    const report = await res.json();

    const list = document.getElementById("report");
    list.innerHTML = "";
    report.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${new Date(item.time).toLocaleString()} - ${item.name} (${item.status})`;
      list.appendChild(li);
    });
  } catch (error) {
    console.error("โหลดรายงานไม่ได้:", error);
  }
}

// 👉 โหลดตอนเปิดเว็บ
loadReport();
