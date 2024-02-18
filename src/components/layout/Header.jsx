import {useState} from "react";
import useEventListener from "../../hooks/useEventListener";
import Navigation from "./Navigation";
import {Logo} from "../utils";

const Header = () => {
    const [sticky, setSticky] = useState(false);

    const isSticky = () => {
        const scrollTop = window.scrollY;
        scrollTop > 200 ? setSticky(true) : setSticky(false);
    };

    useEventListener("scroll", isSticky);

    return (
        <header
            className={`header top-0 left-0 z-50 h-auto w-full ${
                sticky
                    ? "fixed animate-slidedown border-b border-white border-opacity-20 bg-grey bg-opacity-80 backdrop-blur backdrop-filter"
                    : "absolute"
            }`}
        >
            <div className="container mx-auto">
                <div className="header-inner flex items-center justify-between">
                    <Logo url="/" text/>
                    <div className="header-nav hidden lg:block">
                        <Navigation/>
                    </div>
                    <div className="header-button hidden lg:block" />
                </div>
            </div>
        </header>
    );
};

export default Header;
