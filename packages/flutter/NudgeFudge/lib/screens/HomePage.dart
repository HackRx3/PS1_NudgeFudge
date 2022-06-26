import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  //This is the hosted URL
  // _url = 'https://resplendent-sopapillas-d20071.netlify.app/';
  //This is the URL we'll use for demo -
  String _url = 'http://192.168.188.84:3000';

  WebViewController? _webViewController;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        floatingActionButton: FloatingActionButton(
          backgroundColor: Colors.white10,
          onPressed: () {
            setState(() {
              _url = 'http://192.168.188.84:3000';
              _webViewController!.loadUrl(_url);
              print("Loaded URL: $_url");
            });
          },
          child: const Icon(
            Icons.refresh,
            size: 30,
          ),
        ),
        body: WebView(
          zoomEnabled: true,
          initialUrl: _url,
          javascriptMode: JavascriptMode.unrestricted,
          onWebViewCreated: (WebViewController webviewController) {
            _webViewController = webviewController;
          },
          onProgress: (int progress) {
            print('WebView is loading (progress : $progress%)');
          },
          onPageStarted: (String url) {
            print('Page started loading: $url');
          },
          onPageFinished: (String url) {
            print('Page finished loading: $url');
          },
        ));
  }
}
