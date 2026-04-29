import { tokenize } from "./lexer/lexer.js";
import { parse } from "./parser/parser.js";

const runButton = document.getElementById("runButton");
const codeEditor = document.getElementById("codeEditor");
const messageArea = document.getElementById("messageArea");
const treeOutput = document.getElementById("treeOutput");
const tokensOutput = document.getElementById("tokensOutput");

runButton.addEventListener("click", runCompilerFlow);

/**
 * Ejecuta el flujo principal del MVP:
 * 1) Lexer -> 2) Parser -> 3) Mostrar resultados
 */
function runCompilerFlow() {
  try {
    const sourceCode = codeEditor.value;
    const tokens = tokenize(sourceCode);
    const ast = parse(tokens);

    // Muestra datos para aprendizaje y depuración.
    tokensOutput.textContent = JSON.stringify(tokens, null, 2);
    treeOutput.textContent = printAstAsTree(ast);
    console.log("AST generado:", ast);

    showMessage(
      "success",
      "El código fue analizado correctamente. El árbol sintáctico se generó sin errores."
    );
  } catch (error) {
    showMessage("error", error.message);
    treeOutput.textContent = "No se pudo generar el AST por errores de sintaxis.";
  }
}

function showMessage(type, text) {
  messageArea.className = `message ${type}`;
  messageArea.textContent = text;
}

/**
 * Visualizador temporal en texto:
 * Convierte un AST en una estructura indentada para verla en pantalla.
 *
 * TODO: Mover esta función a src/visualizer/tree.js en la siguiente etapa.
 */
function printAstAsTree(node, level = 0) {
  if (!node || typeof node !== "object") return "";

  const indent = "  ".repeat(level);
  let output = `${indent}${node.type || "Node"}`;

  if (node.name) output += ` (${node.name})`;
  if (node.value !== undefined) output += ` (${node.value})`;
  if (node.operator) output += ` [${node.operator}]`;
  output += "\n";

  for (const key of Object.keys(node)) {
    if (["type", "name", "value", "operator"].includes(key)) continue;
    const child = node[key];

    if (Array.isArray(child)) {
      child.forEach((item) => {
        output += printAstAsTree(item, level + 1);
      });
    } else if (child && typeof child === "object") {
      output += printAstAsTree(child, level + 1);
    }
  }

  return output;
}

// TODO: En la siguiente iteración:
// 1) Crear src/ast/ast.js con factorías de nodos.
// 2) Separar UI en src/ui/editor.js.
// 3) Mover utilidades a src/utils/helpers.js.
