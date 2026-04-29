/**
 * Visualizador básico de AST en texto.
 * TODO: Reemplazar por visualización gráfica interactiva (nodos y aristas).
 */
export function printAstAsTree(node, level = 0) {
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
