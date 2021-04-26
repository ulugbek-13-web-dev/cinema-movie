import "./Header.css";

const Header = () => {
  return (
    <span onClick={() => window.scroll(0, 0)} className="header">
        <p>Cinema Club</p>
    </span>
  );
};

export default Header;
