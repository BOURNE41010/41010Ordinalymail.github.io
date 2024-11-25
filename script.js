document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dataForm');
    const lineSelect = document.getElementById('line');
    const dateSelect = document.getElementById('date');
    const chartCanvas = document.getElementById('lineChart');
    let data = {};

    // Generate Line and Date options
    for (let i = 1; i <= 10; i++) {
        lineSelect.innerHTML += `<option value="${i}">สาย ${i}</option>`;
    }

    for (let i = 1; i <= 30; i++) {
        dateSelect.innerHTML += `<option value="${i}">วันที่ ${i}</option>`;
    }

    // Handle Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const line = lineSelect.value;
        const date = dateSelect.value;
        const quantity = parseInt(document.getElementById('quantity').value);

        if (!data[line]) data[line] = Array(30).fill(0);
        data[line][date - 1] += quantity;

        updateChart();
        form.reset();
    });

    // Initialize Chart
    const chart = new Chart(chartCanvas, {
        type: 'line',
        data: {
            labels: Array.from({ length: 30 }, (_, i) => `วันที่ ${i + 1}`),
            datasets: [],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
        },
    });

    // Update Chart
    function updateChart() {
        chart.data.datasets = Object.keys(data).map(line => ({
            label: `สาย ${line}`,
            data: data[line],
            borderColor: getRandomColor(),
            fill: false,
        }));
        chart.update();
    }

    // Helper: Random Color
    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }
});
