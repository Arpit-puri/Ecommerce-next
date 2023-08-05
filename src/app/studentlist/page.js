import React from "react";
import Link from "next/link";
const Student = () => {
  return (
    <>
      <h1>Student list</h1>
      <ul>
        <li>
          <Link href="/studentlist/ansh">Ansh</Link>
        </li>
        <li>
          <Link href="/studentlist/arth">Arth</Link>
        </li>
        <li>
          <Link href="/studentlist/akash">Akash</Link>
        </li>
        <li>
          <Link href="/studentlist/abhi">Abhi</Link>
        </li>
      </ul>
    </>
  );
};

export default Student;
