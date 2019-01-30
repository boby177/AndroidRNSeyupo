package com.projectseyupo.MyLocation;

import android.content.Context;
import android.location.Location;
import android.location.LocationManager;

public class FallbackLocationTracker implements LocationTracker, LocationTracker.LocationUpdateListener {
    private boolean isRunning;

    private LocationTrack gps;
    private LocationTrack net;

    private LocationUpdateListener listener;

    Location lastLoc;
    long lastTime;

    public FallbackLocationTracker(Context context) {
        gps = new LocationTrack(context, LocationTrack.ProviderType.GPS);
        net = new LocationTrack(context, LocationTrack.ProviderType.NETWORK);
    }


    @Override
    public void onUpdate(Location oldLoc, long oldTime, Location newLoc, long newTime) {
        boolean update = false;
        //We should update only if there is no last location, the provider is the same, or the provider is more accurate, or the old location is stale
        if (lastLoc == null) {
            update = true;
        } else if (lastLoc != null && lastLoc.getProvider().equals(newLoc.getProvider())) {
            update = true;
        } else if (newLoc.getProvider().equals(LocationManager.GPS_PROVIDER)) {
            update = true;
        } else if (newTime - lastTime > 5 * 60 * 1000) {
            update = true;
        }

        if (update) {
            if (listener != null) {
                listener.onUpdate(lastLoc, lastTime, newLoc, newTime);
            }
            lastLoc = newLoc;
            lastTime = newTime;
        }
    }

    @Override
    public void start() {
        if (isRunning) {
            return;
        }

        gps.start(this);
        net.start(this);
        isRunning = true;
    }

    @Override
    public void start(LocationUpdateListener update) {
        start();
        listener = update;
    }

    @Override
    public void stop() {
        if (isRunning) {
            gps.stop();
            net.stop();
            isRunning = false;
            listener = null;
        }
    }

    @Override
    public boolean hasLocation() {
        return gps.hasLocation() || net.hasLocation();
    }

    @Override
    public boolean hasPossiblyStateLocation() {
        return gps.hasPossiblyStateLocation() || net.hasPossiblyStateLocation();
    }

    @Override
    public Location getLocation() {
        Location loc = gps.getLocation();
        if (loc == null) {
            loc = net.getLocation();
        }
        return loc;
    }

    @Override
    public Location getPossiblyStateLocation() {
        Location loc = gps.getPossiblyStateLocation();
        if (loc == null) {
            loc = net.getPossiblyStateLocation();
        }
        return loc;
    }
}
