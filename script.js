let timerInterval, startTime, elapsedTime = 0;
const limitNormal = 5 * 60 * 1000;
const maxOvertime = 20 * 60 * 1000;
let endTimeRecord, dateRecord, currentStatusData = {};

const modal = new bootstrap.Modal(document.getElementById('resultModal'));

function formatTime(ms) {
    let m = Math.floor(ms / 60000);
    let s = Math.floor((ms % 60000) / 1000);
    let cs = Math.floor((ms % 1000) / 10);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}:${cs.toString().padStart(2, "0")}`;
}

function updateUI() {
    const timerDisplay = document.getElementById('timer');
    const progressCircle = document.getElementById('progress');
    
    timerDisplay.innerHTML = formatTime(elapsedTime);

    if (elapsedTime <= limitNormal) {
        const offset = 251.32 - (elapsedTime * 251.32 / limitNormal);
        progressCircle.style.strokeDashoffset = offset;
        progressCircle.style.stroke = "#0061A4";
        timerDisplay.style.color = "#0061A4";
        document.getElementById('overtime-container').style.visibility = "hidden";
        document.getElementById('status-label').innerText = "Tempo Decorrido";
    } else {
        let extra = elapsedTime - limitNormal;
        timerDisplay.innerHTML = "05:00:00";
        document.getElementById('overtime-timer').innerHTML = formatTime(extra);
        document.getElementById('overtime-container').style.visibility = "visible";
        document.getElementById('status-label').innerText = "Tempo Extra";
        progressCircle.style.stroke = "#FBC02D"; 
        timerDisplay.style.color = "#FBC02D";
        if (extra >= maxOvertime) { clearInterval(timerInterval); stopTimer(); }
    }
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateUI();
    }, 10);
    document.getElementById('startBtn').disabled = true;
    document.getElementById('stopBtn').disabled = false;
    document.getElementById('auditorName').disabled = true;
    document.getElementById('pdrValue').disabled = true;
}

function stopTimer() {
    clearInterval(timerInterval);
    const agora = new Date();
    dateRecord = agora.toLocaleDateString('pt-BR');
    endTimeRecord = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    modal.show();
}

function setStatus(status, color) {
    const prod = document.getElementById('modalProducer').value;
    const plac = document.getElementById('modalPlate').value;
    if(!prod || !plac) return alert("Preencha Produtor e Placa primeiro!");
    currentStatusData = { status, prod, plac };
    document.getElementById('exportOptions').classList.remove('d-none');
    document.querySelectorAll('.btn-status').forEach(b => b.style.border = "1px solid #ddd");
    event.target.style.border = `2px solid ${color}`;
}

function exportWhatsApp(tipo) {
    const auditor = document.getElementById('auditorName').value;
    const pdr = document.getElementById('pdrValue').value;
    const { status, prod, plac } = currentStatusData;
    let tempoTotal = elapsedTime > limitNormal ? `05:00:00 (+ Extra: ${formatTime(elapsedTime - limitNormal)})` : formatTime(elapsedTime);

    let msg = tipo === 'completo' ? 
        `*REGISTRO DE AUDITORIA*%0A--------------------------%0A*Data:* ${dateRecord}%0A*Hora:* ${endTimeRecord}%0A%0A*Auditor:* ${auditor}%0A*PDR:* ${pdr}%0A*Produtor:* ${prod}%0A*Placa:* ${plac.toUpperCase()}%0A*Tempo Testagem:* ${tempoTotal}%0A*Resultado:* ${status}` :
        `*Produtor:* ${prod}%0A*Placa:* ${plac.toUpperCase()}%0A*Resultado:* ${status}`;

    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
}

function toggleScreen(scr) {
    document.getElementById('main-screen').classList.toggle('d-none', scr === 'bio-screen');
    document.getElementById('bio-screen').classList.toggle('d-none', scr === 'main-screen');
    document.getElementById('btnSobre').classList.toggle('d-none', scr === 'bio-screen');
}

function copyPix(e) {
    const key = document.getElementById('pixKey');
    key.select();
    navigator.clipboard.writeText(key.value);
    e.target.innerText = "Copiado! ✅";
    setTimeout(() => e.target.innerText = "Copiar", 2000);
}

document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('stopBtn').addEventListener('click', stopTimer);
document.getElementById('resetBtn').addEventListener('click', () => location.reload());

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js'); });
}