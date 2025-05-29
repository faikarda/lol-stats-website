import { NavLink } from 'react-router-dom';

function Navbar({ currentUser }) {
  return (
    <nav style={{
      background: "#1a1d29",
      padding: "0 36px",
      boxShadow: "0 2px 16px rgba(50,60,120,0.15)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 64,
      position: "sticky",
      top: 0,
      zIndex: 99
    }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {["/", "/champions", "/register", "/login"].map((path, idx) => {
          const names = ["Ana Sayfa", "Şampiyonlar", "Kayıt Ol", "Giriş Yap"];
          return (
            <NavLink
              key={path}
              to={path}
              style={({ isActive }) => ({
                color: isActive ? "#ffdb5b" : "#dedee8",
                fontWeight: isActive ? "bold" : "400",
                fontSize: "1.35rem",
                marginRight: idx < 3 ? 36 : 0,
                textDecoration: "none",
                position: "relative",
                padding: "6px 0",
                transition: "color .2s",
                ...(isActive && {
                  borderBottom: "3px solid #ffdb5b",
                  borderRadius: 2,
                }),
                // HOVER EFFECT
                ...(isActive
                  ? {}
                  : {
                      opacity: 0.8,
                      cursor: "pointer",
                      transition: "color .15s, opacity .15s",
                    }),
              })}
            >
              {names[idx]}
            </NavLink>
          );
        })}
      </div>
      {currentUser && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12
        }}>
          <img
            src="https://cdn.jsdelivr.net/gh/gauravghongde/social-icons@master/SVG/White/League%20of%20Legends.svg"
            alt="lol"
            width={28}
            height={28}
            style={{
              borderRadius: "50%",
              background: "#262b40",
              border: "2px solid #ffdb5b",
              marginRight: 5
            }}
          />
          <span style={{
            color: "#ffdb5b",
            fontWeight: "bold",
            fontSize: "1.15rem",
            letterSpacing: "0.5px"
          }}>
            Hoş geldin, {currentUser}!
          </span>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
