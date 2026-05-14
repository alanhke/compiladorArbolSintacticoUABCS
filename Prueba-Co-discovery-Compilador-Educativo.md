# Prueba de Usabilidad Co-discovery - Compilador Educativo con Visualizacion del Arbol Sintactico

## Acuerdo de confidencialidad

YO, ________________________________________________ ACEPTO participar en un experimento sobre la experiencia de uso del sistema **Compilador Educativo con Visualizacion del Arbol Sintactico**, supervisado por ________________________________________________, el dia ____/____/________, en ________________________________________________.

Entiendo que el experimento tiene por objetivo evaluar un sistema software, NO mis capacidades, habilidades o conocimientos.

Entiendo que durante el experimento se realizaran observaciones y grabaciones por los evaluadores. Entiendo que los resultados del experimento se utilizaran solo con propositos academicos y/o de investigacion, sin que mi identidad sea revelada.

Entiendo que puedo comunicar a los evaluadores del experimento cualquier malestar, molestia o inconformidad que pueda sentir y que puedo abandonar el experimento en cualquier momento.

___________________________

Firma

## Instrucciones generales

Estimado(a) colaborador(a):

Usted participa en un experimento que tiene como proposito evaluar su experiencia de uso del sistema **Compilador Educativo con Visualizacion del Arbol Sintactico**. Ud. realizara el trabajo en conjunto con un companero(a).

Se esta evaluando el sistema, NO su desempeno como usuario. NO SE PREOCUPE SI COMETE ERRORES.

El experimento tiene 3 etapas:

1. En la primera etapa Ud. debera completar un breve cuestionario preliminar, relativo a su experiencia previa (el cuestionario es individual).
2. En la segunda etapa se le solicitara explorar el sistema y realizar las tareas indicadas en conjunto con su companero(a), comentando en voz alta sus opiniones, dificultades y observaciones.
3. En la tercera etapa Ud. debera completar un cuestionario acerca de su percepcion sobre el sistema (el cuestionario es individual).

SI TIENE ALGUNA DUDA DURANTE EL EXPERIMENTO, PUEDE PONERSE EN CONTACTO CON LOS EVALUADORES, EN CUALQUIER MOMENTO.

La informacion que Ud. proporcione es confidencial y muy relevante para nuestro estudio.

AGRADECEMOS SU COOPERACION.

## (1) Cuestionario preliminar

Sexo: ( ) Femenino  ( ) Masculino  ( ) Prefiero no indicar

Edad: __________

Nivel de educacion completado y/o en proceso:

Ensenanza media: ( ) Completa  ( ) En proceso

Tecnico: ( ) Completa  ( ) En proceso

Universitario: ( ) Completa  ( ) En proceso

Otro: ________________________  ( ) Completa  ( ) En proceso

Carrera o area de estudio: __________________________________________

Ha utilizado antes algun editor de codigo o entorno de programacion?

Si ( )    No ( )

Si su respuesta fue afirmativa, indique cual(es):

______________________________________________________________________

______________________________________________________________________

Ha utilizado antes alguna herramienta que muestre tokens, arbol sintactico o errores de compilacion?

Si ( )    No ( )

Si su respuesta fue afirmativa, indique cual(es):

______________________________________________________________________

______________________________________________________________________

Que tan familiarizado(a) se considera con conceptos basicos de programacion (variables, condicionales, ciclos)?

( ) Muy familiarizado(a)

( ) Familiarizado(a)

( ) Medianamente familiarizado(a)

( ) Poco familiarizado(a)

( ) Nada familiarizado(a)

## (2) Lista de tareas

Considere el siguiente escenario:

Uds. y su companero(a) estan evaluando una herramienta educativa para aprender las etapas basicas de un compilador. Deben usar el sistema para escribir pequenos fragmentos de codigo, ejecutarlos y observar los resultados generados en pantalla. Se les pide realizar las siguientes tareas comentando en voz alta durante todo el experimento.

Ingresar al sistema **Compilador Educativo con Visualizacion del Arbol Sintactico**.

### Tarea 1. Reconocimiento inicial de la interfaz

Antes de ejecutar codigo, identifiquen en la interfaz los siguientes elementos:

- Editor de codigo
- Boton "Ejecutar"
- Area de mensajes
- Panel del arbol sintactico
- Consola de salida
- Panel de tokens

Anote cualquier elemento que les haya parecido poco claro:

______________________________________________________________________

______________________________________________________________________

### Tarea 2. Analisis de un programa valido con variables y salida

Escriban y ejecuten el siguiente codigo:

