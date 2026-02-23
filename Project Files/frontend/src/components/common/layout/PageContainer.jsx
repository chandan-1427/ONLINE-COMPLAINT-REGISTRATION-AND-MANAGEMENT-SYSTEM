const PageContainer = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {children}
    </div>
  );
};

export default PageContainer;
