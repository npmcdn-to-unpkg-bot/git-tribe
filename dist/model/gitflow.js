System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GitFlow;
    return {
        setters:[],
        execute: function() {
            GitFlow = (function () {
                function GitFlow() {
                    this.hasMaster = false;
                    this.hasRelease = false;
                    this.hasDevelop = false;
                    this.hasHotfix = false;
                    this.hasFeature = false;
                }
                return GitFlow;
            }());
            exports_1("GitFlow", GitFlow);
        }
    }
});
