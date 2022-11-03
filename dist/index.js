var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $e6a37c53c774cc81$exports = {};
var $bad097f8efab67ef$exports = {};
var $bad097f8efab67ef$var$check = function(it) {
    return it && it.Math == Math && it;
};
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
$bad097f8efab67ef$exports = // eslint-disable-next-line es/no-global-this -- safe
$bad097f8efab67ef$var$check(typeof globalThis == "object" && globalThis) || $bad097f8efab67ef$var$check(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
$bad097f8efab67ef$var$check(typeof self == "object" && self) || $bad097f8efab67ef$var$check(typeof $parcel$global == "object" && $parcel$global) || // eslint-disable-next-line no-new-func -- fallback
function() {
    return this;
}() || Function("return this")();


// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
var $04c73903934b7bfa$export$2d1720544b23b823;
var $10ef1dced17b19ac$exports = {};
var $1f4ed5767aa090a5$exports = {};
$1f4ed5767aa090a5$exports = function(exec) {
    try {
        return !!exec();
    } catch (error) {
        return true;
    }
};


// Detect IE8's incomplete defineProperty implementation
$10ef1dced17b19ac$exports = !$1f4ed5767aa090a5$exports(function() {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, {
        get: function() {
            return 7;
        }
    })[1] != 7;
});


var $14991fbf559844bf$exports = {};
var $16ec5e300196c562$exports = {};

$16ec5e300196c562$exports = !$1f4ed5767aa090a5$exports(function() {
    // eslint-disable-next-line es/no-function-prototype-bind -- safe
    var test = (function() {}).bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != "function" || test.hasOwnProperty("prototype");
});


var $14991fbf559844bf$var$call = Function.prototype.call;
$14991fbf559844bf$exports = $16ec5e300196c562$exports ? $14991fbf559844bf$var$call.bind($14991fbf559844bf$var$call) : function() {
    return $14991fbf559844bf$var$call.apply($14991fbf559844bf$var$call, arguments);
};


// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
var $315fc215469c2606$export$2d1720544b23b823;
"use strict";
var $315fc215469c2606$var$$propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $315fc215469c2606$var$getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
// Nashorn ~ JDK8 bug
var $315fc215469c2606$var$NASHORN_BUG = $315fc215469c2606$var$getOwnPropertyDescriptor && !$315fc215469c2606$var$$propertyIsEnumerable.call({
    1: 2
}, 1);
$315fc215469c2606$export$2d1720544b23b823 = $315fc215469c2606$var$NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = $315fc215469c2606$var$getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
} : $315fc215469c2606$var$$propertyIsEnumerable;


var $f2390285d66de1d0$exports = {};
$f2390285d66de1d0$exports = function(bitmap, value) {
    return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
    };
};


var $2661caef294557fe$exports = {};
var $7acd111cde43aff9$exports = {};
var $c57d8306feeaa402$exports = {};
var $e9e0fd400db64bac$exports = {};
var $37ccb628c056e9bb$exports = {};

var $37ccb628c056e9bb$var$FunctionPrototype = Function.prototype;
var $37ccb628c056e9bb$var$call = $37ccb628c056e9bb$var$FunctionPrototype.call;
var $37ccb628c056e9bb$var$uncurryThisWithBind = $16ec5e300196c562$exports && $37ccb628c056e9bb$var$FunctionPrototype.bind.bind($37ccb628c056e9bb$var$call, $37ccb628c056e9bb$var$call);
$37ccb628c056e9bb$exports = $16ec5e300196c562$exports ? $37ccb628c056e9bb$var$uncurryThisWithBind : function(fn) {
    return function() {
        return $37ccb628c056e9bb$var$call.apply(fn, arguments);
    };
};


var $e9e0fd400db64bac$var$toString = $37ccb628c056e9bb$exports({}.toString);
var $e9e0fd400db64bac$var$stringSlice = $37ccb628c056e9bb$exports("".slice);
$e9e0fd400db64bac$exports = function(it) {
    return $e9e0fd400db64bac$var$stringSlice($e9e0fd400db64bac$var$toString(it), 8, -1);
};



$c57d8306feeaa402$exports = function(fn) {
    // Nashorn bug:
    //   https://github.com/zloirock/core-js/issues/1128
    //   https://github.com/zloirock/core-js/issues/1130
    if ($e9e0fd400db64bac$exports(fn) === "Function") return $37ccb628c056e9bb$exports(fn);
};




var $7acd111cde43aff9$var$$Object = Object;
var $7acd111cde43aff9$var$split = $c57d8306feeaa402$exports("".split);
// fallback for non-array-like ES3 and non-enumerable old V8 strings
$7acd111cde43aff9$exports = $1f4ed5767aa090a5$exports(function() {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !$7acd111cde43aff9$var$$Object("z").propertyIsEnumerable(0);
}) ? function(it) {
    return $e9e0fd400db64bac$exports(it) == "String" ? $7acd111cde43aff9$var$split(it, "") : $7acd111cde43aff9$var$$Object(it);
} : $7acd111cde43aff9$var$$Object;


var $76a4544db7858fdc$exports = {};
var $8e154947a0cd9814$exports = {};
// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
$8e154947a0cd9814$exports = function(it) {
    return it === null || it === undefined;
};


var $76a4544db7858fdc$var$$TypeError = TypeError;
// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
$76a4544db7858fdc$exports = function(it) {
    if ($8e154947a0cd9814$exports(it)) throw $76a4544db7858fdc$var$$TypeError("Can't call method on " + it);
    return it;
};


$2661caef294557fe$exports = function(it) {
    return $7acd111cde43aff9$exports($76a4544db7858fdc$exports(it));
};


var $952e539cf66fcc2e$exports = {};
var $0c72dc0b1a97c815$exports = {};

var $3712f0957147fa63$exports = {};
var $6be98832355b3376$exports = {};
var $a6638e069ab22e14$exports = {};
var $a6638e069ab22e14$var$documentAll = typeof document == "object" && document.all;
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var $a6638e069ab22e14$var$IS_HTMLDDA = typeof $a6638e069ab22e14$var$documentAll == "undefined" && $a6638e069ab22e14$var$documentAll !== undefined;
$a6638e069ab22e14$exports = {
    all: $a6638e069ab22e14$var$documentAll,
    IS_HTMLDDA: $a6638e069ab22e14$var$IS_HTMLDDA
};


var $6be98832355b3376$var$documentAll = $a6638e069ab22e14$exports.all;
// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
$6be98832355b3376$exports = $a6638e069ab22e14$exports.IS_HTMLDDA ? function(argument) {
    return typeof argument == "function" || argument === $6be98832355b3376$var$documentAll;
} : function(argument) {
    return typeof argument == "function";
};



var $3712f0957147fa63$var$documentAll = $a6638e069ab22e14$exports.all;
$3712f0957147fa63$exports = $a6638e069ab22e14$exports.IS_HTMLDDA ? function(it) {
    return typeof it == "object" ? it !== null : $6be98832355b3376$exports(it) || it === $3712f0957147fa63$var$documentAll;
} : function(it) {
    return typeof it == "object" ? it !== null : $6be98832355b3376$exports(it);
};


var $cb25e9c320f5c33d$exports = {};
var $0acf9be789596066$exports = {};


var $0acf9be789596066$var$aFunction = function(argument) {
    return $6be98832355b3376$exports(argument) ? argument : undefined;
};
$0acf9be789596066$exports = function(namespace, method) {
    return arguments.length < 2 ? $0acf9be789596066$var$aFunction($bad097f8efab67ef$exports[namespace]) : $bad097f8efab67ef$exports[namespace] && $bad097f8efab67ef$exports[namespace][method];
};



var $ed8eb9ab30141361$exports = {};

$ed8eb9ab30141361$exports = $c57d8306feeaa402$exports({}.isPrototypeOf);


var $3a1590443ba246ac$exports = {};
var $c10ff9bea73b5b82$exports = {};
var $d3ab692b45439f26$exports = {};

var $9c351796e08d64a1$exports = {};

$9c351796e08d64a1$exports = $0acf9be789596066$exports("navigator", "userAgent") || "";


