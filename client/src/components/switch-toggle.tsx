
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

export default function SwitchToggle() {
  const { theme, setTheme } = useTheme();
  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div>
      <Button variant={"default"} onClick={handleTheme}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </Button>
    </div>
  );
}
