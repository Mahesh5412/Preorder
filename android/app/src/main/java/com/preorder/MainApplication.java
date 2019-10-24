package com.cadracpreorder;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.razorpay.rn.RazorpayPackage;
import net.zubricky.AndroidKeyboardAdjust.AndroidKeyboardAdjustPackage;
import com.showlocationservicesdialogbox.LocationServicesDialogBoxPackage;
import com.heanoria.library.reactnative.locationenabler.RNAndroidLocationEnablerPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.imagepicker.ImagePickerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNDeviceInfo(),
            new AndroidKeyboardAdjustPackage(),
            new LocationServicesDialogBoxPackage(),
            new RNAndroidLocationEnablerPackage(),
            new RNFetchBlobPackage(),
            new VectorIconsPackage(),
            new SnackbarPackage(),
            new ImagePickerPackage(),
            new RNGestureHandlerPackage(),
            new RNGeocoderPackage(),
            new NetInfoPackage(),
            new AsyncStoragePackage(),
               new RNFirebasePackage(),
             new RNFirebaseMessagingPackage(),
                new RNFirebaseNotificationsPackage(),
                new RazorpayPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
