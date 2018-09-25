angular.module("FileManagerApp").config([
    "fileManagerConfigProvider",
    function (config) {
        var defaults = config.$get();
        config.set({
            appName: "angular-filemanager",
            pickCallback: function (item) {
                var msg = 'Picked %s "%s" for external use'
                    .replace("%s", item.type)
                    .replace("%s", item.fullPath());
                window.alert(msg);
            },

            listUrl: "http://localhost:5000/api/file/list",
            uploadUrl: "http://localhost:5000/api/file/upload",
            renameUrl: "http://localhost:5000/api/file/command",
            copyUrl: "http://localhost:5000/api/file/command",
            moveUrl: "http://localhost:5000/api/file/command",
            removeUrl: "http://localhost:5000/api/file/command",
            editUrl: "http://localhost:5000/api/file/command",
            getContentUrl: "http://localhost:5000/api/file/content",
            createFolderUrl: "http://localhost:5000/api/file/command",
            downloadFileUrl: "http://localhost:5000/api/file",
            downloadMultipleUrl: "http://localhost:5000/api/file/command",
            compressUrl: "http://localhost:5000/api/file/command",
            extractUrl: "http://localhost:5000/api/file/command",
            permissionsUrl: "http://localhost:5000/api/file/command",
            basePath: "/",

            allowedActions: angular.extend(defaults.allowedActions, {
                pickFiles: false,
                pickFolders: false
            })
        });
    }
]);