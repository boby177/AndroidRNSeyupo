package com.projectseyupo.services;

import android.app.Service;
import android.content.Intent;
import android.graphics.PixelFormat;
import android.os.Build;
import android.os.IBinder;
import android.provider.Settings;
import android.support.annotation.Nullable;
import android.view.WindowManager;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.projectseyupo.MainApplication;

public class ServiceLock extends Service {
    ReactRootView view;
    ReactInstanceManager mReactInstanceManager;

    @Override
    public void onCreate() {
        super.onCreate();
        view = new ReactRootView(getApplicationContext());
        mReactInstanceManager = ((MainApplication) getApplication())
                .getReactNativeHost()
                .getReactInstanceManager();
        view.startReactApplication(mReactInstanceManager, "ActivityLockDevice", null);

        WindowManager.LayoutParams layoutParams = new WindowManager.LayoutParams();
        layoutParams.height = WindowManager.LayoutParams.MATCH_PARENT;
        layoutParams.width = WindowManager.LayoutParams.MATCH_PARENT;
        layoutParams.format = PixelFormat.RGBA_8888;
        layoutParams.flags = WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN | WindowManager.LayoutParams.FLAG_FULLSCREEN;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            layoutParams.type = WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY;
        } else {
            layoutParams.type = WindowManager.LayoutParams.TYPE_PHONE;
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            WindowManager wm = (WindowManager) getSystemService(WINDOW_SERVICE);
            if (Settings.canDrawOverlays(this)) {
                if(wm != null) {
                    try{
                        wm.addView(view, layoutParams);

                    }catch (Exception e){
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (view != null) {
            WindowManager wm = (WindowManager) getSystemService(WINDOW_SERVICE);
            wm.removeView(view);
            view = null;
            stopForeground(true);
        }

    }
}
