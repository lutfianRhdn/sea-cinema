import Link from "next/link"

type propsType = {
  color?: string,
  text: string,
  onClick?: () => void
  className?: string
  isLink?: boolean
  path?: string
  type?: 'button' | 'submit' | 'reset'
}
export default function Button({ ...props }: propsType) {
  return (
    <>
      {props.isLink ? (
        <Link href={props.path || ''} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl ${props.className}`}>
          {props.text}
        </Link>
      ) : (
        <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl ${props.className}`} onClick={props.onClick} type={props.type}>
          {props.text}
        </button>
      )}
    </>
  )
}