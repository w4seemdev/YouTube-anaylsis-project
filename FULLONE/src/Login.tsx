// import { type FormEvent, useState } from "react";
// import { FiLock, FiMail, FiYoutube } from "react-icons/fi";

// interface LoginProps {
//   onLoginSuccess?: () => void;
// }

// const Login = ({ onLoginSuccess }: LoginProps) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     setTimeout(() => {
//       console.log("Login with:", { email, password });
//       setIsSubmitting(false);
//       onLoginSuccess?.();
//     }, 700);
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
//       <div className="w-full max-w-md">
//         <div className="flex flex-col items-center gap-3 mb-8">
//           <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10">
//             <FiYoutube className="text-2xl text-red-500" />
//           </div>
//           <div className="text-center">
//             <h1 className="text-2xl font-semibold tracking-tight">
//               YouTube Analytics Dashboard
//             </h1>
//             <p className="mt-1 text-xs text-slate-400">
//               Sign in to access your video analytics
//             </p>
//           </div>
//         </div>

//         <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/30 backdrop-blur">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-1.5 text-sm">
//               <label className="text-xs font-medium text-slate-200">
//                 Email address
//               </label>
//               <div className="relative">
//                 <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                   <FiMail className="text-sm text-slate-500" />
//                 </span>
//                 <input
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="name@example.com"
//                   className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 pl-9 text-xs text-slate-100 outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
//                 />
//               </div>
//             </div>

//             <div className="space-y-1.5 text-sm">
//               <label className="text-xs font-medium text-slate-200">
//                 Password
//               </label>
//               <div className="relative">
//                 <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                   <FiLock className="text-sm text-slate-500" />
//                 </span>
//                 <input
//                   type="password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 pl-9 text-xs text-slate-100 outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center justify-between text-[11px] text-slate-400">
//               <label className="inline-flex items-center gap-2 cursor-pointer select-none">
//                 <input
//                   type="checkbox"
//                   className="h-3.5 w-3.5 rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-0"
//                 />
//                 <span>Remember this device</span>
//               </label>
//               <button
//                 type="button"
//                 className="text-emerald-400 hover:text-emerald-300"
//               >
//                 Forgot password?
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {isSubmitting ? "Signing in..." : "Sign in"}
//             </button>
//           </form>

//           <p className="mt-4 text-[11px] text-center text-slate-500">
//             This is a demo login. In a real setup, authentication would be
//             handled securely via an API.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { type FormEvent, useState } from "react";
import {
  FiLock,
  FiMail,
  FiYoutube,
  FiBarChart2,
  FiTrendingUp,
  FiPlayCircle,
} from "react-icons/fi";

interface LoginProps {
  onLoginSuccess?: () => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Login with:", { email, password });
      setIsSubmitting(false);
      onLoginSuccess?.();
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      {/* خلفية بسيطة تعطي حياة بدون ما تكون مزعجة */}
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="absolute -bottom-16 -right-8 h-44 w-44 rounded-full bg-red-500/15 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* الهيدر */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/15 border border-red-500/30">
            <FiYoutube className="text-2xl text-red-500" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              YouTube Analytics Dashboard
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              Sign in to access your video insights and manual scoring tools.
            </p>
          </div>

          {/* شِبْس صغيرة تعطي إحساس بالحركة */}
          <div className="mt-1 flex flex-wrap items-center justify-center gap-2 text-[11px]">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2.5 py-1 border border-slate-700">
              <FiBarChart2 className="text-emerald-400 text-xs" />
              <span className="text-slate-200">URL analytics</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2.5 py-1 border border-slate-700">
              <FiTrendingUp className="text-amber-300 text-xs" />
              <span className="text-slate-200">Manual score</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2.5 py-1 border border-slate-700">
              <FiPlayCircle className="text-sky-300 text-xs" />
              <span className="text-slate-200">Content history</span>
            </span>
          </div>
        </div>

        {/* الكرت الأساسي */}
        <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.55)] backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5 text-sm">
              <label className="text-xs font-medium text-slate-200">
                Email address
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiMail className="text-sm text-slate-500" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 pl-9 text-xs text-slate-100 outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5 text-sm">
              <label className="text-xs font-medium text-slate-200">
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiLock className="text-sm text-slate-500" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 pl-9 text-xs text-slate-100 outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                />
              </div>
            </div>

            {/* Remember + forgot */}
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-0"
                />
                <span>Remember this device</span>
              </label>
              <button
                type="button"
                className="text-emerald-400 hover:text-emerald-300"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60 transition"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-4 text-[11px] text-center text-slate-500">
            This is a demo login. In production, authentication would be handled
            securely through an API.
          </p>
        </div>

        {/* سطر صغير تحت الكرت */}
        <p className="mt-3 text-[10px] text-center text-slate-500">
          Built as a graduation project to explore data-driven YouTube insights.
        </p>
      </div>
    </div>
  );
};

export default Login;