```txt
let x = 10;
let y = x + 5;
print(y);
```

Anote:

El mensaje mostrado por el sistema: ___________________________________

El valor mostrado en la consola: ______________________________________

El nodo raiz observado en el arbol sintactico: ________________________

Fue facil identificar los tokens generados? Si / No. Por que?

______________________________________________________________________

______________________________________________________________________

### Tarea 3. Analisis de una estructura condicional

Escriban y ejecuten el siguiente codigo:

```txt
let edad = 20;
if (edad >= 18) {
  print(1);
} else {
  print(0);
}
```

Anote:

El resultado mostrado en la consola: __________________________________

El tipo de estructura de control identificada en el arbol: ____________

Pudieron relacionar el codigo con la estructura del arbol? Si / No. Por que?

______________________________________________________________________

______________________________________________________________________

### Tarea 4. Deteccion y comprension de errores

Escriban y ejecuten el siguiente codigo con error:

```txt
let a = 5
print(a);
```

Anote:

El mensaje de error mostrado por el sistema: ___________________________

La linea aproximada indicada o resaltada: _____________________________

El resaltado visual del error les ayudo a ubicar el problema? Si / No. Por que?

______________________________________________________________________

______________________________________________________________________

### Tarea 5. Analisis de un ciclo

Escriban y ejecuten el siguiente codigo:

```txt
for (let i = 1; i <= 3; i = i + 1) {
  print(i);
}
```

Anote:

Los valores mostrados en la consola: __________________________________

El tipo de ciclo identificado en el arbol: ____________________________

La representacion del arbol les ayudo a entender el flujo del codigo? Si / No. Por que?

______________________________________________________________________

______________________________________________________________________

## (3) Cuestionario de percepcion sobre el sistema

Encierre en un circulo la alternativa mas apropiada para cada pregunta.

Pudo completar las tareas indicadas?

1  2  3  4  5

Muy dificilmente  |  Dificilmente  |  Neutral  |  Facilmente  |  Muy facilmente

Que tan claro le resulto escribir y editar codigo en el sistema?

1  2  3  4  5

Muy poco claro  |  Poco claro  |  Neutral  |  Claro  |  Muy claro

Que tan facil fue interpretar los mensajes del sistema?

1  2  3  4  5

Muy dificil  |  Dificil  |  Neutral  |  Facil  |  Muy facil

Que tan util le parecio la visualizacion del arbol sintactico?

1  2  3  4  5

Nada util  |  Poco util  |  Neutral  |  Util  |  Muy util

Que tan facil fue relacionar los tokens generados con el codigo fuente?

1  2  3  4  5

Muy dificil  |  Dificil  |  Neutral  |  Facil  |  Muy facil

Que tan orientado(a) se sintio dentro de la interfaz durante el experimento?

1  2  3  4  5

Muy poco orientado(a)  |  Poco orientado(a)  |  Neutral  |  Orientado(a)  |  Muy orientado(a)

Su grado de satisfaccion con el sistema es:

1  2  3  4  5

Totalmente insatisfactorio  |  Poco satisfactorio  |  Neutral  |  Satisfactorio  |  Muy satisfactorio

Utilizaria nuevamente este sistema para aprender o practicar conceptos basicos de compilacion?

1  2  3  4  5

Muy en desacuerdo  |  En desacuerdo  |  Neutral  |  De acuerdo  |  Muy de acuerdo

Que fue lo que mas le gusto del sistema?

______________________________________________________________________

______________________________________________________________________

______________________________________________________________________

______________________________________________________________________

Que fue lo que menos le gusto del sistema?

______________________________________________________________________

______________________________________________________________________

______________________________________________________________________

______________________________________________________________________

## Registro del evaluador

| Tarea | Descripcion | Criterios de exito | Cumplimiento de tarea | Tiempo max. | Observaciones y comentarios |
| --- | --- | --- | --- | --- | --- |
| 1 | Reconocimiento inicial de la interfaz | Identifican correctamente los componentes principales de la interfaz. | | 3 min | |
| 2 | Programa valido con variables y salida | Ejecutan el codigo, observan mensaje de exito, tokens, arbol y salida en consola. | | 5 min | |
| 3 | Estructura condicional | Ejecutan el ejemplo con `if/else` e interpretan el resultado y el arbol. | | 6 min | |
| 4 | Deteccion de errores | Identifican el error sintactico y comprenden el mensaje mostrado. | | 5 min | |
| 5 | Ciclo `for` | Ejecutan el ciclo e interpretan la salida en consola y el nodo correspondiente del arbol. | | 6 min | |
