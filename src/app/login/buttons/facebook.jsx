import React from "react";
import FacebookLogin from "react-facebook-login";
import { config } from "../../../config";
import _ from "lodash";
import { LoginService } from "../login.service";
import Image from "next/image";

function FacebookOAuthLogin() {
  // const navigate = useNavigate();
  const { authenticateFaceBookLogin } = LoginService();

  // const navigateToDashboard = () => {
  //   navigate("/home");
  // };

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
        icon={
          <Image src={config.FACEBOOK} height={50} width={50} />
        }
      />
    </div>
  );
}

export default FacebookOAuthLogin;
