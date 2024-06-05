const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100vh] w-full flex container-gradient">{children}</div>
  );
};

export default AuthLayout;
