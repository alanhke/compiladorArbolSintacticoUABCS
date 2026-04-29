const KEYWORDS = new Set(["let"]);

/**
 * Convierte el código fuente en una lista de tokens.
 * Cada token incluye tipo, valor y posición para reportar errores.
 */
export function tokenize(sourceCode) {
  const tokens = [];
  let current = 0;
  let line = 1;
  let column = 1;

  function currentChar() {
    return sourceCode[current];
  }

  function advance() {
    const char = sourceCode[current];
    current += 1;
    if (char === "\n") {
      line += 1;
      column = 1;
    } else {
      column += 1;
    }
    return char;
  }

  function addToken(type, value, tokenLine, tokenColumn) {
    tokens.push({ type, value, line: tokenLine, column: tokenColumn });
  }

  while (current < sourceCode.length) {
    const char = currentChar();

    // Ignora espacios, tabs y saltos de línea.
    if (/\s/.test(char)) {
      advance();
      continue;
    }

    const tokenLine = line;
    const tokenColumn = column;

    // Números enteros simples: 10, 25, etc.
    if (/[0-9]/.test(char)) {
      let value = "";
      while (current < sourceCode.length && /[0-9]/.test(currentChar())) {
        value += advance();
      }
      addToken("NUMBER", Number(value), tokenLine, tokenColumn);
      continue;
    }

    // Identificadores y keywords: let, x, variable1
    if (/[a-zA-Z_]/.test(char)) {
      let value = "";
      while (
        current < sourceCode.length &&
        /[a-zA-Z0-9_]/.test(currentChar())
      ) {
        value += advance();
      }

      if (KEYWORDS.has(value)) {
        addToken("KEYWORD", value, tokenLine, tokenColumn);
      } else {
        addToken("IDENTIFIER", value, tokenLine, tokenColumn);
      }
      continue;
    }

    if (["+", "-", "*", "/"].includes(char)) {
      addToken("OPERATOR", advance(), tokenLine, tokenColumn);
      continue;
    }

    if (char === "=") {
      addToken("EQUAL", advance(), tokenLine, tokenColumn);
      continue;
    }

    if (char === ";") {
      addToken("SEMICOLON", advance(), tokenLine, tokenColumn);
      continue;
    }

    throw new Error(
      `Carácter no reconocido "${char}" en línea ${line}, columna ${column}.`
    );
  }

  addToken("EOF", null, line, column);
  return tokens;
}
