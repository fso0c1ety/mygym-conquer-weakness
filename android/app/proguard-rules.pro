# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Optimization flags
-optimizationpasses 5
-dontusemixedcaseclassnames
-dontskipnonpubliclibraryclasses
-dontpreverify
-verbose

# Keep Capacitor classes
-keep class com.getcapacitor.** { *; }
-keep class com.mygym.app.** { *; }

# Keep WebView JavaScript interfaces
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep attributes for stack traces
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile

# Remove logging
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** v(...);
    public static *** i(...);
}

# Optimize
-optimizations !code/simplification/arithmetic,!field/*,!class/merging/*
-allowaccessmodification
-repackageclasses ''

