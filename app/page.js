import Link from "next/link";
export default function Home() {
  return (
    <div className="p-10">
      Home Page 
      
      <Link href={"/signup"}>
      <button className=" bg-white text-black p-2 rounded-md m-2 ">
        SignUp 
        </button>
      </Link>
      <Link href={"/signin"}>
      <button className=" bg-white text-black p-2 rounded-md m-2">
        SignIn
        </button>
      </Link>
    </div>
  );
}
