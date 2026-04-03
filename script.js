let timerInterval, startTime, elapsedTime = 0;
const limitNormal = 5 * 60 * 1000; // 5 minutos
const maxOvertime = 20 * 60 * 1000; // Limite extra de 20 minutos
const MAX_DASH_ARRAY = 251.32;

const modal = new bootstrap.Modal(document.getElementById('resultModal'));
const timerDisplay = document.getElementById('timer');
const progressCircle = document.getElementById('progress');

function formatTime(ms) {
    let m = Math.floor(ms / 60000);
    let s = Math.floor((ms % 60000) / 1000);
    let cs = Math.floor((ms % 1000) / 10);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}:${cs.toString().padStart(2, "0")}`;
}

function updateUI() {
    // Cronômetro Crescente
    timerDisplay.innerHTML = formatTime(elapsedTime);

    if (elapsedTime <= limitNormal) {
        // Até 5 minutos: Velocímetro Azul enchendo
        const offset = MAX_DASH_ARRAY - (elapsedTime * MAX_DASH_ARRAY / limitNormal);
        progressCircle.style.strokeDashoffset = offset;
        progressCircle.style.stroke = "#0061A4";
        timerDisplay.style.color = "#0061A4";
        document.getElementById('overtime-container').style.visibility = "hidden";
        document.getElementById('status-label').innerText = "TEMPO DECORRIDO";
    } else {
        // Após 5 minutos: Modo Extra
        let extra = elapsedTime - limitNormal;
        timerDisplay.innerHTML = formatTime(limitNormal); // Trava o principal em 05:00
        document.getElementById('overtime-timer').innerHTML = formatTime(extra);
        document.getElementById('overtime-container').style.visibility = "visible";
        document.getElementById('status-label').innerText = "TEMPO EXCEDIDO";
        
        progressCircle.style.stroke = "#BA1A1A"; // Fica vermelho
        progressCircle.style.strokeDashoffset = 0; // Fica cheio
        timerDisplay.style.color = "#BA1A1A";

        if (extra >= maxOvertime) {
            clearInterval(timerInterval);
            alert("Tempo extra limite (20min) atingido!");
            modal.show();
        }
    }
}

function start() {
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
    modal.show(); 
}

function finishWithStatus(status, bgColor, textColor) {
    const prod = document.getElementById('modalProducer').value;
    const plac = document.getElementById('modalPlate').value;

    if(!prod || !plac) {
        alert("Preencha Produtor e Placa!");
        return;
    }

    modal.hide();
    
    // UI para imagem
    document.getElementById('data-display-area').classList.remove('d-none');
    document.getElementById('disp-producer').innerText = prod;
    document.getElementById('disp-plate').innerText = plac;

    const resDisplay = document.getElementById('result-display');
    resDisplay.classList.remove('d-none');
    resDisplay.style.backgroundColor = bgColor;
    const resText = document.getElementById('finalStatusText');
    resText.innerText = status;
    resText.style.color = textColor;

    const finalTimeTextHtml = document.getElementById('final-time-text');
    if (elapsedTime > limitNormal) {
        let extra = elapsedTime - limitNormal;
        finalTimeTextHtml.innerHTML = `
            <div style="font-size: 2.5rem; font-weight: bold;">05:00:00</div>
            <div class="badge-extra">EXTRA: ${formatTime(extra)}</div>`;
    } else {
        finalTimeTextHtml.innerHTML = `<div style="font-size: 2.5rem; font-weight: bold;">${formatTime(elapsedTime)}</div>`;
    }

    document.getElementById('gauge-and-timer-ui').classList.add('d-none');
    document.getElementById('capture-timer-display').classList.remove('d-none');

    setTimeout(() => {
        html2canvas(document.getElementById('capture-area'), { scale: 2 }).then(canvas => {
            const link = document.createElement('a');
            link.download = `Auditoria-${document.getElementById('pdrValue').value}.png`;
            link.href = canvas.toDataURL();
            link.click();
            partialReset();
        });
    }, 400);
}

function partialReset() {
    elapsedTime = 0;
    document.getElementById('data-display-area').classList.add('d-none');
    document.getElementById('result-display').classList.add('d-none');
    document.getElementById('modalProducer').value = "";
    document.getElementById('modalPlate').value = "";
    document.getElementById('gauge-and-timer-ui').classList.remove('d-none');
    document.getElementById('capture-timer-display').classList.add('d-none');
    document.getElementById('status-label').innerText = "TEMPO DECORRIDO";
    updateUI();
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
    document.getElementById('auditorName').disabled = false;
    document.getElementById('pdrValue').disabled = false;
}

document.getElementById('startBtn').addEventListener("click", start);
document.getElementById('stopBtn').addEventListener("click", stopTimer);
document.getElementById('resetBtn').addEventListener("click", () => location.reload());

updateUI();