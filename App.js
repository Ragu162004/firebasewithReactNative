import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RouterStack from "./Navigation/Routerstack";
import { connectToDatabase } from "./firebase";
import SplashScreen from "./screens/SplashScreen"; 
import ErrorScreen from "./screens/ErrorScreen"
import { checkconnection } from "./internetconnection";
import { View,Text } from "react-native";

const Stack = createStackNavigator();

const App = () => {
const [internetstatus , setInternetstatus] = useState(false);
const [loading, setLoading] = useState(true);

const handleCheckConnection = async () => {
  const res = await checkconnection();
  setInternetstatus(res);
};

useEffect(() => {
  handleCheckConnection();
}, []);

// return (
// internetstatus ? <SplashScreen/>  : <ErrorScreen/> 
// )
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
        setLoading(false);
      }
    };

    fetchData();
    }, []);
    return loading ? <SplashScreen /> : internetstatus ? <RouterStack /> : <ErrorScreen onCheck={handleCheckConnection}/>;
};
export default App;