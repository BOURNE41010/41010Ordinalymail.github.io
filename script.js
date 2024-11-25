const GITHUB_API = "https://api.github.com";
const REPO_OWNER = "BOURNE41010"; // แทนที่ด้วยชื่อผู้ใช้ GitHub
const REPO_NAME = "mail-statistics";
const FILE_PATH = "data.json";
const TOKEN = "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"; // ใช้ Personal Access Token

// ดึงข้อมูลจาก GitHub
async function fetchData() {
    const response = await fetch(`${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
        headers: { Authorization: `token ${TOKEN}` },
    });
    const data = await response.json();
    const content = atob(data.content); // Decode Base64
    return { sha: data.sha, json: JSON.parse(content) };
}

// อัปเดตข้อมูลใน GitHub
async function updateData(updatedData) {
    const { sha } = await fetchData();
    const content = btoa(JSON.stringify(updatedData, null, 2)); // Encode Base64

    const response = await fetch(`${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
        method: "PUT",
        headers: {
            Authorization: `token ${TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message: "Update data.json",
            content: content,
            sha: sha,
        }),
    });

    if (response.ok) {
        alert("Data updated successfully!");
    } else {
        console.error("Failed to update data:", response.status, response.statusText);
    }
}

// เพิ่มข้อมูลใหม่
document.getElementById("dataForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = localStorage.getItem("selectedName");
    const province = document.getElementById("province").value;
    const date = document.getElementById("date").value;
    const quantity = parseInt(document.getElementById("quantity").value);

    const { json: data } = await fetchData();
    if (!data[name]) data[name] = [];
    data[name].push({ province, date, quantity });

    await updateData(data);
});
