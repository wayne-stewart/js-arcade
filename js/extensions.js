
(function(global) {

    global.$hasOwn = function(obj, propertyName) {
        if (obj) {
            return obj.hasOwnProperty(propertyName);
        }
        return false;
    };

    global.$get = function(id) {
        return document.getElementById(id);
    };

    global.$find = function(selector) {
        return document.querySelector(selector);
    };

    global.$findAll = function(selector) {
        return document.querySelectorAll(selector);
    };

    global.$createElement = function(tagName) {
        return document.createElement(tagName);
    };

    global.$addEvent = function(el, eventName, eventCallback) {
        el.addEventListener(eventName, eventCallback);
    };

    global.$removeEvent = function(el, eventName, eventCallback) {
        el.removeEventListener(eventName, eventCallback);
    };

    /*
        Remove element(s) from an array

        Arguments
            predicate (typeof function)
                a function that should return true if an element
                should be removed and false if not.
                usage: arr.remove(x => x.id === 2) // remove element where id === 2
            predicate (typeof number)
                index of element that should be removed in the array
                usage: arr.remove(2) // remove element at index 2
        
        Returns all values removed from the array.
    */
    Array.prototype.remove = function(predicate) {
        let removed = new Array();
        if (typeof predicate === "function") {
            for (let i = (this.length - 1); i >= 0; i--) {
                if (predicate(this[i])) {
                    removed.push(this.splice(i, 1)[0]);
                }
            }
        }
        else if (typeof predicate === "number" && !isNaN(predicate)) {
            removed.push(this.splice(predicate, 1)[0]);
        }
        return removed;
    };

})(this);