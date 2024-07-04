'use client'

import Logo from '@/assets/logo.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import links from '@/utils/links'
import Image from 'next/image'
import { Button } from './ui/button'

function Sidebar() {
  const pathName = usePathname()

  return (
    <aside className="py-4 px-8 bg-muted h-full">
      <Image src={Logo} alt="logo" className="mx-auto" />
      <div className="flex flex-col mt-20 gap-y-4">
        {links.map((link) => {
          return (
            <Button
              key={link.href}
              asChild
              variant={pathName === link.href ? 'default' : 'link'}
            >
              <Link href={link.href} className="flex items-center gap-x-2">
                {link.icon} <span className="capitalize">{link.label}</span>
              </Link>
            </Button>
          )
        })}
      </div>
    </aside>
  )
}
export default Sidebar
