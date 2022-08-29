import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { AiOutlineMenu } from 'react-icons/ai'

import { authRoutes, Themes } from '../utils/constants'
import { Dispatch, RootState } from '../store/store'
import { useAuthenticatedSocket } from '../utils/useSocket'

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = () => {
    useAuthenticatedSocket('ws://localhost:4000/chat')
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
        <>
            <div className="sticky top-0 z-50">
                <div className="h-5 shadow-lg navbar bg-primary">
                    <div className="flex-none px-2 mx-2">
                        <Link href="/">
                                <a className="text-lg font-bold">
                                Indian VC
                                </a>
                        </Link>
                    </div> 
                    <div className="flex-1 px-2 mx-2">
                        {/* {
                            user && authenticated ?
                            <div className="items-stretch hidden lg:flex">
                                <Link href="/me">
                                    <a className="btn btn-ghost btn-sm rounded-btn">
                                        Me
                                    </a>
                                </Link>
                                <button
                                    className="btn btn-ghost btn-sm rounded-btn"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </div>
                            :
                            <div className="items-stretch hidden lg:flex">
                                <Link href="/login">
                                    <a className="btn btn-ghost btn-sm rounded-btn">
                                        Sign in/Sign up
                                    </a>
                                </Link>
                            </div>
                        } */}
                    </div>
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
            </div>
        </>
    
    )
}