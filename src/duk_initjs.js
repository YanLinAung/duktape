/*
 *  Init code for legacy compatibility.
 *
 *  Compatibility properties / wrapper functions here allow Duktape to remain
 *  compatible for user code when core features are changed, without burdening
 *  the main C code with compatibility stuff.
 *
 *  This file is minified with UglifyJS or the closure compiler.  Both will
 *  rename variables, remove comments, and are clever enough to drop any
 *  "if (false) { ... }" blocks altogether, so that's an effective way to
 *  disable currently unneeded code.
 */

(function(G, D) {
    'use strict';

    function def(name, value) {
        Object.defineProperty(D, name, {
            value: value,
            writable: true,
            enumerable: false,
            configurable: true
        });
    }

    // __duk__, renamed to Duktape in 0.9.0
    if (false) {
        Object.defineProperty(G, '__duk__', {
            value: D,
            writable: true,
            enumerable: false,
            configurable: true
        });
    }

    // legacy properties
    if (false) {
        // removed in Duktape 0.9.0
        def('build', '');
        def('setFinalizer', function(o,v) { Duktape.fin(o,v); });
        def('getFinalizer', function(o) { return Duktape.fin(o); });
        def('addr', function(v) { return D.info(v)[1]; });
        def('refc', function(v) { return D.info(v)[2]; });
    }

    // JSONX/JSONC convenience
    if (false) {
        def('jxEnc', function(a,b,c) { return D.enc('jsonx', a, b, c); });
        def('jxDec', function(a,b) { return D.dec('jsonx', a, b); });
        def('jcEnc', function(a,b,c) { return D.enc('jsonc', a, b, c); });
        def('jcDec', function(a,b) { return D.dec('jsonc', a, b); });
    }

    // info convenience
    if (false) {
        def('infox', function (v) {
            var t = D.info(v);
            if (!t) { return t; }
            return { type: t[0], addr: t[1], refc: t[2], hdrsize: t[3], addsize: t[4], bcsize: t[5] };
        });
    }

    // anticipate new functions
    if (false) {
    }

    // console.log compatibility
    if (false) {
        console = {
            log: function() {
                print(Array.prototype.join.call(arguments, ' '));
            }
        };
    }

    // logger object for C code
    if (true) {
        D.Logger.clog = new D.Logger('C');
    }
})(this, Duktape);
