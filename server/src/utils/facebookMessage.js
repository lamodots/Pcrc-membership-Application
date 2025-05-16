// /***
//  * @function removeFirstZero()
//  * @param phoneNumber
//  * Example usage:
//  * const phoneNumber = "07060980876";
//  * const updatedNumber = removeFirstZero(phoneNumber);
//  * console.log(updatedNumber); Output: "7060980876"
//  *
//  */
// function removeFirstZero(phoneNumber) {
//   // Check if the phone number starts with '0'
//   if (phoneNumber.startsWith("0")) {
//     // Remove the first character (the zero)
//     return phoneNumber.slice(1);
//   }
//   // Return the phone number unchanged if it doesn't start with '0'
//   return phoneNumber;
// }

async function sendWhatsMessage(whatsappId, membername, memberId) {
  console.log(whatsappId, membername, memberId);
  //   const userwhatspp = removeFirstZero(whatsappId);
  const res = await fetch(
    `https://graph.facebook.com/v22.0/512412761963340/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.KSN_FB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: `${whatsappId}`,
        type: "template",
        template: {
          name: "membership_update",
          language: {
            code: "en_US",
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: `${membername}`,
                },
                {
                  type: "text",
                  text: `${memberId}`,
                },
              ],
            },
          ],
        },
      }),
    }
  );

  if (!res.ok) {
    const errorResponse = await res.json();
    console.error("Error sending WhatsApp message:", errorResponse);
    return; // Optionally return to prevent further execution
  }
  const responseBody = await res.json();
  console.log(responseBody);
}

module.exports = sendWhatsMessage;
