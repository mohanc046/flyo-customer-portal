import React from "react";
import FacebookLogin from "react-facebook-login";
import { config } from "../../../config";
import _ from "lodash";
import Image from "next/image";
import { useLogin } from "@/context/LoginContext";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";

function FacebookOAuthLogin() {
  const router = useRouter();
  const { authenticateFaceBookLogin } = useLogin();
  const { storeData } = useStore();

  const navigateToDashboard = () => {
    router.push(`/`);
  };

  const onSuccess = async (response) => {
    const token = _.get(response, "access_token", "");
    await authenticateFaceBookLogin({ credential: token, navigateToDashboard });
  };

  return (
    <div>
      <FacebookLogin
        appId={config.FACEBOOK_APP_ID}
        fields="name,email,picture"
        callback={onSuccess}
        containerStyle={{
          padding: 0,
        }}
        buttonStyle={{
          backgroundColor: "transparent",
          padding: 0,
          borderColor: "transparent",
        }}
        textButton=""
        icon={<Image src={config.FACEBOOK} height={50} width={50} />}
      />
    </div>
  );
}

export default FacebookOAuthLogin;
