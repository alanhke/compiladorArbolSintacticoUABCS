# Compilador Educativo con Visualizacion del Arbol Sintactico

Proyecto educativo para aprender las etapas basicas de un compilador:

- Lexer (analisis lexico)
- Parser recursivo descendente
- Construccion de AST
- Visualizacion inicial en texto

## Estructura

```text
compilador-educativo/
├── public/
│   ├── index.html
│   ├── styles/main.css
│   └── assets/
├── src/
│   ├── lexer/lexer.js
│   ├── parser/parser.js
│   ├── ast/ast.js
│   ├── visualizer/tree.js
│   ├── ui/editor.js
│   ├── utils/helpers.js
│   └── main.js
├── package.json
└── README.md
```

## MVP actual

1. Escribir codigo en el editor.
2. Presionar **Ejecutar**.
3. Se generan tokens y luego AST.
4. Se muestran:
   - Mensaje de exito o error
   - Tokens en pantalla
   - AST en pantalla y consola

Ejemplo:

```js
let x = 10;
let y = x + 5;
```

## Ejecutar el proyecto

```bash
npm run dev
```

Luego abrir la URL que indique el servidor local.

## Siguientes pasos sugeridos

- Integrar las fabricas de nodos de `src/ast/ast.js` directamente en el parser.
- Mover el visualizador temporal de `src/main.js` a `src/visualizer/tree.js`.
- Crear visualizacion grafica real del AST (SVG o canvas).
- Soportar parentesis y mas tipos de sentencias.
