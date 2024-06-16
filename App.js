import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RouterStack from "./Navigation/Routerstack";
import { connectToDatabase } from "./firebase";
import SplashScreen from "./screens/SplashScreen";

const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      let connected = false;
      const startTime = new Date().getTime();
      const timeout = 20000;

      while (!connected && new Date().getTime() - startTime < timeout) {
        try {
          await connectToDatabase();
          connected = true;
          setLoading(false);
        } catch (err) {
          console.error("Failed to connect Firestore: ", err);
        }
      }

      if (!connected) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return loading ? <SplashScreen /> : error ? <ErrorScreen /> : <RouterStack />;
};

export default App;
