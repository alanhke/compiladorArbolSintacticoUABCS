/**
 * @module tree
 * Renderizador visual de un Abstract Syntax Tree (AST).
 * Genera nodos HTML con estilos CSS y los inserta en #tree-container.
 * No depende de ninguna librería externa.
 */

// ─────────────────────────────────────────────────────────
//  API PÚBLICA
// ─────────────────────────────────────────────────────────

/**
 * Renderiza un AST de forma visual dentro de #tree-container.
 *
 * @param {Object} ast - Nodo raíz del AST a visualizar.
 */
export function renderTree(ast) {
  const container = document.getElementById('tree-container');

  if (!container) {
    console.error('[renderTree] No se encontró el elemento #tree-container en el DOM.');
    return;
  }

  // Limpiar contenido previo
  container.innerHTML = '';

  // Inyectar estilos CSS (solo una vez por sesión)
  injectStyles();

  if (!ast) {
    container.textContent = 'AST vacío.';
    return;
  }

  // Construir el árbol a partir de una <ul> raíz
  const rootList = document.createElement('ul');
  rootList.className = 'ast-tree';
  rootList.appendChild(buildNodeElement(ast));
  container.appendChild(rootList);
}

// ─────────────────────────────────────────────────────────
//  CONSTRUCCIÓN RECURSIVA DE NODOS
// ─────────────────────────────────────────────────────────

/**
 * Construye un elemento <li> que representa un nodo del AST
 * y llama recursivamente para cada nodo hijo.
 *
 * @param {Object} node - Nodo del AST.
 * @returns {HTMLElement} Elemento <li> con la caja del nodo y sus hijos.
 */
function buildNodeElement(node) {
  const li = document.createElement('li');

  // Caja visual del nodo
  li.appendChild(buildNodeBox(node));

  // Hijos
  const children = extractChildren(node);
  if (children.length > 0) {
    const childList = document.createElement('ul');
    children.forEach(child => childList.appendChild(buildNodeElement(child)));
    li.appendChild(childList);
  }

  return li;
}

/**
 * Crea la caja visual (div) de un nodo con su tipo y valor.
 *
 * @param {Object} node
 * @returns {HTMLElement}
 */
function buildNodeBox(node) {
  const box = document.createElement('div');
  box.className = 'ast-node';

  // — Tipo del nodo (traducido al español) —
  const typeEl = document.createElement('span');
  typeEl.className = 'ast-node__type';
  typeEl.textContent = translateNodeType(node.type ?? 'Node');
  box.appendChild(typeEl);

  // — Valor (si existe), con etiqueta en español —
  const { label, value } = resolveValue(node);
  if (value !== null) {
    const valueEl = document.createElement('span');
    valueEl.className = 'ast-node__value';
    valueEl.textContent = label ? `${label}: ${value}` : value;
    box.appendChild(valueEl);
  }

  return box;
}

// ─────────────────────────────────────────────────────────
//  UTILIDADES
// ─────────────────────────────────────────────────────────

/**
 * Extrae el valor legible de un nodo junto con su etiqueta en español.
 *
 * @param {Object} node
 * @returns {{ label: string|null, value: string|null }}
 */
function resolveValue(node) {
  if (node.name     !== undefined && node.name     !== null) return { label: translatePropLabel('name'),     value: String(node.name) };
  if (node.value    !== undefined && node.value    !== null) return { label: translatePropLabel('value'),    value: String(node.value) };
  if (node.operator !== undefined)                           return { label: translatePropLabel('operator'), value: String(node.operator) };
  return { label: null, value: null };
}

/**
 * Extrae los nodos hijos de cualquier estructura AST genérica.
 * Soporta: propiedad `children`, propiedades escalares de nodo,
 * y propiedades que contienen arreglos de nodos.
 *
 * @param {Object} node
 * @returns {Object[]}
 */
