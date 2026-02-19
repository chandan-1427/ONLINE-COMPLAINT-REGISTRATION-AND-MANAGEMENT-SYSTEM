const AuthCard = ({ title, subtitle, children }) => {
  return (
    <>
      <section className="auth-section">
        <div className="auth-container">
          <div className="auth-card">

            <div className="auth-card-body">
              <h2 className="auth-title">{title}</h2>
              <p className="auth-subtitle">{subtitle}</p>

              {children}
            </div>

          </div>
        </div>
      </section>

      {/* Internal CSS */}
      <style>
        {`
          .auth-section {
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
          }

          .auth-container {
            width: 100%;
            max-width: 480px;
          }

          .auth-card {
            background: #ffffff;
            border-radius: 14px;
            border: 1px solid #eee;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
            transition: transform 0.2s ease;
          }

          .auth-card:hover {
            transform: translateY(0px);
          }

          .auth-card-body {
            padding: 40px 35px;
            text-align: center;
          }

          .auth-title {
            font-weight: 600;
            margin-bottom: 10px;
            font-size: 1.6rem;
            color: #111;
          }

          .auth-subtitle {
            font-size: 0.95rem;
            color: #777;
            margin-bottom: 30px;
          }

          @media (max-width: 576px) {
            .auth-card-body {
              padding: 30px 20px;
            }
          }
        `}
      </style>
    </>
  );
};

export default AuthCard;
