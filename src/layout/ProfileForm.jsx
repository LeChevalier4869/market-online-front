import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Information from "../components/Information";
import Account from "../components/Account";
import Address from "../components/Address";

export default function ProfileForm() {
  const { user } = useAuth();
  const [trigger, setTrigger] = useState(1);

  const hdlRequestInformation = (e) => {
    e.preventDefault();

    setTrigger(1);
  };

  const hdlRequestAccount = (e) => {
    e.preventDefault();

    setTrigger(2);
  };

  const hdlRequestAddress = (e) => {
    e.preventDefault();

    setTrigger(3);
  };

  return (
    <div className="size">
      <h1 className="text text-center mt-5 text-3xl">{user.username}'s Proflie</h1>
      
      {/* layout left-right */}
      <div className="border border-green-300 mt-5 p-5 flex justify-around">
        {/* layout left */}
        <div className="border border-blue-300 mt-5 w-[300px] flex flex-col justify-center items-center">
          <button onClick={hdlRequestInformation} className="infomation border border-red-500 mb-5 w-[150px] text-center p-3">
            Information  
          </button>
          <button onClick={hdlRequestAccount} className="Account border border-red-500 mb-5 w-[150px] text-center p-3">
            Account
          </button>
          <button onClick={hdlRequestAddress} className="Address border border-red-500 mb-5 w-[150px] text-center p-3">
            Address
          </button>
        </div>

        {/* -------------------------- Split -------------------------- */}

        {/* layout right */}
        <div className="flex flex-col items-center mt-5">

            <div className="infomation
                border border-dashed border-red-500
                min-w-[500px] min-h-[500px]
                w-[850px] h-[500px]
            ">
              {
                trigger === 1
                  ?  <Information el={user} />
                  : trigger === 2
                      ? <Account />
                      : trigger === 3
                        ? <Address setTrigger={setTrigger} />
                        : <h1>404 : Trigger not found</h1>
              }
            </div>

        </div>
      </div>
    </div>
  );
}
