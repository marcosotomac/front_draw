import React from "react";
import { Button, Checkbox, Link, addToast } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FormInput } from "./form/FormInput";
import { FormButton } from "./form/FormButton";
import { LoginSuccessAnimation } from "./LoginSuccessAnimation";

import { useAuth } from "@/contexts/AuthContext";

interface LoginFormProps {
  onSwitchView: () => void;
}

export function LoginForm({ onSwitchView }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const formControls = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email || !password) {
        addToast({
          title: "Login failed",
          description: "Please enter both email and password.",
          color: "danger",
        });

        return;
      }

      await login(email, password);

      addToast({
        title: "Login successful",
        description: "Welcome back to GreenLoop!",
        color: "success",
      });

      setShowSuccess(true);
    } catch {
      // Error handling for login failure
      addToast({
        title: "Login failed",
        description:
          "Please check your credentials and try again. For testing, use test@example.com / test123",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessComplete = () => {
    navigate("/dashboard");
  };

  if (showSuccess) {
    return (
      <LoginSuccessAnimation
        firstName={user?.firstName || "User"}
        onComplete={handleSuccessComplete}
      />
    );
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-semibold text-foreground tracking-tight">
          Welcome back
        </h2>
        <p className="text-foreground-500 mt-2">
          Access your sustainable ecosystem
        </p>
      </motion.div>

      <form onSubmit={handleLogin} className="space-y-5">
        <motion.div
          custom={0}
          variants={formControls}
          initial="hidden"
          animate="visible"
        >
          <FormInput
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onValueChange={setEmail}
            isRequired
            icon="lucide:mail"
          />
        </motion.div>

        <motion.div
          custom={1}
          variants={formControls}
          initial="hidden"
          animate="visible"
        >
          <FormInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onValueChange={setPassword}
            isRequired
            type={isPasswordVisible ? "text" : "password"}
            icon="lucide:lock"
            endContent={
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="focus:outline-none"
              >
                <Icon
                  icon={isPasswordVisible ? "lucide:eye-off" : "lucide:eye"}
                  className="text-default-400 text-lg cursor-pointer"
                />
              </button>
            }
          />
        </motion.div>

        <motion.div
          className="flex justify-between items-center"
          custom={2}
          variants={formControls}
          initial="hidden"
          animate="visible"
        >
          <Checkbox
            isSelected={rememberMe}
            onValueChange={setRememberMe}
            radius="sm"
          >
            <span className="text-sm">Remember me</span>
          </Checkbox>
          <Link href="#" size="sm" className="text-primary">
            Forgot password?
          </Link>
        </motion.div>

        <motion.div
          custom={3}
          variants={formControls}
          initial="hidden"
          animate="visible"
        >
          <FormButton type="submit" isLoading={isLoading} className="w-full">
            Sign In
          </FormButton>
        </motion.div>
      </form>

      <motion.p
        className="text-center text-sm text-foreground-500 mt-6"
        custom={6}
        variants={formControls}
        initial="hidden"
        animate="visible"
      >
        Don&apos;t have an account?{" "}
        <Button
          variant="light"
          color="primary"
          className="p-0 font-medium"
          onPress={onSwitchView}
        >
          Sign up
        </Button>
      </motion.p>
    </div>
  );
}
