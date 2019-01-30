package com.projectseyupo.receivers;

import android.app.ActivityManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.facebook.react.HeadlessJsTaskService;
import com.projectseyupo.MainActivity;
import com.projectseyupo.services.ServiceLock;

import java.util.List;

public class Locking extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if(intent.getAction().equals("com.projectseyupo.JsStartService.LockDev")) {
            if(!isAppOnForeground(context)) {
                Intent i = new Intent(context, ServiceLock.class);
                context.startService(i);
                HeadlessJsTaskService.acquireWakeLockNow(context);
            }
            else {
                Intent i = new Intent(context, MainActivity.class);
                i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                i.addFlags (Intent.FLAG_ACTIVITY_SINGLE_TOP);
                i.putExtra("close_activity",true);
                context.startActivity(i);

                Intent intents = new Intent(context, ServiceLock.class);
                context.startService(intents);
                HeadlessJsTaskService.acquireWakeLockNow(context);
            }

        }
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
