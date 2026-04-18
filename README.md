# To-Do List App

Este repositorio contiene la solución a la prueba técnica para desarrollador Ionic/Angular. La aplicación consiste en un sistema de gestión de tareas con funcionalidades avanzadas como categorización personalizada, optimización de rendimiento para listas largas y configuración remota mediante Firebase.

---

## Instrucciones de Ejecución

### Requisitos Previos
- Node.js y npm instalados.
- Ionic CLI instalado globalmente: `npm install -g @ionic/cli`.

### Configuración de Envío
Debido a que los archivos de configuración contienen credenciales de Firebase, estos han sido omitidos del repositorio. Siga estos pasos para configurar el entorno:

1. Localice el archivo `src/environments/environment.template.ts`.
2. Cree una copia de este archivo en la misma carpeta llamada `environment.ts`.
3. Cree otra copia llamada `environment.prod.ts`.
4. En ambos archivos, reemplace los valores de marcador de posición (como `YOUR_API_KEY`) con sus credenciales reales de Firebase.

### Desarrollo Local (Navegador)
Para ejecutar la aplicación en un entorno de desarrollo web:

1. Instale las dependencias del proyecto:
   `npm install`
2. Inicie el servidor de desarrollo:
   `ionic serve`

### Ejecución en Android
Para compilar y ejecutar en dispositivos Android:

1. Genere el build de producción web:
   `ionic build`
2. Sincronice los archivos con Capacitor:
   `npx cap sync android`
3. Abra el proyecto en Android Studio:
   `npx cap open android`
4. Ejecute la aplicación mediante Android Studio en un dispositivo físico o emulador.

### Ejecución en iOS
Para compilar y ejecutar en dispositivos iOS (requiere macOS y Xcode):

1. Genere el build de producción web:
   `ionic build`
2. Sincronice los archivos con Capacitor:
   `npx cap sync ios`
3. Abra el proyecto en Xcode:
   `npx cap open ios`
4. Ejecute la aplicación mediante Xcode en un dispositivo físico o simulador.

---

## Demostración en Video

### 1. Funcionalidad General (Móvil)
Muestra la fluidez de la interfaz, la creación de tareas, el sistema de categorías y la limpieza visual.

<video src="docs/media/cap1.mp4" width="100%" controls></video>

### 2. Firebase Remote Config y Feature Flags
Demostración de cómo se activan y desactivan funcionalidades en tiempo real sin necesidad de reinstalar la aplicación.

<video src="docs/media/cap2.mp4" width="100%" controls></video>

---

## Detalles de los Cambios Realizados

Se han implementado las siguientes mejoras y funcionalidades sobre la base inicial:

- **Sistema de Categorías**: Se desarrolló un gestor de categorías que permite crear, editar (nombre y color) y eliminar etiquetas personalizadas para organizar las tareas.
- **Filtrado Avanzado**: Implementación de filtros dinámicos que permiten visualizar tareas por categoría específica, utilizando propiedades computadas de Angular.
- **Interacciones Nativas**: Uso de componentes de Ionic como ion-item-sliding para gestos de borrado y edición, y modales nativos para la gestión de categorías.
- **Estado con Signals**: Migración y uso de Angular Signals para una gestión de estado reactiva, eliminando la necesidad de suscripciones manuales y mejorando la predictibilidad del flujo de datos.
- **Integración con Firebase**: Configuración de Firebase Remote Config para el control de funcionalidades (feature flags) de forma remota.
- **Configuración de Mobile (Capacitor)**: Aunque los requerimientos iniciales mencionaban Cordova, se tomó la decisión técnica de utilizar Capacitor. Esta es la herramienta moderna de Ionic que ofrece un bridge nativo más rápido, mejor integración con las APIs actuales de Android/iOS y un flujo de desarrollo más estable y mantenible a largo plazo.

---

## Respuestas a Preguntas Técnicas

### 1. ¿Cuáles fueron los principales desafíos que enfrentaste al implementar las nuevas funcionalidades?

El principal desafío técnico fue la integración y configuración correcta de Firebase Remote Config. Al ser una herramienta que interactúa con servicios externos en tiempo real, asegurar que los valores se recuperaran de forma asíncrona antes de que la interfaz se renderizara (sin afectar la experiencia de usuario) requirió una atención especial en los ciclos de vida de la aplicación. El resto de la implementación lógica y de interfaz fue fluida gracias a la robustez de las herramientas utilizadas.

### 2. ¿Qué técnicas de optimización de rendimiento aplicaste y por qué?

Para asegurar un rendimiento óptimo se aplicaron tres técnicas fundamentales:

- **Angular Signals**: Se utilizó la reactividad granular de los Signals para asegurar que solo las partes de la interfaz que dependen directamente de un dato cambiado se actualicen, evitando re-renderizados innecesarios.
- **Estrategia OnPush**: El uso de ChangeDetectionStrategy.OnPush en los componentes permite que Angular ignore la detección de cambios a menos que las referencias de las entradas cambien explícitamente, ahorrando ciclos de CPU.
- **Virtual Scrolling**: Para manejar listas potencialmente infinitas, se implementó cdk-virtual-scroll-viewport. Esta técnica solo mantiene en el DOM los elementos visibles para el usuario, reduciendo drásticamente el consumo de memoria y mejorando la fluidez del scroll.

### 3. ¿Cómo aseguraste la calidad y mantenibilidad del código?

La calidad del código se aseguró siguiendo los principios de la arquitectura limpia y modular:

- **Separación de Responsabilidades**: Se dividió el código en capas (core para servicios y estado, features para componentes de negocio, y pages para las vistas), facilitando la localización de errores y la extensión de funcionalidades.
- **Modulariadad con Standalone Components**: El uso de componentes independientes reduce la complejidad de la configuración de módulos y mejora los tiempos de compilación.
- **Tipado Estricto**: Se utilizó TypeScript de forma rigurosa para prevenir errores en tiempo de desarrollo y asegurar que la comunicación entre componentes sea segura.
- **Flujo de Trabajo Git**: Se utilizó una estrategia de ramas clara y mensajes de commit basados en estándares convencionales para mantener un historial trazable y limpio.

---

## Recursos Multimedia

Las capturas de pantalla y grabaciones de video que muestran las funcionalidades en acción se encuentran disponibles en la carpeta docs/media/.
