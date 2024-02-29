import React from "react";

export default function Information(props) {
  const { el } = props;

  return (
    <div>
      <h1 className="text text-center text-2xl mt-2">Information</h1>
      <div className="flex m-2 px-3">
        <div
          className="m-5 w-[808px] h-[360px]
        border border-yellow-500 p-3 whitespace-wrap
        px-2 "
        >
          <p>First name: { el?.firstName ? el?.firstName : "-" }</p>
          <p>Last name: { el?.lastName ? el?.lastName : "-" }</p>
          <p>Role: { el?.role ? el?.role : "-" }</p>
          <p>Phone: { el?.phone ? el?.phone : "-" }</p>
          <p>Identity number: { el?.identityNumber ? el?.identityNumber : "-" }</p>
          <p>Refund: { el?.refund ? el?.refund : "-" }</p>
          <p>Point: { el?.point ? el?.point : "-" }</p>
        </div>
      </div>
    </div>
  );
}
