var _res;

_res = tmplUtils.multiCollection(5, 10)(function (i) {

    return tmplUtils.getTemplate('user_code.js');

});

module.exports = _res;
