const { StatusCodes } = require("http-status-codes");
const { fetchPaystackTransactionsServices } = require("../services");

async function fetchPaystackTransactionsController(req, res, next) {
  try {
    // Fetch transactions from the service
    const payStackTransactions = await fetchPaystackTransactionsServices();

    // Validate the response structure
    if (!payStackTransactions || !Array.isArray(payStackTransactions.data)) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Invalid transaction data received from the service.",
      });
    }

    // Transform the transaction data using map for better readability
    const transact = payStackTransactions.data.map((transaction) => ({
      id: transaction.id,
      status: transaction.status,
      reference: transaction.reference,
      amount: transaction.amount,
      metadata: transaction.metadata,
      customer: transaction.customer,
      paid_at: transaction.paid_at,
    }));

    // Return the transformed data as a JSON response
    res.status(StatusCodes.OK).json({ success: true, transact });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error fetching Paystack transactions:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "An error occurred while processing the request.",
    });
  }
}

module.exports = fetchPaystackTransactionsController;
