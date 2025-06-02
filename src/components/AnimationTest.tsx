import React, { useState } from "react";
import { motion } from "framer-motion";
import { LoginSuccessAnimation } from "./LoginSuccessAnimation";
import { SuccessAnimation } from "./SuccessAnimation";

export function AnimationTest() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-md mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-center">Animation Test</h1>

        <div className="space-y-4">
          <button
            onClick={() => setShowLogin(true)}
            className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Test Login Success Animation
          </button>

          <button
            onClick={() => setShowSignup(true)}
            className="w-full p-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
          >
            Test Signup Success Animation
          </button>
        </div>

        {/* Animation containers */}
        {showLogin && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-background border border-divider rounded-lg p-8 max-w-md w-full mx-4">
              <LoginSuccessAnimation
                onComplete={() => setShowLogin(false)}
                firstName="Test User"
              />
            </div>
          </div>
        )}

        {showSignup && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-background border border-divider rounded-lg p-8 max-w-md w-full mx-4">
              <SuccessAnimation onComplete={() => setShowSignup(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
