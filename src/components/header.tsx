import Image from "next/image";


export function Header(){
  return (
    <div className="bg-black h-24 w-full flex justify-center items-center">
        <Image src="/logo.svg" alt="logo" width={150} height={80} />
      </div>
  )
}
