function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;