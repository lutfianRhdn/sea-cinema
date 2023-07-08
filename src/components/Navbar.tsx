'use client'
import { fetchData } from "@/utils"
import { faCaretDown, faCaretUp, faFileInvoiceDollar, faRightFromBracket, faTicketAlt, faUser, faUserPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Menu } from "@headlessui/react"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Navbar() {
  const { data: session } = useSession()
  const [user, setUser] = useState<any>({})
  useEffect(() => {
    if (session?.user) {
      const { data: user }: any = session?.user
      fetchData('auth/me', 'GET', {}, user.token).then(res => {
        setUser(res.data)
      })
    }
  }, [session])
  const links = [
    // { title: 'Home', href: '/' },
    { title: 'Movies', href: '/movies' },
  ]
  const dropdownLinks = [
    { href: '/transactions', title: 'transaksi', icon: faFileInvoiceDollar },
    { href: '/my-tickets', title: "tiket ku", icon: faTicketAlt }
  ]
  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false)
  const [activeLink, setActiveLink] = useState<string>('')
  useEffect(() => {
    const path = window.location.pathname
    const pathSplited = path.split('/')
    const pathName = pathSplited[1]
    setActiveLink(`/${pathName}`)
  }, [])
  return (
    <>

      <nav className="bg-white    px-2 py-4 mb-10">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <a href="/" className="flex">
            <span className="self-center text-lg font-semibold whitespace-nowrap">SEA Movie</span>
          </a>
            
          <div className="flex justify-between items items-center w-auto mt-3 md:mt-0 order-1" id="mobile-menu-3">
            <ul className="flex-row  flex items-center justify-between space-x-8 text-sm font-medium">
              {links.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className={`${activeLink.toUpperCase() == link.href.toUpperCase() ? 'bg-blue-700 text-white ' : ''} pl-3 pr-4 py-2 rounded`} aria-current="page">{link.title}</Link>
                </li>
              ))}

              {session == undefined ? (

                <li>
                  <button className="w-full justify-center rounded-md  bg-opacity-20 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" onClick={() => signIn()}>
                    login</button>
                </li>
              ) : (
                <>
                  {user.role === 'admin' && (
                    <li>
                      <Link href={'/admin/movies'} className={`${activeLink.toUpperCase() == 'admin' ? 'bg-blue-700 text-white ' : ''} pl-3 pr-4 py-2 rounded`} aria-current="page">Admin</Link>                    </li>
                  )}
                  <li>
                    <Menu>
                      <Menu.Button className="w-full justify-center rounded-md  bg-opacity-20 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white  focus-visible:ring-opacity-75" onClick={() => setDropdownIsOpen(!dropdownIsOpen)}>
                        {user.name || 'User'}
                        <FontAwesomeIcon icon={dropdownIsOpen ? faCaretUp : faCaretDown} className="ml-2" />
                      </Menu.Button>

                        <Menu.Items className="absolute  mt-2 w-56  right-10 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <Menu.Item>
                          <div className="w-full py-5 bg-white">
                            <div className="flex flex-col items-center justify-center h-full">
                              <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded-full">
                                <FontAwesomeIcon icon={faUser} className="text-4xl text-gray-800" />
                              </div>
                              <div className="flex gap-5 mt-5">
                                <div className="mt-2 ">{user.name || 'name'} </div>
                                <div className="mt-2 ">@{user.username || 'username'}</div>
                                </div>
                                <div className="mt-2">Age:{ user.age} </div>
                              <div className="mt-2  ">Rp.{user.balance}</div>
                              <div className="flex justify-between gap-4">
                                {/* <Button text="Top Up" isLink={true} path="/" /> */}
                                <Link href='/topup' className="mt-2  px-2 py-1 bg-blue-600 text-white rounded-md shadow-md">Top Up</Link>
                                <Link href='/withdraw' className="mt-2  px-2 py-1 bg-blue-600 text-white rounded-md shadow-md">Withdraw</Link>
                              </div>
                            </div>
                          </div>
                        </Menu.Item>
                        {dropdownLinks.map((link, index) => (
                          <Menu.Item key={index}>
                            {({ active }) => (
                              <Link href={link.href} className={` ${active ? ' bg-gray-300' : ''}   group flex w-full gap-1 items-center rounded-md px-4 py-2 capitalize text-gray-800`}>
                                <FontAwesomeIcon icon={link.icon} className="mr-2 text-lg" />
                                {link.title}
                              </Link>
                            )}

                          </Menu.Item>

                        ))}
                        <Menu.Item >
                            {({ active }) => (
                              <button onClick={() => signOut()} type="button" className="group flex w-full gap-1 items-center rounded-md px-4 py-2 capitalize text-gray-800">
                                <FontAwesomeIcon icon={faRightFromBracket} className="mr-2 text-lg" />
                                Keluar
                              </button>
                          )}

                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </li>
                </>

              )}

            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
