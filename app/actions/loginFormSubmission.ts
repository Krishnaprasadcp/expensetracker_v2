export async function LoginFormSubmisionAction(formData: FormData) {
  const userEmail = formData.get("email");
  const userPassword = formData.get("password");

  try {
    const response = await fetch(
      "http://localhost:3000/api/authentication/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail, userPassword }),
      }
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      console.log(data.message);
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
