# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Keep Capacitor and WebView classes - CRITICAL for app to work
-keep class com.getcapacitor.** { *; }
-keep class com.mygym.app.** { *; }
-keep class org.apache.cordova.** { *; }
-keepclassmembers class * extends com.getcapacitor.Plugin {
    @com.getcapacitor.annotation.CapacitorPlugin <fields>;
    @com.getcapacitor.PluginMethod <methods>;
}

# Keep WebView JavaScript interfaces
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep AndroidX classes
-keep class androidx.** { *; }
-keep interface androidx.** { *; }

# Keep attributes for stack traces
-keepattributes SourceFile,LineNumberTable,*Annotation*,Signature,InnerClasses
-renamesourcefileattribute SourceFile

# Don't warn about missing classes
-dontwarn org.apache.cordova.**
-dontwarn com.getcapacitor.**


