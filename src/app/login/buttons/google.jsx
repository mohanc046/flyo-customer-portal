import React from "react";
import _ from "lodash";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { config } from "../../../config";
import Image from "next/image";
import { useLogin } from "@/context/LoginContext";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";

export const CustomButton = (props) => {
  const { onSuccess, onFailure } = props;

  const login = useGoogleLogin({
    onSuccess: onSuccess,

    onFailure: onFailure,
  });

  return (
    <span onClick={() => login()}>
      <Image align="center" src={config.GOOGLE} height={50} width={50} />
    </span>
  );
};

function GoogleOAuthLogin() {
  const router = useRouter();
  const { authenticateGoogleLogin } = useLogin();
  const { storeData } = useStore();

  const navigateToDashboard = () => {
    router.push(`/`);
  };

  const onSuccess = async (response) => {
    const token = _.get(response, "access_token", "");
    await authenticateGoogleLogin({ credential: token, navigateToDashboard });
  };

  const onFailure = (res) => {
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
  };

  return (
    <div>
      <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
        <CustomButton onSuccess={onSuccess} onFailure={onFailure} />
      </GoogleOAuthProvider>
    </div>
  );
}

export default GoogleOAuthLogin;
