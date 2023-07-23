import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>HOME PAGE</h1>
      <Link href={"/sales"}>Sales</Link>
    </main>
  );
}
