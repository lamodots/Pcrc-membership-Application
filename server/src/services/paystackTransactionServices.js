async function fetchPaystackTransactionsServices() {
  try {
    const response = await fetch(`https://api.paystack.co/transaction`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }
    const payTransaction = await response.json();
    return payTransaction;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
}

module.exports = fetchPaystackTransactionsServices;
