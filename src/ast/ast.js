/**
 * Fábricas de nodos AST para mantener consistencia.
 * TODO: Integrar estas funciones directamente en parser.js en la siguiente fase.
 */

export function createProgram(body = []) {
  return { type: "Program", body };
}

export function createVariableDeclaration(id, init) {
  return { type: "VariableDeclaration", id, init };
}

export function createBinaryExpression(operator, left, right) {
  return { type: "BinaryExpression", operator, left, right };
}

export function createIdentifier(name) {
  return { type: "Identifier", name };
}

export function createLiteral(value) {
  return { type: "Literal", value };
}
