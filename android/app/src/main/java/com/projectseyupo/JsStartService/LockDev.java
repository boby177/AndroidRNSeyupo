package com.projectseyupo.JsStartService;

import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.projectseyupo.services.ServiceLock;
import com.projectseyupo.services.SeyupoRunnerService;

import java.util.List;


public class LockDev extends ReactContextBaseJavaModule {
    public LockDev(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "StartLockDev";
    }

    @ReactMethod
    public void toggle(boolean isLock) {
        if(isLock) {
            getReactApplicationContext().sendBroadcast(new Intent("com.projectseyupo.JsStartService.LockDev"));
        }
    }

    @ReactMethod
    public void setDataUser(String userId, String uniqueId) {
        if(!isAppOnForeground(getReactApplicationContext())) {
            Intent i = new Intent(getReactApplicationContext(), SeyupoRunnerService.class);
            i.putExtra("userId", userId);
            i.putExtra("uniqueId", uniqueId);
            getReactApplicationContext().startService(i);
        }
    }

    @ReactMethod
    public void UnLockDevice() {
        Intent i = new Intent(getReactApplicationContext(), ServiceLock.class);

        getReactApplicationContext().stopService(i);
    }

    private boolean isAppOnForeground(Context context) {
        /**
         We need to check if app is in foreground otherwise the app will crash.
         http://stackoverflow.com/questions/8489993/check-android-application-is-in-foreground-or-not
         **/
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningAppProcessInfo> appProcesses =
                activityManager.getRunningAppProcesses();
        if (appProcesses == null) {
            return false;
        }
        final String packageName = context.getPackageName();
        for (ActivityManager.RunningAppProcessInfo appProcess : appProcesses) {
            if (appProcess.importance ==
                    ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND &&
                    appProcess.processName.equals(packageName)) {
                return true;
            }
        }
        return false;
    }
}
