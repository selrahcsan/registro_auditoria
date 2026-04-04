# 🏁 Auditoria Pro v1.0

O **Auditoria Pro** é um Progressive Web App (PWA) de alta performance desenvolvido para otimizar o processo de cronometragem e reporte em auditorias de carga de soja. Com uma interface baseada no **Material Design 3 (Material You)**, o foco é a agilidade operacional e a precisão dos dados.

---

## 🚀 Principais Funcionalidades

### ⏱️ Cronometragem Inteligente

- **Contagem Crescente:** Inicia em `00:00:00` e progride em tempo real.  
- **Velocímetro (Gauge) Dinâmico:** Um arco visual que se preenche em azul até o tempo limite de 5 minutos.  
- **Tempo Extra Automático:** Caso a auditoria ultrapasse 5 minutos, o sistema ativa um contador de **Tempo Extra** (em destaque amarelo) limitado a 20 minutos adicionais.  
- **Somatória de Tempo Real:** O relatório final calcula o tempo total exato (Ex: `05:33:00`) para conformidade técnica.  

---

### 📋 Fluxo de Trabalho Otimizado

- **Persistência de Dados:** Os campos *Nome Auditor(a)* e *PDR* permanecem preenchidos entre auditorias para acelerar processos repetitivos.  
- **Linguagem Inclusiva:** Interface adaptada para **Produtor(a)** e Auditor(a).  
- **Campos Dinâmicos:** Dados de carga (*Produtor* e *Placa*) e o resultado da testagem são solicitados via **Modal** apenas após a parada do cronômetro.  

---

### 💬 Reporte via WhatsApp

- **Registro Completo:** Envia todos os dados, incluindo:
  - Data  
  - Hora de término  
  - Auditor  
  - PDR  
  - Produtor(a)  
  - Placa  
  - Tempo de Testagem  
  - Resultado  

- **Registro Resumido:** Envia apenas as informações essenciais (*Produtor, Placa e Resultado*) para comunicações rápidas.  

---

### ℹ️ Perfil e Suporte (Bio)

- Tela exclusiva **"Sobre"** com foto do desenvolvedor e ícone da aplicação sobreposto.  
- Link direto para sugestões via WhatsApp.  
- Sistema de apoio ao projeto via **PIX** com função *"Um clique para copiar"*.  

---

### 🔌 Funcionamento Offline (PWA)

- Equipado com **Service Worker**, permitindo que o app funcione sem conexão com a internet após o primeiro acesso.  
- Pode ser instalado na tela inicial do **Android/iOS** como um aplicativo nativo.  

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3 (Flexbox/Grid), JavaScript Vanilla (ES6+)  
- **UI/UX:** Bootstrap 5.3 + Material Design 3  
- **PWA:** Web Manifest & Service Workers  
- **Ícones:** Identidade visual customizada (Auditoria de Soja)  

---

## 📂 Estrutura do Projeto

```plaintext
├── index.html       # Estrutura principal e Modais
├── style.css        # Design Material You e animações de Gauge
├── script.js        # Lógica do cronômetro e integração WhatsApp
├── sw.js            # Cache para funcionamento offline
├── manifest.json    # Configurações de instalação PWA
├── icon-192.png     # Ícone oficial (Soja)
└── minha-foto.jpg   # Foto de perfil do desenvolvedor