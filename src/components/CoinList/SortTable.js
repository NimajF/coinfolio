export default function SortTable({ handleOption }) {
  return (
    <thead>
      <tr className="bg-transparent text-sm rounded-t-xl">
        <th
          className="py-3 px-4 text-left cursor-pointer"
          onClick={() => handleOption("rank")}
        >
          Rank
        </th>
        <th
          className="py-3 px-6 text-left cursor-pointer"
          onClick={() => handleOption("name")}
        >
          Name
        </th>
        <th
          className="py-3 px-6 text-right cursor-pointer"
          onClick={() => handleOption("price")}
        >
          Price
        </th>
        <th
          className="py-3 px-6 text-right cursor-pointer"
          onClick={() => handleOption("change")}
        >
          24h Change
        </th>
        <th
          className="py-3 px-6 text-right cursor-pointer"
          onClick={() => handleOption("marketCap")}
        >
          Market Cap
        </th>
      </tr>
    </thead>
  );
}
