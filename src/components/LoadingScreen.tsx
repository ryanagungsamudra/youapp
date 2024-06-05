import React from "react";
import PropTypes from "prop-types";

// Anime
import loadingAnimation from "@/assets/loading.json";

// Lottie Components
import Lottie from "lottie-react";

export const LoadingScreen = ({ status, style }) => {
  return (
    <>
      {status && (
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99999,
            backgroundColor: "rgba(0,0,0,0.7)",
            ...style,
          }}>
          <Lottie
            style={{ width: 250, margin: "auto" }}
            animationData={loadingAnimation}
            loop
            autoPlay
          />
        </div>
      )}
    </>
  );
};

LoadingScreen.propTypes = {
  status: PropTypes.bool.isRequired,
  sx: PropTypes.object,
};
