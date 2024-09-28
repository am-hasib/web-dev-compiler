import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import SwitchToggle from "./switch-toggle";

export default function Header() {
  return (
    <div className="w-full md:container mx-auto flex items-center justify-between">
      <div className="flex items-center justify-between w-full">
        <div className="logo">
          <Link to={"/"}>
            <h1 className=" select-none font-mono font-bold ">Web Compiler</h1>
          </Link>
        </div>
        <div className="menu flex items-center gap-3">
          <SwitchToggle />
          <Link to={"/compiler"}>
            <Button variant={"outline"}>Compiler</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
