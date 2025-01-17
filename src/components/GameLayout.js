import { useNavigate } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import toast, { Toaster } from "react-hot-toast";
import Images from "../constants/Images";
import "../app/styles/styles.css";

export default function GameLayout({
  showHeader = true,
  showBack,
  setBack,
  showLeft = false,
  showRight = false,
  children,
  bgColor = false,
  bgClass = "set-div-2-bg",
  rightAction = null,
  showLogout = false,
  zeroOpacity = true,
  withoutPrivate = false,
  style={}
}) {
  const router = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authResponse");
    router("/");
  };

  return (
    <>
      {withoutPrivate ? (
        <>
          <div className={"second-login-screen set-div-1"}>
            <Toaster />
            <div className={"set-div-2" + (bgColor ? " " + bgClass : "")} style={style}>
            {showHeader && (
              <div className="set-child-div">
                {showLeft && (
                  <>
                    {showBack ? (
                      <img
                        className="left-sec"
                        src={Images.arrow_back}
                        onClick={setBack}
                      />
                    ) : (
                      <img className="left-sec" src={Images.shopping_bag} />
                    )}
                  </>
                )}

                <img src={Images.logo} />

                {showRight && (
                  <>
                    <img
                      className={
                        showLogout
                          ? "right-sec"
                          : showBack
                          ? "right-sec " +
                            (zeroOpacity ? "zero-opacity" : "") +
                            " "
                          : "right-sec"
                      }
                      src={showLogout ? Images.logout : Images.setting}
                      onClick={() => {
                        if (rightAction) {
                          rightAction();
                        } else {
                          if (!showBack) {
                            handleLogout();
                          }
                        }
                      }}
                    />
                  </>
                )}
              </div>
            )}
              {children}
            </div>
          </div>
        </>
      ) : (
        <PrivateRoute>
          <div className={"second-login-screen set-div-1"} >
            <Toaster />
            <div className={"set-div-2" + (bgColor ? " " + bgClass : "")} style={style}>
              {showHeader && (
                <div className="set-child-div">
                  {showLeft && (
                    <>
                      {showBack ? (
                        <img
                          className="left-sec"
                          src={Images.arrow_back}
                          onClick={setBack}
                        />
                      ) : (
                        <img className="left-sec" src={Images.shopping_bag} />
                      )}
                    </>
                  )}

                  <img src={Images.logo} />

                  {showRight && (
                    <>
                      <img
                        className={
                          showLogout
                            ? "right-sec"
                            : showBack
                            ? "right-sec " +
                              (zeroOpacity ? "zero-opacity" : "") +
                              " "
                            : "right-sec"
                        }
                        src={showLogout ? Images.logout : Images.setting}
                        onClick={() => {
                          if (rightAction) {
                            rightAction();
                          } else {
                            if (!showBack) {
                              handleLogout();
                            }
                          }
                        }}
                      />
                    </>
                  )}
                </div>
              )}

              {children}
            </div>
          </div>
        </PrivateRoute>
      )}
    </>
  );
}
