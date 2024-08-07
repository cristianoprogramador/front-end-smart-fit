import Image from "next/image";

export function Footer() {
  return (
    <div className="bg-[#333333] h-52 w-full flex flex-col gap-4 justify-center items-center">
      <div>
        <Image src="/logo.svg" alt="logo" width={100} height={80} />
      </div>
      <div className="text-white mb-10">
        Todos os direitos reservados - {new Date().getFullYear()}
      </div>
    </div>
  );
}