function extractChildren(node) {
  // 1. Propiedad children explícita
  if (Array.isArray(node.children)) {
    return node.children.filter(isAstNode);
  }

  const children = [];
  const scalarProps  = ['left', 'right', 'id', 'init', 'test', 'consequent',
                        'alternate', 'expression', 'argument', 'callee', 'object', 'property'];
  const arrayProps   = ['body', 'declarations', 'arguments', 'elements', 'params'];
  const skipProps    = new Set(['type', 'value', 'name', 'operator', 'start', 'end', 'loc', 'raw']);

  // 2. Propiedades escalares conocidas
  scalarProps.forEach(key => {
    if (isAstNode(node[key])) children.push(node[key]);
  });

  // 3. Propiedades array conocidas
  arrayProps.forEach(key => {
    if (Array.isArray(node[key])) {
      children.push(...node[key].filter(isAstNode));
    } else if (isAstNode(node[key])) {
      children.push(node[key]);
    }
  });

  // 4. Resto de propiedades desconocidas (genérico / AST personalizado)
  Object.keys(node).forEach(key => {
    if (skipProps.has(key) || scalarProps.includes(key) || arrayProps.includes(key)) return;

    const val = node[key];
    if (Array.isArray(val)) {
      val.filter(isAstNode).forEach(child => {
        if (!children.includes(child)) children.push(child);
      });
    } else if (isAstNode(val) && !children.includes(val)) {
      children.push(val);
    }
  });

  return children;
}

/**
 * Comprueba si un valor es un nodo AST válido.
 *
 * @param {*} node
 * @returns {boolean}
 */
function isAstNode(node) {
  return node !== null && typeof node === 'object' && !Array.isArray(node);
}

// ─────────────────────────────────────────────────────────
//  TRADUCCIÓN AL ESPAÑOL
// ─────────────────────────────────────────────────────────

/**
 * Traduce el tipo técnico de un nodo AST al español.
 * Si el tipo no tiene traducción conocida, devuelve el original.
 *
 * @param {string} type - Tipo interno del nodo (p. ej. 'Program').
 * @returns {string} Nombre en español.
 */
export function translateNodeType(type) {
  const TRANSLATIONS = {
    // — Estructura general —
    Program:               'Programa',
    BlockStatement:        'Bloque',

    // — Declaraciones —
    VariableDeclaration:   'Declaración de Variable',
    VariableDeclarator:    'Declarador de Variable',
    FunctionDeclaration:   'Declaración de Función',
    ClassDeclaration:      'Declaración de Clase',

    // — Instrucciones —
    ExpressionStatement:   'Instrucción',
    ReturnStatement:       'Retorno',
    IfStatement:           'Condicional Si',
    WhileStatement:        'Ciclo Mientras',
    ForStatement:          'Ciclo Para',
    ForInStatement:        'Ciclo Para-En',
    ForOfStatement:        'Ciclo Para-De',
    SwitchStatement:       'Selector Switch',
    SwitchCase:            'Caso',
    BreakStatement:        'Interrupción',
    ContinueStatement:     'Continuar',
    ThrowStatement:        'Lanzar Error',
    TryStatement:          'Intento',
    CatchClause:           'Captura de Error',
    DoWhileStatement:      'Ciclo Hacer-Mientras',

    // — Expresiones —
    BinaryExpression:      'Expresión Binaria',
    AssignmentExpression:  'Asignación',
    LogicalExpression:     'Expresión Lógica',
    UnaryExpression:       'Expresión Unaria',
    UpdateExpression:      'Actualización',
    ConditionalExpression: 'Expresión Condicional',
    CallExpression:        'Llamada de Función',
    NewExpression:         'Nueva Instancia',
    MemberExpression:      'Acceso a Propiedad',
    ArrowFunctionExpression: 'Función Flecha',
    FunctionExpression:    'Expresión de Función',
    SequenceExpression:    'Secuencia',
    TemplateLiteral:       'Plantilla de Texto',
    TaggedTemplateExpression: 'Plantilla Etiquetada',
    SpreadElement:         'Expansión',
    AssignmentPattern:     'Patrón de Asignación',
    ObjectPattern:         'Patrón de Objeto',
    ArrayPattern:          'Patrón de Arreglo',
    RestElement:           'Elemento Resto',

    // — Valores primitivos —
    Identifier:            'Identificador',
    Literal:               'Valor',
    TemplateElement:       'Fragmento de Plantilla',
    RegExpLiteral:         'Expresión Regular',

    // — Estructuras de datos —
    ObjectExpression:      'Objeto',
    Property:              'Propiedad',
    ArrayExpression:       'Arreglo',

    // — Clases —
    ClassBody:             'Cuerpo de Clase',
    MethodDefinition:      'Definición de Método',
    ClassExpression:       'Expresión de Clase',

    // — Módulos —
    ImportDeclaration:     'Importación',
    ExportNamedDeclaration: 'Exportación',
    ExportDefaultDeclaration: 'Exportación por Defecto',
    ImportSpecifier:       'Especificador de Importación',
    ExportSpecifier:       'Especificador de Exportación',
    ImportDefaultSpecifier: 'Importación por Defecto',
  };

  return TRANSLATIONS[type] ?? type;
}

