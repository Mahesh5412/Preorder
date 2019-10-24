import { StyleSheet, Platform, PixelRatio } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const RestList = StyleSheet.create({
    container: { flex: 1 },
    MainContainer: {
  
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      // paddingLeft:20,
      marginTop: (Platform.OS === 'ios') ? 20 : 20,
  
    },
  
    imageView: {
  
      width: 100,
      height: 75,
      marginLeft: 5,
      borderRadius: 25,
      justifyContent: 'space-around',
  
    },
  
    textView: {
  
      paddingLeft: 20,
      paddingTop: 14,
      color: 'black',
      alignSelf: 'baseline',
      textAlign: 'center',
  
  
    },
    textView1: {
      paddingLeft: 20,
      fontSize: 10,
  
    },
   res1: {
        flex: 1, flexDirection: 'row', borderRadius: 20, width: 320, height: 88, borderWidth: 0.2, backgroundColor: 'white',
        padding: 3, shadowColor: 'white', shadowOffset: { width: 0, height: 2 }, textAlign: 'center', marginBottom: 10,
        shadowOpacity: 9,

        shadowRadius: 2,
        elevation: 2,
      },
      res2:{ flex: 0.1, flexDirection: 'column', justifyContent: 'space-around', },
      res3:{ flex: 1, alignItems: 'center', justifyContent: 'center' },
res4:{
    backgroundColor: "#ED7070", justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: 220, height: 80, borderTopRightRadius: 10, borderBottomRightRadius: 10, marginTop: 40
  },
res5:{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', },
res6:{ fontSize: 45, color: 'white', paddingBottom: 13, },
res7:{ padding: 4, color: 'white', fontSize: 25 },




  
  })





  const ViewprofileStyles = StyleSheet.create({
    container: {

        // alignItems: 'center',
        justifyContent: 'center',


    },
    avatarContainer: {
        borderWidth: 30 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
    },


    avatar: {
        borderColor: 'white',
        borderWidth: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    imagestyles:
    {
        width: 300,
        height: 300
    },
    // subcontainer:
    //     [
    //         styles.avatar,
    //         styles.avatarContainer,
    //         { borderWidth: 0.7 },
    //     ]

})





export {RestList,ViewprofileStyles}