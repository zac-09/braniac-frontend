import {
  authenticationPending,
  authenticationSuccess,
  authenticationFail
} from "./../reducers/authSlice";

export const LoginUser = (email, password) => {
  return async (dispatch) => {
    dispatch(authenticationPending());
    const response = await fetch(`https://uia-backend.onrender.com/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      let errorMessage = "";
      errorMessage = error.message.msgBody;
      dispatch(authenticationFail(errorMessage));
    }
    const res = await response.json();
    console.log("the data:",res)
    dispatch(
      authenticationSuccess({
        user: res.data,
        apiToken: res.apiToken,
        token: res.token,
      })
    );
  };
};
