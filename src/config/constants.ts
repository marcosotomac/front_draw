// Constantes de la aplicación
export const APP_CONFIG = {
  name: "GreenLoop",
  description: "Economía Circular",
  version: "1.0.0",
  api: {
    baseUrl: "http://localhost:8080",
    endpoints: {
      auth: {
        signin: "/auth/signin",
        signup: "/auth/signup",
        me: "/auth/me",
      },
    },
  },
  storage: {
    authToken: "authToken",
  },
  routes: {
    auth: "/auth",
    dashboard: "/dashboard",
    home: "/",
  },
} as const;

// Configuración de animaciones
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
  },
  easing: {
    default: [0.22, 1, 0.36, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
  },
  delays: {
    stagger: 0.1,
    formControls: 0.05,
  },
} as const;

// Configuración de colores (complementa a Tailwind)
export const COLOR_CONFIG = {
  gradients: {
    primary: "from-primary-400 to-primary-600",
    background: "from-background via-primary-50/20 to-background",
    card: "from-content1/90 via-content1/95 to-content1/90",
  },
  shadows: {
    card: "shadow-lg shadow-primary-500/10",
    active: "shadow-lg shadow-primary-500/30",
  },
} as const;
