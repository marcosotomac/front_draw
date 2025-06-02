import { useState, useEffect } from "react";
import { apiClient } from "@/services/api";
import { Stat, Activity, PopularItem } from "@/types/common";

export function useDashboardData() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [popularProducts, setPopularProducts] = useState<PopularItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data - replace with actual API calls
  const mockStats: Stat[] = [
    {
      title: "Total Usuarios",
      value: "2,847",
      change: "+12% desde el mes pasado",
      icon: "lucide:users",
      color: "from-primary-100 to-primary-50",
    },
    {
      title: "Publicaciones",
      value: "1,234",
      change: "+8% desde el mes pasado",
      icon: "lucide:file-text",
      color: "from-cyan-100 to-cyan-50",
    },
    {
      title: "Donaciones",
      value: "567",
      change: "+23% desde el mes pasado",
      icon: "lucide:heart",
      color: "from-blue-100 to-blue-50",
    },
    {
      title: "Productos",
      value: "3,891",
      change: "+15% desde el mes pasado",
      icon: "lucide:package",
      color: "from-sky-100 to-sky-50",
    },
    {
      title: "Mensajes",
      value: "8,542",
      change: "+31% desde el mes pasado",
      icon: "lucide:mail",
      color: "from-teal-100 to-teal-50",
    },
    {
      title: "Intercambios",
      value: "445",
      change: "+6% desde el mes pasado",
      icon: "lucide:repeat",
      color: "from-indigo-100 to-indigo-50",
    },
  ];

  const mockActivities: Activity[] = [
    {
      usuario: "María García",
      accion: "publicó un producto",
      detalle: "Silla de madera reciclada",
      tiempo: "hace 2 horas",
    },
    {
      usuario: "Carlos López",
      accion: "hizo una donación",
      detalle: "Libros educativos",
      tiempo: "hace 4 horas",
    },
    {
      usuario: "Ana Martín",
      accion: "inició un intercambio",
      detalle: "Ropa vintage",
      tiempo: "hace 6 horas",
    },
    {
      usuario: "Pedro Sánchez",
      accion: "se unió a la comunidad",
      detalle: "Recicladores Madrid",
      tiempo: "hace 1 día",
    },
  ];

  const mockPopularProducts: PopularItem[] = [
    { nombre: "Muebles reciclados", categoria: "Hogar", cantidad: 24 },
    { nombre: "Ropa vintage", categoria: "Moda", cantidad: 18 },
    { nombre: "Libros usados", categoria: "Educación", cantidad: 15 },
    { nombre: "Electrónicos", categoria: "Tecnología", cantidad: 12 },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // In a real app, you would fetch from API:
        // const [statsResponse, activitiesResponse, productsResponse] = await Promise.all([
        //   apiClient.get('/dashboard/stats'),
        //   apiClient.get('/dashboard/activities'),
        //   apiClient.get('/dashboard/popular-products')
        // ]);

        setStats(mockStats);
        setActivities(mockActivities);
        setPopularProducts(mockPopularProducts);
        setError(null);
      } catch (err) {
        setError("Error loading dashboard data");
        console.error("Dashboard data fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return {
    stats,
    activities,
    popularProducts,
    isLoading,
    error,
    refetch: () => {
      setIsLoading(true);
      // Re-fetch logic here
    },
  };
}
