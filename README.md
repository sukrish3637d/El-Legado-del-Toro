# El Legado del Toro
### *La Corrida de Toros: Arte, Cultura y Controversia*

Una revista digital interactiva en español dedicada al análisis multidisciplinar de la tauromaquia en España: sus raíces históricas, manifestaciones artísticas, arraigo popular, debate ético contemporáneo y proyecciones de futuro.

---

## 🏛️ Estructura del Proyecto y Equipo

El proyecto se compone de 5 secciones principales:

| Sección | Título | Responsable | Funcionalidad Interactiva | Ruta |
| :--- | :--- | :--- | :--- | :--- |
| **Sección 1** | **La Historia** | Sukrish | Línea de tiempo interactiva | `sections/historia/index.html` |
| **Sección 2** | **El Arte** | [Name] | Galería visual interactiva | `sections/arte/index.html` |
| **Sección 3** | **La Cultura** | [Name] | Cuestionario interactivo | `sections/cultura/index.html` |
| **Sección 4** | **La Controversia** | [Name] | Encuesta y sondeo de opinión | `sections/controversia/index.html` |
| **Sección 5** | **El Futuro** | [Name] | Simulación interactiva | `sections/futuro/index.html` |

---

## 📁 Arquitectura de Carpetas

```text
El-Legado-del-Toro/
├── index.html                   # Portada interactiva de la revista
├── README.md                    # Documentación del proyecto
├── css/
│   └── shared.css               # Sistema de diseño compartido (paleta, fuentes, base, tarjetas)
├── js/
│   ├── nav.js                   # Barra de navegación responsiva dinámica
│   └── home.js                  # Configuración de miembros (array) y renderizado de la portada
└── sections/
    ├── historia/                # Sección 1: La Historia (Sukrish)
    │   ├── index.html
    │   ├── style.css
    │   ├── script.js
    │   └── images/
    ├── arte/                    # Sección 2: El Arte
    │   └── index.html           # Página "En construcción" (sustituible por el responsable)
    ├── cultura/                 # Sección 3: La Cultura
    │   └── index.html           # Página "En construcción" (sustituible por el responsable)
    ├── controversia/            # Sección 4: La Controversia
    │   └── index.html           # Página "En construcción" (sustituible por el responsable)
    └── futuro/                  # Sección 5: El Futuro
        └── index.html           # Página "En construcción" (sustituible por el responsable)
```

---

## 🎨 Sistema de Diseño (Design Tokens)

Definido en `css/shared.css`:
- **Rojo Profundo (Primary):** `#8B1E1E` (tonos: `#5C1010`, `#B83232`)
- **Dorado / Albero (Accent):** `#C99700` (tonos: `#E0B32D`, `#996F00`)
- **Fondo Arena (Background):** `#F8F5EE` (tonos: `#FCFAF6`, `#EFE9DD`)
- **Tipografía de Títulos (Serif):** *Cinzel* y *Playfair Display*
- **Tipografía de Cuerpo (Sans-Serif):** *Plus Jakarta Sans*

---

## ⚙️ Reglas Técnicas y Despliegue

1. **Sin frameworks ni dependencias:** Desarrollado exclusivamente con HTML5 semántico, CSS3 moderno y Vanilla JavaScript.
2. **Sin persistencia externa:** No se utiliza `localStorage`.
3. **Rutas 100% Relativas:** Todas las rutas internas son relativas (`./`, `../../`) para garantizar compatibilidad total tanto en entornos locales como al alojarse en **GitHub Pages** bajo el subdirectorio `/El-Legado-del-Toro/`.
4. **Configuración centralizada de integrantes:** Los nombres y datos de cada sección se configuran en el array `MEMBERS` en `js/home.js` para facilitar modificaciones sin necesidad de tocar la estructura HTML.