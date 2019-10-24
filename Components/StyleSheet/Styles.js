import { StyleSheet, Platform, PixelRatio,Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Aboutus = StyleSheet.create({

    container: {
        flex: 1,
    },
    subcontainer: {
      //  flex: 2,
        flexDirection: 'row',
         paddingTop: 10,
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center',
    },
    text: {
        fontSize: 20,
        paddingLeft: 30,
    },
    textstyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 230,
        marginTop:140
    },
    title: {
        padding: 4,
        color: 'white',
        fontSize: 22
    },
    back: {
        fontSize: 45,
        color: '#ed7070',
        fontFamily: 'serif',
        marginTop: hp('0%'),
        marginBottom:hp('2%')
    },
    content: {
        flex: 1,
        backgroundColor: "#ED7070",
        width: 150,
        height: 50,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 150
    }
})

const Contactus = StyleSheet.create({
    container: {
        flex: 1,
    },
    cont:{padding:4,color:'white',fontSize:22},
    subcontainer: {
        //flex: 2,
        flexDirection: 'row',
       paddingTop: 10,
        alignContent:'center',
        alignItems:'center',

    },
    Color: { color: 'white' },
    button: {
        paddingTop: 24,
        paddingBottom: 24,
    },
    back: {
        fontSize: 45,
        color: '#ed7070',
        fontFamily: 'serif',
        marginTop: hp('0%'),
        marginBottom:hp('2%')
    },
    content: {
        flex: 1,
        backgroundColor: "#ED7070",
        width: 150,
        height: 50,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 150
    },
    content1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 240,
        marginTop:140
    },
    content2: {
        fontSize: 18,
        paddingLeft: 30,
    },

});
const Howtouse1 = StyleSheet.create({
    container: {
        backgroundColor: '#ed7070'
    },
    container1: {
        justifyContent: 'center'
    },
    container2: {
        color: '#fff',
        paddingLeft: 10
    },
    container3: {
        flexDirection: 'row',
    },
    back: {
        fontSize: 45,
        color: 'white',
        fontFamily: 'serif',
        marginTop: hp('0%'),
    },
    how: {
        flex: 1,
        fontSize: 25,
        color: 'white',
        justifyContent: 'center',
        marginTop: hp('2.5%'),
        textAlign: 'center',
    }

})






const HotelStyle = StyleSheet.create({

    MainContainer: {
      flex: 1,
      margin: 10,
    },
  
    item: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
     // fontSize: 18,
     // alignItems: 'stretch',
      textAlign: 'center',
      backgroundColor: 'white',
      marginBottom: 5,
      borderRadius: 40,
      shadowOpacity: 9,
      elevation: 7,
      margin: 8,
      height: hp('8%'),
      width: wp('27%'),
      alignSelf:'center'
    },
  
    item1:
    {
      flex: 1,
      justifyContent: 'center',
       paddingTop: 10,
      alignItems: 'center',
          alignSelf:'center'
  
    },
    H1:{ flex: 1, alignItems: 'center', justifyContent: 'center' },
    H2:{fontSize:45,color:'white',fontFamily: 'serif',marginTop:hp('-3%'),},
    H3:{ width: 150, marginLeft: 30, marginTop: -10,height: 150, borderWidth: 5, borderColor: 'white', borderRadius: 400 / 2 },
    H4:{ marginTop: 60 },
    H5:{ width: '100%', height: '100%' },
     
       signUpText: {
     // fontSize:20,
     // fontWeight: 'bold',
     // color: '#FFF',
     alignItems: 'center',
     justifyContent: 'center',
     textAlign: 'center',
  
    },
      
  })





