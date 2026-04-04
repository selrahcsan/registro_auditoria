let timerInterval, startTime, elapsedTime = 0;
const limitNormal = 5 * 60 * 1000; // 5 Minutos
const maxOvertime = 20 * 60 * 1000; // 20 Minutos Extra
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
    } else {
        let extra = elapsedTime - limitNormal;
        timerDisplay.innerHTML = "05:00:00";
        document.getElementById('overtime-timer').innerHTML = formatTime(extra);
        document.getElementById('overtime-container').style.visibility = "visible";
        document.getElementById('status-label').innerText = "TEMPO EXTRA";
        progressCircle.style.stroke = "#FBC02D"; 
        timerDisplay.style.color = "#FBC02D";
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

function setStatus(status, bg, txt) {
    const prod = document.getElementById('modalProducer').value;
    const plac = document.getElementById('modalPlate').value;
    if(!prod || !plac) return alert("Preencha Produtor e Placa!");

    currentStatusData = { status, bg, txt, prod, plac };
    document.getElementById('btnImg').classList.remove('d-none');
    document.getElementById('btnTxt').classList.remove('d-none');
}

function exportWhatsApp() {
    const auditor = document.getElementById('auditorName').value;
    const pdr = document.getElementById('pdrValue').value;
    
    // Cálculo do tempo total para o texto
    let tempoTotal = elapsedTime > limitNormal ? 
        `05:00:00 (+ Extra: ${formatTime(elapsedTime - limitNormal)})` : 
        formatTime(elapsedTime);
    
    // MENSAGEM FORMATADA CONFORME SOLICITADO
    const msg = `*REGISTRO DE AUDITORIA*%0A` +
                `--------------------------%0A` +
                `*Data:* ${dateRecord}%0A` +
                `*Hora:* ${endTimeRecord}%0A%0A` + // Alterado para "Hora:"
                `*Auditor:* ${auditor}%0A` +
                `*PDR:* ${pdr}%0A` +
                `*Produtor:* ${currentStatusData.prod}%0A` +
                `*Placa:* ${currentStatusData.plac.toUpperCase()}%0A` +
                `*Tempo Testagem:* ${tempoTotal}%0A` + // Alterado para "Tempo Testagem:"
                `*Resultado:* ${currentStatusData.status}`;

    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
}

// Funções de Imagem e Reset (mantidas iguais)
function exportImage() {
    // ... lógica de captura de imagem (idêntica ao anterior)
    modal.hide();
    // (Ajustar labels internos se necessário para bater com o texto)
    setTimeout(() => location.reload(), 2000);
}

document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('stopBtn').addEventListener('click', stopTimer);
document.getElementById('resetBtn').addEventListener('click', () => location.reload());