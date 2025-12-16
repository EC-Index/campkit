import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  href?: string
}

const sizes = {
  sm: { icon: 32, text: 'text-base' },
  md: { icon: 40, text: 'text-lg' },
  lg: { icon: 48, text: 'text-xl' },
}

export function Logo({ size = 'md', showText = true, href = '/' }: LogoProps) {
  const { icon, text } = sizes[size]
  
  const content = (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.png"
        alt="CampKit"
        width={icon}
        height={icon}
        className="rounded-xl"
      />
      {showText && (
        <span className={`font-display font-semibold ${text}`}>
          <span className="text-white">Camp</span>
          <span className="text-camp-500">Kit</span>
        </span>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="flex items-center gap-2 hover:opacity-90 transition-opacity">
        {content}
      </Link>
    )
  }

  return content
}

// Simple icon-only version for small spaces
export function LogoIcon({ size = 40 }: { size?: number }) {
  return (
    <Image
      src="/logo.png"
      alt="CampKit"
      width={size}
      height={size}
      className="rounded-xl"
    />
  )
}