const YourridesStyles = StyleSheet.create({
    container: {

        paddingTop: 20,

        paddingLeft: hp('2%'),
    },
    buttonContainer: {
        width: wp('90%'),
        alignSelf: 'baseline',
        marginBottom: 10,
        color: '#d2691e',

        borderWidth: 0.4,
        borderRadius: 15,
        marginLeft: 4,
        shadowOffset: { width: 50, height: 50 },
        shadowColor: 'black',
        shadowOpacity: 9,
        elevation: 7,

    },
    signupButton: {
        shadowOpacity: 13,
        backgroundColor: '#ffffff',

        shadowColor: '#141615',

    },
    subcontainer: {

        flexDirection: 'row',
        paddingTop: 40
    },
    signUpText0: {
        fontSize: 15,
        paddingTop: 20,

        color: '#ed7070',
        paddingLeft: 23,
    },
    signUpText1: {
        fontSize: 15,
        paddingTop: 20,

        paddingLeft: 23,
    },
    

    end: {

        alignItems: 'flex-end',

    },
    end1: {
        paddingTop: 20,
        justifyContent: 'space-between',

        flexDirection: 'row',
    },
    s: {
        justifyContent: 'center',

        backgroundColor: '#ed7070',
        shadowOffset: { width: 50, height: 50 },
        alignItems: 'center',
        width: wp('40%'),
        height: hp('10%'),
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,

    },
    signUpText2: {
        fontSize: 15,
        paddingRight: 10,
        paddingTop: 20,
        paddingLeft: 23,
        color: 'green',


        justifyContent: 'center',

    },
    signUpText3: {

        paddingBottom: 20,
        paddingLeft: 23,
        fontSize: 13,

        paddingRight: 13,

        alignItems: 'center',
    },
    signUpText4: {
        paddingBottom: 20,
        paddingLeft: 20,

        color: '#ed7070',
        alignItems: 'center',
    },
    signup: {

        color: "#FFF",
    },
    boxone: {

        marginTop: 5,

    },
    boxtwo: {
        flex: 1,

    },
    boxthree: {
        flex: 1,

    },
    box: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'relative',
        marginBottom: 10,

    },
    signUpText: {
        fontSize: 20,
        justifyContent: 'center',


        color: 'white',
        alignSelf: 'center',
    }, flat:
    {

        width: "100%",
        backgroundColor: "#000",
    },
    imageurl:
    {
        width: '100%',
        height: 200
    },
    load:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    back:
    {
        fontSize: 45,
        color: '#ed7070',
        marginTop: hp('0%')
    },
    scroll: {
        height: hp('80%')
    }
})


const ValidStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#ED7070',

    },
    container1: {
        paddingTop: 200,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',


    },
    imagestyles:
    {
        width: wp('100%'),
        height: hp('100%')
    },


})
const MobileSyles = StyleSheet.create({

    container: {
        flex: 1,
    },
    container1: {
        paddingTop: 200,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
    }, buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        backgroundColor: "#ed7070",
        width: 150,
        borderRadius: 30,
    },
    signupButton: {
        backgroundColor: "white",
    },
    signinText: {
        color: 'white',
        fontSize: 18,
    },
    text:
    {
        fontSize: 20,
        paddingLeft: 40,
        paddingRight: 40,
        color: 'black',
        fontFamily: 'bold',
        borderWidth: 3,
        borderColor: '#FFF',
        borderRadius: 5,
        shadowColor: '#d6d7da',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        elevation: 2,
        backgroundColor: 'white',
    },
    imagestyles:
    {
        width: wp('100%'),
        height: hp('100%')
    }


})

const SplashStyles = StyleSheet.create({
    text: {

        textAlign: 'center',
        fontSize: 20,
        color: 'black',
        fontFamily: 'bold',

    },
    imagestyles:
    {
        width: '100%',
        height: '94%'
    }
})

const ItemviewStyles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        margin: 10,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    },

    FlatList: {
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#FFF',
        borderRadius: 20,
        shadowColor: '#d6d7da',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        marginBottom: 10,
        elevation: 2,
        position: 'relative',
        backgroundColor: 'white',
    },

    FlatListItemStyle: {
        justifyContent: 'center',
        fontWeight: 'bold',
        color: 'black',
        alignItems: 'center',
    },

    ListItemStyle: {
        justifyContent: 'center',

    },

    ItemStyle: {
        justifyContent: 'center',
        color: '#FFF',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: "#ed7070",
        width: wp('40%'),
        height: hp('5%'),
        borderRadius: 5,
    },
    cont: {
        width: wp('20%'),
        height: hp('10%'),
        borderColor: '#d6d7da',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    textview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    amountview: {
        justifyContent: 'center',
        fontSize: 15,
        color: 'green',
        alignItems: 'center',
    },

    cartview: {
        flex: 5,
        padding: 10,
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#FFF',
        borderRadius: 20,
        shadowColor: '#d6d7da',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        margin: 10,
        elevation: 2,
        position: 'relative',
        backgroundColor: 'white',
    },
    addToCart: {
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    addToCartText: {
        color: 'white',
        fontWeight: 'bold',
        justifyContent: 'space-around',
        alignItems: 'center',

    },
    stylesuri:
    {
        width: 150,
        marginTop: 5,
        marginLeft: 30,
        height: 150,
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 400 / 2
    },

    back:
    {
        fontSize: 50,
        color: 'white',
        fontFamily: 'serif',
        marginTop: hp('-3%'),
    },
    imagestyles:
    {
        width: '100%',
        height: '100%'
    }
})

