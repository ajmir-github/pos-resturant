import Link from "next/link";

export default function TablesStats({ tables, customers }) {
  return (
    <div className="flex justify-between flex-grow items-center">
      <Link href={"/"} className="btn btn-sm btn-ghost place-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
          />
        </svg>

        <span className="hidden md:block">Back</span>
      </Link>

      <div className="join bg-transparent items-center">
        <div className="stat py-2 md:py-4">
          <div className="stat-title text-xs sm:text-sm md:text-md">
            Operator
          </div>
          <div className="stat-value text-sm sm:text-md md:text-lg">
            Ajmir Raziqi
          </div>
        </div>
        <div className="stat py-2 md:py-4">
          <div className="stat-title text-xs sm:text-sm md:text-md">Tables</div>
          <div className="stat-value text-sm sm:text-md md:text-lg">
            {tables}
          </div>
        </div>

        <div className="stat py-2 md:py-4">
          <div className="stat-title text-xs sm:text-sm md:text-md">
            Customers
          </div>
          <div className="stat-value text-sm sm:text-md md:text-lg">
            {customers}
          </div>
        </div>
      </div>
    </div>
  );
}
