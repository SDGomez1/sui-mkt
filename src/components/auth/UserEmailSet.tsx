"use client";

import { setUserEmail } from "@/store/features/userData/userDataSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";

export default function UserEmailSet() {
  const userEmail = useAppSelector((state) => state.userData.email);
  const dispatch = useAppDispatch();
  return (
    <div className="flex border bg-secondary text-neutral-200 p-4 rounded-md text-xs justify-between">
      <p className="text-black select-none break-words  max-w-44">{userEmail}</p>
      <Link
        className="text-blue-500 hover:underline hover:text-blue-700 cursor-pointer shrink-0"
        href={"/auth/login"}
        replace
        onClick={() => {
          dispatch(setUserEmail(""));
        }}
      >
        cambiar correo
      </Link>
    </div>
  );
}
