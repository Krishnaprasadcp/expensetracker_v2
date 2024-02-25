const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav>Navbar links</nav>
      {children}
    </>
  );
};
export default HomeLayout;
