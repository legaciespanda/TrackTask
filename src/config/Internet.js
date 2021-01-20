import NetInfo from '@react-native-community/netinfo';

export const TrackTaskConnected = ()=>{

    //checks for internet access and returns a promise
    return NetInfo.fetch().then(state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);

        return state.isConnected;
      });
}