var $d3ab692b45439f26$var$process = $bad097f8efab67ef$exports.process;
var $d3ab692b45439f26$var$Deno = $bad097f8efab67ef$exports.Deno;
var $d3ab692b45439f26$var$versions = $d3ab692b45439f26$var$process && $d3ab692b45439f26$var$process.versions || $d3ab692b45439f26$var$Deno && $d3ab692b45439f26$var$Deno.version;
var $d3ab692b45439f26$var$v8 = $d3ab692b45439f26$var$versions && $d3ab692b45439f26$var$versions.v8;
var $d3ab692b45439f26$var$match, $d3ab692b45439f26$var$version;
if ($d3ab692b45439f26$var$v8) {
    $d3ab692b45439f26$var$match = $d3ab692b45439f26$var$v8.split(".");
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    $d3ab692b45439f26$var$version = $d3ab692b45439f26$var$match[0] > 0 && $d3ab692b45439f26$var$match[0] < 4 ? 1 : +($d3ab692b45439f26$var$match[0] + $d3ab692b45439f26$var$match[1]);
}
// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!$d3ab692b45439f26$var$version && $9c351796e08d64a1$exports) {
    $d3ab692b45439f26$var$match = $9c351796e08d64a1$exports.match(/Edge\/(\d+)/);
    if (!$d3ab692b45439f26$var$match || $d3ab692b45439f26$var$match[1] >= 74) {
        $d3ab692b45439f26$var$match = $9c351796e08d64a1$exports.match(/Chrome\/(\d+)/);
        if ($d3ab692b45439f26$var$match) $d3ab692b45439f26$var$version = +$d3ab692b45439f26$var$match[1];
    }
}
$d3ab692b45439f26$exports = $d3ab692b45439f26$var$version;



// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
$c10ff9bea73b5b82$exports = !!Object.getOwnPropertySymbols && !$1f4ed5767aa090a5$exports(function() {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && $d3ab692b45439f26$exports && $d3ab692b45439f26$exports < 41;
});


$3a1590443ba246ac$exports = $c10ff9bea73b5b82$exports && !Symbol.sham && typeof Symbol.iterator == "symbol";


var $cb25e9c320f5c33d$var$$Object = Object;
$cb25e9c320f5c33d$exports = $3a1590443ba246ac$exports ? function(it) {
    return typeof it == "symbol";
} : function(it) {
    var $Symbol = $0acf9be789596066$exports("Symbol");
    return $6be98832355b3376$exports($Symbol) && $ed8eb9ab30141361$exports($Symbol.prototype, $cb25e9c320f5c33d$var$$Object(it));
};


var $5b403d6c80e91d44$exports = {};
var $231da87ee2b42c2c$exports = {};

var $406afa6f721ba19f$exports = {};
var $406afa6f721ba19f$var$$String = String;
$406afa6f721ba19f$exports = function(argument) {
    try {
        return $406afa6f721ba19f$var$$String(argument);
    } catch (error) {
        return "Object";
    }
};


var $231da87ee2b42c2c$var$$TypeError = TypeError;
// `Assert: IsCallable(argument) is true`
$231da87ee2b42c2c$exports = function(argument) {
    if ($6be98832355b3376$exports(argument)) return argument;
    throw $231da87ee2b42c2c$var$$TypeError($406afa6f721ba19f$exports(argument) + " is not a function");
};



// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
$5b403d6c80e91d44$exports = function(V, P) {
    var func = V[P];
    return $8e154947a0cd9814$exports(func) ? undefined : $231da87ee2b42c2c$exports(func);
};


var $325adee95ef0b3f7$exports = {};



var $325adee95ef0b3f7$var$$TypeError = TypeError;
// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
$325adee95ef0b3f7$exports = function(input, pref) {
    var fn, val;
    if (pref === "string" && $6be98832355b3376$exports(fn = input.toString) && !$3712f0957147fa63$exports(val = $14991fbf559844bf$exports(fn, input))) return val;
    if ($6be98832355b3376$exports(fn = input.valueOf) && !$3712f0957147fa63$exports(val = $14991fbf559844bf$exports(fn, input))) return val;
    if (pref !== "string" && $6be98832355b3376$exports(fn = input.toString) && !$3712f0957147fa63$exports(val = $14991fbf559844bf$exports(fn, input))) return val;
    throw $325adee95ef0b3f7$var$$TypeError("Can't convert object to primitive value");
};


var $8ee9e0f2c1b614f0$exports = {};

var $c6e575accb73d5b6$exports = {};
var $71265406c1d33803$exports = {};
$71265406c1d33803$exports = false;


var $4c7d534886f5c7c1$exports = {};

var $f28c12f545bb20fc$exports = {};

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $f28c12f545bb20fc$var$defineProperty = Object.defineProperty;
$f28c12f545bb20fc$exports = function(key, value) {
    try {
        $f28c12f545bb20fc$var$defineProperty($bad097f8efab67ef$exports, key, {
            value: value,
            configurable: true,
            writable: true
        });
    } catch (error) {
        $bad097f8efab67ef$exports[key] = value;
    }
    return value;
};


var $4c7d534886f5c7c1$var$SHARED = "__core-js_shared__";
var $4c7d534886f5c7c1$var$store = $bad097f8efab67ef$exports[$4c7d534886f5c7c1$var$SHARED] || $f28c12f545bb20fc$exports($4c7d534886f5c7c1$var$SHARED, {});
$4c7d534886f5c7c1$exports = $4c7d534886f5c7c1$var$store;


($c6e575accb73d5b6$exports = function(key, value) {
    return $4c7d534886f5c7c1$exports[key] || ($4c7d534886f5c7c1$exports[key] = value !== undefined ? value : {});
})("versions", []).push({
    version: "3.26.0",
    mode: $71265406c1d33803$exports ? "pure" : "global",
    copyright: "\xa9 2014-2022 Denis Pushkarev (zloirock.ru)",
    license: "https://github.com/zloirock/core-js/blob/v3.26.0/LICENSE",
    source: "https://github.com/zloirock/core-js"
});


var $b2a9b9e967931471$exports = {};

var $e13ce9351570e71c$exports = {};

var $e13ce9351570e71c$var$$Object = Object;
// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
$e13ce9351570e71c$exports = function(argument) {
    return $e13ce9351570e71c$var$$Object($76a4544db7858fdc$exports(argument));
};


var $b2a9b9e967931471$var$hasOwnProperty = $c57d8306feeaa402$exports({}.hasOwnProperty);
// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
$b2a9b9e967931471$exports = Object.hasOwn || function hasOwn(it, key) {
    return $b2a9b9e967931471$var$hasOwnProperty($e13ce9351570e71c$exports(it), key);
};


var $efb3d6379800849c$exports = {};

var $efb3d6379800849c$var$id = 0;
var $efb3d6379800849c$var$postfix = Math.random();
var $efb3d6379800849c$var$toString = $c57d8306feeaa402$exports(1.0.toString);
$efb3d6379800849c$exports = function(key) {
    return "Symbol(" + (key === undefined ? "" : key) + ")_" + $efb3d6379800849c$var$toString(++$efb3d6379800849c$var$id + $efb3d6379800849c$var$postfix, 36);
};




var $8ee9e0f2c1b614f0$var$WellKnownSymbolsStore = $c6e575accb73d5b6$exports("wks");
var $8ee9e0f2c1b614f0$var$Symbol = $bad097f8efab67ef$exports.Symbol;
var $8ee9e0f2c1b614f0$var$symbolFor = $8ee9e0f2c1b614f0$var$Symbol && $8ee9e0f2c1b614f0$var$Symbol["for"];
var $8ee9e0f2c1b614f0$var$createWellKnownSymbol = $3a1590443ba246ac$exports ? $8ee9e0f2c1b614f0$var$Symbol : $8ee9e0f2c1b614f0$var$Symbol && $8ee9e0f2c1b614f0$var$Symbol.withoutSetter || $efb3d6379800849c$exports;
$8ee9e0f2c1b614f0$exports = function(name) {
    if (!$b2a9b9e967931471$exports($8ee9e0f2c1b614f0$var$WellKnownSymbolsStore, name) || !($c10ff9bea73b5b82$exports || typeof $8ee9e0f2c1b614f0$var$WellKnownSymbolsStore[name] == "string")) {
        var description = "Symbol." + name;
        if ($c10ff9bea73b5b82$exports && $b2a9b9e967931471$exports($8ee9e0f2c1b614f0$var$Symbol, name)) $8ee9e0f2c1b614f0$var$WellKnownSymbolsStore[name] = $8ee9e0f2c1b614f0$var$Symbol[name];
        else if ($3a1590443ba246ac$exports && $8ee9e0f2c1b614f0$var$symbolFor) $8ee9e0f2c1b614f0$var$WellKnownSymbolsStore[name] = $8ee9e0f2c1b614f0$var$symbolFor(description);
        else $8ee9e0f2c1b614f0$var$WellKnownSymbolsStore[name] = $8ee9e0f2c1b614f0$var$createWellKnownSymbol(description);
    }
    return $8ee9e0f2c1b614f0$var$WellKnownSymbolsStore[name];
};


