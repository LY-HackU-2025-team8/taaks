import 'package:flutter/material.dart';
import 'pages/diary.dart';
import 'pages/todo.dart';
import 'pages/dashboard.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'taak!',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});
  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _selectedIndex = 0;
  static const List<Widget> _widgetOptions = <Widget>[
    Dashboard(),
    Todo(),
    Diary(),
  ];


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _widgetOptions.elementAt(_selectedIndex),
      floatingActionButton: Row(
        // mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          ElevatedButton(
            onPressed: () {
              setState(() {
                _selectedIndex = 0;
              });
            },
            child: Text('Dashboard'),
          ),
          SizedBox(width: 10),
          ElevatedButton(
            onPressed: () {
              setState(() {
                _selectedIndex = 1;
              });
            },
            child: Text('TODO'),
          ),
          SizedBox(width: 10),
          ElevatedButton(
            onPressed: () {
              setState(() {
                _selectedIndex = 2;
              });
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.blue, // Change the background color
              foregroundColor: Colors.white, // Change the text color
            ),
            child: Text('Diary'),
          ),
        ],
      ),
    );
  }
}
