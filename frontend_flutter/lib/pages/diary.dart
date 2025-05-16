import 'package:flutter/material.dart';
import 'package:rive/rive.dart';

class Diary extends StatefulWidget {
  const Diary({super.key});
  @override
  State<Diary> createState() => _DiaryState();
}

class _DiaryState extends State<Diary> {
Artboard? _artboard;
  SMINumber? _faceParts;
  SMINumber? _headParts;
  SMINumber? _fukuParts;

  Future<void> _load() async {
    final file = await RiveFile.asset('assets/character.riv');
    final artboard = file.mainArtboard;
    final controller = StateMachineController.fromArtboard(
      artboard,
      'base State Machine ',
    );
    if (controller == null) {
      print("Failed to find controller");
      return;
    }
    artboard.addController(controller);
    setState(() {
      _artboard = artboard;
      _faceParts = controller.getNumberInput("FaceParts");
      _headParts = controller.getNumberInput("HeadParts");
      _fukuParts = controller.getNumberInput("FukuParts");
    });
  }

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Center(
            child: _artboard == null
                ? const SizedBox()
                : SizedBox(
                  height: 400,
                  width: 400,
                  child: Rive(
                      artboard: _artboard!,
                      fit: BoxFit.contain,
                  ),
                )
          ),
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              ElevatedButton(
                onPressed: () => {
                  _faceParts?.value = 1,
                  _headParts?.value = 2,
                  _fukuParts?.value = 3,
                },
                child: const Text('Type 1'),
              ),
              ElevatedButton(
                onPressed: () => {
                  _faceParts?.value = 2,
                  _headParts?.value = 3,
                  _fukuParts?.value = 4,
                },
                child: const Text('Type 2'),
              ),
              ElevatedButton(
                onPressed: () => {
                  _faceParts?.value = 4,
                  _headParts?.value = 1,
                  _fukuParts?.value = 2,
                },
                child: const Text('Type 3'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
