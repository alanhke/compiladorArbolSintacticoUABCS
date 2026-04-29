import { tokenize } from "./lexer/lexer.js";
import { parse } from "./parser/parser.js";
import { renderTree } from "./visualizer/tree.js";

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

    // Muestra los tokens para aprendizaje y depuración.
    tokensOutput.textContent = JSON.stringify(tokens, null, 2);
    console.log("AST generado:", ast);

    // Renderiza el árbol visualmente en #tree-container.
    renderTree(ast);

    showMessage(
      "success",
      "El código fue analizado correctamente. El árbol sintáctico se generó sin errores."
    );
  } catch (error) {
    showMessage("error", error.message);

    // Limpia el contenedor y muestra mensaje de error en él.
    const treeContainer = document.getElementById("tree-container");
    if (treeContainer) {
      treeContainer.innerHTML = "";
      const errorMsg = document.createElement("p");
      errorMsg.className = "tree-error-msg";
      errorMsg.textContent = "No se pudo generar el árbol sintáctico.";
      treeContainer.appendChild(errorMsg);
    }

    console.error("[runCompilerFlow]", error);
  }
}

function showMessage(type, text) {
  messageArea.className = `message ${type}`;
  messageArea.textContent = text;
}

// printAstAsTree() fue migrada a src/visualizer/tree.js como renderTree().

// TODO: En la siguiente iteración:
// 1) Crear src/ast/ast.js con factorías de nodos.
// 2) Separar UI en src/ui/editor.js.
// 3) Mover utilidades a src/utils/helpers.js.
