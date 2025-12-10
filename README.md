# JaFA IDE – A Full JaFA Compiler + Web IDE
# Final Project - Programming Language
**JaFA** (Jeg and Fabe) is a playful, educational programming language with Bisaya-inspired keywords — now with a **beautiful, fully functional online IDE** that runs your **real lex/yacc C compiler** in the browser!

Live Web App → https://jafa-pl.vercel.app

![JaFA IDE Screenshot](https://i.imgur.com/0qJ0q0q.png)  
*(Dark theme, Monaco editor, real-time assembly + machine code output, file persistence)*

## Features

- Full JaFA → MIPS assembly → machine code compiler (written in C + lex/yacc)
- Syntax highlighting, autocomplete, hover docs
- Three-panel output: Runtime Output | Assembly | Machine Code
- Persistent files (saved in your browser forever using IndexedDB)
- Create, save, load, auto-save — just like VS Code
- 100% web-based — no install needed
- Runs your actual compiled `jafa` binary on the server

## Try It Now

https://jafa-pl.vercel.app

Just open it and start coding!

## Run Locally (Developers)

```bash
# 1. Clone the repo
git clone https://github.com/Yoeees/JaFA.git
cd JaFA

# 2. Install frontend deps
npm install

# 3. Build the JaFA compiler (C backend)
cd backend
make          # generates ./jafa
cd ..

# 4. Run both servers
# Terminal 1 – Frontend (hot reload)
npm run dev

# Terminal 2 – Backend (API + compiler)
npm run server

# Open http://localhost:5173
