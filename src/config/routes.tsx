import React from "react";
import { RouteObject } from "react-router-dom";

import { Dashboard } from "@/components/Dashboard";
import { NotFoundPage } from "@/components/NotFoundPage";
import { AuthPage } from "@/pages/AuthPage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AnimationTest } from "@/components/AnimationTest";
import { Navigate } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/test-animations",
    element: <AnimationTest />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/publicaciones",
    element: (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">
              Publicaciones
            </h1>
            <p className="text-foreground-500 mt-2">
              Esta página está en construcción
            </p>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/chat",
    element: (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Chat</h1>
            <p className="text-foreground-500 mt-2">
              Esta página está en construcción
            </p>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/notificaciones",
    element: (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">
              Notificaciones
            </h1>
            <p className="text-foreground-500 mt-2">
              Esta página está en construcción
            </p>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/donaciones",
    element: (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Donaciones</h1>
            <p className="text-foreground-500 mt-2">
              Esta página está en construcción
            </p>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/wishlist",
    element: (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Wishlist</h1>
            <p className="text-foreground-500 mt-2">
              Esta página está en construcción
            </p>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/productos",
    element: (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Productos</h1>
            <p className="text-foreground-500 mt-2">
              Esta página está en construcción
            </p>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/reportes",
    element: (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Reportes</h1>
            <p className="text-foreground-500 mt-2">
              Esta página está en construcción
            </p>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/comunidad",
    element: (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Comunidad</h1>
            <p className="text-foreground-500 mt-2">
              Esta página está en construcción
            </p>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/intercambio",
    element: (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Intercambio</h1>
            <p className="text-foreground-500 mt-2">
              Esta página está en construcción
            </p>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/mensajeria",
    element: (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Mensajería</h1>
            <p className="text-foreground-500 mt-2">
              Esta página está en construcción
            </p>
          </div>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Navigate to="/dashboard" replace />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
