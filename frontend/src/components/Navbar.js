const Navbar = ({ darkMode, toggleTheme }) => {
  return (
    <header>
      <div className="container">
        <h1>
          <a href="/">Workout Tracker</a>
        </h1>

        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "☀ Light" : "☾ Dark"}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
