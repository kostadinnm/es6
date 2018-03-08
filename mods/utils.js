export default {
    alert: function(msg) {
        alert(utilsPrefix + ": " + msg);
    },
    notify: function(msg) {
        //todo
    },
    log: function(msg) {
        console.log(utilsPrefix + ": " + msg);
    }
}
const utilsPrefix = "My utils";
