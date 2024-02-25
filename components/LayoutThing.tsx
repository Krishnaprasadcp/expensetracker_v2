"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
function LayoutThing() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <div className="flex justify-between">
        <div>
          <nav>
            <Link href={"#"}>Sign In</Link>
            <Link href={"#"}>Sign Up</Link>
          </nav>
        </div>
        <div>
          <h4>
            Time:{time.getHours()}:{time.getMinutes()}:{time.getSeconds()}
          </h4>
          <div>
            <p>Date:{time.getDate()}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default LayoutThing;
