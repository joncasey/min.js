!this.$ && function(window) {
  var node    = Node.prototype
    , list    = NodeList.prototype
    , matches = 'matches matchesSelector msMatchesSelector mozMatchesSelector oMatchesSelector webkitMatchesSelector'.split(' ')
                .filter(function(fn) { return fn in document.documentElement })[0]

  node.on = window.on = function(e, fn) {
    /// <signature><param name="e" type="String"/><param name="selector" type="String"/><param name="fn" type="Function"/></signature>
    /// <signature><param name="e" type="String"/><param name="fn" type="Function"/></signature>
    if (arguments.length == 3) {
      var selector = fn ; fn = arguments[2]
      return this.on(e, function(e) {
        if (e.target[matches](selector)) {
          fn.call(e.target, e)
        }
      })
    }
    this.addEventListener(e, fn)
    return this
  }

  node.trigger = window.trigger = function(type, data) {
    var e = window.document.createEvent('HTMLEvents')
    e.initEvent(type, true, true)
    e.data = data || {}
    e.eventName = type
    e.target = this
    this.dispatchEvent(e)
    return this
  }

  list.forEach = Array.prototype.forEach
  list.on = function(e, fn) {
    this.forEach(function(el) { el.on(e, fn) })
    return this
  }

  list.trigger = function(e) {
    this.forEach(function(el) { el.trigger(e) })
    return this
  }

  window.$ = function(selector) {
    return this.document.querySelectorAll(selector)
  }

  if (!matches) {
    node[matches = 'matches'] = function(selector) {
      return Array.prototype.some.call($(selector), this)
    }
  }

}(this)
