/**
 * event delegate
 * hack: IE window.event, e.srcElement
 * @param  {el}   agent     parentNode
 * @param  {event}   type     event
 * @param  {selector}   selector childNode
 * @param  {callback} fn
 */
function delegate(agent, type, selector, fn) {
  agent.addEventListener(type, function(e) {
    // target: which the event occurred el
    // currentTarget: the event handler has been attached to el
    var target = e.target;
    var currentTarget = e.currentTarget;
    var bubble = true;
    while(bubble && target != currentTarget) {
      if(filiter(agent, selector, target)) {
        // prevent bubble, if bubble return false
        bubble = fn.call(target, e);
      }
      target = target.parentNode;
      return bubble;
    }
  }, false);

  function filiter(agent, selector, target) {
    var nodes = agent.querySelectorAll(selector);
    for(var i=0, len=nodes.length; i<len; i++) {
      if(nodes[i] == target) {
        return true;
      }
    }
  }
}
