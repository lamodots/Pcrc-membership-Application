function RegisterConfirmation() {
  const handleResendVerifyEmail = async () => {};
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-white p-6  ">
      <div className="max-w-[512px] bg-white p-8 rounded-sm shadow-sm">
        <h1 className="text-2xl text-center mb-8">Registration Successful</h1>
        <p className="text-sm text-center">
          A confirmation email has been sent to your email address Please click
          on the link in the email to verify your email address.
        </p>
        <div className="flex flex-col space-x-2 justify-center md:flex-row pt-10 ">
          <span className="text-center">Didnt recieve email? </span>
          <button className="text-blue-700" onClick={handleResendVerifyEmail}>
            Resend verification email
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterConfirmation;
