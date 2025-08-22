# CounterGame
CounterGame es una aplicación web interactiva construida con React y Vite que permite a los usuarios realizar operaciones de contador con un valor personalizado, deshacer/rehacer acciones, reiniciar el contador y borrar el historial.

![Landing](https://postimg.cc/Fk4fBs2Q)

## Características
- **Incremento y decremento personalizado**: Permite especificar un valor numérico para incrementar o decrementar el contador.
- **Funcionalidad de deshacer y rehacer**: Navega a través del historial de cambios del contador.
- **Reinicio**: Vuelve el contador a su valor inicial (0).
- **Borrado de historial**: Elimina el historial de cambios manteniendo el valor actual del contador.
- **Interfaz amigable**: Diseño limpio y responsive con botones de colores llamativos.
## Tecnologías Utilizadas
- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de construcción y desarrollo para proyectos frontend.
- **useReducer**: Hook de React para manejar estados complejos del contador y su historial.
- **useCallback**: Hook de React para optimizar funciones y evitar re-renderizados innecesarios.
- **useRef**: Hook de React para interactuar con elementos del DOM (enfoque en botones e inputs).
- **CSS3**: Estilos con colores llamativos, sombras y diseño responsive.

## Uso
1. **Valor personalizado**: Ingresa un número en el campo de entrada para definir el valor de incremento/decremento.
2. **Incrementar/Decrementar**: Haz clic en los botones `+` o `-` para modificar el contador según el valor ingresado.
3. **Deshacer/Rehacer**: Utiliza los botones "Deshacer" y "Rehacer" para navegar por el historial de cambios.
4. **Reiniciar**: Presiona el botón "Reiniciar" para volver el contador a 0.
5. **Borrar historial**: Usa el botón "Borrar Historial" para eliminar el historial de cambios, manteniendo el valor actual.