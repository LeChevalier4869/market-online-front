import useAuth from "../hooks/useAuth";


export default function Account() {
  const { userWithPass } = useAuth();
  const user = userWithPass;

  return (
    <div>
    <h1 className="text text-center text-2xl mt-2">Account</h1>
    <div className="flex m-2 px-3">
      <div
        className="m-5 w-[808px] h-[360px]
      border border-yellow-500 p-3 whitespace-wrap
      px-2 "
      >
        <p>ID: { user?.id ? user?.id : "null" }</p>
        <p>Email: { user?.email ? user?.email : "-" }</p>
        <p>Username: { user?.username ? user?.username : "-" }</p>
        <p>Password: ...</p>
        {/* <p>Password: { user?.password ? user?.password : "null" }</p> */}
      </div>
    </div>
  </div>
  )
}
