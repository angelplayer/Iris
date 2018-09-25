$(document).ready(function () {
    var myCommands = elFinder.prototype._options.commands;
    var disabled = ['callback', 'chmod', 'editor', 'netmount', 'ping', 'search', 'zipdl', 'help']; // Not yet implemented commands in elFinder.NetCore
    elFinder.prototype.i18.en.messages.TextArea = "Edit";

    $.each(disabled, function (i, cmd) {
      (idx = $.inArray(cmd, myCommands)) !== -1 && myCommands.splice(idx, 1);
    });

    var options = {
      url: 'http://localhost:5000/el-finder/file-system/connector', // Default (Local File System)
      rememberLastDir: false, // Prevent elFinder saving in the Browser LocalStorage the last visited directory
      commands: myCommands,
      //lang: 'pt_BR', // elFinder supports UI and messages localization. Check the folder Content\elfinder\js\i18n for all available languages. Be sure to include the corresponding .js file(s) in the JavaScript bundle.
      uiOptions: { // UI buttons available to the user
        toolbar: [
          ['back', 'forward'],
          ['reload'],
          ['home', 'up'],
          ['mkdir', 'mkfile', 'upload'],
          ['open', 'download'],
          ['undo', 'redo'],
          ['info'],
          ['quicklook'],
          ['copy', 'cut', 'paste'],
          ['rm'],
          ['duplicate', 'rename', 'edit'],
          ['selectall', 'selectnone', 'selectinvert'],
          ['view', 'sort']
        ]
      }

      //lang: 'vi', // Change language
    };
    $('#elfinder').elfinder(options).elfinder('instance');
  });