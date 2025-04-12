"use client";
import React from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
const PaymentHistoryTable = ({ payments }) => {
  return (
    <div className="w-full overflow-x-auto">
      <h2 className="text-center mb-5 font-bold text-xl">Payment History</h2>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {payments?.map((payment) => (
          <div key={payment.id} className="bg-white p-4 rounded-lg shadow">
            <div className="font-semibold">
              Transaction: {payment.transaction_id}
            </div>
            <div className="text-gray-500 mb-2">
              {new Date(payment.created_at).toLocaleDateString()}
            </div>

            {payment.items?.map((item) => (
              <div key={item.id} className="border-t pt-3 mt-3 flex gap-3">
                {item?.product?.image && (
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <div className="font-medium">{item?.product_name}</div>
                  <div>Price: ${item.price}</div>
                  <div>Qty: {item.quantity}</div>
                </div>
              </div>
            ))}

            <div className="font-bold mt-2">Total: ${payment.total_amount}</div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <table className="hidden md:table min-w-full bg-white border rounded shadow text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-3 px-4 border">Transaction ID</th>
            <th className="py-3 px-4 border">Product</th>
            <th className="py-3 px-4 border">Amount</th>
            <th className="py-3 px-4 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments?.map((payment) => (
            <React.Fragment key={payment.id}>
              <tr>
                <td className="py-3 px-4 border" rowSpan={payment.items.length}>
                  {payment.transaction_id}
                </td>
                <td className="py-3 px-4 border">
                  <div className="flex items-center gap-2">
                    {payment.items[0]?.product?.image && (
                      <img
                        src={payment.items[0].product.image}
                        alt={payment.items[0].product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    <div>
                      <div className="font-semibold">
                        {payment.items[0]?.product_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        Qty: {payment.items[0].quantity}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 border" rowSpan={payment.items.length}>
                  ${payment.total_amount}
                </td>
                <td className="py-3 px-4 border" rowSpan={payment.items.length}>
                  {new Date(payment.created_at).toLocaleDateString()}
                </td>
              </tr>
              {payment.items.slice(1).map((item) => (
                <tr key={item.id}>
                  <td className="py-3 px-4 border">
                    <div className="flex items-center gap-2">
                      {item?.product?.image && (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                      )}
                      <div>
                        <div>{item?.product_name}</div>
                        <div className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistoryTable;
