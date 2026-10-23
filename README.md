# El Legado del Toro
### *La Corrida de Toros: Arte, Cultura y Controversia*

Una revista digital interactiva en español dedicada al análisis multidisciplinar de la tauromaquia en España: sus raíces históricas, manifestaciones artísticas, arraigo popular, debate ético contemporáneo y proyecciones de futuro.

---

## 🏛️ Estructura del Proyecto y Equipo

El proyecto se compone de 5 secciones principales:

| Sección | Título | Responsable | Funcionalidad Interactiva | Ruta |
| :--- | :--- | :--- | :--- | :--- |
| **Sección 1** | **La Historia** | Sukrish (25BDS1058) | Línea de tiempo interactiva | `sections/historia/index.html` |
| **Sección 2** | **El Arte** | Krishna Mishra (25BDS1135) | Galería visual interactiva | `sections/arte/index.html` |
| **Sección 3** | **La Cultura** | Abhishek Kumar (25BDS1018) | Cuestionario interactivo | `sections/cultura/index.html` |
| **Sección 4** | **La Controversia** | Saurabh Raj (25BDS1005) | Encuesta y sondeo de opinión | `sections/controversia/index.html` |
| **Sección 5** | **El Futuro** | Durgesh Tomar (25BDS1039) | Simulación interactiva | `sections/futuro/index.html` |
| **Apoyo** | **Glosario** | Equipo | Términos y vocabulario taurino | `glossary.html` |
| **Apoyo** | **Fuentes** | Equipo | Bibliografía y fuentes documentales | `sources.html` |

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
    ├── historia/                # Sección 1: La Historia (Sukrish - 25BDS1058)
    │   ├── index.html
    │   ├── style.css
    │   ├── script.js
    │   └── images/
    ├── arte/                    # Sección 2: El Arte (Krishna Mishra - 25BDS1135)
    │   └── index.html
    ├── cultura/                 # Sección 3: La Cultura (Abhishek Kumar - 25BDS1018)
    │   └── index.html
    ├── controversia/            # Sección 4: La Controversia (Saurabh Raj - 25BDS1005)
    │   └── index.html
    └── futuro/                  # Sección 5: El Futuro (Durgesh Tomar - 25BDS1039)
        └── index.html
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