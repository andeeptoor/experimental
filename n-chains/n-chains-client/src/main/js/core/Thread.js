NCHAINS.namespace('NCHAINS');

NCHAINS.Thread = (function () {
  
  /**
   * Thread
   * @param Thread configuration {
   *  task: The function to execute.
   *  taskScope: The scope to execute the function in.  Will default to window.
   *  interval: How often to execute the function.  Defaults to 1000ms
   * }
   */
  var T = function (config) { 
    this.initialConfig = config;
    
    if ($.isFunction(config.task)) {
      this.task = config.task;
    } else {
      throw "No task to execute";
    }
    
    this.taskScope = window;
    if (!$.isEmptyObject(config.taskScope)) {
      this.taskScope = config.taskScope;
    }
    
    this.interval = 1000;
    if ($.isNumeric(config.interval)) {
      this.interval = config.interval;
    }
    
    this.running = false;
  };
  
  T.prototype = {
    
    /**
     * Stops the execution.
     */
    stop: function () {
      if (this.running) {
        clearTimeout(this._execTID);
        running = false;
      }
    },
    
    /**
     * Starts the execution
     */
    start: function () {
      if (!this.running) {
        this.running = true;
        this._exec();
      }
    },

    _exec: function () {
      if (this.running) {
        // execute the task
        this.task.call(this.taskScope);

        // re-execute the task according to the defined interval.
        this._execTID = setTimeout($.proxy(function () {
          this._exec();
        }, this), this.interval);
      }
    }
    
  };
  
  return T;
  
})();