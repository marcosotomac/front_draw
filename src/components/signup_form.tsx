import React, { useState } from "react";
import { Checkbox, Link, addToast } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import { FormInput } from "./form/FormInput";
import { FormButton } from "./form/FormButton";

import { SuccessAnimation } from "@/components/SuccessAnimation";

interface SignupFormProps {
  onSwitchView: () => void;
}

export function SignupForm({ onSwitchView }: SignupFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Password strength validation
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: "" };

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const isLongEnough = password.length >= 8;

    const criteria = [
      hasLowercase,
      hasUppercase,
      hasNumber,
      hasSpecial,
      isLongEnough,
    ];
    const metCriteria = criteria.filter(Boolean).length;

    const strengthMap = [
      { strength: 0, label: "" },
      { strength: 1, label: "Weak" },
      { strength: 2, label: "Fair" },
      { strength: 3, label: "Good" },
      { strength: 4, label: "Strong" },
      { strength: 5, label: "Very Strong" },
    ];

    return strengthMap[metCriteria];
  };

  const passwordStrength = getPasswordStrength();

  const getStrengthColor = () => {
    const colors = ["", "danger", "warning", "warning", "success", "success"];

    return colors[passwordStrength.strength];
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeTerms) {
      addToast({
        title: "Terms not accepted",
        description: "Please agree to the Terms of Service and Privacy Policy",
        color: "warning",
      });

      return;
    }

    setIsLoading(true);

    try {
      if (
        firstName &&
        lastName &&
        email &&
        password &&
        passwordStrength.strength >= 3
      ) {
        await signup(firstName, lastName, email, password);
        setShowSuccess(true);
      } else {
        addToast({
          title: "Signup failed",
          description: "Please check your information and try again.",
          color: "danger",
        });
      }
    } catch {
      addToast({
        title: "Signup failed",
        description:
          "Please check your information and try again. For testing, use any valid data with test@example.com",
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
    return <SuccessAnimation onComplete={handleSuccessComplete} />;
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

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

  return (
    <div className="space-y-6">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-semibold text-foreground tracking-tight">
          Create an account
        </h2>
        <p className="text-foreground-500 mt-2">
          Join our sustainable ecosystem network
        </p>
      </motion.div>

      <form onSubmit={handleSignup} className="space-y-5">
        <motion.div
          animate="visible"
          custom={0}
          initial="hidden"
          variants={formControls}
        >
          <FormInput
            delay={0}
            icon="lucide:user"
            isRequired
            label="First Name"
            placeholder="Enter your full name"
            value={firstName}
            onValueChange={setFirstName}
          />
        </motion.div>

        <motion.div
          animate="visible"
          custom={1}
          initial="hidden"
          variants={formControls}
        >
          <FormInput
            delay={0.1}
            icon="lucide:user"
            isRequired
            label="Last Name"
            placeholder="Enter your last name"
            value={lastName}
            onValueChange={setLastName}
          />
        </motion.div>

        <motion.div
          animate="visible"
          custom={2}
          initial="hidden"
          variants={formControls}
        >
          <FormInput
            delay={0.2}
            icon="lucide:mail"
            isRequired
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onValueChange={setEmail}
          />
        </motion.div>

        <motion.div
          animate="visible"
          className="space-y-2"
          custom={3}
          initial="hidden"
          variants={formControls}
        >
          <FormInput
            delay={0.3}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={togglePasswordVisibility}
              >
                <Icon
                  className="text-default-400 text-lg cursor-pointer"
                  icon={isPasswordVisible ? "lucide:eye-off" : "lucide:eye"}
                />
              </button>
            }
            icon="lucide:lock"
            isRequired
            label="Password"
            placeholder="Create a password"
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onValueChange={setPassword}
          />

          {password && (
            <motion.div
              className="space-y-1"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-default-200 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div
                    className={`h-full bg-${getStrengthColor()}`}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(passwordStrength.strength / 5) * 100}%`,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  ></motion.div>
                </div>
                <span className={`text-xs text-${getStrengthColor()}`}>
                  {passwordStrength.label}
                </span>
              </div>
              <motion.ul
                className="text-xs text-foreground-500 space-y-1 pl-4 list-disc"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <li className={password.length >= 8 ? "text-success" : ""}>
                  At least 8 characters
                </li>
                <li className={/[A-Z]/.test(password) ? "text-success" : ""}>
                  At least one uppercase letter
                </li>
                <li className={/[0-9]/.test(password) ? "text-success" : ""}>
                  At least one number
                </li>
                <li
                  className={
                    /[^A-Za-z0-9]/.test(password) ? "text-success" : ""
                  }
                >
                  At least one special character
                </li>
              </motion.ul>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          custom={3}
          variants={formControls}
          initial="hidden"
          animate="visible"
        >
          <Checkbox
            isSelected={agreeTerms}
            onValueChange={setAgreeTerms}
            radius="sm"
          >
            <span className="text-sm">
              I agree to the{" "}
              <Link href="#" size="sm" className="text-primary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" size="sm" className="text-primary">
                Privacy Policy
              </Link>
            </span>
          </Checkbox>
        </motion.div>

        <motion.div
          animate="visible"
          custom={4}
          initial="hidden"
          variants={formControls}
        >
          <FormButton className="w-full" isLoading={isLoading} type="submit">
            Create Account
          </FormButton>
        </motion.div>
      </form>

      <motion.p
        animate="visible"
        className="text-center text-sm text-foreground-500 mt-6"
        custom={7}
        initial="hidden"
        variants={formControls}
      >
        Already have an account?{" "}
        <FormButton
          className="p-0 font-medium"
          variant="light"
          onClick={onSwitchView}
        >
          Sign in
        </FormButton>
      </motion.p>
    </div>
  );
}
