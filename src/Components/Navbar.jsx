import Image from "next/image";
import Link from "next/link";
import logo from '../../public/assets/logo.svg';
import AuthOptions from "./AuthOptions";

const Navbar = () => {
    const navItems = <ul className="inline-flex items-center gap-14">
        <li>
            <Link href={`/`}>Home</Link>
        </li>
        <li>
            <Link href={`/about`}>About</Link>
        </li>
        <li>
            <Link href={`/services`}>Services</Link>
        </li>
        <li>
            <Link href={`/blogs`}>Blogs</Link>
        </li>
        <li>
            <Link href={`/contact`}>Contact</Link>
        </li>
    </ul>


    return (
        <div>
            <section className="container-width px-3 md:px-6 navbar">
                <div className="navbar-start">
                    <Link href="/">
                        <Image src={logo} alt="" height={80} width={80} />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    {navItems}
                </div>
                <div className="navbar-end gap-6">
                    <AuthOptions />
                    <Link className="btn btn-ghost rounded-md" href={`/my-bookings`}>Appointments</Link>
                </div>
            </section>
        </div>
    );
};

export default Navbar;