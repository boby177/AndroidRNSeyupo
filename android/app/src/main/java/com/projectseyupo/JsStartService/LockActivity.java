package com.projectseyupo.JsStartService;


import android.content.Intent;
import android.os.Bundle;
import android.provider.Settings;
import android.view.WindowManager;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.projectseyupo.MainApplication;
import com.projectseyupo.services.RunnerService;
import com.projectseyupo.services.ServiceLock;

public class LockActivity extends ReactActivity implements DefaultHardwareBackBtnHandler {
    private ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mReactRootView = new ReactRootView(this);

        mReactInstanceManager = ((MainApplication) getApplication())
                .getReactNativeHost()
                .getReactInstanceManager();
        // The string here (e.g. "MyReactNativeApp") has to match
        // the string in AppRegistry.registerComponent() in index.js
        mReactRootView.startReactApplication(mReactInstanceManager, "ActivityLockDevice", null);
        setContentView(mReactRootView);
        stopService(new Intent(this, ServiceLock.class));
    }
}
