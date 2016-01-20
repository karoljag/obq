var res = {
  id: tmplUtils.stringId(),
  status: "active"
};

var _res = tmplUtils.multiCollection(5, 10)(function (i) {

    return res;

});

module.exports = _res;
