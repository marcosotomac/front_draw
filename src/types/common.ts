// Tipos compartidos de la aplicación

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface NavItem {
  label: string;
  icon: string;
  active?: boolean;
  href?: string;
}

export interface Stat {
  title: string;
  value: string;
  change: string;
  icon: string;
  color: string;
}

export interface Activity {
  usuario: string;
  accion: string;
  detalle: string;
  tiempo: string;
}

export interface PopularItem {
  nombre: string;
  categoria: string;
  cantidad: number;
}
