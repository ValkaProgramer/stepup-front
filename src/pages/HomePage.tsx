import React from "react";

const HomePage: React.FC = () => {
  const [permission, setPermission] =
    React.useState<NotificationPermission | null>(null);

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      console.error("This browser does not support desktop notifications.");
      return;
    }

    setPermission(await Notification.requestPermission());
  };

  React.useEffect(() => {
    if (
      permission === null ||
      permission === "default" ||
      permission === "denied"
    ) {
      requestNotificationPermission();
    }
  }, [permission]);

  return (
    <div className="flex flex-col items-center justify-center mb-5">
      <div
        className={`mt-5 mb-5 p-8 w-[80vw] rounded-[16px] bg-${
          permission === "granted" ? "[#FFDF2B]" : "white"
        }`}
      >
        {permission === "granted" ? (
          <h1 className="text-black">Notification permission granted</h1>
        ) : (
          <h1 className="text-red-500">
            Please provide notification permissions
          </h1>
        )}
      </div>

      <div className="w-[70vw] text-gray-500 bg-white rounded-4xl p-10 flex flex-col items-center justify-center">
        <h1 className="text-black">Keep Moving, Stay Healthy</h1>
        <p className="max-w-[90%] text-2xl border-b-1 p-5">
          Regular movement and stretching are essential for a healthy body and
          mind.
        </p>
        <p className="max-w-[90%] text-2xl border-b-1 p-5">
          Even a short break to stretch during the day can improve your posture,
          reduce stress, and boost your energy levels.{" "}
        </p>
        <p className="max-w-[90%] text-2xl border-b-1 p-5">
          Simple exercises like walking, stretching your arms, or rolling your
          shoulders can help prevent stiffness and increase blood circulation.
        </p>
        <p className="  max-w-[90%] text-2xl p-5">
          So, take a few minutes to move!
        </p>
        <h1 className="text-black pt-5">Your body will thank you!</h1>
      </div>
    </div>
  );
};

export default HomePage;
