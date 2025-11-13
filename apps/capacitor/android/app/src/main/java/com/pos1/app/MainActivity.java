package com.pos1.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    //Overrided the onCreate function to allow http url access just for temporally, it's not a good solution
    //Fo better solution we can enable ssl on couchdb database server url

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Allow mixed content (HTTP in HTTPS WebView)
        WebView webView = (WebView) this.bridge.getWebView();
        WebSettings settings = webView.getSettings();
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
    }
}
