# JaFA IDE — A Full-Stack Web IDE for JaFA Programming Language for our FINAL PROJECT IN PROGRAMMING LANGUAGE🌴✨

**JaFA** (short for *Jeg and Fabe*) is a fun, educational programming language with **C-like syntax and Bisaya (Cebuano)-inspired keywords**.  
This project includes a **complete compiler** (lex + yacc → MIPS assembly → machine code) and a **beautiful online IDE** that runs everything in the browser — including executing your real C-compiled `jafa` binary on the server!

**Live Demo**: https://jafa-pl.vercel.app

![JaFA IDE Screenshot](https://i.imgur.com/0qJ0q0q.png)  
*Dark theme • Monaco Editor • Real-time assembly & machine code • Persistent files*

## 🚀 Features

- **Full JaFA → MIPS Assembly → Machine Code** compiler (written in C using flex & bison)
- Powered by **Monaco Editor** (the same engine as VS Code)
- Syntax highlighting, autocomplete, hover tooltips
- Triple output panels:
  - Runtime Output (with input support)
  - Generated MIPS Assembly
  - Final Machine Code (hex) 
- **Persistent file system** using IndexedDB — your files stay forever in the browser (somehow not working)
- Create, rename, delete, auto-save — feels just like VS Code
- 100% web-based — no installation required
- Server runs your actual compiled `jafa` binary (not emulated or interpreted!)

## 🖥️ Try It Now

👉 https://jafa-pl.vercel.app

Open the link, start typing, and hit **Run** — instant results!

## 🛠️ Language Quick Reference (JaFA Keywords)

| JaFA Keyword  | English Meaning         | Example                    |
|----------------|--------------------------|----------------------------|
| `SUGOD`        | Program start            | `SUGOD`                    |
| `HUMAN`        | Begin main code block    | `HUMAN { ... }`            |
| `TAPOS`        | End program              | `TAPOS`                    |
| `entero`       | Integer variable         | `entero age = 19;`         |
| `letra`        | Character variable       | `letra grade = 'A';`       |
| `decimal`      | Float/double             | `decimal gpa = 1.25;`      |
| `printa()`     | Print anything           | `printa("Pila na? ", age);`|
| `basaha()`     | Read input               | `basaha(&age);`            |
| `kung` / `o` / `dili` | if / else if / else | `kung (age > 18) { ... }`  |
| `addset`       | +=                       | `addset score 10;`         |
| `subset`       | -=                       | `subset lives 1;`          |
| `mulset`       | *=                       | `mulset total 2;`          |
| `divset`       | /=                       | `divset avg 2;`            |

*More keywords and full grammar in [`docs/syntax.md`](./docs/syntax.md)*

## 💻 Run Locally (For Developers)

```bash
# 1. Clone the repository
git clone https://github.com/Yoeees/JaFA.git
cd JaFA

# 2. Install frontend dependencies
npm install

# 3. Build the JaFA compiler (C backend)
cd backend
make            # produces ./jafa executable
cd ..

# 4. Start development servers

# Terminal 1 – Frontend (Vite + hot reload)
npm run dev

# Terminal 2 – Backend API + compiler server
npm run server
