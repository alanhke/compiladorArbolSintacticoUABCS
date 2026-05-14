import { tokenize } from "./lexer/lexer.js";
import { parse } from "./parser/parser.js";
import { renderTree } from "./visualizer/tree.js";
import { execute } from "./interpreter/interpreter.js";
import { escapeHtml, extractErrorLine, formatError } from "./utils/helpers.js";

const runButton = document.getElementById("runButton");
const codeEditor = document.getElementById("codeEditor");
const editorHighlights = document.getElementById("editorHighlights");
const lineNumbers = document.getElementById("lineNumbers");
const messageArea = document.getElementById("messageArea");
const tokensOutput = document.getElementById("tokensOutput");
const consoleOutput = document.getElementById("consoleOutput");

runButton.addEventListener("click", runCompilerFlow);
codeEditor.addEventListener("input", syncEditorHighlights);
codeEditor.addEventListener("scroll", syncEditorScroll);
syncEditorHighlights();

/**
 * Ejecuta el flujo principal del MVP:
 * 1) Lexer -> 2) Parser -> 3) Mostrar resultados
 */
function runCompilerFlow() {
  try {
    clearEditorErrors();
    const sourceCode = codeEditor.value;
    const tokens = tokenize(sourceCode);
    const ast = parse(tokens);
    const result = execute(ast);

    // Muestra los tokens para aprendizaje y depuración.
    tokensOutput.textContent = JSON.stringify(tokens, null, 2);
    console.log("AST generado:", ast);

    if (consoleOutput) {
      consoleOutput.textContent = result.output.length
        ? result.output.join("\n")
        : "La consola está vacía.";
    }

    // Renderiza el árbol visualmente en #tree-container.
    renderTree(ast);

    showMessage(
      "success",
      "El código fue analizado correctamente. El árbol sintáctico se generó sin errores."
    );
  } catch (error) {
    const message = formatError(error);
    showMessage("error", message);
    highlightErrorLine(extractErrorLine(error));
    if (consoleOutput) {
      consoleOutput.textContent = `Error: ${message}`;
    }

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

function syncEditorHighlights() {
  if (!editorHighlights || !lineNumbers) return;
  const lines = codeEditor.value.split(/\r?\n/);
  lineNumbers.value = lines.map((_, index) => String(index + 1)).join("\n");
  editorHighlights.innerHTML = lines
    .map((line, index) => {
      const displayLine = line.length ? escapeHtml(line) : "&nbsp;";
      return `<span class="editor-line" data-line="${index + 1}"><span class="line-text">${displayLine}</span></span>`;
    })
    .join("");
  syncEditorScroll();
}

function syncEditorScroll() {
  if (!editorHighlights || !lineNumbers) return;
  editorHighlights.scrollTop = codeEditor.scrollTop;
  editorHighlights.scrollLeft = codeEditor.scrollLeft;
  lineNumbers.scrollTop = codeEditor.scrollTop;
}

function clearEditorErrors() {
  if (!editorHighlights) return;
  editorHighlights.querySelectorAll(".error-line").forEach(line => {
    line.classList.remove("error-line");
  });
}

function highlightErrorLine(lineNumber) {
  if (!editorHighlights || !lineNumber) return;
  const line = editorHighlights.querySelector(`[data-line="${lineNumber}"]`);
  if (line) {
    line.classList.add("error-line");
    line.scrollIntoView({ block: "center" });
  }
}

// printAstAsTree() fue migrada a src/visualizer/tree.js como renderTree().

// TODO: En la siguiente iteración:
// 1) Crear src/ast/ast.js con factorías de nodos.
// 2) Separar UI en src/ui/editor.js.
// 3) Mover utilidades a src/utils/helpers.js.
