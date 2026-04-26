# 🎵 Escala Ministério

> PWA para gestão de escala dos ministérios de **Sonoplastia** e **Bateristas**

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-blueviolet?logo=googlechrome)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![Offline Support](https://img.shields.io/badge/Offline-Supported-green?logo=serviceworker)](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ✨ Funcionalidades

- 📅 **Registro de disponibilidade** — Bateristas selecionam seus domingos disponíveis em um calendário visual
- 👥 **Status em tempo real** — Painel com progresso de confirmações de cada membro
- ✨ **Geração automática de escala** — Algoritmo distribui equitativamente, respeitando regras de sobreposição
- 🔔 **Notificações** — Banner animado e notificações nativas do dispositivo
- ⚙️ **Painel do gestor** — Controle completo com senha, gerenciamento de membros e reset de dados
- 📲 **Instalável** — Funciona como app nativo no Android e iOS (PWA)
- 🌐 **Offline** — Service Worker com cache para uso sem internet

---

## 👥 Ministérios

| Membro | Função |
|---|---|
| Alexandre | ⭐ Bateria + Sonoplastia |
| Danilo | ⭐ Bateria + Sonoplastia |
| Clarice | 🎛️ Sonoplastia |
| Guilherme Testa | 🎛️ Sonoplastia |
| Kevin | 🎛️ Sonoplastia |
| João Gabriel | 🥁 Bateria |
| Marcelo | 🥁 Bateria |

> **Regra principal:** Alexandre e Danilo atuam nas duas funções — o sistema nunca os escala em bateria e sonoplastia no mesmo domingo.
> A sonoplastia pura (Clarice, Guilherme Testa, Kevin) **não precisa informar disponibilidade** — são considerados sempre disponíveis.

---

## 🚀 Como publicar

### GitHub Pages (recomendado)

1. Crie um repositório no GitHub (ex: `escala-ministerio`)
2. Faça upload de todos os arquivos para a branch `main`
3. Vá em **Settings → Pages → Source: Deploy from branch → main / root**
4. Acesse em: `https://seu-usuario.github.io/escala-ministerio`

### Netlify (arrastar e soltar)

1. Acesse [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arraste a pasta do projeto
3. URL gerada automaticamente

### Vercel

```bash
npm install -g vercel
vercel --prod
```

### Servidor local

```bash
# Node.js
npx serve .

# Python
python3 -m http.server 8080
```

---

## 📲 Instalação como App

Após abrir no navegador:

- **Android / Chrome** → Menu ⋮ → *Adicionar à tela inicial*
- **iPhone / Safari** → Botão Compartilhar → *Adicionar à Tela de Início*
- **Desktop / Chrome** → Ícone 📥 na barra de endereços

---

## ⚙️ Configuração

### Senha do gestor

Padrão: **`gestor123`**

Para alterar, edite no `index.html`:

```js
gestor_password: 'gestor123',
```

### Adicionar/remover membros

Pelo painel do gestor dentro do app, ou editando o array `members` no `DEFAULT_STATE` no `index.html`.

---

## 🗂️ Estrutura do projeto

```
escala-ministerio/
├── index.html        ← App completo (single-file)
├── manifest.json     ← Configuração PWA
├── sw.js             ← Service Worker (offline + push)
├── icons/
│   ├── icon-192.png  ← Ícone PWA
│   └── icon-512.png  ← Ícone PWA splash
└── README.md
```

---

## 🔄 Fluxo de uso

```
1. Bateristas abrem o app → selecionam domingos disponíveis → Confirmar
       ↓
2. Status mostra progresso em tempo real
       ↓
3. Quando todos confirmam → Gestor recebe notificação
       ↓
4. Gestor acessa painel → define período → Gerar Escala
       ↓
5. Escala aparece na aba "Escala" para todos
```

---

## 🛡️ Regras de escalonamento

- Membros de **dupla função** (⭐) nunca são escalados nas duas funções no mesmo domingo
- Algoritmo de **distribuição equitativa** — quem foi menos vezes tem prioridade
- Apenas membros com disponibilidade declarada são escalados na bateria
- Sonoplastia pura entra no pool automaticamente em todos os domingos
- Se não houver ninguém disponível para uma data: exibe *"Sem escalado"*

---

## 🎨 Design

| Elemento | Escolha |
|---|---|
| Tema | Escuro — azul marinho profundo |
| Cores | Dourado bíblico `#c9a84c` + Azul celeste `#63b3ed` |
| Fontes | **Cinzel** (títulos) + **Lato** (texto) |
| Layout | Mobile-first, responsivo, safe-area aware |
| Animações | CSS puro, entrada suave, notificação com spring |

---

## 📄 Licença

MIT © 2025 — Livre para uso em comunidades religiosas.
