let tests = {
    1: { id: 1, elapsedTime: 0, startTime: null, interval: null, status: 'idle', data: {}, date: '', endTime: '' },
    2: { id: 2, elapsedTime: 0, startTime: null, interval: null, status: 'idle', data: {}, date: '', endTime: '' },
    3: { id: 3, elapsedTime: 0, startTime: null, interval: null, status: 'idle', data: {}, date: '', endTime: '' },
    4: { id: 4, elapsedTime: 0, startTime: null, interval: null, status: 'idle', data: {}, date: '', endTime: '' }
};

let currentActive = 1;
const limitNormal = 5 * 60 * 1000;
const modal = new bootstrap.Modal(document.getElementById('resultModal'));

function formatTime(ms) {
    let m = Math.floor(ms / 60000);
    let s = Math.floor((ms % 60000) / 1000);
    let cs = Math.floor((ms % 1000) / 10);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}:${cs.toString().padStart(2, "0")}`;
}

function selectTest(num) {
    document.querySelectorAll('.btn-test-slot').forEach(b => b.classList.remove('active'));
    document.getElementById(`slot-${num}`).classList.add('active');
    currentActive = num;
    document.getElementById('active-test-label').innerText = `TESTE ${num} EM FOCO`;
    refreshUI();
}

function refreshUI() {
    const t = tests[currentActive];
    updateChronometerDisplay(t.elapsedTime);
    document.getElementById('startBtn').disabled = (t.status === 'running' || t.status === 'completed');
    document.getElementById('stopBtn').disabled = (t.status !== 'running');
}

function updateChronometerDisplay(ms) {
    const timerDisplay = document.getElementById('timer');
    const progressCircle = document.getElementById('progress');
    
    if (ms <= limitNormal) {
        timerDisplay.innerHTML = formatTime(ms);
        const offset = 251.32 - (ms * 251.32 / limitNormal);
        progressCircle.style.strokeDashoffset = offset;
        progressCircle.style.stroke = "#0061A4";
        timerDisplay.style.color = "#0061A4";
        document.getElementById('overtime-container').style.visibility = "hidden";
    } else {
        timerDisplay.innerHTML = "05:00:00";
        document.getElementById('overtime-timer').innerHTML = formatTime(ms - limitNormal);
        document.getElementById('overtime-container').style.visibility = "visible";
        progressCircle.style.stroke = "#FBC02D"; 
        timerDisplay.style.color = "#FBC02D";
    }
}

function startActiveTimer() {
    const t = tests[currentActive];
    if (t.status === 'running') return;

    t.status = 'running';
    t.startTime = Date.now() - t.elapsedTime;
    document.getElementById(`slot-${currentActive}`).classList.add('running');
    
    clearInterval(t.interval);
    t.interval = setInterval(() => {
        t.elapsedTime = Date.now() - t.startTime;
        // ISOLAMENTO DE UI: Só desenha se o teste for o que está em foco
        if (tests[currentActive].id === t.id) {
            updateChronometerDisplay(t.elapsedTime);
        }
    }, 50);
    refreshUI();
}

function stopActiveTimer() {
    const t = tests[currentActive];
    clearInterval(t.interval);
    t.status = 'completed';
    const agora = new Date();
    t.date = agora.toLocaleDateString('pt-BR');
    t.endTime = agora.toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit', second:'2-digit'});

    document.getElementById(`slot-${currentActive}`).classList.remove('running');
    document.getElementById(`slot-${currentActive}`).classList.add('completed');
    
    document.getElementById('modalTitle').innerText = `Finalizar Teste ${currentActive}`;
    document.getElementById('modalProducer').value = t.data.prod || "";
    document.getElementById('modalPlate').value = t.data.plac || "";
    modal.show();
    refreshUI();
}

function setStatus(status, color) {
    const prod = document.getElementById('modalProducer').value;
    const plac = document.getElementById('modalPlate').value;
    if(!prod || !plac) return alert("Preencha Produtor(a) e Placa!");
    tests[currentActive].data = { status, prod, plac };
    document.getElementById('exportOptions').classList.remove('d-none');
}

function exportWhatsApp(tipo) {
    const t = tests[currentActive];
    const auditor = document.getElementById('auditorName').value;
    const pdr = document.getElementById('pdrValue').value;
    const d = t.data;
    
    // Tempo total real somado
    let totalMs = t.elapsedTime;
    let m = Math.floor(totalMs / 60000);
    let s = Math.floor((totalMs % 60000) / 1000);
    let tempoFinal = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}:00`;

    let msg = tipo === 'completo' ? 
        `*AUDITORIA - TESTE ${currentActive}*%0A--------------------------%0A*Data:* ${t.date}%0A*Hora:* ${t.endTime}%0A%0A*Auditor:* ${auditor}%0A*PDR:* ${pdr}%0A*Produtor(a):* ${d.prod}%0A*Placa:* ${d.plac.toUpperCase()}%0A*Tempo Testagem:* ${tempoFinal}%0A*Resultado:* ${d.status}` :
        `*Produtor(a):* ${d.prod}%0A*Placa:* ${d.plac.toUpperCase()}%0A*Resultado:* ${d.status}`;

    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
}

function resetCurrentTest() {
    const t = tests[currentActive];
    clearInterval(t.interval);
    tests[currentActive] = { id: currentActive, elapsedTime: 0, startTime: null, interval: null, status: 'idle', data: {}, date: '', endTime: '' };
    document.getElementById(`slot-${currentActive}`).classList.remove('completed', 'running');
    document.getElementById('exportOptions').classList.add('d-none');
    modal.hide();
    refreshUI();
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

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js'); });
}