var $0c72dc0b1a97c815$var$$TypeError = TypeError;
var $0c72dc0b1a97c815$var$TO_PRIMITIVE = $8ee9e0f2c1b614f0$exports("toPrimitive");
// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
$0c72dc0b1a97c815$exports = function(input, pref) {
    if (!$3712f0957147fa63$exports(input) || $cb25e9c320f5c33d$exports(input)) return input;
    var exoticToPrim = $5b403d6c80e91d44$exports(input, $0c72dc0b1a97c815$var$TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
        if (pref === undefined) pref = "default";
        result = $14991fbf559844bf$exports(exoticToPrim, input, pref);
        if (!$3712f0957147fa63$exports(result) || $cb25e9c320f5c33d$exports(result)) return result;
        throw $0c72dc0b1a97c815$var$$TypeError("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = "number";
    return $325adee95ef0b3f7$exports(input, pref);
};



// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
$952e539cf66fcc2e$exports = function(argument) {
    var key = $0c72dc0b1a97c815$exports(argument, "string");
    return $cb25e9c320f5c33d$exports(key) ? key : key + "";
};



var $f075519a2b3f3032$exports = {};


var $c992180b54030a32$exports = {};


var $c992180b54030a32$var$document = $bad097f8efab67ef$exports.document;
// typeof document.createElement is 'object' in old IE
var $c992180b54030a32$var$EXISTS = $3712f0957147fa63$exports($c992180b54030a32$var$document) && $3712f0957147fa63$exports($c992180b54030a32$var$document.createElement);
$c992180b54030a32$exports = function(it) {
    return $c992180b54030a32$var$EXISTS ? $c992180b54030a32$var$document.createElement(it) : {};
};


// Thanks to IE8 for its funny defineProperty
$f075519a2b3f3032$exports = !$10ef1dced17b19ac$exports && !$1f4ed5767aa090a5$exports(function() {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty($c992180b54030a32$exports("div"), "a", {
        get: function() {
            return 7;
        }
    }).a != 7;
});


// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $04c73903934b7bfa$var$$getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
$04c73903934b7bfa$export$2d1720544b23b823 = $10ef1dced17b19ac$exports ? $04c73903934b7bfa$var$$getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = $2661caef294557fe$exports(O);
    P = $952e539cf66fcc2e$exports(P);
    if ($f075519a2b3f3032$exports) try {
        return $04c73903934b7bfa$var$$getOwnPropertyDescriptor(O, P);
    } catch (error) {}
    if ($b2a9b9e967931471$exports(O, P)) return $f2390285d66de1d0$exports(!$14991fbf559844bf$exports($315fc215469c2606$export$2d1720544b23b823, O, P), O[P]);
};


var $e6a37c53c774cc81$require$getOwnPropertyDescriptor = $04c73903934b7bfa$export$2d1720544b23b823;
var $aa5df9a783322355$exports = {};

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
var $3d19a8f77e54b4f0$export$2d1720544b23b823;


var $1d575d9246e5a5ea$exports = {};


// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
$1d575d9246e5a5ea$exports = $10ef1dced17b19ac$exports && $1f4ed5767aa090a5$exports(function() {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(function() {}, "prototype", {
        value: 42,
        writable: false
    }).prototype != 42;
});


var $88bbd8008bd49e73$exports = {};

var $88bbd8008bd49e73$var$$String = String;
var $88bbd8008bd49e73$var$$TypeError = TypeError;
// `Assert: Type(argument) is Object`
$88bbd8008bd49e73$exports = function(argument) {
    if ($3712f0957147fa63$exports(argument)) return argument;
    throw $88bbd8008bd49e73$var$$TypeError($88bbd8008bd49e73$var$$String(argument) + " is not an object");
};



var $3d19a8f77e54b4f0$var$$TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $3d19a8f77e54b4f0$var$$defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $3d19a8f77e54b4f0$var$$getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var $3d19a8f77e54b4f0$var$ENUMERABLE = "enumerable";
var $3d19a8f77e54b4f0$var$CONFIGURABLE = "configurable";
var $3d19a8f77e54b4f0$var$WRITABLE = "writable";
$3d19a8f77e54b4f0$export$2d1720544b23b823 = $10ef1dced17b19ac$exports ? $1d575d9246e5a5ea$exports ? function defineProperty(O, P, Attributes) {
    $88bbd8008bd49e73$exports(O);
    P = $952e539cf66fcc2e$exports(P);
    $88bbd8008bd49e73$exports(Attributes);
    if (typeof O === "function" && P === "prototype" && "value" in Attributes && $3d19a8f77e54b4f0$var$WRITABLE in Attributes && !Attributes[$3d19a8f77e54b4f0$var$WRITABLE]) {
        var current = $3d19a8f77e54b4f0$var$$getOwnPropertyDescriptor(O, P);
        if (current && current[$3d19a8f77e54b4f0$var$WRITABLE]) {
            O[P] = Attributes.value;
            Attributes = {
                configurable: $3d19a8f77e54b4f0$var$CONFIGURABLE in Attributes ? Attributes[$3d19a8f77e54b4f0$var$CONFIGURABLE] : current[$3d19a8f77e54b4f0$var$CONFIGURABLE],
                enumerable: $3d19a8f77e54b4f0$var$ENUMERABLE in Attributes ? Attributes[$3d19a8f77e54b4f0$var$ENUMERABLE] : current[$3d19a8f77e54b4f0$var$ENUMERABLE],
                writable: false
            };
        }
    }
    return $3d19a8f77e54b4f0$var$$defineProperty(O, P, Attributes);
} : $3d19a8f77e54b4f0$var$$defineProperty : function defineProperty(O, P, Attributes) {
    $88bbd8008bd49e73$exports(O);
    P = $952e539cf66fcc2e$exports(P);
    $88bbd8008bd49e73$exports(Attributes);
    if ($f075519a2b3f3032$exports) try {
        return $3d19a8f77e54b4f0$var$$defineProperty(O, P, Attributes);
    } catch (error) {}
    if ("get" in Attributes || "set" in Attributes) throw $3d19a8f77e54b4f0$var$$TypeError("Accessors not supported");
    if ("value" in Attributes) O[P] = Attributes.value;
    return O;
};



$aa5df9a783322355$exports = $10ef1dced17b19ac$exports ? function(object, key, value) {
    return $3d19a8f77e54b4f0$export$2d1720544b23b823(object, key, $f2390285d66de1d0$exports(1, value));
} : function(object, key, value) {
    object[key] = value;
    return object;
};


var $364df5af2dd5b503$exports = {};


var $2e48fa0db8a988db$exports = {};




var $87c64d1fc693fa36$exports = {};


var $87c64d1fc693fa36$var$FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $87c64d1fc693fa36$var$getDescriptor = $10ef1dced17b19ac$exports && Object.getOwnPropertyDescriptor;
var $87c64d1fc693fa36$var$EXISTS = $b2a9b9e967931471$exports($87c64d1fc693fa36$var$FunctionPrototype, "name");
// additional protection from minified / mangled / dropped function names
var $87c64d1fc693fa36$var$PROPER = $87c64d1fc693fa36$var$EXISTS && (function something() {}).name === "something";
var $87c64d1fc693fa36$var$CONFIGURABLE = $87c64d1fc693fa36$var$EXISTS && (!$10ef1dced17b19ac$exports || $10ef1dced17b19ac$exports && $87c64d1fc693fa36$var$getDescriptor($87c64d1fc693fa36$var$FunctionPrototype, "name").configurable);
$87c64d1fc693fa36$exports = {
    EXISTS: $87c64d1fc693fa36$var$EXISTS,
    PROPER: $87c64d1fc693fa36$var$PROPER,
    CONFIGURABLE: $87c64d1fc693fa36$var$CONFIGURABLE
};


var $2e48fa0db8a988db$require$CONFIGURABLE_FUNCTION_NAME = $87c64d1fc693fa36$exports.CONFIGURABLE;
var $ed9277bd2d2b3265$exports = {};



var $ed9277bd2d2b3265$var$functionToString = $c57d8306feeaa402$exports(Function.toString);
// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!$6be98832355b3376$exports($4c7d534886f5c7c1$exports.inspectSource)) $4c7d534886f5c7c1$exports.inspectSource = function(it) {
    return $ed9277bd2d2b3265$var$functionToString(it);
};
$ed9277bd2d2b3265$exports = $4c7d534886f5c7c1$exports.inspectSource;


