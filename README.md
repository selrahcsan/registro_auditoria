# 🏁 Sistema de Cronometragem para Auditoria (Material You)

Um sistema de cronometragem especializado para auditorias de carga, desenvolvido com uma interface moderna baseada no Material Design 3 (Material You). O sistema permite o controle de tempo de processos, registro de dados do produtor/veículo, data e hora da auditoria e exportação de resultados em imagem.

---

## ✨ Funcionalidades

### ⏱️ Cronômetro Progressivo Inteligente
- Contagem crescente de **00:00:00 até 05:00:00**
- Visual de velocímetro (**Gauge**) que preenche conforme o tempo passa
- **Tempo Extra:** após 5 minutos, ativa automaticamente um contador adicional (limite de 20 minutos)

### 📅 Registro de Data e Hora
- Captura automática da **data e hora exatas** no momento da finalização da auditoria  
- Informação incluída no comprovante exportado (.png)  
- Garante rastreabilidade e confiabilidade no processo  

### 📋 Fluxo de Trabalho Otimizado
- O auditor inicia apenas com **Nome e PDR**
- Dados de **Produtor** e **Placa** são solicitados via modal apenas ao parar o tempo, evitando distrações

### 📊 Registro de Resultados
Escolha entre os status:
- Testada Positiva  
- Testada Negativa  
- Declarada  
- Participante  

### 📸 Exportação para PNG
- Gera automaticamente um comprovante visual contendo:
  - Dados do auditor  
  - Dados do produtor e veículo  
  - Tempo total da auditoria  
  - **Data e hora do registro**  
- Remove elementos desnecessários da interface para focar nas informações  

### 📱 Design Responsivo
- Totalmente adaptável para celulares, tablets e desktops utilizando **Bootstrap 5**

---

## 🚀 Tecnologias Utilizadas

- **HTML5 / CSS3** — Estrutura e estilização  
- **JavaScript (Vanilla)** — Lógica do cronômetro, captura de data/hora e manipulação do DOM  
- **Bootstrap 5** — Layout responsivo e componentes (Modais, Floating Labels)  
- **Html2Canvas** — Conversão do HTML em imagem  
- **Google Fonts (Roboto)** — Tipografia padrão Material Design  

---

## 📦 Como Instalar e Rodar

Não é necessário servidor ou instalação complexa. O projeto roda diretamente no navegador.

```bash
git clone https://github.com/seu-usuario/nome-do-projeto.git
