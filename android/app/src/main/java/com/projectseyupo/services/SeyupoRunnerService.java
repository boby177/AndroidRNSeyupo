package com.projectseyupo.services;

import android.app.ActivityManager;
import android.app.IntentService;
import android.content.Context;
import android.content.Intent;

import android.os.Handler;
import android.os.Looper;
import android.support.annotation.Nullable;

import com.facebook.react.HeadlessJsTaskService;
import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;
import com.projectseyupo.MyLocation.FallbackLocationTracker;

import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;
import java.util.List;

public class SeyupoRunnerService extends IntentService {
    boolean status = false;
    Socket mSocket;
    int sleep = 10;
    int ctr = 0;
    JSONObject object = new JSONObject();
    JSONObject location = new JSONObject();
    String userId, uniqueId, latitude, longitude;
    {
        try {
            mSocket = IO.socket("https://seyupo-api.openode.io/");

        } catch (URISyntaxException e) { e.printStackTrace(); }
    }

    // Default Constructor
    public SeyupoRunnerService() {
        super("SeyupoRunnerService");

    }

    @Override
    public void onCreate() {
        super.onCreate();
        mSocket = mSocket.connect();
    }

    @Override
    public void onStart(@Nullable Intent intent, int startId) {
        super.onStart(intent, startId);
        if(!isMyServiceRunning(RunJavaScriptService.class)) {
            startService(new Intent(this, RunJavaScriptService.class));
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        ctr = 10;
    }

    @Override
    protected void onHandleIntent(@Nullable Intent intent) {
        userId = intent.getStringExtra("userId");
        uniqueId = intent.getStringExtra("uniqueId");
        try {
            object = object.put("userId", userId);
            object = object.put("uniqueId", uniqueId);
            mSocket.emit("conn-device", object);

        } catch (JSONException e) {
            e.printStackTrace();
        }
        mSocket.on("conn-device-"+userId+"-lock", onConnDevice);
        mSocket.on("track-device-"+userId+"-now", onTrackDevice);
    }

    private Emitter.Listener onConnDevice = new Emitter.Listener() {
        @Override
        public void call(Object... args) {
            JSONObject data = (JSONObject) args[0];
            JSONObject obj = new JSONObject();

            try {
                status = data.getBoolean("status");
                if(status) {
                    sendBroadcast(new Intent("com.projectseyupo.JsStartService.LockDev"));
                    obj = obj.put("userId", userId);
                    obj.put("lock", status);
                   mSocket.emit("conn-device-status", obj);
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    };

    private Emitter.Listener onTrackDevice = new Emitter.Listener() {
        @Override
        public void call(final Object... args) {
            JSONObject data = (JSONObject) args[0];
            try {
                data = data.put("status", true);
                mSocket.emit("conn-device-status", data);
            } catch (JSONException e) {
                e.printStackTrace();
            }

            while (ctr < sleep) {
                getLocation();
                try {
                    Thread.sleep(100 * 200);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    };


    public void getLocation() {
        Intent i = new Intent(getApplicationContext(), RunGeolocationService.class);
        startService(i);
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

    private boolean isMyServiceRunning(Class<?> serviceClass) {
        ActivityManager manager = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
            if (serviceClass.getName().equals(service.service.getClassName())) {
                return true;
            }
        }
        return false;
    }
}
