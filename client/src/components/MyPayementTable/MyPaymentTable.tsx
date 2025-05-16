function MyPaymentTable({ title = "welfre" }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="bg-white rounded-md border border-stone-200">
        <div className="overflow-x-auto p-4">
          <table className="w-full min-w-[800px]">
            <thead className="text-[#A6B4BA] text-sm">
              <tr className="border-b border-stone-200">
                {[
                  "Name of Dues",
                  "Amount",
                  "Year",
                  "Status",
                  "Payment Method",
                  "Payment Date",
                  "Start Date",
                  "End Date",
                ].map((header) => (
                  <th
                    key={header}
                    className="text-left py-3 px-2 font-medium whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm text-[#515F69]">
              <tr className="border-b border-stone-200">
                <td className="py-3 px-2 whitespace-nowrap">Welfare</td>
                <td className="py-3 px-2">₦30,000</td>
                <td className="py-3 px-2">2025</td>
                <td className="py-3 px-2 text-green-600">Paid</td>
                <td className="py-3 px-2">Online</td>
                <td className="py-3 px-2">2025-03-11</td>
                <td className="py-3 px-2">2025-03-11</td>
                <td className="py-3 px-2">2025-03-11</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyPaymentTable;
