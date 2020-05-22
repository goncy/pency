import React from "react";

import ResetPasswordForm from "./Form";
import ResetPasswordSuccess from "./Success";

interface FormData {
  email: string;
}

interface Props {
  navigate: (route: string) => void;
}

const ResetPasswordScreen: React.FC<Props> = ({navigate}) => {
  const [screen, setScreen] = React.useState("form");

  if (screen === "form") {
    return (
      <ResetPasswordForm onBack={() => navigate("login")} onSuccess={() => setScreen("success")} />
    );
  }

  if (screen === "success") {
    return <ResetPasswordSuccess />;
  }
};

export default ResetPasswordScreen;