/**
 * Traduce el nombre de una propiedad de nodo al español
 * para mostrarlo como etiqueta en la caja visual.
 *
 * @param {string} prop - Nombre de la propiedad (p. ej. 'name').
 * @returns {string} Etiqueta en español.
 */
export function translatePropLabel(prop) {
  const LABELS = {
    name:     'nombre',
    value:    'valor',
    operator: 'operador',
    left:     'izquierda',
    right:    'derecha',
    body:     'cuerpo',
    test:     'condición',
    init:     'inicio',
    update:   'actualización',
    callee:   'función',
    object:   'objeto',
    property: 'propiedad',
    argument: 'argumento',
    id:       'identificador',
  };

  return LABELS[prop] ?? prop;
}

// ─────────────────────────────────────────────────────────
//  ESTILOS CSS
// ─────────────────────────────────────────────────────────

/**
 * Inyecta los estilos del árbol en el <head> del documento.
 * Se ejecuta una sola vez gracias al id único del elemento <style>.
 */
function injectStyles() {
  const STYLE_ID = 'ast-tree-styles';
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    /* ── Contenedor principal ── */
    #tree-container {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 40px 20px;
      overflow-x: auto;
      background: #f1f5f9;
      min-height: 300px;
      font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
    }

    /* ── Layout del árbol (listas anidadas) ── */
    .ast-tree,
    .ast-tree ul {
      display: flex;
      justify-content: center;
      padding: 0;
      margin: 0;
      list-style: none;
    }

    .ast-tree li {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 12px 0;
      position: relative;
    }

    /* Línea vertical descendente de cada nodo */
    .ast-tree li > ul::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      height: 24px;
      border-left: 2px solid #94a3b8;
      transform: translateX(-50%);
    }

    /* Línea horizontal que conecta hermanos */
    .ast-tree li::before,
    .ast-tree li::after {
      content: '';
      position: absolute;
      top: 0;
      width: 50%;
      height: 24px;
      border-top: 2px solid #94a3b8;
    }
    .ast-tree li::before { right: 50%; }
    .ast-tree li::after  { left:  50%; }

    /* Eliminar conectores en hijos únicos */
    .ast-tree li:only-child::before,
    .ast-tree li:only-child::after { border: none; }
    .ast-tree li:only-child         { padding-top: 0; }

    /* Esquinas en primer y último hijo */
    .ast-tree li:first-child::before,
    .ast-tree li:last-child::after  { border: none; }

    .ast-tree li:first-child::after {
      border-radius: 6px 0 0 0;
    }
    .ast-tree li:last-child::before {
      border-right: 2px solid #94a3b8;
      border-radius: 0 6px 0 0;
    }

    /* ── Caja visual del nodo ── */
    .ast-node {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      min-width: 110px;
      padding: 14px 20px;
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.06);
      position: relative;
      z-index: 1;
      transition: transform 0.18s ease, box-shadow 0.18s ease;
      cursor: default;
    }

    .ast-node:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12), 0 3px 6px rgba(0, 0, 0, 0.08);
      border-color: #6366f1;
    }

    /* Tipo del nodo */
    .ast-node__type {
      font-size: 0.88rem;
      font-weight: 700;
      color: #1e293b;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    /* Valor del nodo */
    .ast-node__value {
      font-size: 0.82rem;
      font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace;
      color: #0369a1;
      background: #e0f2fe;
      padding: 3px 10px;
      border-radius: 6px;
      max-width: 200px;
      word-break: break-word;
      text-align: center;
    }
  `;

  document.head.appendChild(style);
}
