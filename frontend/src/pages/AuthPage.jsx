import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Input, Label, Checkbox } from "../components/ui/index.jsx";
import { 
  Eye, EyeOff, Mail, Lock, User, ArrowRight, HardHat, 
  Building2, Wrench, CheckCircle2
} from "lucide-react";
import API from "../services/api";
import { useAuth0 } from '@auth0/auth0-react';
import Toast, { useToast } from "../components/Toast"; // ✅ Import Toast component and hook

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Use custom toast hook
  const { toast, showToast } = useToast();

  const { isAuthenticated, isLoading: auth0Loading, loginWithRedirect } = useAuth0();

  // Check URL query param
  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "register") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [searchParams]);

  // Auto-redirect if already logged in via Auth0
  useEffect(() => {
    if (!auth0Loading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, auth0Loading, navigate]);

  // ✅ Auth0 Google Login
  const handleAuth0Login = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: "google-oauth2",
        redirect_uri: window.location.origin + '/callback'
      }
    });
  };

  // ✅ Auth0 GitHub Login
  const handleGithubLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: "github",
        redirect_uri: window.location.origin + '/callback'
      }
    });
  };

  // ✅ Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for LOGIN
    if (isLogin && !rememberMe) {
      showToast('error', 'Please check "Remember me" to continue');
      return;
    }

    // Validation for REGISTER
    if (!isLogin && !acceptTerms) {
      showToast('error', 'Please accept Terms of Service and Privacy Policy');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // LOGIN
        const res = await API.post("/auth/login", {
          email,
          password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        showToast('success', 'Login successful!');
        
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1500);
        
      } else {
        // REGISTER
        const res = await API.post("/auth/register", {
          name,
          email,
          password,
        });
        
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
        
        showToast('success', 'Account created successfully!');
        
        setTimeout(() => {
          if (res.data.token) {
            navigate("/");
            window.location.reload();
          } else {
            setIsLogin(true);
            setPassword("");
            setAcceptTerms(false);
          }
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      showToast('error', error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* ✅ Use Toast component */}
      <Toast toast={toast} />

      {/* LEFT PANEL - Construction Theme */}
      <div className="hidden md:flex md:w-2/5 lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500">
        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute top-0 left-0 w-full h-full" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} 
          />
        </div>
        
        {/* Floating construction elements */}
        <motion.div
          className="absolute top-8 left-8 lg:top-16 lg:left-16 w-48 lg:w-80 h-48 lg:h-80 bg-white/10 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-8 right-8 lg:bottom-16 lg:right-16 w-64 lg:w-96 h-64 lg:h-96 bg-amber-300/20 rounded-full blur-3xl"
          animate={{ y: [0, -40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-32 lg:w-52 h-32 lg:h-52 bg-orange-300/15 rounded-full blur-2xl"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Diagonal stripe accent */}
        <div className="absolute -bottom-20 -left-20 w-[600px] h-32 bg-black/10 rotate-[-15deg]" />
        <div className="absolute -bottom-28 -left-20 w-[600px] h-16 bg-black/5 rotate-[-15deg]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-8 md:px-10 lg:px-16 py-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6 lg:mb-10">
              <div className="w-12 lg:w-14 h-12 lg:h-14 rounded-xl lg:rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <HardHat className="w-6 lg:w-7 h-6 lg:h-7" />
              </div>
              <span className="font-display text-xl lg:text-2xl font-bold tracking-tight">
                Con<span className="text-white/90">struct</span>
              </span>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 lg:mb-6 tracking-tight">
              Building Dreams
              <br />
              <span className="text-white/90">Into Reality.</span>
            </h1>
            
            <p className="text-base lg:text-lg text-white/80 max-w-md leading-relaxed">
              Join thousands of construction professionals managing projects, tracking progress, and delivering excellence.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-10 lg:mt-16 grid grid-cols-3 gap-4 lg:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { value: "500+", label: "Projects", Icon: Building2 },
              { value: "98%", label: "On-Time", Icon: Wrench },
              { value: "24/7", label: "Support", Icon: HardHat },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-10 lg:w-12 h-10 lg:h-12 rounded-lg lg:rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-2 lg:mb-3">
                  <stat.Icon className="w-4 lg:w-5 h-4 lg:h-5" />
                </div>
                <div className="font-display text-xl md:text-2xl lg:text-3xl font-bold">{stat.value}</div>
                <div className="text-xs lg:text-sm text-white/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Features List */}
          <motion.div
            className="mt-12 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {[
              "Real-time project tracking",
              "Team collaboration tools",
              "Budget management system",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-white/80" />
                <span className="text-white/80">{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* RIGHT PANEL - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 lg:px-16 bg-white relative min-h-screen md:min-h-0">
        {/* Subtle texture */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }} 
        />
        
        <div className="w-full max-w-sm sm:max-w-md relative z-10">
          {/* Mobile Logo */}
          <div className="md:hidden flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg">
              <HardHat className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-gray-900">
              Con<span className="text-orange-500">struct</span>
            </span>
          </div>

          {/* Toggle */}
          <div className="flex gap-1 p-1 sm:p-1.5 bg-gray-100 rounded-xl sm:rounded-2xl mb-8 sm:mb-10">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 sm:py-3.5 px-3 sm:px-4 rounded-lg sm:rounded-xl font-semibold text-sm transition-all duration-300 ${
                isLogin
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 sm:py-3.5 px-3 sm:px-4 rounded-lg sm:rounded-xl font-semibold text-sm transition-all duration-300 ${
                !isLogin
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Create Account
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "register"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="mb-6 sm:mb-8">
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-gray-900">
                  {isLogin ? "Welcome back" : "Get started"}
                </h2>
                <p className="text-gray-500 text-sm sm:text-base">
                  {isLogin
                    ? "Enter your credentials to access your account"
                    : "Create your account to start managing projects"}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 sm:pl-12 h-12 sm:h-14 bg-gray-50 border-gray-200 rounded-lg sm:rounded-xl focus:border-orange-500 focus:ring-orange-500/20 focus:ring-4 text-gray-900 placeholder:text-gray-400 text-sm sm:text-base"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 sm:pl-12 h-12 sm:h-14 bg-gray-50 border-gray-200 rounded-lg sm:rounded-xl focus:border-orange-500 focus:ring-orange-500/20 focus:ring-4 text-gray-900 placeholder:text-gray-400 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 sm:pl-12 pr-10 sm:pr-12 h-12 sm:h-14 bg-gray-50 border-gray-200 rounded-lg sm:rounded-xl focus:border-orange-500 focus:ring-orange-500/20 focus:ring-4 text-gray-900 placeholder:text-gray-400 text-sm sm:text-base"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 sm:w-5 h-4 sm:h-5" />
                      ) : (
                        <Eye className="w-4 sm:w-5 h-4 sm:h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {isLogin && (
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked)}
                        className="border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                      />
                      <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                        Remember me
                      </Label>
                    </div>
                    <button
                      type="button"
                      className="text-sm text-orange-600 hover:text-orange-700 hover:underline font-semibold"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {!isLogin && (
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked)}
                      className="mt-0.5 border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
                      I agree to the{" "}
                      <span className="text-orange-600 hover:underline font-medium">Terms of Service</span>{" "}
                      and{" "}
                      <span className="text-orange-600 hover:underline font-medium">Privacy Policy</span>
                    </Label>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 sm:h-14 text-sm sm:text-base font-bold group bg-orange-500 hover:bg-orange-600 text-white rounded-lg sm:rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    "Processing..."
                  ) : (
                    <>
                      {isLogin ? "Sign In" : "Create Account"}
                      <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6 sm:my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 sm:px-4 text-gray-400 font-medium tracking-wider">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <Button
                  type="button"
                  onClick={handleAuth0Login}
                  variant="outline"
                  className="h-12 sm:h-14 font-semibold hover:bg-gray-50 border-gray-200 rounded-lg sm:rounded-xl text-gray-700 text-sm sm:text-base"
                >
                  <svg className="w-4 sm:w-5 h-4 sm:h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  onClick={handleGithubLogin}
                  variant="outline"
                  className="h-12 sm:h-14 font-semibold hover:bg-gray-50 border-gray-200 rounded-lg sm:rounded-xl text-gray-700 text-sm sm:text-base"
                >
                  <svg className="w-4 sm:w-5 h-4 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