const UpdateprofileStyles = StyleSheet.create({
    container: {
        alignItems: 'center',

    },
    avatarContainer: {
        borderColor: 'black',
        borderWidth: 30 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',

    },
    edit1: {
        "width": "95%",
        height: hp('6%'),
        paddingLeft: 10,
        borderWidth: 0.7,
        marginLeft: 5,


    },
    editse: {
        "width": "95%",
        height: hp('10%'),
        paddingLeft: 10,
        borderWidth: 0.7,
        marginLeft: 5,

    },
    avatar: {
        width: 120,
        borderColor: 'white',
        borderWidth: 10,
        height: 120,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 5
    },
    text: {
        color: 'white',
        fontSize: 20,

    },
    subcontainer: {
        flex: 2,
        flexDirection: 'row',
        paddingTop: 40
    },
pro:{fontSize:45,color:'#ed7070',marginTop:hp('-2%'),},
pro2:{color:'#ed7070',alignSelf:'flex-end'},
pro3:{color:'black',marginRight:wp('75%'),},
pro4:{color:'black',marginRight:wp('84%'),},
    container1: {
        flex: 1,
        backgroundColor: '#F79D17',
        justifyContent: 'space-between',
    },
    content: {
        justifyContent: 'space-around',
        flexDirection: 'row',

    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '900',
        fontSize: 30,

    },
    signinText: {
        color: 'white',
    },
    Text: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 22,
    },
    Textinput: {
        borderBottomWidth: 2,
        borderBottomColor: '#FFFFFF',

        height: 35,
        color: 'white',
    },
    signinText: {
        color: 'white',
    },


    buttonContainer: {

        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
        backgroundColor: "#ed7070",
        width: 250,
        borderRadius: 30,
    },
    signupButton: {
        backgroundColor: "white",
    },
    signUpText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00A2C1',
    },
    bottomview: {
        alignSelf: 'center',
    },
    ccc: {
        backgroundColor: '#F79D17',
    },
    editIcon: {
        paddingLeft: 120,

    },
    imagestyles: {
        flexDirection: 'row'
    },
    namestyles:
        { flexDirection: 'row' },
    textusername:
    {
        color: 'black',
        marginRight: wp('75%')
    },
    edittext:
    {
        color: '#ed7070',
        alignSelf: 'flex-end'
    },
    back:
    {
        fontSize: 45,
        color: '#ed7070',
        marginTop: hp('-2%')
    },
    emailtext:
    { color: 'black', marginRight: wp('84%')},
    // content:
    // [
    //     styles.avatar,
    //     styles.avatarContainer,
    //     { borderWidth: 0.7 },
    //   ]
})

const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contain: {

        marginLeft: 20,
        flexDirection: 'row',

        height: hp('83%'),
       

    },
    contain1: {


        flexDirection: 'row',
        marginTop: 280,
        justifyContent: 'center',
    },

    textheder: {

        flexDirection: 'row'
    },

    logotextheder: {

        color: 'orange',
        justifyContent: 'center',
        padding: 15,
        fontWeight: 'bold',
        paddingLeft: 60,
        fontSize: 40,


    },
home1:{

    padding: 10,
    marginTop: 2,
    backgroundColor: '#FAF9F8',
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 10,

  },
  home2:{
    color: 'black',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#FAF7F6',
    justifyContent: 'center',
    width: wp('85%'),
    borderRadius: 10,

  },
home3:{ padding: 5, color: 'black', },

    ner: {   
    },
    ImageStyle: {
        height: 25,
        width: 25,
    },
    ImageStyle1: {
        height: 25,
        width: 25,

    },
    ImageStyle2: {
        height: 52,
        width: 45,
        marginTop: 6,
        marginLeft: 4,
        borderRadius: 10,
    },
    texthome:
    { color: '#fff', 
    fontWeight: '600', 
    textAlign: 'center' },
    iconstyles:
    { color: '#fff' },
    headerstyles:
    {
        backgroundColor: '#ed7070',
        // height: 60,
        height: hp('10%'),
        width: Dimensions.get('window').width,
        borderBottomColor: '#ed7070',
        justifyContent: 'space-between',

      },
      imagestyles:
      { width: '100%', 
      height: '100%' }
})

