import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { AiOutlineMenu } from 'react-icons/ai'

import { authRoutes, Themes } from '../utils/constants'
import { Dispatch, RootState } from '../store/store'

interface HeaderProps {
};

export const Header: React.FC<HeaderProps> = () => {

    const { theme, setTheme } = useTheme()
    const router = useRouter()
    const dispatch = useDispatch<Dispatch>()
    const { user, authenticated } = useSelector((state: RootState) => state.user)
    
    const thisRoute = authRoutes.includes(router.pathname)

    const logout = async () => {
        try {
            if(thisRoute) {
                router.back()
            }
            dispatch.user.logoutAsync()
        } catch (err) {
            console.log(err)
        }     
    }


    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="#" className="flex items-center">
                        LOGO
                    </a>
                    <div className="flex items-center lg:order-2">
                        <div className="flex-none">
                            <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="text-2xl btn btn-ghost"><AiOutlineMenu/></label>
                            <ul tabIndex={0} className="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52">
                            {
                                user && authenticated ?
                                <>
                                    <li>
                                        <Link href="/me">
                                            <a className="btn btn-ghost btn-sm rounded-btn">
                                                Me
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            className="btn btn-ghost btn-sm rounded-btn"
                                            onClick={logout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                    {/* <li>
                                        <Link href="/chat">
                                            <a className="btn btn-ghost btn-sm rounded-btn">
                                                Chats
                                            </a>
                                        </Link>
                                    </li> */}
                                </>
                                :
                                <div className="items-stretch hidden lg:flex">
                                    <Link href="/login">
                                        <a className="btn btn-ghost btn-sm rounded-btn">
                                            Sign in/Sign up
                                        </a>
                                    </Link>
                                </div>
                            }
                            </ul>
                            </div>
                        </div>
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <a href="#" className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Company</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Marketplace</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Features</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Team</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
};