var $0600d4de4816a6b1$exports = {};
var $bbfffeda505dd735$exports = {};


var $bbfffeda505dd735$var$WeakMap = $bad097f8efab67ef$exports.WeakMap;
$bbfffeda505dd735$exports = $6be98832355b3376$exports($bbfffeda505dd735$var$WeakMap) && /native code/.test(String($bbfffeda505dd735$var$WeakMap));







var $31fb90bd9f878a14$exports = {};


var $31fb90bd9f878a14$var$keys = $c6e575accb73d5b6$exports("keys");
$31fb90bd9f878a14$exports = function(key) {
    return $31fb90bd9f878a14$var$keys[key] || ($31fb90bd9f878a14$var$keys[key] = $efb3d6379800849c$exports(key));
};


var $c51521e0731744e8$exports = {};
$c51521e0731744e8$exports = {};


var $0600d4de4816a6b1$var$OBJECT_ALREADY_INITIALIZED = "Object already initialized";
var $0600d4de4816a6b1$var$TypeError = $bad097f8efab67ef$exports.TypeError;
var $0600d4de4816a6b1$var$WeakMap = $bad097f8efab67ef$exports.WeakMap;
var $0600d4de4816a6b1$var$set, $0600d4de4816a6b1$var$get, $0600d4de4816a6b1$var$has;
var $0600d4de4816a6b1$var$enforce = function(it) {
    return $0600d4de4816a6b1$var$has(it) ? $0600d4de4816a6b1$var$get(it) : $0600d4de4816a6b1$var$set(it, {});
};
var $0600d4de4816a6b1$var$getterFor = function(TYPE) {
    return function(it) {
        var state;
        if (!$3712f0957147fa63$exports(it) || (state = $0600d4de4816a6b1$var$get(it)).type !== TYPE) throw $0600d4de4816a6b1$var$TypeError("Incompatible receiver, " + TYPE + " required");
        return state;
    };
};
if ($bbfffeda505dd735$exports || $4c7d534886f5c7c1$exports.state) {
    var $0600d4de4816a6b1$var$store = $4c7d534886f5c7c1$exports.state || ($4c7d534886f5c7c1$exports.state = new $0600d4de4816a6b1$var$WeakMap());
    /* eslint-disable no-self-assign -- prototype methods protection */ $0600d4de4816a6b1$var$store.get = $0600d4de4816a6b1$var$store.get;
    $0600d4de4816a6b1$var$store.has = $0600d4de4816a6b1$var$store.has;
    $0600d4de4816a6b1$var$store.set = $0600d4de4816a6b1$var$store.set;
    /* eslint-enable no-self-assign -- prototype methods protection */ $0600d4de4816a6b1$var$set = function(it, metadata) {
        if ($0600d4de4816a6b1$var$store.has(it)) throw $0600d4de4816a6b1$var$TypeError($0600d4de4816a6b1$var$OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        $0600d4de4816a6b1$var$store.set(it, metadata);
        return metadata;
    };
    $0600d4de4816a6b1$var$get = function(it) {
        return $0600d4de4816a6b1$var$store.get(it) || {};
    };
    $0600d4de4816a6b1$var$has = function(it) {
        return $0600d4de4816a6b1$var$store.has(it);
    };
} else {
    var $0600d4de4816a6b1$var$STATE = $31fb90bd9f878a14$exports("state");
    $c51521e0731744e8$exports[$0600d4de4816a6b1$var$STATE] = true;
    $0600d4de4816a6b1$var$set = function(it, metadata) {
        if ($b2a9b9e967931471$exports(it, $0600d4de4816a6b1$var$STATE)) throw $0600d4de4816a6b1$var$TypeError($0600d4de4816a6b1$var$OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        $aa5df9a783322355$exports(it, $0600d4de4816a6b1$var$STATE, metadata);
        return metadata;
    };
    $0600d4de4816a6b1$var$get = function(it) {
        return $b2a9b9e967931471$exports(it, $0600d4de4816a6b1$var$STATE) ? it[$0600d4de4816a6b1$var$STATE] : {};
    };
    $0600d4de4816a6b1$var$has = function(it) {
        return $b2a9b9e967931471$exports(it, $0600d4de4816a6b1$var$STATE);
    };
}
$0600d4de4816a6b1$exports = {
    set: $0600d4de4816a6b1$var$set,
    get: $0600d4de4816a6b1$var$get,
    has: $0600d4de4816a6b1$var$has,
    enforce: $0600d4de4816a6b1$var$enforce,
    getterFor: $0600d4de4816a6b1$var$getterFor
};


var $2e48fa0db8a988db$var$enforceInternalState = $0600d4de4816a6b1$exports.enforce;
var $2e48fa0db8a988db$var$getInternalState = $0600d4de4816a6b1$exports.get;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $2e48fa0db8a988db$var$defineProperty = Object.defineProperty;
var $2e48fa0db8a988db$var$CONFIGURABLE_LENGTH = $10ef1dced17b19ac$exports && !$1f4ed5767aa090a5$exports(function() {
    return $2e48fa0db8a988db$var$defineProperty(function() {}, "length", {
        value: 8
    }).length !== 8;
});
var $2e48fa0db8a988db$var$TEMPLATE = String(String).split("String");
var $2e48fa0db8a988db$var$makeBuiltIn = $2e48fa0db8a988db$exports = function(value, name, options) {
    if (String(name).slice(0, 7) === "Symbol(") name = "[" + String(name).replace(/^Symbol\(([^)]*)\)/, "$1") + "]";
    if (options && options.getter) name = "get " + name;
    if (options && options.setter) name = "set " + name;
    if (!$b2a9b9e967931471$exports(value, "name") || $2e48fa0db8a988db$require$CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
        if ($10ef1dced17b19ac$exports) $2e48fa0db8a988db$var$defineProperty(value, "name", {
            value: name,
            configurable: true
        });
        else value.name = name;
    }
    if ($2e48fa0db8a988db$var$CONFIGURABLE_LENGTH && options && $b2a9b9e967931471$exports(options, "arity") && value.length !== options.arity) $2e48fa0db8a988db$var$defineProperty(value, "length", {
        value: options.arity
    });
    try {
        if (options && $b2a9b9e967931471$exports(options, "constructor") && options.constructor) {
            if ($10ef1dced17b19ac$exports) $2e48fa0db8a988db$var$defineProperty(value, "prototype", {
                writable: false
            });
        } else if (value.prototype) value.prototype = undefined;
    } catch (error) {}
    var state = $2e48fa0db8a988db$var$enforceInternalState(value);
    if (!$b2a9b9e967931471$exports(state, "source")) state.source = $2e48fa0db8a988db$var$TEMPLATE.join(typeof name == "string" ? name : "");
    return value;
};
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = $2e48fa0db8a988db$var$makeBuiltIn(function toString() {
    return $6be98832355b3376$exports(this) && $2e48fa0db8a988db$var$getInternalState(this).source || $ed9277bd2d2b3265$exports(this);
}, "toString");



$364df5af2dd5b503$exports = function(O, key, value, options) {
    if (!options) options = {};
    var simple = options.enumerable;
    var name = options.name !== undefined ? options.name : key;
    if ($6be98832355b3376$exports(value)) $2e48fa0db8a988db$exports(value, name, options);
    if (options.global) {
        if (simple) O[key] = value;
        else $f28c12f545bb20fc$exports(key, value);
    } else {
        try {
            if (!options.unsafe) delete O[key];
            else if (O[key]) simple = true;
        } catch (error) {}
        if (simple) O[key] = value;
        else $3d19a8f77e54b4f0$export$2d1720544b23b823(O, key, {
            value: value,
            enumerable: false,
            configurable: !options.nonConfigurable,
            writable: !options.nonWritable
        });
    }
    return O;
};



var $c7b2b518ca573870$exports = {};

var $0c36da1c9ab55053$exports = {};


// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
var $5033d4e4126456ad$export$2d1720544b23b823;
var $3bfd965cdcba00c1$exports = {};



var $ab9df00efdd046a5$exports = {};

var $ced88f2d9a731ec3$exports = {};
var $58c8b66bf43182f5$exports = {};
var $2a4ef85bde29a655$exports = {};
var $2a4ef85bde29a655$var$ceil = Math.ceil;
var $2a4ef85bde29a655$var$floor = Math.floor;
// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
$2a4ef85bde29a655$exports = Math.trunc || function trunc(x) {
    var n = +x;
    return (n > 0 ? $2a4ef85bde29a655$var$floor : $2a4ef85bde29a655$var$ceil)(n);
};


// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
$58c8b66bf43182f5$exports = function(argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- NaN check
    return number !== number || number === 0 ? 0 : $2a4ef85bde29a655$exports(number);
};


var $ced88f2d9a731ec3$var$max = Math.max;
var $ced88f2d9a731ec3$var$min = Math.min;
// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
$ced88f2d9a731ec3$exports = function(index, length) {
    var integer = $58c8b66bf43182f5$exports(index);
    return integer < 0 ? $ced88f2d9a731ec3$var$max(integer + length, 0) : $ced88f2d9a731ec3$var$min(integer, length);
};


var $737dc59f8e534fd3$exports = {};
var $25a7712a0d1b4bfa$exports = {};

var $25a7712a0d1b4bfa$var$min = Math.min;
// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
$25a7712a0d1b4bfa$exports = function(argument) {
    return argument > 0 ? $25a7712a0d1b4bfa$var$min($58c8b66bf43182f5$exports(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
$737dc59f8e534fd3$exports = function(obj) {
    return $25a7712a0d1b4bfa$exports(obj.length);
};


// `Array.prototype.{ indexOf, includes }` methods implementation
var $ab9df00efdd046a5$var$createMethod = function(IS_INCLUDES) {
    return function($this, el, fromIndex) {
        var O = $2661caef294557fe$exports($this);
        var length = $737dc59f8e534fd3$exports(O);
        var index = $ced88f2d9a731ec3$exports(fromIndex, length);
        var value;
        // Array#includes uses SameValueZero equality algorithm
        // eslint-disable-next-line no-self-compare -- NaN check
        if (IS_INCLUDES && el != el) while(length > index){
            value = O[index++];
            // eslint-disable-next-line no-self-compare -- NaN check
            if (value != value) return true;
        // Array#indexOf ignores holes, Array#includes - not
        }
        else for(; length > index; index++){
            if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
        }
        return !IS_INCLUDES && -1;
    };
};
$ab9df00efdd046a5$exports = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: $ab9df00efdd046a5$var$createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: $ab9df00efdd046a5$var$createMethod(false)
};


var $3bfd965cdcba00c1$require$indexOf = $ab9df00efdd046a5$exports.indexOf;

var $3bfd965cdcba00c1$var$push = $c57d8306feeaa402$exports([].push);
$3bfd965cdcba00c1$exports = function(object, names) {
    var O = $2661caef294557fe$exports(object);
    var i = 0;
    var result = [];
    var key;
    for(key in O)!$b2a9b9e967931471$exports($c51521e0731744e8$exports, key) && $b2a9b9e967931471$exports(O, key) && $3bfd965cdcba00c1$var$push(result, key);
    // Don't enum bug & hidden keys
    while(names.length > i)if ($b2a9b9e967931471$exports(O, key = names[i++])) ~$3bfd965cdcba00c1$require$indexOf(result, key) || $3bfd965cdcba00c1$var$push(result, key);
    return result;
};


var $8137ecb86e62002e$exports = {};
// IE8- don't enum bug keys
$8137ecb86e62002e$exports = [
    "constructor",
    "hasOwnProperty",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "toLocaleString",
    "toString",
    "valueOf"
];


var $5033d4e4126456ad$var$hiddenKeys = $8137ecb86e62002e$exports.concat("length", "prototype");
$5033d4e4126456ad$export$2d1720544b23b823 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return $3bfd965cdcba00c1$exports(O, $5033d4e4126456ad$var$hiddenKeys);
};


// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
var $85cec88e1ea7c20d$export$2d1720544b23b823;
$85cec88e1ea7c20d$export$2d1720544b23b823 = Object.getOwnPropertySymbols;



var $0c36da1c9ab55053$var$concat = $c57d8306feeaa402$exports([].concat);
// all object keys, includes non-enumerable and symbols
$0c36da1c9ab55053$exports = $0acf9be789596066$exports("Reflect", "ownKeys") || function ownKeys(it) {
    var keys = $5033d4e4126456ad$export$2d1720544b23b823($88bbd8008bd49e73$exports(it));
    var getOwnPropertySymbols = $85cec88e1ea7c20d$export$2d1720544b23b823;
    return getOwnPropertySymbols ? $0c36da1c9ab55053$var$concat(keys, getOwnPropertySymbols(it)) : keys;
};




$c7b2b518ca573870$exports = function(target, source, exceptions) {
    var keys = $0c36da1c9ab55053$exports(source);
    var defineProperty = $3d19a8f77e54b4f0$export$2d1720544b23b823;
    var getOwnPropertyDescriptor = $04c73903934b7bfa$export$2d1720544b23b823;
    for(var i = 0; i < keys.length; i++){
        var key = keys[i];
        if (!$b2a9b9e967931471$exports(target, key) && !(exceptions && $b2a9b9e967931471$exports(exceptions, key))) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
};


var $31cf72d66c12f228$exports = {};


var $31cf72d66c12f228$var$replacement = /#|\.prototype\./;
var $31cf72d66c12f228$var$isForced = function(feature, detection) {
    var value = $31cf72d66c12f228$var$data[$31cf72d66c12f228$var$normalize(feature)];
    return value == $31cf72d66c12f228$var$POLYFILL ? true : value == $31cf72d66c12f228$var$NATIVE ? false : $6be98832355b3376$exports(detection) ? $1f4ed5767aa090a5$exports(detection) : !!detection;
};
var $31cf72d66c12f228$var$normalize = $31cf72d66c12f228$var$isForced.normalize = function(string) {
    return String(string).replace($31cf72d66c12f228$var$replacement, ".").toLowerCase();
};
var $31cf72d66c12f228$var$data = $31cf72d66c12f228$var$isForced.data = {};
var $31cf72d66c12f228$var$NATIVE = $31cf72d66c12f228$var$isForced.NATIVE = "N";
var $31cf72d66c12f228$var$POLYFILL = $31cf72d66c12f228$var$isForced.POLYFILL = "P";
$31cf72d66c12f228$exports = $31cf72d66c12f228$var$isForced;


/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/ $e6a37c53c774cc81$exports = function(options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) target = $bad097f8efab67ef$exports;
    else if (STATIC) target = $bad097f8efab67ef$exports[TARGET] || $f28c12f545bb20fc$exports(TARGET, {});
    else target = ($bad097f8efab67ef$exports[TARGET] || {}).prototype;
    if (target) for(key in source){
        sourceProperty = source[key];
        if (options.dontCallGetSet) {
            descriptor = $e6a37c53c774cc81$require$getOwnPropertyDescriptor(target, key);
            targetProperty = descriptor && descriptor.value;
        } else targetProperty = target[key];
        FORCED = $31cf72d66c12f228$exports(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
        // contained in target
        if (!FORCED && targetProperty !== undefined) {
            if (typeof sourceProperty == typeof targetProperty) continue;
            $c7b2b518ca573870$exports(sourceProperty, targetProperty);
        }
        // add a flag to not completely full polyfills
        if (options.sham || targetProperty && targetProperty.sham) $aa5df9a783322355$exports(sourceProperty, "sham", true);
        $364df5af2dd5b503$exports(target, key, sourceProperty, options);
    }
};



var $2e64bda18621730a$exports = {};

var $00763744308cd908$exports = {};

var $00763744308cd908$var$FunctionPrototype = Function.prototype;
var $00763744308cd908$var$apply = $00763744308cd908$var$FunctionPrototype.apply;
var $00763744308cd908$var$call = $00763744308cd908$var$FunctionPrototype.call;
// eslint-disable-next-line es/no-reflect -- safe
$00763744308cd908$exports = typeof Reflect == "object" && Reflect.apply || ($16ec5e300196c562$exports ? $00763744308cd908$var$call.bind($00763744308cd908$var$apply) : function() {
    return $00763744308cd908$var$call.apply($00763744308cd908$var$apply, arguments);
});


var $56177ba1753d2b5b$exports = {};



var $56177ba1753d2b5b$var$bind = $c57d8306feeaa402$exports($c57d8306feeaa402$exports.bind);
// optional / simple context binding
$56177ba1753d2b5b$exports = function(fn, that) {
    $231da87ee2b42c2c$exports(fn);
    return that === undefined ? fn : $16ec5e300196c562$exports ? $56177ba1753d2b5b$var$bind(fn, that) : function() {
        return fn.apply(that, arguments);
    };
};





var $862d4a4add34a734$exports = {};

$862d4a4add34a734$exports = $0acf9be789596066$exports("document", "documentElement");


var $32b68f0b38053ea2$exports = {};

$32b68f0b38053ea2$exports = $c57d8306feeaa402$exports([].slice);



var $d8834c89078f5165$exports = {};
var $d8834c89078f5165$var$$TypeError = TypeError;
$d8834c89078f5165$exports = function(passed, required) {
    if (passed < required) throw $d8834c89078f5165$var$$TypeError("Not enough arguments");
    return passed;
};


var $f18a6c015f256ce9$exports = {};

$f18a6c015f256ce9$exports = /(?:ipad|iphone|ipod).*applewebkit/i.test($9c351796e08d64a1$exports);


var $1325e843bd807bed$exports = {};


$1325e843bd807bed$exports = $e9e0fd400db64bac$exports($bad097f8efab67ef$exports.process) == "process";


var $2e64bda18621730a$var$set = $bad097f8efab67ef$exports.setImmediate;
var $2e64bda18621730a$var$clear = $bad097f8efab67ef$exports.clearImmediate;
var $2e64bda18621730a$var$process = $bad097f8efab67ef$exports.process;
var $2e64bda18621730a$var$Dispatch = $bad097f8efab67ef$exports.Dispatch;
var $2e64bda18621730a$var$Function = $bad097f8efab67ef$exports.Function;
var $2e64bda18621730a$var$MessageChannel = $bad097f8efab67ef$exports.MessageChannel;
var $2e64bda18621730a$var$String = $bad097f8efab67ef$exports.String;
var $2e64bda18621730a$var$counter = 0;
var $2e64bda18621730a$var$queue = {};
var $2e64bda18621730a$var$ONREADYSTATECHANGE = "onreadystatechange";
var $2e64bda18621730a$var$$location, $2e64bda18621730a$var$defer, $2e64bda18621730a$var$channel, $2e64bda18621730a$var$port;
try {
    // Deno throws a ReferenceError on `location` access without `--location` flag
    $2e64bda18621730a$var$$location = $bad097f8efab67ef$exports.location;
} catch (error) {}
var $2e64bda18621730a$var$run = function(id) {
    if ($b2a9b9e967931471$exports($2e64bda18621730a$var$queue, id)) {
        var fn = $2e64bda18621730a$var$queue[id];
        delete $2e64bda18621730a$var$queue[id];
        fn();
    }
};
var $2e64bda18621730a$var$runner = function(id) {
    return function() {
        $2e64bda18621730a$var$run(id);
    };
};
var $2e64bda18621730a$var$listener = function(event) {
    $2e64bda18621730a$var$run(event.data);
};
var $2e64bda18621730a$var$post = function(id) {
    // old engines have not location.origin
    $bad097f8efab67ef$exports.postMessage($2e64bda18621730a$var$String(id), $2e64bda18621730a$var$$location.protocol + "//" + $2e64bda18621730a$var$$location.host);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!$2e64bda18621730a$var$set || !$2e64bda18621730a$var$clear) {
    $2e64bda18621730a$var$set = function setImmediate(handler) {
        $d8834c89078f5165$exports(arguments.length, 1);
        var fn = $6be98832355b3376$exports(handler) ? handler : $2e64bda18621730a$var$Function(handler);
        var args = $32b68f0b38053ea2$exports(arguments, 1);
        $2e64bda18621730a$var$queue[++$2e64bda18621730a$var$counter] = function() {
            $00763744308cd908$exports(fn, undefined, args);
        };
        $2e64bda18621730a$var$defer($2e64bda18621730a$var$counter);
        return $2e64bda18621730a$var$counter;
    };
    $2e64bda18621730a$var$clear = function clearImmediate(id) {
        delete $2e64bda18621730a$var$queue[id];
    };
    // Node.js 0.8-
    if ($1325e843bd807bed$exports) $2e64bda18621730a$var$defer = function(id) {
        $2e64bda18621730a$var$process.nextTick($2e64bda18621730a$var$runner(id));
    };
    else if ($2e64bda18621730a$var$Dispatch && $2e64bda18621730a$var$Dispatch.now) $2e64bda18621730a$var$defer = function(id) {
        $2e64bda18621730a$var$Dispatch.now($2e64bda18621730a$var$runner(id));
    };
    else if ($2e64bda18621730a$var$MessageChannel && !$f18a6c015f256ce9$exports) {
        $2e64bda18621730a$var$channel = new $2e64bda18621730a$var$MessageChannel();
        $2e64bda18621730a$var$port = $2e64bda18621730a$var$channel.port2;
        $2e64bda18621730a$var$channel.port1.onmessage = $2e64bda18621730a$var$listener;
        $2e64bda18621730a$var$defer = $56177ba1753d2b5b$exports($2e64bda18621730a$var$port.postMessage, $2e64bda18621730a$var$port);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if ($bad097f8efab67ef$exports.addEventListener && $6be98832355b3376$exports($bad097f8efab67ef$exports.postMessage) && !$bad097f8efab67ef$exports.importScripts && $2e64bda18621730a$var$$location && $2e64bda18621730a$var$$location.protocol !== "file:" && !$1f4ed5767aa090a5$exports($2e64bda18621730a$var$post)) {
        $2e64bda18621730a$var$defer = $2e64bda18621730a$var$post;
        $bad097f8efab67ef$exports.addEventListener("message", $2e64bda18621730a$var$listener, false);
    // IE8-
    } else if ($2e64bda18621730a$var$ONREADYSTATECHANGE in $c992180b54030a32$exports("script")) $2e64bda18621730a$var$defer = function(id) {
        $862d4a4add34a734$exports.appendChild($c992180b54030a32$exports("script"))[$2e64bda18621730a$var$ONREADYSTATECHANGE] = function() {
            $862d4a4add34a734$exports.removeChild(this);
            $2e64bda18621730a$var$run(id);
        };
    };
    else $2e64bda18621730a$var$defer = function(id) {
        setTimeout($2e64bda18621730a$var$runner(id), 0);
    };
}
$2e64bda18621730a$exports = {
    set: $2e64bda18621730a$var$set,
    clear: $2e64bda18621730a$var$clear
};


var $a1ae74b266cb0682$require$clearImmediate = $2e64bda18621730a$exports.clear;
// `clearImmediate` method
// http://w3c.github.io/setImmediate/#si-clearImmediate
$e6a37c53c774cc81$exports({
    global: true,
    bind: true,
    enumerable: true,
    forced: $bad097f8efab67ef$exports.clearImmediate !== $a1ae74b266cb0682$require$clearImmediate
}, {
    clearImmediate: $a1ae74b266cb0682$require$clearImmediate
});





var $d33f3c0b469070d6$require$setImmediate = $2e64bda18621730a$exports.set;
// `setImmediate` method
// http://w3c.github.io/setImmediate/#si-setImmediate
$e6a37c53c774cc81$exports({
    global: true,
    bind: true,
    enumerable: true,
    forced: $bad097f8efab67ef$exports.setImmediate !== $d33f3c0b469070d6$require$setImmediate
}, {
    setImmediate: $d33f3c0b469070d6$require$setImmediate
});




$54f626644962e19b$var$log("start");
const $54f626644962e19b$var$TILE_TOTAL = 225;
const $54f626644962e19b$var$PLAYER_START_TILES = [
    38,
    118,
    188,
    108
];
const $54f626644962e19b$var$OBSTACLE_TYPES = [
    "red",
    "blue",
    "yellow",
    "green",
    "purple"
];
const $54f626644962e19b$var$IN_PLAY_SURFACES = [
    1,
    3,
    4,
    5,
    7
];
function $54f626644962e19b$var$log(...val) {
// if (this === window) console.log(...val);
// else print(...val);
}
class $54f626644962e19b$var$Board {
    cubeArrays;
    cubeMap;
    constructor(){
        this.cubeArrays = this._getCubeArrays();
        this.cubeMap = this._getCubeMap(this.cubeArrays);
    }
    _checkDirection(from, to) {
        const fromTile = this.cubeMap[from];
        const toTile = this.cubeMap[to];
        if (fromTile.surface === toTile.surface) return;
        if (fromTile.surface < toTile.surface) return "up";
        else return "down";
    }
    generateObstacle(start) {
        function repeat(arr) {
            let lastPick = null;
            return ()=>{
                if (lastPick) return lastPick;
                const idx = Math.floor(Math.random() * arr.length);
                lastPick = arr[idx];
                return lastPick;
            };
        }
        // base on start, to generate the whole obstacle:
        // let start spawn the second from its left or right side, remember the side
        // let start spawn the third one from its up or down side, remember the side
        // if second is on same surface with start, let second repeat what start did
        // else let third repeat what start did
        // these can gurantee it is always a square obstacle
        const leftOrRight = [
            "left",
            "right"
        ];
        const upOrDown = [
            "up",
            "down"
        ];
        const repeatLeftOrRight = repeat(leftOrRight);
        const repeatUpOrDown = repeat(upOrDown);
        const second = this.getAdjecentTile(start, repeatLeftOrRight());
        const third = this.getAdjecentTile(start, repeatUpOrDown());
        let forth;
        if (this.cubeMap[second].surface === this.cubeMap[start].surface) forth = this.getAdjecentTile(second, repeatUpOrDown());
        else if (this.cubeMap[third].surface === this.cubeMap[start].surface) forth = this.getAdjecentTile(third, repeatLeftOrRight());
        else throw "MISFORMED_OBSTACLE";
        $54f626644962e19b$var$log("generateObstacle", [
            start,
            second,
            third,
            forth
        ]);
        return [
            start,
            second,
            third,
            forth
        ];
    }
    setAllObstactles() {
        const EDGES = {
            5: {
                col: 4
            },
            7: {
                row: 4
            }
        };
        const CORNERS = [
            70,
            145,
            140
        ];
        const tiles = Array($54f626644962e19b$var$TILE_TOTAL).fill().map((_, i)=>i + 1).filter((i)=>{
            const start = this.cubeMap[i];
            if (!$54f626644962e19b$var$PLAYER_START_TILES.includes(i) && $54f626644962e19b$var$IN_PLAY_SURFACES.includes(start.surface) && !CORNERS.includes(i) && EDGES[start.surface]?.row !== start.row && EDGES[start.surface]?.col !== start.col) return i;
        });
        const obstaclePerSurfaceCount = {};
        const OBSTACLE_TOTAL = 12;
        const ATTEMPT_TOTAL = 300;
        let obstacleCount = 0;
        let attempt = 0;
        let curColorIdx = 0;
        while(obstacleCount < OBSTACLE_TOTAL && attempt < ATTEMPT_TOTAL){
            attempt++;
            const idx = Math.floor(tiles.length * Math.random());
            const start = tiles[idx];
            try {
                const startCountOnSurface = obstaclePerSurfaceCount[this.cubeMap[start].surface];
                if (startCountOnSurface >= Math.ceil(OBSTACLE_TOTAL / 5) || this.cubeMap[start].surface === 4 && startCountOnSurface === 2) throw "enough obstacle in surface " + this.cubeMap[start].surface;
                const color = $54f626644962e19b$var$OBSTACLE_TYPES[curColorIdx % $54f626644962e19b$var$OBSTACLE_TYPES.length];
                const newObstacle = this.generateObstacle(start);
                newObstacle.forEach((i)=>{
                    if (this.cubeMap[i]?.obstacle || $54f626644962e19b$var$PLAYER_START_TILES.includes(i)) throw "OBSTACLE_CREATE_FAIL";
                    if (this.cubeMap[this.getAdjecentTile(i, "up")].obstacle || this.cubeMap[this.getAdjecentTile(i, "down")].obstacle || // this.cubeMap[this.getAdjecentTile(i, "left")].obstacle ||
                    this.cubeMap[this.getAdjecentTile(i, "right")].obstacle) throw "OBSTACLE_TOO_CROWDED";
                });
                // accept the obstacle
                newObstacle.forEach((i)=>{
                    this.cubeMap[i].obstacle = color;
                });
                obstaclePerSurfaceCount[this.cubeMap[start].surface] = startCountOnSurface ? startCountOnSurface + 1 : 1;
                obstacleCount++;
                curColorIdx++;
            } catch (err) {
                $54f626644962e19b$var$log(err, start);
            }
        }
        $54f626644962e19b$var$log("obstaclePerSurfaceCount", obstaclePerSurfaceCount);
        return {
            obstacleCount: obstacleCount,
            attempt: attempt
        };
    }
    getAdjecentTile(tile, dir) {
        const dirs = [
            "up",
            "down",
            "left",
            "right"
        ];
        if (!dirs.includes(dir)) throw "GET_ADJECEN_TILE_INCORRECT_DIR";
        const { surface: surface , row: row , col: col  } = this.cubeMap[tile];
        let result;
        // handle cross surface cases
        if (surface === 1) {
            if (row === 4 && dir === "down") result = this.cubeArrays[4][0][col];
            if (col === 0 && dir === "left") result = this.cubeArrays[3][0][row];
            if (col === 4 && dir === "right") result = this.cubeArrays[5][0][4 - row];
        } else if (surface === 5) {
            if (row === 0 && dir === "up") result = this.cubeArrays[1][4 - col][4];
            if (row === 4 && dir === "down") result = this.cubeArrays[7][col][row];
            if (col === 0 && dir === "left") result = this.cubeArrays[4][row][4];
        } else if (surface === 7) {
            if (row === 0 && dir === "up") result = this.cubeArrays[4][4][col];
            if (col === 0 && dir === "left") result = this.cubeArrays[3][4][4 - row];
            if (col === 4 && dir === "right") result = this.cubeArrays[5][4][row];
        } else if (surface === 3) {
            if (row === 0 && dir === "up") result = this.cubeArrays[1][col][0];
            if (row === 4 && dir === "down") result = this.cubeArrays[7][4 - col][0];
            if (col === 4 && dir === "right") result = this.cubeArrays[4][row][0];
        } else if (surface === 4) {
            if (row === 0 && dir === "up") result = this.cubeArrays[1][4][col];
            if (row === 4 && dir === "down") result = this.cubeArrays[7][0][col];
            if (col === 0 && dir === "left") result = this.cubeArrays[3][row][4];
            if (col === 4 && dir === "right") result = this.cubeArrays[5][row][0];
        }
        if (result) return result;
        // handle same surface cases
        switch(dir){
            case "up":
                result = this.cubeArrays[surface][row - 1][col];
                break;
            case "down":
                result = this.cubeArrays[surface][row + 1][col];
                break;
            case "left":
                result = this.cubeArrays[surface][row][col - 1];
                break;
            case "right":
                result = this.cubeArrays[surface][row][col + 1];
                break;
            default:
                break;
        }
        return result;
    }
    // it is up to the caller to provide start and end that actually inline
    getThingsInPath(start, end) {
        const a = Number.isInteger(start) ? this.cubeMap[start] : start;
        const b = Number.isInteger(end) ? this.cubeMap[end] : end;
        if (!a || !b) return null;
        // cross surface check only look at 1 nearest tile
        // will not return accurate result if point2 is not the nearest cross surface tile
        // it is up to the caller to provide correct cross surface tile
        if (a.surface !== b.surface) {
            const { obstacle: obstacle , player: player  } = b;
            if (obstacle) return {
                obstacle: obstacle
            };
            if (player) return {
                player: player
            };
        }
        if (a.col !== b.col && a.row !== b.row) throw "can only check vertically or horizontally.";
        // horizontal check
        if (a.col !== b.col) {
            if (a.col < b.col) // check right
            for(let i = a.col + 1; i <= b.col; i++){
                const { obstacle: obstacle1 , player: player1  } = this.cubeMap[$54f626644962e19b$var$cubeArrays[a.surface][a.row][i]];
                if (obstacle1) return {
                    obstacle: obstacle1,
                    distance: i - a.col
                };
                if (player1) return {
                    player: player1,
                    distance: i - a.col
                };
            }
            else // check left
            for(let i1 = a.col - 1; i1 >= b.col; i1--){
                const { obstacle: obstacle2 , player: player2  } = this.cubeMap[$54f626644962e19b$var$cubeArrays[a.surface][a.row][i1]];
                if (obstacle2) return {
                    obstacle: obstacle2,
                    distance: a.col - i1
                };
                if (player2) return {
                    player: player2,
                    distance: a.col - i1
                };
            }
        } else {
            // vertical check
            if (a.row < b.row) // check down
            for(let i2 = a.row + 1; i2 <= b.row; i2++){
                const { obstacle: obstacle3 , player: player3  } = this.cubeMap[$54f626644962e19b$var$cubeArrays[a.surface][i2][a.col]];
                if (obstacle3) return {
                    obstacle: obstacle3,
                    distance: i2 - a.row
                };
                if (player3) return {
                    player: player3,
                    distance: i2 - a.row
                };
            }
            else // check up
            for(let i3 = a.row - 1; i3 >= b.row; i3--){
                const { obstacle: obstacle4 , player: player4  } = this.cubeMap[$54f626644962e19b$var$cubeArrays[a.surface][i3][a.col]];
                if (obstacle4) return {
                    obstacle: obstacle4,
                    distance: a.row - i3
                };
                if (player4) return {
                    player: player4,
                    distance: a.row - i3
                };
            }
        }
        return null;
    }
    _getCubeArrays() {
        const subsBy5 = [
            []
        ];
        let curSubArr = 0;
        let i = 1;
        while(i <= $54f626644962e19b$var$TILE_TOTAL)if (curSubArr === 5) {
            subsBy5.push([
                i
            ]);
            curSubArr = 1;
            i++;
        } else {
            subsBy5.slice(-1)[0].push(i);
            curSubArr++;
            i++;
        }
        const result = [
            [],
            [],
            []
        ];
        curSubArr = 0;
        let round = 0;
        i = 0;
        while(i < subsBy5.length){
            if (curSubArr === 3) curSubArr = 0;
            if (result[curSubArr + round].length < 5) result[curSubArr + round].push(subsBy5[i]);
            if (result[curSubArr + round].length === 5 && curSubArr === 2 && i < subsBy5.length - 1) {
                round += 3;
                result.push([], [], []);
            }
            // log("result", result);
            curSubArr++;
            i++;
        }
        return result;
    }
    _getCubeMap(_cubeArrays) {
        const result = {};
        let i = 0;
        while(i < _cubeArrays.length){
            const surface = _cubeArrays[i];
            let j = 0;
            while(j < surface.length){
                const row = surface[j];
                let k = 0;
                while(k < row.length){
                    result[row[k]] = {
                        surface: i,
                        row: j,
                        col: k,
                        obstacle: null,
                        player: null
                    };
                    k++;
                }
                j++;
            }
            i++;
        }
        return result;
    }
}
class $54f626644962e19b$var$Player {
    static GOAL_MAP = {
        0: 2,
        1: 3,
        2: 0,
        3: 1
    };
    static DIRECTION_MAP = {
        down: {
            up: "down",
            left: "right",
            right: "left",
            down: "up"
        },
        left: {
            up: "left",
            left: "down",
            right: "up",
            down: "right"
        },
        right: {
            up: "right",
            left: "up",
            right: "down",
            down: "left"
        }
    };
    id;
    current;
    collectedObstacles = [];
    goal;
    direction;
    constructor(id, start, direction){
        this.id = id.toString();
        this.current = start;
        this.goal = $54f626644962e19b$var$PLAYER_START_TILES[$54f626644962e19b$var$Player.GOAL_MAP[id]];
        $54f626644962e19b$var$cubeMap[start].player = this.id;
        this.direction = direction;
    }
    move(next) {
        const result = {
            collideWithOtherPlayer: undefined,
            win: false
        };
        const nextTile = $54f626644962e19b$var$cubeMap[next];
        if (!nextTile || !$54f626644962e19b$var$IN_PLAY_SURFACES.includes(nextTile.surface)) throw "MOVE_FAIL_UNKNOWN_TILE";
        const currentTile = $54f626644962e19b$var$cubeMap[this.current];
        if (next === this.current) throw "MOVE_FAIL_SAME_TILE";
        if (nextTile.obstacle) throw "MOVE_FAIL_OBSTACLE";
        // can only move vertically or horizontally
        if (currentTile.col !== nextTile.col && currentTile.row !== nextTile.row && currentTile.surface === nextTile.surface) throw "MOVE_FAIL_NOT_ALLOW";
        // handle crossing surface move
        if (currentTile.surface !== nextTile.surface) {
            if ($54f626644962e19b$var$board.getAdjecentTile(this.current, this._getDirectionChange(next)) !== next) {
                $54f626644962e19b$var$log($54f626644962e19b$var$board.getAdjecentTile(this.current, this._getDirectionChange(next)));
                throw "MOVE_FAIL_INVALID_CROSS_SURFACE";
            }
        } else {
            const thingInPath = $54f626644962e19b$var$board.getThingsInPath(this.current, next);
            if (thingInPath?.obstacle) throw "MOVE_FAIL_OBSTACLE_INBETWEEN";
            if (thingInPath?.player) // todo: handle crash into other player
            throw "MOVE_FAIL_PLAYER_INBETWEEN";
        }
        if (nextTile.player) result.collideWithOtherPlayer = nextTile.player;
        if (next === this.goal) result.win = true;
        this.direction = this._getDirectionChange(next) || this.direction;
        this.current = next;
        nextTile.player = this.id;
        currentTile.player = undefined;
        renderCube();
        return result;
    }
    _getDirectionChange(next) {
        const { surface: surface  } = $54f626644962e19b$var$cubeMap[this.current];
        if ((next - this.current) % 15 === 0) {
            if (next > this.current) return "down";
            else return "up";
        } else if (Math.abs(next - this.current) <= 4) {
            if (next > this.current) return "right";
            else return "left";
        } else {
            if (surface === 1) return "down";
            if (surface === 3) return "right";
            if (surface === 5) return "left";
            if (surface === 7) return "up";
        }
        throw "FAIL_DETACT_DIRECTION";
    }
    getSurrounding() {
        // relative directions based on current player front facing direction
        const sur = this._getRawSurrounding(this.current);
        if (this.direction === "up") return sur;
        const dirMap = $54f626644962e19b$var$Player.DIRECTION_MAP[this.direction];
        const tempSur = {
            ...sur
        };
        for(let key in sur)sur[key] = tempSur[dirMap[key]];
        return sur;
    }
    _getRawSurrounding(position) {
        // absolute directions based on 2D cubeMap
        const result = {
            up: null,
            down: null,
            left: null,
            right: null
        };
        const current = $54f626644962e19b$var$cubeMap[position];
        result.up = $54f626644962e19b$var$board.getThingsInPath(current, {
            ...current,
            row: 0
        });
        result.down = $54f626644962e19b$var$board.getThingsInPath(current, {
            ...current,
            row: 4
        });
        result.left = $54f626644962e19b$var$board.getThingsInPath(current, {
            ...current,
            col: 0
        });
        result.right = $54f626644962e19b$var$board.getThingsInPath(current, {
            ...current,
            col: 4
        });
        for(let key in result)if (result[key] === null) {
            const { obstacle: obstacle , player: player  } = $54f626644962e19b$var$board.cubeMap[$54f626644962e19b$var$board.getAdjecentTile(position, key)];
            if (obstacle) result[key] = {
                obstacle: obstacle,
                distance: 1
            };
            if (player) result[key] = {
                player: player,
                distance: 1
            };
        }
        return result;
    }
}
// --------- game init ------------
const $54f626644962e19b$var$board = new $54f626644962e19b$var$Board();
const $54f626644962e19b$var$obCount = $54f626644962e19b$var$board.setAllObstactles();
const $54f626644962e19b$var$cubeMap = $54f626644962e19b$var$board.cubeMap;
const $54f626644962e19b$var$cubeArrays = $54f626644962e19b$var$board.cubeArrays;
$54f626644962e19b$var$log("total obstacles", $54f626644962e19b$var$obCount);
const $54f626644962e19b$var$DIRECTIONS = [
    "down",
    "left",
    "up",
    "right"
];
const $54f626644962e19b$var$players = $54f626644962e19b$var$PLAYER_START_TILES.map((t, i)=>new $54f626644962e19b$var$Player(i, t, $54f626644962e19b$var$DIRECTIONS[i]));
const $54f626644962e19b$var$p0 = $54f626644962e19b$var$players[0];
const $54f626644962e19b$var$p1 = $54f626644962e19b$var$players[1];
const $54f626644962e19b$var$p2 = $54f626644962e19b$var$players[2];
const $54f626644962e19b$var$p3 = $54f626644962e19b$var$players[3];
// ---------- JOYO integration ---------------
$54f626644962e19b$var$log($54f626644962e19b$var$p0.current);
function $54f626644962e19b$var$When_JOYO_Read(value) {
    print(value);
}


//# sourceMappingURL=index.js.map
