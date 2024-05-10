import { useTheme } from "../hooks/use-theme";

const HomePage = () => {
  const { toggleTheme } = useTheme();

  return (
    <div>
      <h1>HomePage</h1>
      <button onClick={toggleTheme}>Theme</button>
    </div>
  );
};

export default HomePage;
