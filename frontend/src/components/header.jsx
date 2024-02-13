import {useEffect, useState} from "react";

const Header = () => {
    const [username, setUsername] = useState("Test")

    useEffect(() => {
        setUsername(localStorage.getItem('username'))
    }, [])
    return (
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="/profile" className="-m-1.5 p-1.5 flex gap-2 font-bold">
                        <img className="rounded h-8 w-auto"
                             src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${username}`}
                             alt=""/>
                        <span className="">{username}</span>
                    </a>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="/logout" className="text-sm font-semibold leading-6 text-gray-900">
                        Log out <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
        </header>
    )
}

export default Header