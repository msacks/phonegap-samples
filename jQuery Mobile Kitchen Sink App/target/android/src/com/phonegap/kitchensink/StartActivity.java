
    package com.phonegap.kitchensink;

    import android.content.Intent;
    import android.net.Uri;
    import android.os.Bundle;
    import com.phonegap.*;

    public class StartActivity extends DroidGap
    {
        @Override
        public void onCreate(Bundle savedInstanceState)
        {
            super.onCreate(savedInstanceState);
            super.loadUrl("file:///android_asset/www/index.html");
            this.appView.addJavascriptInterface(this, "android");
        }
        
        @Override
        public boolean onSearchRequested() {
            return false;  // don't do default behavior
        }
        
        public void loadExternalUrl(String url) {
        	Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        	startActivity(i);
        }
        
    }
    
