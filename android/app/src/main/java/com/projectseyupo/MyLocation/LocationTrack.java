package com.projectseyupo.MyLocation;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;


public class LocationTrack implements LocationListener, LocationTracker {
    // minimun distance to change update in meters
    private static final long MIN_UPDATE_DISTANCE = 0;
    private static final int REQUEST_LOCATION_PERMISSION = 1;
    // minimun time between updates in milliseconds
    private static final long MIN_UPDATE_TIME = 100 * 60;

    private LocationManager locationManager;

    public enum ProviderType {
        NETWORK,
        GPS
    }

    private String provider;

    private Location lastLocation;
    private long lastTime;

    private boolean isRunning;
    Context ctx;
    private LocationUpdateListener locationUpdateListener;

    public LocationTrack(Context context, ProviderType type) {
        ctx = context.getApplicationContext();
        locationManager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
        if (type == ProviderType.NETWORK) {
            provider = LocationManager.NETWORK_PROVIDER;
        } else {
            provider = LocationManager.GPS_PROVIDER;
        }
    }

    @Override
    public void onLocationChanged(Location newLoc) {
        long now = System.currentTimeMillis();
        if (locationUpdateListener != null) {
            locationUpdateListener.onUpdate(lastLocation, lastTime, newLoc, now);
        }
        lastLocation = newLoc;
        lastTime = now;
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {

    }

    @Override
    public void onProviderEnabled(String provider) {

    }

    @Override
    public void onProviderDisabled(String provider) {

    }


    @Override
    public void start() {
        if (isRunning) {
            return;
        }
        isRunning = true;
        if (ActivityCompat.checkSelfPermission(ctx, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(ctx, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        locationManager.requestLocationUpdates(provider, MIN_UPDATE_TIME, MIN_UPDATE_DISTANCE, this);
        lastLocation = null;
        lastTime = 0;
        return;
    }

    @Override
    public void start(LocationUpdateListener update) {
        start();
        locationUpdateListener = update;
    }

    @Override
    public void stop() {
        if (isRunning) {
            locationManager.removeUpdates(this);
            isRunning = false;
            locationUpdateListener = null;
        }
    }

    @Override
    public boolean hasLocation() {
        if (lastLocation == null) {
            return false;
        }

        return true;
    }


    @SuppressLint("MissingPermission")
    @Override
    public boolean hasPossiblyStateLocation() {

        if (lastLocation != null) {
            return true;
        }

        return locationManager.getLastKnownLocation(provider) != null;
    }

    @Override
    public Location getLocation() {
        if (lastLocation == null) {
            return null;
        }
//        if (System.currentTimeMillis() - lastTime > 5 * MIN_UPDATE_TIME) {
//            return null; //stale
//        }
        return lastLocation;
    }


    @SuppressLint("MissingPermission")
    @Override
    public Location getPossiblyStateLocation() {

        if (lastLocation != null) {
            return lastLocation;
        }

        return locationManager.getLastKnownLocation(provider);
    }
}
