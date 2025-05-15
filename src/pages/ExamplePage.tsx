const ExamplePage = () => {
  return (
    <div className="min-h-screen bg-white px-4 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">StepUp</h1>
        <div className="flex gap-4 items-center">
          <span className="h-3 w-3 bg-green-500 rounded-full"></span>
          <button>🔔</button>
          <button>⚙️</button>
        </div>
      </div>

      {/* Today's Progress */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">Today's Progress</h2>
        <div className="w-full bg-gray-200 h-2 rounded-full mb-3">
          <div className="bg-black h-2 rounded-full w-[70%]"></div>
        </div>
        <div className="flex justify-between text-center">
          <div>
            <p className="font-bold text-xl">7,245</p>
            <p className="text-xs text-gray-500">Steps</p>
          </div>
          <div>
            <p className="font-bold text-xl">3.2</p>
            <p className="text-xs text-gray-500">km</p>
          </div>
          <div>
            <p className="font-bold text-xl">320</p>
            <p className="text-xs text-gray-500">kcal</p>
          </div>
        </div>
      </div>

      {/* Goal Statistics */}
      <div className="grid grid-cols-3 gap-4 text-center mb-6">
        <div>
          <p className="text-green-600 font-bold text-xl">75%</p>
          <p className="text-xs text-gray-600">Completion Rate</p>
        </div>
        <div>
          <p className="text-purple-600 font-bold text-xl">4</p>
          <p className="text-xs text-gray-600">Day Streak</p>
        </div>
        <div>
          <p className="text-indigo-600 font-bold text-xl">12</p>
          <p className="text-xs text-gray-600">Goals Met</p>
        </div>
      </div>

      {/* Your Goals */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Your Goals</h2>
        {[
          { label: "Daily Steps", target: "10,000 steps", color: "green" },
          { label: "Weekly Workouts", target: "4 workouts", color: "blue" },
          {
            label: "Active Minutes",
            target: "60 minutes daily",
            color: "purple",
          },
        ].map((goal, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-xl mb-3"
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-6 w-6 rounded-full bg-${goal.color}-300`}
              ></div>
              <div>
                <p className="font-medium">{goal.label}</p>
                <p className="text-xs text-gray-500">{goal.target}</p>
              </div>
            </div>
            <button className="text-sm text-gray-700 hover:underline">
              Stats
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t p-2 flex justify-around">
        <button className="flex flex-col items-center text-green-600">
          <span>🏠</span>
          <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center">
          <span>🎯</span>
          <span className="text-xs">Goals</span>
        </button>
        <button className="flex flex-col items-center">
          <span>📊</span>
          <span className="text-xs">Stats</span>
        </button>
      </div>
    </div>
  );
};

export default ExamplePage;
