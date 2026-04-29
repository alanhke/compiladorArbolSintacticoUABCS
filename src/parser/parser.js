/**
 * Parser recursivo descendente para un lenguaje educativo reducido.
 * Gramática simplificada:
 *
 * Program              -> Statement*
 * Statement            -> VariableDeclaration
 * VariableDeclaration  -> "let" IDENTIFIER "=" Expression ";"
 * Expression           -> Term (("+" | "-") Term)*
 * Term                 -> Factor (("*" | "/") Factor)*
 * Factor               -> NUMBER | IDENTIFIER
 */
export function parse(tokens) {
  let current = 0;

  function peek() {
    return tokens[current];
  }

  function isAtEnd() {
    return peek().type === "EOF";
  }

  function advance() {
    if (!isAtEnd()) current += 1;
    return tokens[current - 1];
  }

  function check(type, value = null) {
    if (isAtEnd()) return false;
    if (peek().type !== type) return false;
    if (value !== null && peek().value !== value) return false;
    return true;
  }

  function match(type, value = null) {
    if (check(type, value)) {
      advance();
      return true;
    }
    return false;
  }

  function consume(type, message, value = null) {
    if (check(type, value)) return advance();
    const token = peek();
    throw new Error(`${message} Línea aproximada: ${token.line}.`);
  }

  function parseProgram() {
    const body = [];
    while (!isAtEnd()) {
      body.push(parseStatement());
    }
    return {
      type: "Program",
      body
    };
  }

  function parseStatement() {
    if (check("KEYWORD", "let")) {
      return parseVariableDeclaration();
    }
    const token = peek();
    throw new Error(
      `Sentencia no soportada cerca de "${token.value}". Línea aproximada: ${token.line}.`
    );
  }

  function parseVariableDeclaration() {
    consume("KEYWORD", 'Se esperaba la palabra clave "let".', "let");
    const identifier = consume(
      "IDENTIFIER",
      "Se esperaba un identificador después de let."
    );
    consume("EQUAL", 'Se esperaba "=" después del identificador.');

    const initializer = parseExpression();
    consume("SEMICOLON", 'Se esperaba ";" al final de la declaración.');

    return {
      type: "VariableDeclaration",
      id: {
        type: "Identifier",
        name: identifier.value
      },
      init: initializer
    };
  }

  function parseExpression() {
    let expression = parseTerm();

    while (match("OPERATOR", "+") || match("OPERATOR", "-")) {
      const operator = tokens[current - 1].value;
      const right = parseTerm();
      expression = {
        type: "BinaryExpression",
        operator,
        left: expression,
        right
      };
    }

    return expression;
  }

  function parseTerm() {
    let expression = parseFactor();

    while (match("OPERATOR", "*") || match("OPERATOR", "/")) {
      const operator = tokens[current - 1].value;
      const right = parseFactor();
      expression = {
        type: "BinaryExpression",
        operator,
        left: expression,
        right
      };
    }

    return expression;
  }

  function parseFactor() {
    if (check("NUMBER")) {
      const number = advance();
      return {
        type: "Literal",
        value: number.value
      };
    }

    if (check("IDENTIFIER")) {
      const identifier = advance();
      return {
        type: "Identifier",
        name: identifier.value
      };
    }

    const token = peek();
    throw new Error(
      `Expresión no válida cerca de "${token.value}". Línea aproximada: ${token.line}.`
    );
  }

  return parseProgram();
}
