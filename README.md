# CV Builder Pro - Sistema de Currículums por Rol 🚀

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=flat&logo=tailwindcss)
![Status](https://img.shields.io/badge/Status-Active-success)

**CV Builder Pro** es una plataforma avanzada para la creación de currículums profesionales, diseñada bajo la filosofía de que "ningún CV debe parecerse a otro". El sistema adapta el diseño, la estructura y el contenido según el rol profesional del usuario (Tech, Creativo, Ejecutivo, etc.).

🔗 **Live Demo:** (https://cv-builder-pro-tech.leonardotrespalacios.dev/)

---

## ✨ Características Principales

### 1. Sistema de 11 Plantillas Especializadas
Cada plantilla está diseñada para comunicar un perfil específico, no son solo cambios de colores.

| Categoría | Plantilla | Perfil Ideal | Características Clave |
| :--- | :--- | :--- | :--- |
| **Creativo** | **Creative Pulse** | Diseño Gráfico, Branding | Layout asimétrico, cards visuales. |
| | **UX Flow** | UX/UI Designers | Timeline de procesos, enfoque en research. |
| | **Fashion Form** | Moda, Editorial | Tipografía Serif elegante, estilo revista. |
| | **Showcase Pro** | Portafolios, Artistas | Galería de proyectos integrada en el CV. |
| **Tech** | **Frontend Vision** | Frontend Devs | Grid moderno, chips de tecnologías. |
| | **Backend Core** | Backend, DevOps | Diseño técnico, limpio, enfoque en arquitectura. |
| | **Tech Gamer** | Game Devs, Cybersec | Estilo neón/oscuro, identidad digital fuerte. |
| | **Hybrid Pro** | Full Stack | Balance entre visual y técnico. |
| **Corporativo** | **Corporate Blue** | Negocios, Finanzas | Estructura tradicional, confianza y sobriedad. |
| | **Executive Gray** | C-Level, Managers | Enfoque en métricas, liderazgo y estrategia. |
| **ATS Friendly** | **ATS Smart** | Alta compatibilidad | 100% texto plano optimizado para robots. |

### 2. Foto Inteligente & Modo ATS 📸
Funcionalidad avanzada para gestionar la fotografía del perfil:
*   **Toggle en Tiempo Real:** Activa o desactiva la foto sin romper el diseño.
*   **Adaptación Automática:** El layout se reestructura (márgenes, alineaciones) si la foto está presente o ausente.
*   **Modo ATS:** Al desactivar la foto, el sistema optimiza la estructura para máxima legibilidad por sistemas automáticos.
*   **Recomendaciones por Rol:** El sistema sugiere si deberías usar foto según tu plantilla (ej. Recomendado para "Fashion", No recomendado para "Backend").

### 3. Editor en Tiempo Real
*   Edición directa sobre el documento (WYSIWYG).
*   Validación de campos.
*   Gestión de secciones modulares (Experiencia, Educación, Skills, etc.).
*   Persistencia de datos local (tu progreso no se pierde al recargar).

### 4. Personalización Avanzada
*   **Selectores de Color Dinámicos:** Paletas profesionales predefinidas y opción de color personalizado.
*   **Tipografía Adaptativa:** Fuentes seleccionadas específicamente para cada identidad (Poppins, Inter, Playfair Display, etc.).

---

## 🛠️ Arquitectura y Tecnologías

El proyecto fue construido utilizando un stack moderno y eficiente:

### Frontend Core
*   **React 19:** Aprovechando las últimas características de rendimiento y hooks.
*   **Vite:** Build tool de próxima generación para un desarrollo ultrarrápido.
*   **Tailwind CSS 4:** Sistema de diseño utility-first para estilos rápidos y mantenibles.

### Gestión de Estado
*   **Zustand:** Manejo de estado global ligero y potente.
    *   `cvStore.js`: Centraliza toda la lógica de datos del CV, selección de plantillas y configuración de diseño.
    *   Persistencia automática en `localStorage`.

### Componentes y UI
*   **Arquitectura Modular:** Separación clara entre `components/editor` (paneles de control) y `templates/` (vistas del CV).
*   **Framer Motion:** Animaciones fluidas para transiciones de UI y menús.
*   **Lucide React:** Iconografía moderna y consistente.
*   **React Hook Form:** Gestión eficiente de formularios complejos.

### Renderizado de Plantillas
El sistema utiliza un patrón de configuración centralizada (`templatesConfig.js`) que define:
*   Metadatos de la plantilla (ID, nombre, categoría).
*   Mapeo al componente de React correspondiente.
*   Configuraciones de estilo (fuentes, colores HEX).
*   Logica de filtrado por roles.

---

## 🚀 Instalación y Uso Local

Sigue estos pasos para correr el proyecto en tu máquina:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/JLTrespalacios/CV-Builder-Pro.git
    cd CV-Builder-Pro
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar servidor de desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Abrir en el navegador:**
    Visita `http://localhost:5173` (o el puerto que indique la consola).

---

## 📂 Estructura del Proyecto

```
src/
├── components/
│   ├── editor/          # Formularios y paneles de control
│   ├── layout/          # Header, Sidebar, Overlay de selección
│   ├── preview/         # Previsualización del documento
│   └── ui/              # Componentes base reutilizables
├── constants/
│   ├── templatesConfig.js  # Configuración maestra de plantillas
│   └── roleData.js         # Datos de ejemplo por rol
├── store/
│   └── cvStore.js       # Store global (Zustand)
├── templates/           # Componentes de diseño de CV (ModernDark, SwissGrid, etc.)
└── utils/               # Helpers y generadores
```

---

## 🤝 Contribución

Las contribuciones son bienvenidas. Si tienes una idea para una nueva plantilla o funcionalidad:
1.  Haz un Fork del repositorio.
2.  Crea una rama (`git checkout -b feature/NuevaPlantilla`).
3.  Haz tus cambios y commit.
4.  Abre un Pull Request.

---

Desarrollado por **Leonardo Trespalacios**.