const CartStyle = StyleSheet.create({

    MainContainer: {
      justifyContent: 'space-between',
      flex: 1,
      //margin: 10,
      //padding: 10,
      paddingTop: (Platform.OS === 'ios') ? 20 : 0,
      //backgroundColor: "#FFF",
    },
    
    FlatList: {
    
      borderWidth: 3,
      borderColor: '#FFF',
      borderRadius: 5,
      shadowColor: '#d6d7da',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 1,
      elevation: 2,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 20,
      marginBottom: 10,
      backgroundColor:'white',
    
    },
    grand: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingRight: '20%',
      paddingLeft: '20%',
    
    
    },
    
    FlatListItemStyle: {
      justifyContent: 'space-around',
    
    },
    
    textview: {
      flexDirection: 'row',
    },
    
    hotel: {
      flex: 1,
    },
    
    // cont: {
    // justifyContent: 'space-between',
    
    //   },
    
    
    con: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    Textinput: {
      alignItems: 'center',
      justifyContent: 'space-around',
      borderWidth: 2,
      borderBottomColor: 'black',
      borderRadius: 30,
      height: hp('6%'),
      width: wp('18%'),
      backgroundColor:'white',
      //color:'white',
    },
    text: {
      fontSize: 22,
      color: '#ed7070',
    },
    
    textj: {
      color: '#2b3c51',
      justifyContent: 'space-around',
    },
    
    itemcontainer1: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      // borderBottomColor: 'grey',
      //borderBottomWidth: 1,  
    },
    
    
    button: {
     // alignItems: 'center',
      alignSelf:'center',
      textAlign:'center',
      justifyContent: 'center',
      backgroundColor: '#ed7070',
      height: hp('6%'),
      borderRadius: 5,
      width: wp('30%'),
    
    },
    item: {
      color: '#2b3c51',
      fontSize: 17,
    
    },
    itemtotal: {
      justifyContent: 'space-around',
      color: '#2b3c51',
      fontSize: 17,
    
    },
    hoteltext: {
      alignItems: 'center',
      justifyContent: 'center',
      color: '#2b3c51',
      fontSize: 25,
    
    },
    price: {
      color: '#2b3c51',
      fontSize: 25,
      marginLeft: 120
    },
    total: {
      alignItems: 'center',
      color: 'skyblue',
      fontSize: 15,
      marginLeft: 120
    },
    
    input: {
      alignSelf: 'center',
     // alignItems: 'center',
    paddingBottom:5,
      height: 25,
      justifyContent: 'center',
     // alignItems: 'center',
      width: 25,
      borderRadius: 50,
      backgroundColor: "#2b3c51",
    
    },
    
    // text:{
    //   fontSize:18,
    //   color:'white',
    //   textAlign:'center'
    // },
    
    buttontime: {
      alignSelf: 'baseline',
      width: wp('40%'),
      height: hp('4%'),
      backgroundColor: '#ed7070',
      borderRadius: 30,
      justifyContent: 'center',
      marginTop: '3%'
    },
    cart1:{ flex: 3, flexDirection: 'row', justifyContent: 'space-between', },
    cart2:{ flex: 2, justifyContent: 'space-around', },
    cart3:{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-around', },
    cart4:{ color: 'white',textAlign:'center', fontSize: 25 },
    cart5:{ color: 'white',textAlign:'center', fontSize: 25 },
    cart6:{ flex: 0.3, },
    cart7:{ fontSize: 20, color: 'red' },
    cart8:{ flex: 1, alignItems: 'center', justifyContent: 'center' },
    cart9:{ flex: 3, },
    cart10:{ flex: 1, justifyContent: 'space-around', },
    cart11:{
        flexDirection: 'row', borderWidth: 3,
       borderColor: '#FFF',
       borderRadius: 5,
       shadowColor: '#d6d7da',
       shadowOffset: { width: 0, height: 10 },
       shadowOpacity: 1,
       elevation: 2,
        marginRight: '3%',
       marginLeft: '3%',
       marginBottom: '5%',
     //  flexWrap: 'wrap',
      alignSelf: 'baseline',
      // alignSelf:'center',
       backgroundColor:'white',
     },
     cart12:{ flex: 1, justifyContent: 'space-between', alignItems: 'center' },
     cart13:{ alignItems: 'center', textAlign: 'center', justifyContent: 'center', },
     cart14:{ color: 'white', textAlign: 'center' ,justifyContent: 'center', },
     cart15:{ flex: 1, justifyContent: 'space-between', alignItems: 'center' },
     cart16:{ width: wp('25%'), marginTop: '10%' },
     cart17:{ flex: 0.5, flexDirection: 'row', justifyContent: 'space-around', },
     cart18:{ color: 'white', fontWeight:'900', alignItems: 'center',  justifyContent: 'center', textAlign:'center',},

    })


