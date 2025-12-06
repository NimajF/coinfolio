"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { features, benefits } from "@/constants/registerConstants";
import { 
  IoCheckmarkCircle, 
  IoEyeOutline, 
  IoEyeOffOutline, 
  IoPersonOutline,
  IoMailOutline,
  IoLockClosedOutline,
  IoArrowForward,
  IoRocketOutline
} from "react-icons/io5";

export default function Register() {
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    newsletter: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (session) return router.push("/");
  }, [session, router]);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  // Validation functions
  const validateUsername = (username) => {
    if (username.length < 3) return "Username must be at least 3 characters";
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return "Username can only contain letters, numbers, and underscores";
    return null;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return null;
  };

  const validatePassword = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/(?=.*[a-z])/.test(password)) return "Password must contain at least one lowercase letter";
    if (!/(?=.*[A-Z])/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number";
    return null;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({ ...formData, [name]: newValue });
    
    // Real-time validation
    const errors = { ...validationErrors };
    
    if (name === 'username') {
      const error = validateUsername(value);
      if (error) errors.username = error;
      else delete errors.username;
    }
    
    if (name === 'email') {
      const error = validateEmail(value);
      if (error) errors.email = error;
      else delete errors.email;
    }
    
    if (name === 'password') {
      const error = validatePassword(value);
      if (error) errors.password = error;
      else delete errors.password;
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        errors.confirmPassword = "Passwords do not match";
      } else {
        delete errors.confirmPassword;
      }
    }
    
    setValidationErrors(errors);
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      const usernameError = validateUsername(formData.username);
      const emailError = validateEmail(formData.email);
      
      if (usernameError || emailError) {
        setValidationErrors({
          username: usernameError,
          email: emailError,
        });
        return;
      }
    }
    
    if (currentStep === 2) {
      const passwordError = validatePassword(formData.password);
      const confirmError = formData.password !== formData.confirmPassword ? "Passwords do not match" : null;
      
      if (passwordError || confirmError) {
        setValidationErrors({
          password: passwordError,
          confirmPassword: confirmError,
        });
        return;
      }
    }
    
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      setValidationErrors({ terms: "You must accept the terms and conditions" });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const signupResponse = await axios.post("/api/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      const res = await signIn("credentials", {
        username: signupResponse.data.newUser.username,
        password: formData.password,
        redirect: false,
      });
      
      if (res.ok) {
        setCurrentStep(4); // Success step
        setTimeout(() => router.push("/"), 2000);
      }
    } catch (err) {
      console.error(err);
      setValidationErrors({ 
        submit: err.response?.data?.message || "Registration failed. Please try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    if (passwordStrength <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 3) return "Fair";
    if (passwordStrength <= 4) return "Strong";
    return "Very Strong";
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a15] via-[#12121d] to-[#1a1a2e] text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-blue-500/5" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 flex min-h-screen">
        {/* Left Panel - Welcome & Features */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 xl:p-16"
        >
          <div className="max-w-lg">
            {/* Logo and Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <IoRocketOutline className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Coinfolio
                </h1>
              </div>
              <h2 className="text-4xl xl:text-5xl font-bold mb-4 leading-tight">
                Start Your 
                <span className="bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent"> Crypto Journey</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Join thousands of investors who trust Coinfolio to manage their cryptocurrency portfolios. 
                Professional tools, real-time data, and institutional-grade security.
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  className="bg-[#1a1a2e]/40 backdrop-blur-sm border border-[#2a2a3e]/50 rounded-xl p-4 hover:bg-[#1a1a2e]/60 transition-all duration-300"
                >
                  <feature.icon className="w-6 h-6 text-indigo-400 mb-2" />
                  <h3 className="font-semibold text-white text-sm mb-1">{feature.title}</h3>
                  <p className="text-slate-400 text-xs">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Benefits List */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="space-y-2"
            >
              <h3 className="font-semibold text-white mb-3">What you'll get:</h3>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                  className="flex items-center gap-2 text-slate-300 text-sm"
                >
                  {benefit}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Right Panel - Registration Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          >
            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                      currentStep >= step 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                        : 'bg-[#2a2a3e] text-slate-400'
                    }`}>
                      {currentStep > step ? <IoCheckmarkCircle className="w-5 h-5" /> : step}
                    </div>
                    {step < 3 && (
                      <div className={`w-8 h-0.5 transition-all ${
                        currentStep > step ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-[#2a2a3e]'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-[#1a1a2e]/60 backdrop-blur-sm border border-[#2a2a3e] rounded-2xl p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
                      <p className="text-slate-400">Let's start with the basics</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Username
                        </label>
                        <div className="relative">
                          <IoPersonOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`w-full bg-[#0a0a15]/60 border rounded-xl px-10 py-3 text-white font-medium focus:outline-none focus:ring-2 transition-all ${
                              validationErrors.username 
                                ? 'border-red-500/50 focus:ring-red-500/50' 
                                : 'border-[#2a2a3e] focus:ring-indigo-500/50 focus:border-indigo-500/50'
                            }`}
                            placeholder="Choose a username"
                          />
                          {!validationErrors.username && formData.username && (
                            <IoCheckmarkCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
                          )}
                        </div>
                        {validationErrors.username && (
                          <p className="text-red-400 text-sm mt-1">{validationErrors.username}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <IoMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full bg-[#0a0a15]/60 border rounded-xl px-10 py-3 text-white font-medium focus:outline-none focus:ring-2 transition-all ${
                              validationErrors.email 
                                ? 'border-red-500/50 focus:ring-red-500/50' 
                                : 'border-[#2a2a3e] focus:ring-indigo-500/50 focus:border-indigo-500/50'
                            }`}
                            placeholder="Enter your email"
                          />
                          {!validationErrors.email && formData.email && (
                            <IoCheckmarkCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
                          )}
                        </div>
                        {validationErrors.email && (
                          <p className="text-red-400 text-sm mt-1">{validationErrors.email}</p>
                        )}
                      </div>

                      <button
                        onClick={handleNextStep}
                        disabled={!formData.username || !formData.email}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all disabled:cursor-not-allowed"
                      >
                        Continue
                        <IoArrowForward className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Security */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-white mb-2">Secure Your Account</h2>
                      <p className="text-slate-400">Create a strong password to protect your investments</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full bg-[#0a0a15]/60 border rounded-xl px-10 py-3 text-white font-medium focus:outline-none focus:ring-2 transition-all ${
                              validationErrors.password 
                                ? 'border-red-500/50 focus:ring-red-500/50' 
                                : 'border-[#2a2a3e] focus:ring-indigo-500/50 focus:border-indigo-500/50'
                            }`}
                            placeholder="Create a strong password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                          >
                            {showPassword ? <IoEyeOffOutline className="w-5 h-5" /> : <IoEyeOutline className="w-5 h-5" />}
                          </button>
                        </div>
                        
                        {formData.password && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-400">Password strength</span>
                              <span className={`font-medium ${passwordStrength <= 2 ? 'text-red-400' : passwordStrength <= 3 ? 'text-yellow-400' : passwordStrength <= 4 ? 'text-blue-400' : 'text-green-400'}`}>
                                {getPasswordStrengthText()}
                              </span>
                            </div>
                            <div className="w-full bg-[#2a2a3e] rounded-full h-1">
                              <div 
                                className={`h-1 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                style={{ width: `${(passwordStrength / 5) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                        
                        {validationErrors.password && (
                          <p className="text-red-400 text-sm mt-1">{validationErrors.password}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full bg-[#0a0a15]/60 border rounded-xl px-10 py-3 text-white font-medium focus:outline-none focus:ring-2 transition-all ${
                              validationErrors.confirmPassword 
                                ? 'border-red-500/50 focus:ring-red-500/50' 
                                : 'border-[#2a2a3e] focus:ring-indigo-500/50 focus:border-indigo-500/50'
                            }`}
                            placeholder="Confirm your password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                          >
                            {showConfirmPassword ? <IoEyeOffOutline className="w-5 h-5" /> : <IoEyeOutline className="w-5 h-5" />}
                          </button>
                        </div>
                        {validationErrors.confirmPassword && (
                          <p className="text-red-400 text-sm mt-1">{validationErrors.confirmPassword}</p>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setCurrentStep(1)}
                          className="flex-1 bg-[#2a2a3e] hover:bg-[#3a3a4e] text-white font-semibold py-3 px-6 rounded-xl transition-all"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleNextStep}
                          disabled={!formData.password || !formData.confirmPassword || passwordStrength < 3}
                          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all disabled:cursor-not-allowed"
                        >
                          Continue
                          <IoArrowForward className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Terms & Final */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-white mb-2">Almost There!</h2>
                      <p className="text-slate-400">Review and accept our terms to complete registration</p>
                    </div>

                    <div className="space-y-6">
                      {/* Account Summary */}
                      <div className="bg-[#0a0a15]/60 rounded-xl p-4 border border-[#2a2a3e]/50">
                        <h3 className="font-semibold text-white mb-3">Account Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Username:</span>
                            <span className="text-white">{formData.username}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Email:</span>
                            <span className="text-white">{formData.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Password Strength:</span>
                            <span className={`font-medium ${passwordStrength <= 2 ? 'text-red-400' : passwordStrength <= 3 ? 'text-yellow-400' : passwordStrength <= 4 ? 'text-blue-400' : 'text-green-400'}`}>
                              {getPasswordStrengthText()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Terms and Preferences */}
                      <div className="space-y-4">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            name="acceptTerms"
                            checked={formData.acceptTerms}
                            onChange={handleChange}
                            className="mt-1 w-4 h-4 text-indigo-600 bg-transparent border-2 border-[#2a2a3e] rounded focus:ring-indigo-500 focus:ring-2"
                          />
                          <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                            I agree to the <a href="#" className="text-indigo-400 hover:text-indigo-300 underline">Terms of Service</a> and <a href="#" className="text-indigo-400 hover:text-indigo-300 underline">Privacy Policy</a>
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            name="newsletter"
                            checked={formData.newsletter}
                            onChange={handleChange}
                            className="mt-1 w-4 h-4 text-indigo-600 bg-transparent border-2 border-[#2a2a3e] rounded focus:ring-indigo-500 focus:ring-2"
                          />
                          <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                            Send me market updates and product news (optional)
                          </span>
                        </label>
                      </div>

                      {validationErrors.terms && (
                        <p className="text-red-400 text-sm">{validationErrors.terms}</p>
                      )}

                      {validationErrors.submit && (
                        <p className="text-red-400 text-sm">{validationErrors.submit}</p>
                      )}

                      <div className="flex gap-3">
                        <button
                          onClick={() => setCurrentStep(2)}
                          className="flex-1 bg-[#2a2a3e] hover:bg-[#3a3a4e] text-white font-semibold py-3 px-6 rounded-xl transition-all"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleSubmit}
                          disabled={!formData.acceptTerms || isSubmitting}
                          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Creating Account...
                            </>
                          ) : (
                            <>
                              <IoRocketOutline className="w-4 h-4" />
                              Create Account
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Success */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
                      className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <IoCheckmarkCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <h2 className="text-2xl font-bold text-white mb-2">Welcome to Coinfolio!</h2>
                    <p className="text-slate-400 mb-6">
                      Your account has been created successfully. You'll be redirected to your dashboard shortly.
                    </p>
                    
                    <div className="w-full bg-[#2a2a3e] rounded-full h-1 mb-4">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2 }}
                        className="h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                      />
                    </div>
                    
                    <p className="text-sm text-slate-500">Redirecting to dashboard...</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Login Link */}
              {currentStep < 4 && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-slate-400">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                    >
                      Sign in here
                    </a>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
