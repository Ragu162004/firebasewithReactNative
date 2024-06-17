import NetInfo from '@react-native-community/netinfo'

export const checkconnection = () => {
        return NetInfo.fetch().then(state=>{
           return state.isConnected;
        });
    }