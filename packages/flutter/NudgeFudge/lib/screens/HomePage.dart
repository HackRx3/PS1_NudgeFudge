import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String localUrl = 'http://192.168.188.84:3000';
  String wikiUrl='https://www.wikipedia.org/';
  String _url= 'http://localhost:3000/dashboard';

  WebViewController? _webViewController;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(onPressed: (){
        setState(() {
          _url = (_url == localUrl)? wikiUrl:localUrl;
          _webViewController!.loadUrl(_url);
          print("Loaded URL: $_url");
        });
      }, child: Icon(Icons.refresh,size: 30,),),
        body: WebView(
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