const Drawer = StyleSheet.create({

    MainContainer: {
  
      // Setting up View inside content in Vertically center.
      justifyContent: 'center',
      flex: 1,
      paddingBottom: 60,
      //margin: 5,
    },
    imageViewContainer: {
      width: wp('40%'),
      height: hp('20%'),
      margin: 10,
      borderRadius: 400 / 2,
    },
    textViewContainer: {
      color: 'black',
      //  fontWeight:'bold',
      fontSize: 15,
      padding: 10
    },
    screenStyle: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'grey',
  
      padding: 10,
      height: hp('7%'),
      marginLeft: 15,
      marginRight: 15,
      borderRadius: 30,
      shadowOpacity: 10,
      shadowColor: '#000000',
      shadowOffset: { width: 90, height: 90 },
    },
    edit: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
    },
    screenStyle1: {
      height: 30,
      marginTop: 10,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
  
    textView: {

      paddingLeft: 20,
      color: 'black',
     
  
    },
    draw:{

        height: 2,
        width: "100%",
        backgroundColor: "#000",
      },
      draw1:{ flex: 1, alignContent: 'center', justifyContent: 'center' },
      draw2:{ flex: 1, flexDirection: 'column' },
      draw3:{ justifyContent: 'center', alignItems: 'center' },
      draw4:{
        flexDirection: 'row', justifyContent: 'space-between',
      },
      draw5:{ color: 'black', paddingLeft: 20 },
      draw6:{ color: '#ed7070', paddingTop: -10, fontSize: 20 },
  })


  const Nav = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    home: {
      paddingLeft: 20,
    }
  })



const Item1 = StyleSheet.create({

    MainContainer :{
    justifyContent: 'center',
    flex:1,
    margin: 10,
    // padding: 10,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
              backgroundColor: "#FFF",
         justifyContent: 'space-between',
    
    },
    
    FlatList: {
    paddingTop: 10,
     justifyContent: 'center',
    borderWidth: 3,
        borderColor: '#FFF',
        borderRadius:20,
        shadowColor: '#d6d7da',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1, color:'black',
        marginBottom: 10,
        elevation: 2,
        position: 'relative',
        backgroundColor:'white',
      },
    
    FlatListItemStyle: {
    justifyContent: 'center',
       // padding: 5,
       // fontSize: 24,
       color:'black',
        alignItems: 'center',
    
      },
        
    ListItemStyle: {
    justifyContent: 'center',
      //  padding: 5,
        fontSize: 18,
        color:'green',
      alignItems: 'center',
      },
        
    ItemStyle: {
    justifyContent: 'center',
     fontSize: 18,
     color:'#FFF',
    alignItems: 'center',
    backgroundColor: "#ed7070",
         width: 60,
        height: 30,
        borderRadius: 20,
      },
    cont: {
        width: 40,
        height: 50,
           borderColor: '#d6d7da',
    
        borderRadius: 20,
      },
    textview: {
    flexDirection: 'row',
        justifyContent: 'space-between',
    
      },
    
    amountview: {
    alignItems: 'flex-end',
      },
      item11:{
       
        width: "100%",
  
      },
      item12:{ flex: 1, alignItems: 'center', justifyContent: 'center' },
      item13:{ width: '100%', height :'100%'},
      item14:{flex:1,flexDirection: 'row', justifyContent: 'space-between',

    },
    item15:{fontSize:45,color:'white',fontFamily: 'serif',marginTop:hp('-3%'),},
    item16:{width: 150, marginTop:35,marginLeft:hp('-20%'),height: 150, borderWidth:5,  borderColor:'white',borderRadius:400/2},
    item17:{flex:3,paddingTop:120,},
    item18:{ fontWeight:'bold',textAlign:'center',fontSize:20,},
    
    });
    
export { Aboutus, Contactus, Nav,Howtouse1,YourridesStyles,Drawer, Item1,CartStyle,HotelStyle,ValidStyles,MobileSyles,SplashStyles,ItemviewStyles,UpdateprofileStyles ,HomeStyles}