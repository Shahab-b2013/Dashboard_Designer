/*!
 * jQuery QueryBuilder 2.6.0
 * Copyright 2014-2021 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (https://opensource.org/licenses/MIT)
 */
(function (root, factory) {
  if (typeof define == "function" && define.amd) {
    define(["jquery", "dot/doT", "jquery-extendext"], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(
      require("jquery"),
      require("dot/doT"),
      require("jquery-extendext")
    );
  } else {
    factory(root.jQuery, root.doT);
  }
})(this, function ($, doT) {
  "use strict";

  /**
   * @typedef {object} Filter
   * @memberof QueryBuilder
   * @description See {@link http://querybuilder.js.org/index.html#filters}
   */

  /**
   * @typedef {object} Operator
   * @memberof QueryBuilder
   * @description See {@link http://querybuilder.js.org/index.html#operators}
   */

  /**
   * @param {jQuery} $el
   * @param {object} options - see {@link http://querybuilder.js.org/#options}
   * @constructor
   */
  var QueryBuilder = function ($el, options) {
    $el[0].queryBuilder = this;

    /**
     * Element container
     * @member {jQuery}
     * @readonly
     */
    this.$el = $el;

    /**
     * Configuration object
     * @member {object}
     * @readonly
     */
    this.settings = $.extendext(
      true,
      "replace",
      {},
      QueryBuilder.DEFAULTS,
      options
    );

    /**
     * Internal model
     * @member {Model}
     * @readonly
     */
    this.model = new Model();

    /**
     * Internal status
     * @member {object}
     * @property {string} id - id of the container
     * @property {boolean} generated_id - if the container id has been generated
     * @property {int} group_id - current group id
     * @property {int} rule_id - current rule id
     * @property {boolean} has_optgroup - if filters have optgroups
     * @property {boolean} has_operator_optgroup - if operators have optgroups
     * @readonly
     * @private
     */
    this.status = {
      id: null,
      generated_id: false,
      group_id: 0,
      rule_id: 0,
      has_optgroup: false,
      has_operator_optgroup: false,
    };

    /**
     * List of filters
     * @member {QueryBuilder.Filter[]}
     * @readonly
     */
    this.filters = this.settings.filters;

    /**
     * List of icons
     * @member {object.<string, string>}
     * @readonly
     */
    this.icons = this.settings.icons;

    /**
     * List of operators
     * @member {QueryBuilder.Operator[]}
     * @readonly
     */
    this.operators = this.settings.operators;

    /**
     * List of templates
     * @member {object.<string, function>}
     * @readonly
     */
    this.templates = this.settings.templates;

    /**
     * Plugins configuration
     * @member {object.<string, object>}
     * @readonly
     */
    this.plugins = this.settings.plugins;

    /**
     * Translations object
     * @member {object}
     * @readonly
     */
    this.lang = null;

    // translations : english << 'lang_code' << custom
    if (QueryBuilder.regional["en"] === undefined) {
      Utils.error("Config", '"i18n/en.js" not loaded.');
    }
    this.lang = $.extendext(
      true,
      "replace",
      {},
      QueryBuilder.regional["en"],
      QueryBuilder.regional[this.settings.lang_code],
      this.settings.lang
    );

    // "allow_groups" can be boolean or int
    if (this.settings.allow_groups === false) {
      this.settings.allow_groups = 0;
    } else if (this.settings.allow_groups === true) {
      this.settings.allow_groups = -1;
    }

    // init templates
    Object.keys(this.templates).forEach(function (tpl) {
      if (!this.templates[tpl]) {
        this.templates[tpl] = QueryBuilder.templates[tpl];
      }
      if (typeof this.templates[tpl] == "string") {
        this.templates[tpl] = doT.template(this.templates[tpl]);
      }
    }, this);

    // ensure we have a container id
    if (!this.$el.attr("id")) {
      this.$el.attr("id", "qb_" + Math.floor(Math.random() * 99999));
      this.status.generated_id = true;
    }
    this.status.id = this.$el.attr("id");

    // INIT
    this.$el.addClass("query-builder form-inline");

    this.filters = this.checkFilters(this.filters);
    this.operators = this.checkOperators(this.operators);
    this.bindEvents();
    this.initPlugins();
  };

  $.extend(
    QueryBuilder.prototype,
    /** @lends QueryBuilder.prototype */ {
      /**
       * Triggers an event on the builder container
       * @param {string} type
       * @returns {$.Event}
       */
      trigger: function (type) {
        var event = new $.Event(this._tojQueryEvent(type), {
          builder: this,
        });

        this.$el.triggerHandler(
          event,
          Array.prototype.slice.call(arguments, 1)
        );

        return event;
      },

      /**
       * Triggers an event on the builder container and returns the modified value
       * @param {string} type
       * @param {*} value
       * @returns {*}
       */
      change: function (type, value) {
        var event = new $.Event(this._tojQueryEvent(type, true), {
          builder: this,
          value: value,
        });

        this.$el.triggerHandler(
          event,
          Array.prototype.slice.call(arguments, 2)
        );

        return event.value;
      },

      /**
       * Attaches an event listener on the builder container
       * @param {string} type
       * @param {function} cb
       * @returns {QueryBuilder}
       */
      on: function (type, cb) {
        this.$el.on(this._tojQueryEvent(type), cb);
        return this;
      },

      /**
       * Removes an event listener from the builder container
       * @param {string} type
       * @param {function} [cb]
       * @returns {QueryBuilder}
       */
      off: function (type, cb) {
        this.$el.off(this._tojQueryEvent(type), cb);
        return this;
      },

      /**
       * Attaches an event listener called once on the builder container
       * @param {string} type
       * @param {function} cb
       * @returns {QueryBuilder}
       */
      once: function (type, cb) {
        this.$el.one(this._tojQueryEvent(type), cb);
        return this;
      },

      /**
       * Appends `.queryBuilder` and optionally `.filter` to the events names
       * @param {string} name
       * @param {boolean} [filter=false]
       * @returns {string}
       * @private
       */
      _tojQueryEvent: function (name, filter) {
        return name
          .split(" ")
          .map(function (type) {
            return type + ".queryBuilder" + (filter ? ".filter" : "");
          })
          .join(" ");
      },
    }
  );

  /**
   * Allowed types and their internal representation
   * @type {object.<string, string>}
   * @readonly
   * @private
   */
  QueryBuilder.types = {
    string: "string",
    integer: "number",
    double: "number",
    date: "datetime",
    time: "datetime",
    datetime: "datetime",
    boolean: "boolean",
  };

  /**
   * Allowed inputs
   * @type {string[]}
   * @readonly
   * @private
   */
  QueryBuilder.inputs = [
    "text",
    "number",
    "textarea",
    "radio",
    "checkbox",
    "select",
  ];

  /**
   * Runtime modifiable options with `setOptions` method
   * @type {string[]}
   * @readonly
   * @private
   */
  QueryBuilder.modifiable_options = [
    "display_errors",
    "allow_groups",
    "allow_empty",
    "default_condition",
    "default_filter",
  ];

  /**
   * CSS selectors for common components
   * @type {object.<string, string>}
   * @readonly
   */
  QueryBuilder.selectors = {
    group_container: ".rules-group-container",
    rule_container: ".rule-container",
    filter_container: ".rule-filter-container",
    operator_container: ".rule-operator-container",
    value_container: ".rule-value-container",
    error_container: ".error-container",
    condition_container: ".rules-group-header .group-conditions",

    rule_header: ".rule-header",
    group_header: ".rules-group-header",
    group_actions: ".group-actions",
    rule_actions: ".rule-actions",

    rules_list: ".rules-group-body>.rules-list",

    group_condition: ".rules-group-header [name$=_cond]",
    rule_filter: ".rule-filter-container [name$=_filter]",
    rule_operator: ".rule-operator-container [name$=_operator]",
    rule_value: ".rule-value-container [name*=_value_]",

    add_rule: "[data-add=rule]",
    delete_rule: "[data-delete=rule]",
    add_group: "[data-add=group]",
    delete_group: "[data-delete=group]",
  };

  /**
   * Template strings (see template.js)
   * @type {object.<string, string>}
   * @readonly
   */
  QueryBuilder.templates = {};

  /**
   * Localized strings (see i18n/)
   * @type {object.<string, object>}
   * @readonly
   */
  QueryBuilder.regional = {};

  /**
   * Default operators
   * @type {object.<string, object>}
   * @readonly
   */
  QueryBuilder.OPERATORS = {
    equal: {
      type: "equal",
      nb_inputs: 1,
      multiple: false,
      apply_to: ["string", "number", "datetime", "boolean"],
    },
    not_equal: {
      type: "not_equal",
      nb_inputs: 1,
      multiple: false,
      apply_to: ["string", "number", "datetime", "boolean"],
    },
    in: {
      type: "in",
      nb_inputs: 1,
      multiple: true,
      apply_to: ["string", "number", "datetime"],
    },
    not_in: {
      type: "not_in",
      nb_inputs: 1,
      multiple: true,
      apply_to: ["string", "number", "datetime"],
    },
    less: {
      type: "less",
      nb_inputs: 1,
      multiple: false,
      apply_to: ["number", "datetime"],
    },
    less_or_equal: {
      type: "less_or_equal",
      nb_inputs: 1,
      multiple: false,
      apply_to: ["number", "datetime"],
    },
    greater: {
      type: "greater",
      nb_inputs: 1,
      multiple: false,
      apply_to: ["number", "datetime"],
    },
    greater_or_equal: {
      type: "greater_or_equal",
      nb_inputs: 1,
      multiple: false,
      apply_to: ["number", "datetime"],
    },
    between: {
      type: "between",
      nb_inputs: 2,
      multiple: false,
      apply_to: ["number", "datetime"],
    },
    not_between: {
      type: "not_between",
      nb_inputs: 2,
      multiple: false,
      apply_to: ["number", "datetime"],
    },
    begins_with: {
      type: "begins_with",
      nb_inputs: 1,
      multiple: false,
      apply_to: ["string"],
    },
    not_begins_with: {
      type: "not_begins_with",
      nb_inputs: 1,
      multiple: false,
      apply_to: ["string"],
    },
    contains: {
      type: "contains",
      nb_inputs: 1,
      multiple: false,
      apply_to: ["string"],
    },
    not_contains: {
      type: "not_contains",
      nb_inputs: 1,
      multiple: false,
      apply_to: ["string"],
    },
    ends_with: {
      type: "ends_with",
      nb_inputs: 1,
      multiple: false,
      apply_to: ["string"],
    },
    not_ends_with: {
      type: "not_ends_with",
      nb_inputs: 1,
      multiple: false,
      apply_to: ["string"],
    },
    is_empty: {
      type: "is_empty",
      nb_inputs: 0,
      multiple: false,
      apply_to: ["string"],
    },
    is_not_empty: {
      type: "is_not_empty",
      nb_inputs: 0,
      multiple: false,
      apply_to: ["string"],
    },
    is_null: {
      type: "is_null",
      nb_inputs: 0,
      multiple: false,
      apply_to: ["string", "number", "datetime", "boolean"],
    },
    is_not_null: {
      type: "is_not_null",
      nb_inputs: 0,
      multiple: false,
      apply_to: ["string", "number", "datetime", "boolean"],
    },
  };

  /**
   * Default configuration
   * @type {object}
   * @readonly
   */
  QueryBuilder.DEFAULTS = {
    filters: [],
    plugins: [],

    sort_filters: false,
    display_errors: true,
    allow_groups: -1,
    allow_empty: false,
    conditions: ["AND", "OR"],
    default_condition: "AND",
    inputs_separator: " , ",
    select_placeholder: "------",
    display_empty_filter: true,
    default_filter: null,
    optgroups: {},

    default_rule_flags: {
      filter_readonly: false,
      operator_readonly: false,
      value_readonly: false,
      no_delete: false,
    },

    default_group_flags: {
      condition_readonly: false,
      no_add_rule: false,
      no_add_group: false,
      no_delete: false,
    },

    templates: {
      group: null,
      rule: null,
      filterSelect: null,
      operatorSelect: null,
      ruleValueSelect: null,
    },

    lang_code: "en",
    lang: {},

    operators: [
      "equal",
      "not_equal",
      "in",
      "not_in",
      "less",
      "less_or_equal",
      "greater",
      "greater_or_equal",
      "between",
      "not_between",
      "begins_with",
      "not_begins_with",
      "contains",
      "not_contains",
      "ends_with",
      "not_ends_with",
      "is_empty",
      "is_not_empty",
      "is_null",
      "is_not_null",
    ],

    icons: {
      add_group: "glyphicon glyphicon-plus-sign",
      add_rule: "glyphicon glyphicon-plus",
      remove_group: "glyphicon glyphicon-remove",
      remove_rule: "glyphicon glyphicon-remove",
      error: "glyphicon glyphicon-warning-sign",
    },
  };

  /**
   * @module plugins
   */

  /**
   * Definition of available plugins
   * @type {object.<String, object>}
   */
  QueryBuilder.plugins = {};

  /**
   * Gets or extends the default configuration
   * @param {object} [options] - new configuration
   * @returns {undefined|object} nothing or configuration object (copy)
   */
  QueryBuilder.defaults = function (options) {
    if (typeof options == "object") {
      $.extendext(true, "replace", QueryBuilder.DEFAULTS, options);
    } else if (typeof options == "string") {
      if (typeof QueryBuilder.DEFAULTS[options] == "object") {
        return $.extend(true, {}, QueryBuilder.DEFAULTS[options]);
      } else {
        return QueryBuilder.DEFAULTS[options];
      }
    } else {
      return $.extend(true, {}, QueryBuilder.DEFAULTS);
    }
  };

  /**
   * Registers a new plugin
   * @param {string} name
   * @param {function} fct - init function
   * @param {object} [def] - default options
   */
  QueryBuilder.define = function (name, fct, def) {
    QueryBuilder.plugins[name] = {
      fct: fct,
      def: def || {},
    };
  };

  /**
   * Adds new methods to QueryBuilder prototype
   * @param {object.<string, function>} methods
   */
  QueryBuilder.extend = function (methods) {
    $.extend(QueryBuilder.prototype, methods);
  };

  /**
   * Initializes plugins for an instance
   * @throws ConfigError
   * @private
   */
  QueryBuilder.prototype.initPlugins = function () {
    if (!this.plugins) {
      return;
    }

    if ($.isArray(this.plugins)) {
      var tmp = {};
      this.plugins.forEach(function (plugin) {
        tmp[plugin] = null;
      });
      this.plugins = tmp;
    }

    Object.keys(this.plugins).forEach(function (plugin) {
      if (plugin in QueryBuilder.plugins) {
        this.plugins[plugin] = $.extend(
          true,
          {},
          QueryBuilder.plugins[plugin].def,
          this.plugins[plugin] || {}
        );

        QueryBuilder.plugins[plugin].fct.call(this, this.plugins[plugin]);
      } else {
        Utils.error("Config", 'Unable to find plugin "{0}"', plugin);
      }
    }, this);
  };

  /**
   * Returns the config of a plugin, if the plugin is not loaded, returns the default config.
   * @param {string} name
   * @param {string} [property]
   * @throws ConfigError
   * @returns {*}
   */
  QueryBuilder.prototype.getPluginOptions = function (name, property) {
    var plugin;
    if (this.plugins && this.plugins[name]) {
      plugin = this.plugins[name];
    } else if (QueryBuilder.plugins[name]) {
      plugin = QueryBuilder.plugins[name].def;
    }

    if (plugin) {
      if (property) {
        return plugin[property];
      } else {
        return plugin;
      }
    } else {
      Utils.error("Config", 'Unable to find plugin "{0}"', name);
    }
  };

  /**
   * Final initialisation of the builder
   * @param {object} [rules]
   * @fires QueryBuilder.afterInit
   * @private
   */
  QueryBuilder.prototype.init = function (rules) {
    /**
     * When the initilization is done, just before creating the root group
     * @event afterInit
     * @memberof QueryBuilder
     */
    this.trigger("afterInit");

    if (rules) {
      this.setRules(rules);
      delete this.settings.rules;
    } else {
      this.setRoot(true);
    }
  };

  /**
   * Checks the configuration of each filter
   * @param {QueryBuilder.Filter[]} filters
   * @returns {QueryBuilder.Filter[]}
   * @throws ConfigError
   */
  QueryBuilder.prototype.checkFilters = function (filters) {
    var definedFilters = [];

    if (!filters || filters.length === 0) {
      Utils.error("Config", "Missing filters list");
    }

    filters.forEach(function (filter, i) {
      if (!filter.id) {
        Utils.error("Config", "Missing filter {0} id", i);
      }
      if (definedFilters.indexOf(filter.id) != -1) {
        Utils.error("Config", 'Filter "{0}" already defined', filter.id);
      }
      definedFilters.push(filter.id);

      if (!filter.type) {
        filter.type = "string";
      } else if (!QueryBuilder.types[filter.type]) {
        Utils.error("Config", 'Invalid type "{0}"', filter.type);
      }

      if (!filter.input) {
        filter.input =
          QueryBuilder.types[filter.type] === "number" ? "number" : "text";
      } else if (
        typeof filter.input != "function" &&
        QueryBuilder.inputs.indexOf(filter.input) == -1
      ) {
        Utils.error("Config", 'Invalid input "{0}"', filter.input);
      }

      if (filter.operators) {
        filter.operators.forEach(function (operator) {
          if (typeof operator != "string") {
            Utils.error(
              "Config",
              "Filter operators must be global operators types (string)"
            );
          }
        });
      }

      if (!filter.field) {
        filter.field = filter.id;
      }
      if (!filter.label) {
        filter.label = filter.field;
      }

      if (!filter.optgroup) {
        filter.optgroup = null;
      } else {
        this.status.has_optgroup = true;

        // register optgroup if needed
        if (!this.settings.optgroups[filter.optgroup]) {
          this.settings.optgroups[filter.optgroup] = filter.optgroup;
        }
      }

      switch (filter.input) {
        case "radio":
        case "checkbox":
          if (!filter.values || filter.values.length < 1) {
            Utils.error("Config", 'Missing filter "{0}" values', filter.id);
          }
          break;

        case "select":
          var cleanValues = [];
          filter.has_optgroup = false;

          Utils.iterateOptions(
            filter.values,
            function (value, label, optgroup) {
              cleanValues.push({
                value: value,
                label: label,
                optgroup: optgroup || null,
              });

              if (optgroup) {
                filter.has_optgroup = true;

                // register optgroup if needed
                if (!this.settings.optgroups[optgroup]) {
                  this.settings.optgroups[optgroup] = optgroup;
                }
              }
            }.bind(this)
          );

          if (filter.has_optgroup) {
            filter.values = Utils.groupSort(cleanValues, "optgroup");
          } else {
            filter.values = cleanValues;
          }

          if (filter.placeholder) {
            if (filter.placeholder_value === undefined) {
              filter.placeholder_value = -1;
            }

            filter.values.forEach(function (entry) {
              if (entry.value == filter.placeholder_value) {
                Utils.error(
                  "Config",
                  'Placeholder of filter "{0}" overlaps with one of its values',
                  filter.id
                );
              }
            });
          }
          break;
      }
    }, this);

    if (this.settings.sort_filters) {
      if (typeof this.settings.sort_filters == "function") {
        filters.sort(this.settings.sort_filters);
      } else {
        var self = this;
        filters.sort(function (a, b) {
          return self.translate(a.label).localeCompare(self.translate(b.label));
        });
      }
    }

    if (this.status.has_optgroup) {
      filters = Utils.groupSort(filters, "optgroup");
    }

    return filters;
  };

  /**
   * Checks the configuration of each operator
   * @param {QueryBuilder.Operator[]} operators
   * @returns {QueryBuilder.Operator[]}
   * @throws ConfigError
   */
  QueryBuilder.prototype.checkOperators = function (operators) {
    var definedOperators = [];

    operators.forEach(function (operator, i) {
      if (typeof operator == "string") {
        if (!QueryBuilder.OPERATORS[operator]) {
          Utils.error("Config", 'Unknown operator "{0}"', operator);
        }

        operators[i] = operator = $.extendext(
          true,
          "replace",
          {},
          QueryBuilder.OPERATORS[operator]
        );
      } else {
        if (!operator.type) {
          Utils.error("Config", 'Missing "type" for operator {0}', i);
        }

        if (QueryBuilder.OPERATORS[operator.type]) {
          operators[i] = operator = $.extendext(
            true,
            "replace",
            {},
            QueryBuilder.OPERATORS[operator.type],
            operator
          );
        }

        if (
          operator.nb_inputs === undefined ||
          operator.apply_to === undefined
        ) {
          Utils.error(
            "Config",
            'Missing "nb_inputs" and/or "apply_to" for operator "{0}"',
            operator.type
          );
        }
      }

      if (definedOperators.indexOf(operator.type) != -1) {
        Utils.error("Config", 'Operator "{0}" already defined', operator.type);
      }
      definedOperators.push(operator.type);

      if (!operator.optgroup) {
        operator.optgroup = null;
      } else {
        this.status.has_operator_optgroup = true;

        // register optgroup if needed
        if (!this.settings.optgroups[operator.optgroup]) {
          this.settings.optgroups[operator.optgroup] = operator.optgroup;
        }
      }
    }, this);

    if (this.status.has_operator_optgroup) {
      operators = Utils.groupSort(operators, "optgroup");
    }

    return operators;
  };

  /**
   * Adds all events listeners to the builder
   * @private
   */
  QueryBuilder.prototype.bindEvents = function () {
    var self = this;
    var Selectors = QueryBuilder.selectors;

    // group condition change
    this.$el.on("change.queryBuilder", Selectors.group_condition, function () {
      if ($(this).is(":checked")) {
        var $group = $(this).closest(Selectors.group_container);
        self.getModel($group).condition = $(this).val();
      }
    });

    // rule filter change
    this.$el.on("change.queryBuilder", Selectors.rule_filter, function () {
      var $rule = $(this).closest(Selectors.rule_container);
      self.getModel($rule).filter = self.getFilterById($(this).val());
    });

    // rule operator change
    this.$el.on("change.queryBuilder", Selectors.rule_operator, function () {
      var $rule = $(this).closest(Selectors.rule_container);
      self.getModel($rule).operator = self.getOperatorByType($(this).val());
    });

    // add rule button
    this.$el.on("click.queryBuilder", Selectors.add_rule, function () {
      var $group = $(this).closest(Selectors.group_container);
      self.addRule(self.getModel($group));
    });

    // delete rule button
    this.$el.on("click.queryBuilder", Selectors.delete_rule, function () {
      var $rule = $(this).closest(Selectors.rule_container);
      self.deleteRule(self.getModel($rule));
    });

    if (this.settings.allow_groups !== 0) {
      // add group button
      this.$el.on("click.queryBuilder", Selectors.add_group, function () {
        var $group = $(this).closest(Selectors.group_container);
        self.addGroup(self.getModel($group));
      });

      // delete group button
      this.$el.on("click.queryBuilder", Selectors.delete_group, function () {
        var $group = $(this).closest(Selectors.group_container);
        self.deleteGroup(self.getModel($group));
      });
    }

    // model events
    this.model.on({
      drop: function (e, node) {
        node.$el.remove();
        self.refreshGroupsConditions();
      },
      add: function (e, parent, node, index) {
        if (index === 0) {
          node.$el.prependTo(
            parent.$el.find(">" + QueryBuilder.selectors.rules_list)
          );
        } else {
          node.$el.insertAfter(parent.rules[index - 1].$el);
        }
        self.refreshGroupsConditions();
      },
      move: function (e, node, group, index) {
        node.$el.detach();

        if (index === 0) {
          node.$el.prependTo(
            group.$el.find(">" + QueryBuilder.selectors.rules_list)
          );
        } else {
          node.$el.insertAfter(group.rules[index - 1].$el);
        }
        self.refreshGroupsConditions();
      },
      update: function (e, node, field, value, oldValue) {
        if (node instanceof Rule) {
          switch (field) {
            case "error":
              self.updateError(node);
              break;

            case "flags":
              self.applyRuleFlags(node);
              break;

            case "filter":
              self.updateRuleFilter(node, oldValue);
              break;

            case "operator":
              self.updateRuleOperator(node, oldValue);
              break;

            case "value":
              self.updateRuleValue(node, oldValue);
              break;
          }
        } else {
          switch (field) {
            case "error":
              self.updateError(node);
              break;

            case "flags":
              self.applyGroupFlags(node);
              break;

            case "condition":
              self.updateGroupCondition(node, oldValue);
              break;
          }
        }
      },
    });
  };

  /**
   * Creates the root group
   * @param {boolean} [addRule=true] - adds a default empty rule
   * @param {object} [data] - group custom data
   * @param {object} [flags] - flags to apply to the group
   * @returns {Group} root group
   * @fires QueryBuilder.afterAddGroup
   */
  QueryBuilder.prototype.setRoot = function (addRule, data, flags) {
    addRule = addRule === undefined || addRule === true;

    var group_id = this.nextGroupId();
    var $group = $($.parseHTML(this.getGroupTemplate(group_id, 1)));

    this.$el.append($group);
    this.model.root = new Group(null, $group);
    this.model.root.model = this.model;

    this.model.root.data = data;
    this.model.root.flags = $.extend(
      {},
      this.settings.default_group_flags,
      flags
    );
    this.model.root.condition = this.settings.default_condition;

    this.trigger("afterAddGroup", this.model.root);

    if (addRule) {
      this.addRule(this.model.root);
    }

    return this.model.root;
  };

  /**
   * Adds a new group
   * @param {Group} parent
   * @param {boolean} [addRule=true] - adds a default empty rule
   * @param {object} [data] - group custom data
   * @param {object} [flags] - flags to apply to the group
   * @returns {Group}
   * @fires QueryBuilder.beforeAddGroup
   * @fires QueryBuilder.afterAddGroup
   */
  QueryBuilder.prototype.addGroup = function (parent, addRule, data, flags) {
    addRule = addRule === undefined || addRule === true;

    var level = parent.level + 1;

    /**
     * Just before adding a group, can be prevented.
     * @event beforeAddGroup
     * @memberof QueryBuilder
     * @param {Group} parent
     * @param {boolean} addRule - if an empty rule will be added in the group
     * @param {int} level - nesting level of the group, 1 is the root group
     */
    var e = this.trigger("beforeAddGroup", parent, addRule, level);
    if (e.isDefaultPrevented()) {
      return null;
    }

    var group_id = this.nextGroupId();
    var $group = $(this.getGroupTemplate(group_id, level));
    var model = parent.addGroup($group);

    model.data = data;
    model.flags = $.extend({}, this.settings.default_group_flags, flags);
    model.condition = this.settings.default_condition;

    /**
     * Just after adding a group
     * @event afterAddGroup
     * @memberof QueryBuilder
     * @param {Group} group
     */
    this.trigger("afterAddGroup", model);

    /**
     * After any change in the rules
     * @event rulesChanged
     * @memberof QueryBuilder
     */
    this.trigger("rulesChanged");

    if (addRule) {
      this.addRule(model);
    }

    return model;
  };

  /**
   * Tries to delete a group. The group is not deleted if at least one rule is flagged `no_delete`.
   * @param {Group} group
   * @returns {boolean} if the group has been deleted
   * @fires QueryBuilder.beforeDeleteGroup
   * @fires QueryBuilder.afterDeleteGroup
   */
  QueryBuilder.prototype.deleteGroup = function (group) {
    if (group.isRoot()) {
      return false;
    }

    /**
     * Just before deleting a group, can be prevented
     * @event beforeDeleteGroup
     * @memberof QueryBuilder
     * @param {Group} parent
     */
    var e = this.trigger("beforeDeleteGroup", group);
    if (e.isDefaultPrevented()) {
      return false;
    }

    var del = true;

    group.each(
      "reverse",
      function (rule) {
        del &= this.deleteRule(rule);
      },
      function (group) {
        del &= this.deleteGroup(group);
      },
      this
    );

    if (del) {
      group.drop();

      /**
       * Just after deleting a group
       * @event afterDeleteGroup
       * @memberof QueryBuilder
       */
      this.trigger("afterDeleteGroup");

      this.trigger("rulesChanged");
    }

    return del;
  };

  /**
   * Performs actions when a group's condition changes
   * @param {Group} group
   * @param {object} previousCondition
   * @fires QueryBuilder.afterUpdateGroupCondition
   * @private
   */
  QueryBuilder.prototype.updateGroupCondition = function (
    group,
    previousCondition
  ) {
    group.$el
      .find(">" + QueryBuilder.selectors.group_condition)
      .each(function () {
        var $this = $(this);
        $this.prop("checked", $this.val() === group.condition);
        $this.parent().toggleClass("active", $this.val() === group.condition);
      });

    /**
     * After the group condition has been modified
     * @event afterUpdateGroupCondition
     * @memberof QueryBuilder
     * @param {Group} group
     * @param {object} previousCondition
     */
    this.trigger("afterUpdateGroupCondition", group, previousCondition);

    this.trigger("rulesChanged");
  };

  /**
   * Updates the visibility of conditions based on number of rules inside each group
   * @private
   */
  QueryBuilder.prototype.refreshGroupsConditions = function () {
    (function walk(group) {
      if (!group.flags || (group.flags && !group.flags.condition_readonly)) {
        group.$el
          .find(">" + QueryBuilder.selectors.group_condition)
          .prop("disabled", group.rules.length <= 1)
          .parent()
          .toggleClass("disabled", group.rules.length <= 1);
      }

      group.each(
        null,
        function (group) {
          walk(group);
        },
        this
      );
    })(this.model.root);
  };

  /**
   * Adds a new rule
   * @param {Group} parent
   * @param {object} [data] - rule custom data
   * @param {object} [flags] - flags to apply to the rule
   * @returns {Rule}
   * @fires QueryBuilder.beforeAddRule
   * @fires QueryBuilder.afterAddRule
   * @fires QueryBuilder.changer:getDefaultFilter
   */
  QueryBuilder.prototype.addRule = function (parent, data, flags) {
    /**
     * Just before adding a rule, can be prevented
     * @event beforeAddRule
     * @memberof QueryBuilder
     * @param {Group} parent
     */
    var e = this.trigger("beforeAddRule", parent);
    if (e.isDefaultPrevented()) {
      return null;
    }

    var rule_id = this.nextRuleId();
    var $rule = $($.parseHTML(this.getRuleTemplate(rule_id)));
    var model = parent.addRule($rule);

    model.data = data;
    model.flags = $.extend({}, this.settings.default_rule_flags, flags);

    /**
     * Just after adding a rule
     * @event afterAddRule
     * @memberof QueryBuilder
     * @param {Rule} rule
     */
    this.trigger("afterAddRule", model);

    this.trigger("rulesChanged");

    this.createRuleFilters(model);

    if (this.settings.default_filter || !this.settings.display_empty_filter) {
      /**
       * Modifies the default filter for a rule
       * @event changer:getDefaultFilter
       * @memberof QueryBuilder
       * @param {QueryBuilder.Filter} filter
       * @param {Rule} rule
       * @returns {QueryBuilder.Filter}
       */
      model.filter = this.change(
        "getDefaultFilter",
        this.getFilterById(this.settings.default_filter || this.filters[0].id),
        model
      );
    }

    return model;
  };

  /**
   * Tries to delete a rule
   * @param {Rule} rule
   * @returns {boolean} if the rule has been deleted
   * @fires QueryBuilder.beforeDeleteRule
   * @fires QueryBuilder.afterDeleteRule
   */
  QueryBuilder.prototype.deleteRule = function (rule) {
    if (rule.flags.no_delete) {
      return false;
    }

    /**
     * Just before deleting a rule, can be prevented
     * @event beforeDeleteRule
     * @memberof QueryBuilder
     * @param {Rule} rule
     */
    var e = this.trigger("beforeDeleteRule", rule);
    if (e.isDefaultPrevented()) {
      return false;
    }

    rule.drop();

    /**
     * Just after deleting a rule
     * @event afterDeleteRule
     * @memberof QueryBuilder
     */
    this.trigger("afterDeleteRule");

    this.trigger("rulesChanged");

    return true;
  };

  /**
   * Creates the filters for a rule
   * @param {Rule} rule
   * @fires QueryBuilder.changer:getRuleFilters
   * @fires QueryBuilder.afterCreateRuleFilters
   * @private
   */
  QueryBuilder.prototype.createRuleFilters = function (rule) {
    /**
     * Modifies the list a filters available for a rule
     * @event changer:getRuleFilters
     * @memberof QueryBuilder
     * @param {QueryBuilder.Filter[]} filters
     * @param {Rule} rule
     * @returns {QueryBuilder.Filter[]}
     */
    var filters = this.change("getRuleFilters", this.filters, rule);
    var $filterSelect = $($.parseHTML(this.getRuleFilterSelect(rule, filters)));

    rule.$el.find(QueryBuilder.selectors.filter_container).html($filterSelect);

    /**
     * After creating the dropdown for filters
     * @event afterCreateRuleFilters
     * @memberof QueryBuilder
     * @param {Rule} rule
     */
    this.trigger("afterCreateRuleFilters", rule);

    this.applyRuleFlags(rule);
  };

  /**
   * Creates the operators for a rule and init the rule operator
   * @param {Rule} rule
   * @fires QueryBuilder.afterCreateRuleOperators
   * @private
   */
  QueryBuilder.prototype.createRuleOperators = function (rule) {
    var $operatorContainer = rule.$el
      .find(QueryBuilder.selectors.operator_container)
      .empty();

    if (!rule.filter) {
      return;
    }

    var operators = this.getOperators(rule.filter);
    var $operatorSelect = $(
      $.parseHTML(this.getRuleOperatorSelect(rule, operators))
    );

    $operatorContainer.html($operatorSelect);

    // set the operator without triggering update event
    if (rule.filter.default_operator) {
      rule.__.operator = this.getOperatorByType(rule.filter.default_operator);
    } else {
      rule.__.operator = operators[0];
    }

    rule.$el.find(QueryBuilder.selectors.rule_operator).val(rule.operator.type);

    /**
     * After creating the dropdown for operators
     * @event afterCreateRuleOperators
     * @memberof QueryBuilder
     * @param {Rule} rule
     * @param {QueryBuilder.Operator[]} operators - allowed operators for this rule
     */
    this.trigger("afterCreateRuleOperators", rule, operators);

    this.applyRuleFlags(rule);
  };

  /**
   * Creates the main input for a rule
   * @param {Rule} rule
   * @fires QueryBuilder.afterCreateRuleInput
   * @private
   */
  QueryBuilder.prototype.createRuleInput = function (rule) {
    var $valueContainer = rule.$el
      .find(QueryBuilder.selectors.value_container)
      .empty();

    rule.__.value = undefined;

    if (!rule.filter || !rule.operator || rule.operator.nb_inputs === 0) {
      return;
    }

    var self = this;
    var $inputs = $();
    var filter = rule.filter;

    for (var i = 0; i < rule.operator.nb_inputs; i++) {
      var $ruleInput = $($.parseHTML(this.getRuleInput(rule, i)));
      if (i > 0) $valueContainer.append(this.settings.inputs_separator);
      $valueContainer.append($ruleInput);
      $inputs = $inputs.add($ruleInput);
    }

    $valueContainer.css("display", "");

    $inputs.on("change " + (filter.input_event || ""), function () {
      if (!rule._updating_input) {
        rule._updating_value = true;
        rule.value = self.getRuleInputValue(rule);
        rule._updating_value = false;
      }
    });

    if (filter.plugin) {
      $inputs[filter.plugin](filter.plugin_config || {});
    }

    /**
     * After creating the input for a rule and initializing optional plugin
     * @event afterCreateRuleInput
     * @memberof QueryBuilder
     * @param {Rule} rule
     */
    this.trigger("afterCreateRuleInput", rule);

    if (filter.default_value !== undefined) {
      rule.value = filter.default_value;
    } else {
      rule._updating_value = true;
      rule.value = self.getRuleInputValue(rule);
      rule._updating_value = false;
    }

    this.applyRuleFlags(rule);
  };

  /**
   * Performs action when a rule's filter changes
   * @param {Rule} rule
   * @param {object} previousFilter
   * @fires QueryBuilder.afterUpdateRuleFilter
   * @private
   */
  QueryBuilder.prototype.updateRuleFilter = function (rule, previousFilter) {
    this.createRuleOperators(rule);
    this.createRuleInput(rule);

    rule.$el
      .find(QueryBuilder.selectors.rule_filter)
      .val(rule.filter ? rule.filter.id : "-1");

    // clear rule data if the filter changed
    if (previousFilter && rule.filter && previousFilter.id !== rule.filter.id) {
      rule.data = undefined;
    }

    /**
     * After the filter has been updated and the operators and input re-created
     * @event afterUpdateRuleFilter
     * @memberof QueryBuilder
     * @param {Rule} rule
     * @param {object} previousFilter
     */
    this.trigger("afterUpdateRuleFilter", rule, previousFilter);

    this.trigger("rulesChanged");
  };

  /**
   * Performs actions when a rule's operator changes
   * @param {Rule} rule
   * @param {object} previousOperator
   * @fires QueryBuilder.afterUpdateRuleOperator
   * @private
   */
  QueryBuilder.prototype.updateRuleOperator = function (
    rule,
    previousOperator
  ) {
    var $valueContainer = rule.$el.find(QueryBuilder.selectors.value_container);

    if (!rule.operator || rule.operator.nb_inputs === 0) {
      $valueContainer.hide();

      rule.__.value = undefined;
    } else {
      $valueContainer.css("display", "");

      if (
        $valueContainer.is(":empty") ||
        !previousOperator ||
        rule.operator.nb_inputs !== previousOperator.nb_inputs ||
        rule.operator.optgroup !== previousOperator.optgroup
      ) {
        this.createRuleInput(rule);
      }
    }

    if (rule.operator) {
      rule.$el
        .find(QueryBuilder.selectors.rule_operator)
        .val(rule.operator.type);

      // refresh value if the format changed for this operator
      rule.__.value = this.getRuleInputValue(rule);
    }

    /**
     *  After the operator has been updated and the input optionally re-created
     * @event afterUpdateRuleOperator
     * @memberof QueryBuilder
     * @param {Rule} rule
     * @param {object} previousOperator
     */
    this.trigger("afterUpdateRuleOperator", rule, previousOperator);

    this.trigger("rulesChanged");
  };

  /**
   * Performs actions when rule's value changes
   * @param {Rule} rule
   * @param {object} previousValue
   * @fires QueryBuilder.afterUpdateRuleValue
   * @private
   */
  QueryBuilder.prototype.updateRuleValue = function (rule, previousValue) {
    if (!rule._updating_value) {
      this.setRuleInputValue(rule, rule.value);
    }

    /**
     * After the rule value has been modified
     * @event afterUpdateRuleValue
     * @memberof QueryBuilder
     * @param {Rule} rule
     * @param {*} previousValue
     */
    this.trigger("afterUpdateRuleValue", rule, previousValue);

    this.trigger("rulesChanged");
  };

  /**
   * Changes a rule's properties depending on its flags
   * @param {Rule} rule
   * @fires QueryBuilder.afterApplyRuleFlags
   * @private
   */
  QueryBuilder.prototype.applyRuleFlags = function (rule) {
    var flags = rule.flags;
    var Selectors = QueryBuilder.selectors;

    rule.$el
      .find(Selectors.rule_filter)
      .prop("disabled", flags.filter_readonly);
    rule.$el
      .find(Selectors.rule_operator)
      .prop("disabled", flags.operator_readonly);
    rule.$el.find(Selectors.rule_value).prop("disabled", flags.value_readonly);

    if (flags.no_delete) {
      rule.$el.find(Selectors.delete_rule).remove();
    }

    /**
     * After rule's flags has been applied
     * @event afterApplyRuleFlags
     * @memberof QueryBuilder
     * @param {Rule} rule
     */
    this.trigger("afterApplyRuleFlags", rule);
  };

  /**
   * Changes group's properties depending on its flags
   * @param {Group} group
   * @fires QueryBuilder.afterApplyGroupFlags
   * @private
   */
  QueryBuilder.prototype.applyGroupFlags = function (group) {
    var flags = group.flags;
    var Selectors = QueryBuilder.selectors;

    group.$el
      .find(">" + Selectors.group_condition)
      .prop("disabled", flags.condition_readonly)
      .parent()
      .toggleClass("readonly", flags.condition_readonly);

    if (flags.no_add_rule) {
      group.$el.find(Selectors.add_rule).remove();
    }
    if (flags.no_add_group) {
      group.$el.find(Selectors.add_group).remove();
    }
    if (flags.no_delete) {
      group.$el.find(Selectors.delete_group).remove();
    }

    /**
     * After group's flags has been applied
     * @event afterApplyGroupFlags
     * @memberof QueryBuilder
     * @param {Group} group
     */
    this.trigger("afterApplyGroupFlags", group);
  };

  /**
   * Clears all errors markers
   * @param {Node} [node] default is root Group
   */
  QueryBuilder.prototype.clearErrors = function (node) {
    node = node || this.model.root;

    if (!node) {
      return;
    }

    node.error = null;

    if (node instanceof Group) {
      node.each(
        function (rule) {
          rule.error = null;
        },
        function (group) {
          this.clearErrors(group);
        },
        this
      );
    }
  };

  /**
   * Adds/Removes error on a Rule or Group
   * @param {Node} node
   * @fires QueryBuilder.changer:displayError
   * @private
   */
  QueryBuilder.prototype.updateError = function (node) {
    if (this.settings.display_errors) {
      if (node.error === null) {
        node.$el.removeClass("has-error");
      } else {
        var errorMessage = this.translate("errors", node.error[0]);
        errorMessage = Utils.fmt(errorMessage, node.error.slice(1));

        /**
         * Modifies an error message before display
         * @event changer:displayError
         * @memberof QueryBuilder
         * @param {string} errorMessage - the error message (translated and formatted)
         * @param {array} error - the raw error array (error code and optional arguments)
         * @param {Node} node
         * @returns {string}
         */
        errorMessage = this.change(
          "displayError",
          errorMessage,
          node.error,
          node
        );

        node.$el
          .addClass("has-error")
          .find(QueryBuilder.selectors.error_container)
          .eq(0)
          .attr("title", errorMessage);
      }
    }
  };

  /**
   * Triggers a validation error event
   * @param {Node} node
   * @param {string|array} error
   * @param {*} value
   * @fires QueryBuilder.validationError
   * @private
   */
  QueryBuilder.prototype.triggerValidationError = function (
    node,
    error,
    value
  ) {
    if (!$.isArray(error)) {
      error = [error];
    }

    /**
     * Fired when a validation error occurred, can be prevented
     * @event validationError
     * @memberof QueryBuilder
     * @param {Node} node
     * @param {string} error
     * @param {*} value
     */
    var e = this.trigger("validationError", node, error, value);
    if (!e.isDefaultPrevented()) {
      node.error = error;
    }
  };

  /**
   * Destroys the builder
   * @fires QueryBuilder.beforeDestroy
   */
  QueryBuilder.prototype.destroy = function () {
    /**
     * Before the {@link QueryBuilder#destroy} method
     * @event beforeDestroy
     * @memberof QueryBuilder
     */
    this.trigger("beforeDestroy");

    if (this.status.generated_id) {
      this.$el.removeAttr("id");
    }

    this.clear();
    this.model = null;

    this.$el
      .off(".queryBuilder")
      .removeClass("query-builder")
      .removeData("queryBuilder");

    delete this.$el[0].queryBuilder;
  };

  /**
   * Clear all rules and resets the root group
   * @fires QueryBuilder.beforeReset
   * @fires QueryBuilder.afterReset
   */
  QueryBuilder.prototype.reset = function () {
    /**
     * Before the {@link QueryBuilder#reset} method, can be prevented
     * @event beforeReset
     * @memberof QueryBuilder
     */
    var e = this.trigger("beforeReset");
    if (e.isDefaultPrevented()) {
      return;
    }

    this.status.group_id = 1;
    this.status.rule_id = 0;

    this.model.root.empty();

    this.model.root.data = undefined;
    this.model.root.flags = $.extend({}, this.settings.default_group_flags);
    this.model.root.condition = this.settings.default_condition;

    this.addRule(this.model.root);

    /**
     * After the {@link QueryBuilder#reset} method
     * @event afterReset
     * @memberof QueryBuilder
     */
    this.trigger("afterReset");

    this.trigger("rulesChanged");
  };

  /**
   * Clears all rules and removes the root group
   * @fires QueryBuilder.beforeClear
   * @fires QueryBuilder.afterClear
   */
  QueryBuilder.prototype.clear = function () {
    /**
     * Before the {@link QueryBuilder#clear} method, can be prevented
     * @event beforeClear
     * @memberof QueryBuilder
     */
    var e = this.trigger("beforeClear");
    if (e.isDefaultPrevented()) {
      return;
    }

    this.status.group_id = 0;
    this.status.rule_id = 0;

    if (this.model.root) {
      this.model.root.drop();
      this.model.root = null;
    }

    /**
     * After the {@link QueryBuilder#clear} method
     * @event afterClear
     * @memberof QueryBuilder
     */
    this.trigger("afterClear");

    this.trigger("rulesChanged");
  };

  /**
   * Modifies the builder configuration.<br>
   * Only options defined in QueryBuilder.modifiable_options are modifiable
   * @param {object} options
   */
  QueryBuilder.prototype.setOptions = function (options) {
    $.each(
      options,
      function (opt, value) {
        if (QueryBuilder.modifiable_options.indexOf(opt) !== -1) {
          this.settings[opt] = value;
        }
      }.bind(this)
    );
  };

  /**
   * Returns the model associated to a DOM object, or the root model
   * @param {jQuery} [target]
   * @returns {Node}
   */
  QueryBuilder.prototype.getModel = function (target) {
    if (!target) {
      return this.model.root;
    } else if (target instanceof Node) {
      return target;
    } else {
      return $(target).data("queryBuilderModel");
    }
  };

  /**
   * Validates the whole builder
   * @param {object} [options]
   * @param {boolean} [options.skip_empty=false] - skips validating rules that have no filter selected
   * @returns {boolean}
   * @fires QueryBuilder.changer:validate
   */
  QueryBuilder.prototype.validate = function (options) {
    options = $.extend(
      {
        skip_empty: false,
      },
      options
    );

    this.clearErrors();

    var self = this;

    var valid = (function parse(group) {
      var done = 0;
      var errors = 0;

      group.each(
        function (rule) {
          if (!rule.filter && options.skip_empty) {
            return;
          }

          if (!rule.filter) {
            self.triggerValidationError(rule, "no_filter", null);
            errors++;
            return;
          }

          if (!rule.operator) {
            self.triggerValidationError(rule, "no_operator", null);
            errors++;
            return;
          }

          if (rule.operator.nb_inputs !== 0) {
            var valid = self.validateValue(rule, rule.value);

            if (valid !== true) {
              self.triggerValidationError(rule, valid, rule.value);
              errors++;
              return;
            }
          }

          done++;
        },
        function (group) {
          var res = parse(group);
          if (res === true) {
            done++;
          } else if (res === false) {
            errors++;
          }
        }
      );

      if (errors > 0) {
        return false;
      } else if (done === 0 && !group.isRoot() && options.skip_empty) {
        return null;
      } else if (
        done === 0 &&
        (!self.settings.allow_empty || !group.isRoot())
      ) {
        self.triggerValidationError(group, "empty_group", null);
        return false;
      }

      return true;
    })(this.model.root);

    /**
     * Modifies the result of the {@link QueryBuilder#validate} method
     * @event changer:validate
     * @memberof QueryBuilder
     * @param {boolean} valid
     * @returns {boolean}
     */
    return this.change("validate", valid);
  };

  /**
   * Gets an object representing current rules
   * @param {object} [options]
   * @param {boolean|string} [options.get_flags=false] - export flags, true: only changes from default flags or 'all'
   * @param {boolean} [options.allow_invalid=false] - returns rules even if they are invalid
   * @param {boolean} [options.skip_empty=false] - remove rules that have no filter selected
   * @returns {object}
   * @fires QueryBuilder.changer:ruleToJson
   * @fires QueryBuilder.changer:groupToJson
   * @fires QueryBuilder.changer:getRules
   */
  QueryBuilder.prototype.getRules = function (options) {
    options = $.extend(
      {
        get_flags: false,
        allow_invalid: false,
        skip_empty: false,
      },
      options
    );

    var valid = this.validate(options);
    if (!valid && !options.allow_invalid) {
      return null;
    }

    var self = this;

    var out = (function parse(group) {
      var groupData = {
        condition: group.condition,
        rules: [],
      };

      if (group.data) {
        groupData.data = $.extendext(true, "replace", {}, group.data);
      }

      if (options.get_flags) {
        var flags = self.getGroupFlags(
          group.flags,
          options.get_flags === "all"
        );
        if (!$.isEmptyObject(flags)) {
          groupData.flags = flags;
        }
      }

      group.each(
        function (rule) {
          if (!rule.filter && options.skip_empty) {
            return;
          }

          var value = null;
          if (!rule.operator || rule.operator.nb_inputs !== 0) {
            value = rule.value;
          }

          var ruleData = {
            id: rule.filter ? rule.filter.id : null,
            field: rule.filter ? rule.filter.field : null,
            type: rule.filter ? rule.filter.type : null,
            input: rule.filter ? rule.filter.input : null,
            operator: rule.operator ? rule.operator.type : null,
            value: value,
          };

          if ((rule.filter && rule.filter.data) || rule.data) {
            ruleData.data = $.extendext(
              true,
              "replace",
              {},
              rule.filter.data,
              rule.data
            );
          }

          if (options.get_flags) {
            var flags = self.getRuleFlags(
              rule.flags,
              options.get_flags === "all"
            );
            if (!$.isEmptyObject(flags)) {
              ruleData.flags = flags;
            }
          }

          /**
           * Modifies the JSON generated from a Rule object
           * @event changer:ruleToJson
           * @memberof QueryBuilder
           * @param {object} json
           * @param {Rule} rule
           * @returns {object}
           */
          groupData.rules.push(self.change("ruleToJson", ruleData, rule));
        },
        function (model) {
          var data = parse(model);
          if (data.rules.length !== 0 || !options.skip_empty) {
            groupData.rules.push(data);
          }
        },
        this
      );

      /**
       * Modifies the JSON generated from a Group object
       * @event changer:groupToJson
       * @memberof QueryBuilder
       * @param {object} json
       * @param {Group} group
       * @returns {object}
       */
      return self.change("groupToJson", groupData, group);
    })(this.model.root);

    out.valid = valid;

    /**
     * Modifies the result of the {@link QueryBuilder#getRules} method
     * @event changer:getRules
     * @memberof QueryBuilder
     * @param {object} json
     * @returns {object}
     */
    return this.change("getRules", out);
  };

  /**
   * Sets rules from object
   * @param {object} data
   * @param {object} [options]
   * @param {boolean} [options.allow_invalid=false] - silent-fail if the data are invalid
   * @throws RulesError, UndefinedConditionError
   * @fires QueryBuilder.changer:setRules
   * @fires QueryBuilder.changer:jsonToRule
   * @fires QueryBuilder.changer:jsonToGroup
   * @fires QueryBuilder.afterSetRules
   */
  QueryBuilder.prototype.setRules = function (data, options) {
    options = $.extend(
      {
        allow_invalid: false,
      },
      options
    );

    if ($.isArray(data)) {
      data = {
        condition: this.settings.default_condition,
        rules: data,
      };
    }

    if (
      !data ||
      !data.rules ||
      (data.rules.length === 0 && !this.settings.allow_empty)
    ) {
      Utils.error("RulesParse", "Incorrect data object passed");
    }

    this.clear();
    this.setRoot(false, data.data, this.parseGroupFlags(data));

    /**
     * Modifies data before the {@link QueryBuilder#setRules} method
     * @event changer:setRules
     * @memberof QueryBuilder
     * @param {object} json
     * @param {object} options
     * @returns {object}
     */
    data = this.change("setRules", data, options);

    var self = this;

    (function add(data, group) {
      if (group === null) {
        return;
      }

      if (data.condition === undefined) {
        data.condition = self.settings.default_condition;
      } else if (self.settings.conditions.indexOf(data.condition) == -1) {
        Utils.error(
          !options.allow_invalid,
          "UndefinedCondition",
          'Invalid condition "{0}"',
          data.condition
        );
        data.condition = self.settings.default_condition;
      }

      group.condition = data.condition;

      data.rules.forEach(function (item) {
        var model;

        if (item.rules !== undefined) {
          if (
            self.settings.allow_groups !== -1 &&
            self.settings.allow_groups < group.level
          ) {
            Utils.error(
              !options.allow_invalid,
              "RulesParse",
              "No more than {0} groups are allowed",
              self.settings.allow_groups
            );
            self.reset();
          } else {
            model = self.addGroup(
              group,
              false,
              item.data,
              self.parseGroupFlags(item)
            );
            if (model === null) {
              return;
            }

            add(item, model);
          }
        } else {
          if (!item.empty) {
            if (item.id === undefined) {
              Utils.error(
                !options.allow_invalid,
                "RulesParse",
                "Missing rule field id"
              );
              item.empty = true;
            }
            if (item.operator === undefined) {
              item.operator = "equal";
            }
          }

          model = self.addRule(group, item.data, self.parseRuleFlags(item));
          if (model === null) {
            return;
          }

          if (!item.empty) {
            model.filter = self.getFilterById(item.id, !options.allow_invalid);
          }

          if (model.filter) {
            model.operator = self.getOperatorByType(
              item.operator,
              !options.allow_invalid
            );

            if (!model.operator) {
              model.operator = self.getOperators(model.filter)[0];
            }
          }

          if (model.operator && model.operator.nb_inputs !== 0) {
            if (item.value !== undefined) {
              model.value = item.value;
            } else if (model.filter.default_value !== undefined) {
              model.value = model.filter.default_value;
            }
          }

          /**
           * Modifies the Rule object generated from the JSON
           * @event changer:jsonToRule
           * @memberof QueryBuilder
           * @param {Rule} rule
           * @param {object} json
           * @returns {Rule} the same rule
           */
          if (self.change("jsonToRule", model, item) != model) {
            Utils.error("RulesParse", "Plugin tried to change rule reference");
          }
        }
      });

      /**
       * Modifies the Group object generated from the JSON
       * @event changer:jsonToGroup
       * @memberof QueryBuilder
       * @param {Group} group
       * @param {object} json
       * @returns {Group} the same group
       */
      if (self.change("jsonToGroup", group, data) != group) {
        Utils.error("RulesParse", "Plugin tried to change group reference");
      }
    })(data, this.model.root);

    /**
     * After the {@link QueryBuilder#setRules} method
     * @event afterSetRules
     * @memberof QueryBuilder
     */
    this.trigger("afterSetRules");
  };

  /**
   * Performs value validation
   * @param {Rule} rule
   * @param {string|string[]} value
   * @returns {array|boolean} true or error array
   * @fires QueryBuilder.changer:validateValue
   */
  QueryBuilder.prototype.validateValue = function (rule, value) {
    var validation = rule.filter.validation || {};
    var result = true;

    if (validation.callback) {
      result = validation.callback.call(this, value, rule);
    } else {
      result = this._validateValue(rule, value);
    }

    /**
     * Modifies the result of the rule validation method
     * @event changer:validateValue
     * @memberof QueryBuilder
     * @param {array|boolean} result - true or an error array
     * @param {*} value
     * @param {Rule} rule
     * @returns {array|boolean}
     */
    return this.change("validateValue", result, value, rule);
  };

  /**
   * Default validation function
   * @param {Rule} rule
   * @param {string|string[]} value
   * @returns {array|boolean} true or error array
   * @throws ConfigError
   * @private
   */
  QueryBuilder.prototype._validateValue = function (rule, value) {
    var filter = rule.filter;
    var operator = rule.operator;
    var validation = filter.validation || {};
    var result = true;
    var tmp, tempValue;

    if (rule.operator.nb_inputs === 1) {
      value = [value];
    }

    for (var i = 0; i < operator.nb_inputs; i++) {
      if (!operator.multiple && $.isArray(value[i]) && value[i].length > 1) {
        result = [
          "operator_not_multiple",
          operator.type,
          this.translate("operators", operator.type),
        ];
        break;
      }

      switch (filter.input) {
        case "radio":
          if (value[i] === undefined || value[i].length === 0) {
            if (!validation.allow_empty_value) {
              result = ["radio_empty"];
            }
            break;
          }
          break;

        case "checkbox":
          if (value[i] === undefined || value[i].length === 0) {
            if (!validation.allow_empty_value) {
              result = ["checkbox_empty"];
            }
            break;
          }
          break;

        case "select":
          if (
            value[i] === undefined ||
            value[i].length === 0 ||
            (filter.placeholder && value[i] == filter.placeholder_value)
          ) {
            if (!validation.allow_empty_value) {
              result = ["select_empty"];
            }
            break;
          }
          break;

        default:
          tempValue = $.isArray(value[i]) ? value[i] : [value[i]];

          for (var j = 0; j < tempValue.length; j++) {
            switch (QueryBuilder.types[filter.type]) {
              case "string":
                if (tempValue[j] === undefined || tempValue[j].length === 0) {
                  if (!validation.allow_empty_value) {
                    result = ["string_empty"];
                  }
                  break;
                }
                if (validation.min !== undefined) {
                  if (tempValue[j].length < parseInt(validation.min)) {
                    result = [
                      this.getValidationMessage(
                        validation,
                        "min",
                        "string_exceed_min_length"
                      ),
                      validation.min,
                    ];
                    break;
                  }
                }
                if (validation.max !== undefined) {
                  if (tempValue[j].length > parseInt(validation.max)) {
                    result = [
                      this.getValidationMessage(
                        validation,
                        "max",
                        "string_exceed_max_length"
                      ),
                      validation.max,
                    ];
                    break;
                  }
                }
                if (validation.format) {
                  if (typeof validation.format == "string") {
                    validation.format = new RegExp(validation.format);
                  }
                  if (!validation.format.test(tempValue[j])) {
                    result = [
                      this.getValidationMessage(
                        validation,
                        "format",
                        "string_invalid_format"
                      ),
                      validation.format,
                    ];
                    break;
                  }
                }
                break;

              case "number":
                if (tempValue[j] === undefined || tempValue[j].length === 0) {
                  if (!validation.allow_empty_value) {
                    result = ["number_nan"];
                  }
                  break;
                }
                if (isNaN(tempValue[j])) {
                  result = ["number_nan"];
                  break;
                }
                if (filter.type == "integer") {
                  if (parseInt(tempValue[j]) != tempValue[j]) {
                    result = ["number_not_integer"];
                    break;
                  }
                } else {
                  if (parseFloat(tempValue[j]) != tempValue[j]) {
                    result = ["number_not_double"];
                    break;
                  }
                }
                if (validation.min !== undefined) {
                  if (tempValue[j] < parseFloat(validation.min)) {
                    result = [
                      this.getValidationMessage(
                        validation,
                        "min",
                        "number_exceed_min"
                      ),
                      validation.min,
                    ];
                    break;
                  }
                }
                if (validation.max !== undefined) {
                  if (tempValue[j] > parseFloat(validation.max)) {
                    result = [
                      this.getValidationMessage(
                        validation,
                        "max",
                        "number_exceed_max"
                      ),
                      validation.max,
                    ];
                    break;
                  }
                }
                if (
                  validation.step !== undefined &&
                  validation.step !== "any"
                ) {
                  var v = (tempValue[j] / validation.step).toPrecision(14);
                  if (parseInt(v) != v) {
                    result = [
                      this.getValidationMessage(
                        validation,
                        "step",
                        "number_wrong_step"
                      ),
                      validation.step,
                    ];
                    break;
                  }
                }
                break;

              case "datetime":
                if (tempValue[j] === undefined || tempValue[j].length === 0) {
                  if (!validation.allow_empty_value) {
                    result = ["datetime_empty"];
                  }
                  break;
                }

                // we need MomentJS
                if (validation.format) {
                  if (!("moment" in window)) {
                    Utils.error(
                      "MissingLibrary",
                      "MomentJS is required for Date/Time validation. Get it here http://momentjs.com"
                    );
                  }

                  var datetime = moment(tempValue[j], validation.format);
                  if (!datetime.isValid()) {
                    result = [
                      this.getValidationMessage(
                        validation,
                        "format",
                        "datetime_invalid"
                      ),
                      validation.format,
                    ];
                    break;
                  } else {
                    if (validation.min) {
                      if (
                        datetime < moment(validation.min, validation.format)
                      ) {
                        result = [
                          this.getValidationMessage(
                            validation,
                            "min",
                            "datetime_exceed_min"
                          ),
                          validation.min,
                        ];
                        break;
                      }
                    }
                    if (validation.max) {
                      if (
                        datetime > moment(validation.max, validation.format)
                      ) {
                        result = [
                          this.getValidationMessage(
                            validation,
                            "max",
                            "datetime_exceed_max"
                          ),
                          validation.max,
                        ];
                        break;
                      }
                    }
                  }
                }
                break;

              case "boolean":
                if (tempValue[j] === undefined || tempValue[j].length === 0) {
                  if (!validation.allow_empty_value) {
                    result = ["boolean_not_valid"];
                  }
                  break;
                }
                tmp = ("" + tempValue[j]).trim().toLowerCase();
                if (
                  tmp !== "true" &&
                  tmp !== "false" &&
                  tmp !== "1" &&
                  tmp !== "0" &&
                  tempValue[j] !== 1 &&
                  tempValue[j] !== 0
                ) {
                  result = ["boolean_not_valid"];
                  break;
                }
            }

            if (result !== true) {
              break;
            }
          }
      }

      if (result !== true) {
        break;
      }
    }

    if (
      (rule.operator.type === "between" ||
        rule.operator.type === "not_between") &&
      value.length === 2
    ) {
      switch (QueryBuilder.types[filter.type]) {
        case "number":
          if (value[0] > value[1]) {
            result = ["number_between_invalid", value[0], value[1]];
          }
          break;

        case "datetime":
          // we need MomentJS
          if (validation.format) {
            if (!("moment" in window)) {
              Utils.error(
                "MissingLibrary",
                "MomentJS is required for Date/Time validation. Get it here http://momentjs.com"
              );
            }

            if (
              moment(value[0], validation.format).isAfter(
                moment(value[1], validation.format)
              )
            ) {
              result = ["datetime_between_invalid", value[0], value[1]];
            }
          }
          break;
      }
    }

    return result;
  };

  /**
   * Returns an incremented group ID
   * @returns {string}
   * @private
   */
  QueryBuilder.prototype.nextGroupId = function () {
    return this.status.id + "_group_" + this.status.group_id++;
  };

  /**
   * Returns an incremented rule ID
   * @returns {string}
   * @private
   */
  QueryBuilder.prototype.nextRuleId = function () {
    return this.status.id + "_rule_" + this.status.rule_id++;
  };

  /**
   * Returns the operators for a filter
   * @param {string|object} filter - filter id or filter object
   * @returns {object[]}
   * @fires QueryBuilder.changer:getOperators
   */
  QueryBuilder.prototype.getOperators = function (filter) {
    if (typeof filter == "string") {
      filter = this.getFilterById(filter);
    }

    var result = [];

    for (var i = 0, l = this.operators.length; i < l; i++) {
      // filter operators check
      if (filter.operators) {
        if (filter.operators.indexOf(this.operators[i].type) == -1) {
          continue;
        }
      }
      // type check
      else if (
        this.operators[i].apply_to.indexOf(QueryBuilder.types[filter.type]) ==
        -1
      ) {
        continue;
      }

      result.push(this.operators[i]);
    }

    // keep sort order defined for the filter
    if (filter.operators) {
      result.sort(function (a, b) {
        return (
          filter.operators.indexOf(a.type) - filter.operators.indexOf(b.type)
        );
      });
    }

    /**
     * Modifies the operators available for a filter
     * @event changer:getOperators
     * @memberof QueryBuilder
     * @param {QueryBuilder.Operator[]} operators
     * @param {QueryBuilder.Filter} filter
     * @returns {QueryBuilder.Operator[]}
     */
    return this.change("getOperators", result, filter);
  };

  /**
   * Returns a particular filter by its id
   * @param {string} id
   * @param {boolean} [doThrow=true]
   * @returns {object|null}
   * @throws UndefinedFilterError
   */
  QueryBuilder.prototype.getFilterById = function (id, doThrow) {
    if (id == "-1") {
      return null;
    }

    for (var i = 0, l = this.filters.length; i < l; i++) {
      if (this.filters[i].id == id) {
        return this.filters[i];
      }
    }

    Utils.error(
      doThrow !== false,
      "UndefinedFilter",
      'Undefined filter "{0}"',
      id
    );

    return null;
  };

  /**
   * Returns a particular operator by its type
   * @param {string} type
   * @param {boolean} [doThrow=true]
   * @returns {object|null}
   * @throws UndefinedOperatorError
   */
  QueryBuilder.prototype.getOperatorByType = function (type, doThrow) {
    if (type == "-1") {
      return null;
    }

    for (var i = 0, l = this.operators.length; i < l; i++) {
      if (this.operators[i].type == type) {
        return this.operators[i];
      }
    }

    Utils.error(
      doThrow !== false,
      "UndefinedOperator",
      'Undefined operator "{0}"',
      type
    );

    return null;
  };

  /**
   * Returns rule's current input value
   * @param {Rule} rule
   * @returns {*}
   * @fires QueryBuilder.changer:getRuleValue
   * @private
   */
  QueryBuilder.prototype.getRuleInputValue = function (rule) {
    var filter = rule.filter;
    var operator = rule.operator;
    var value = [];

    if (filter.valueGetter) {
      value = filter.valueGetter.call(this, rule);
    } else {
      var $value = rule.$el.find(QueryBuilder.selectors.value_container);

      for (var i = 0; i < operator.nb_inputs; i++) {
        var name = Utils.escapeElementId(rule.id + "_value_" + i);
        var tmp;

        switch (filter.input) {
          case "radio":
            value.push($value.find("[name=" + name + "]:checked").val());
            break;

          case "checkbox":
            tmp = [];
            // jshint loopfunc:true
            $value.find("[name=" + name + "]:checked").each(function () {
              tmp.push($(this).val());
            });
            // jshint loopfunc:false
            value.push(tmp);
            break;

          case "select":
            if (filter.multiple) {
              tmp = [];
              // jshint loopfunc:true
              $value
                .find("[name=" + name + "] option:selected")
                .each(function () {
                  tmp.push($(this).val());
                });
              // jshint loopfunc:false
              value.push(tmp);
            } else {
              value.push(
                $value.find("[name=" + name + "] option:selected").val()
              );
            }
            break;

          default:
            value.push($value.find("[name=" + name + "]").val());
        }
      }

      value = value.map(function (val) {
        if (
          operator.multiple &&
          filter.value_separator &&
          typeof val == "string"
        ) {
          val = val.split(filter.value_separator);
        }

        if ($.isArray(val)) {
          return val.map(function (subval) {
            return Utils.changeType(subval, filter.type);
          });
        } else {
          return Utils.changeType(val, filter.type);
        }
      });

      if (operator.nb_inputs === 1) {
        value = value[0];
      }

      // @deprecated
      if (filter.valueParser) {
        value = filter.valueParser.call(this, rule, value);
      }
    }

    /**
     * Modifies the rule's value grabbed from the DOM
     * @event changer:getRuleValue
     * @memberof QueryBuilder
     * @param {*} value
     * @param {Rule} rule
     * @returns {*}
     */
    return this.change("getRuleValue", value, rule);
  };

  /**
   * Sets the value of a rule's input
   * @param {Rule} rule
   * @param {*} value
   * @private
   */
  QueryBuilder.prototype.setRuleInputValue = function (rule, value) {
    var filter = rule.filter;
    var operator = rule.operator;

    if (!filter || !operator) {
      return;
    }

    rule._updating_input = true;

    if (filter.valueSetter) {
      filter.valueSetter.call(this, rule, value);
    } else {
      var $value = rule.$el.find(QueryBuilder.selectors.value_container);

      if (operator.nb_inputs == 1) {
        value = [value];
      }

      for (var i = 0; i < operator.nb_inputs; i++) {
        var name = Utils.escapeElementId(rule.id + "_value_" + i);

        switch (filter.input) {
          case "radio":
            $value
              .find("[name=" + name + '][value="' + value[i] + '"]')
              .prop("checked", true)
              .trigger("change");
            break;

          case "checkbox":
            if (!$.isArray(value[i])) {
              value[i] = [value[i]];
            }
            // jshint loopfunc:true
            value[i].forEach(function (value) {
              $value
                .find("[name=" + name + '][value="' + value + '"]')
                .prop("checked", true)
                .trigger("change");
            });
            // jshint loopfunc:false
            break;

          default:
            if (
              operator.multiple &&
              filter.value_separator &&
              $.isArray(value[i])
            ) {
              value[i] = value[i].join(filter.value_separator);
            }
            $value
              .find("[name=" + name + "]")
              .val(value[i])
              .trigger("change");
            break;
        }
      }
    }

    rule._updating_input = false;
  };

  /**
   * Parses rule flags
   * @param {object} rule
   * @returns {object}
   * @fires QueryBuilder.changer:parseRuleFlags
   * @private
   */
  QueryBuilder.prototype.parseRuleFlags = function (rule) {
    var flags = $.extend({}, this.settings.default_rule_flags);

    if (rule.readonly) {
      $.extend(flags, {
        filter_readonly: true,
        operator_readonly: true,
        value_readonly: true,
        no_delete: true,
      });
    }

    if (rule.flags) {
      $.extend(flags, rule.flags);
    }

    /**
     * Modifies the consolidated rule's flags
     * @event changer:parseRuleFlags
     * @memberof QueryBuilder
     * @param {object} flags
     * @param {object} rule - <b>not</b> a Rule object
     * @returns {object}
     */
    return this.change("parseRuleFlags", flags, rule);
  };

  /**
   * Gets a copy of flags of a rule
   * @param {object} flags
   * @param {boolean} [all=false] - return all flags or only changes from default flags
   * @returns {object}
   * @private
   */
  QueryBuilder.prototype.getRuleFlags = function (flags, all) {
    if (all) {
      return $.extend({}, flags);
    } else {
      var ret = {};
      $.each(this.settings.default_rule_flags, function (key, value) {
        if (flags[key] !== value) {
          ret[key] = flags[key];
        }
      });
      return ret;
    }
  };

  /**
   * Parses group flags
   * @param {object} group
   * @returns {object}
   * @fires QueryBuilder.changer:parseGroupFlags
   * @private
   */
  QueryBuilder.prototype.parseGroupFlags = function (group) {
    var flags = $.extend({}, this.settings.default_group_flags);

    if (group.readonly) {
      $.extend(flags, {
        condition_readonly: true,
        no_add_rule: true,
        no_add_group: true,
        no_delete: true,
      });
    }

    if (group.flags) {
      $.extend(flags, group.flags);
    }

    /**
     * Modifies the consolidated group's flags
     * @event changer:parseGroupFlags
     * @memberof QueryBuilder
     * @param {object} flags
     * @param {object} group - <b>not</b> a Group object
     * @returns {object}
     */
    return this.change("parseGroupFlags", flags, group);
  };

  /**
   * Gets a copy of flags of a group
   * @param {object} flags
   * @param {boolean} [all=false] - return all flags or only changes from default flags
   * @returns {object}
   * @private
   */
  QueryBuilder.prototype.getGroupFlags = function (flags, all) {
    if (all) {
      return $.extend({}, flags);
    } else {
      var ret = {};
      $.each(this.settings.default_group_flags, function (key, value) {
        if (flags[key] !== value) {
          ret[key] = flags[key];
        }
      });
      return ret;
    }
  };

  /**
   * Translate a label either by looking in the `lang` object or in itself if it's an object where keys are language codes
   * @param {string} [category]
   * @param {string|object} key
   * @returns {string}
   * @fires QueryBuilder.changer:translate
   */
  QueryBuilder.prototype.translate = function (category, key) {
    if (!key) {
      key = category;
      category = undefined;
    }

    var translation;
    if (typeof key === "object") {
      translation = key[this.settings.lang_code] || key["en"];
    } else {
      translation = (category ? this.lang[category] : this.lang)[key] || key;
    }

    /**
     * Modifies the translated label
     * @event changer:translate
     * @memberof QueryBuilder
     * @param {string} translation
     * @param {string|object} key
     * @param {string} [category]
     * @returns {string}
     */
    return this.change("translate", translation, key, category);
  };

  /**
   * Returns a validation message
   * @param {object} validation
   * @param {string} type
   * @param {string} def
   * @returns {string}
   * @private
   */
  QueryBuilder.prototype.getValidationMessage = function (
    validation,
    type,
    def
  ) {
    return (validation.messages && validation.messages[type]) || def;
  };

  QueryBuilder.templates.group =
    '\
<div id="{{= it.group_id }}" class="rules-group-container"> \
  <div class="rules-group-header"> \
    <div class="btn-group pull-right group-actions"> \
      <button type="button" class="btn btn-xs btn-success" data-add="rule"> \
        <i class="{{= it.icons.add_rule }}"></i> {{= it.translate("add_rule") }} \
      </button> \
      {{? it.settings.allow_groups===-1 || it.settings.allow_groups>=it.level }} \
        <button type="button" class="btn btn-xs btn-success" data-add="group"> \
          <i class="{{= it.icons.add_group }}"></i> {{= it.translate("add_group") }} \
        </button> \
      {{?}} \
      {{? it.level>1 }} \
        <button type="button" class="btn btn-xs btn-danger" data-delete="group"> \
          <i class="{{= it.icons.remove_group }}"></i> {{= it.translate("delete_group") }} \
        </button> \
      {{?}} \
    </div> \
    <div class="btn-group group-conditions"> \
      {{~ it.conditions: condition }} \
        <label class="btn btn-xs btn-primary"> \
          <input type="radio" name="{{= it.group_id }}_cond" value="{{= condition }}"> {{= it.translate("conditions", condition) }} \
        </label> \
      {{~}} \
    </div> \
    {{? it.settings.display_errors }} \
      <div class="error-container"><i class="{{= it.icons.error }}"></i></div> \
    {{?}} \
  </div> \
  <div class=rules-group-body> \
    <div class=rules-list></div> \
  </div> \
</div>';

  QueryBuilder.templates.rule =
    '\
<div id="{{= it.rule_id }}" class="rule-container"> \
  <div class="rule-header"> \
    <div class="btn-group pull-right rule-actions"> \
      <button type="button" class="btn btn-xs btn-danger" data-delete="rule" > \
        <i class="{{= it.icons.remove_rule }}"></i> {{= it.translate("delete_rule") }} \
      </button> \
    </div> \
  </div> \
  {{? it.settings.display_errors }} \
    <div class="error-container"><i class="{{= it.icons.error }}"></i></div> \
  {{?}} \
  <div class="rule-filter-container"></div> \
  <div class="rule-operator-container"></div> \
  <div class="rule-value-container"></div> \
</div>';

  QueryBuilder.templates.filterSelect =
    '\
{{ var optgroup = null; }} \
<select class="form-control" name="{{= it.rule.id }}_filter"> \
  {{? it.settings.display_empty_filter }} \
    <option value="-1">{{= it.settings.select_placeholder }}</option> \
  {{?}} \
  {{~ it.filters: filter }} \
    {{? optgroup !== filter.optgroup }} \
      {{? optgroup !== null }}</optgroup>{{?}} \
      {{? (optgroup = filter.optgroup) !== null }} \
        <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}"> \
      {{?}} \
    {{?}} \
    <option value="{{= filter.id }}" {{? filter.icon}}data-icon="{{= filter.icon}}"{{?}}>{{= it.translate(filter.label) }}</option> \
  {{~}} \
  {{? optgroup !== null }}</optgroup>{{?}} \
</select>';

  QueryBuilder.templates.operatorSelect =
    '\
{{? it.operators.length === 1 }} \
<span> \
{{= it.translate("operators", it.operators[0].type) }} \
</span> \
{{?}} \
{{ var optgroup = null; }} \
<select class="form-control {{? it.operators.length === 1 }}hide{{?}}" name="{{= it.rule.id }}_operator"> \
  {{~ it.operators: operator }} \
    {{? optgroup !== operator.optgroup }} \
      {{? optgroup !== null }}</optgroup>{{?}} \
      {{? (optgroup = operator.optgroup) !== null }} \
        <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}"> \
      {{?}} \
    {{?}} \
    <option value="{{= operator.type }}" {{? operator.icon}}data-icon="{{= operator.icon}}"{{?}}>{{= it.translate("operators", operator.type) }}</option> \
  {{~}} \
  {{? optgroup !== null }}</optgroup>{{?}} \
</select>';

  QueryBuilder.templates.ruleValueSelect =
    '\
{{ var optgroup = null; }} \
<select class="form-control" name="{{= it.name }}" {{? it.rule.filter.multiple }}multiple{{?}}> \
  {{? it.rule.filter.placeholder }} \
    <option value="{{= it.rule.filter.placeholder_value }}" disabled selected>{{= it.rule.filter.placeholder }}</option> \
  {{?}} \
  {{~ it.rule.filter.values: entry }} \
    {{? optgroup !== entry.optgroup }} \
      {{? optgroup !== null }}</optgroup>{{?}} \
      {{? (optgroup = entry.optgroup) !== null }} \
        <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}"> \
      {{?}} \
    {{?}} \
    <option value="{{= entry.value }}">{{= entry.label }}</option> \
  {{~}} \
  {{? optgroup !== null }}</optgroup>{{?}} \
</select>';

  /**
   * Returns group's HTML
   * @param {string} group_id
   * @param {int} level
   * @returns {string}
   * @fires QueryBuilder.changer:getGroupTemplate
   * @private
   */
  QueryBuilder.prototype.getGroupTemplate = function (group_id, level) {
    var h = this.templates.group({
      builder: this,
      group_id: group_id,
      level: level,
      conditions: this.settings.conditions,
      icons: this.icons,
      settings: this.settings,
      translate: this.translate.bind(this),
    });

    /**
     * Modifies the raw HTML of a group
     * @event changer:getGroupTemplate
     * @memberof QueryBuilder
     * @param {string} html
     * @param {int} level
     * @returns {string}
     */
    return this.change("getGroupTemplate", h, level);
  };

  /**
   * Returns rule's HTML
   * @param {string} rule_id
   * @returns {string}
   * @fires QueryBuilder.changer:getRuleTemplate
   * @private
   */
  QueryBuilder.prototype.getRuleTemplate = function (rule_id) {
    var h = this.templates.rule({
      builder: this,
      rule_id: rule_id,
      icons: this.icons,
      settings: this.settings,
      translate: this.translate.bind(this),
    });

    /**
     * Modifies the raw HTML of a rule
     * @event changer:getRuleTemplate
     * @memberof QueryBuilder
     * @param {string} html
     * @returns {string}
     */
    return this.change("getRuleTemplate", h);
  };

  /**
   * Returns rule's filter HTML
   * @param {Rule} rule
   * @param {object[]} filters
   * @returns {string}
   * @fires QueryBuilder.changer:getRuleFilterTemplate
   * @private
   */
  QueryBuilder.prototype.getRuleFilterSelect = function (rule, filters) {
    var h = this.templates.filterSelect({
      builder: this,
      rule: rule,
      filters: filters,
      icons: this.icons,
      settings: this.settings,
      translate: this.translate.bind(this),
    });

    /**
     * Modifies the raw HTML of the rule's filter dropdown
     * @event changer:getRuleFilterSelect
     * @memberof QueryBuilder
     * @param {string} html
     * @param {Rule} rule
     * @param {QueryBuilder.Filter[]} filters
     * @returns {string}
     */
    return this.change("getRuleFilterSelect", h, rule, filters);
  };

  /**
   * Returns rule's operator HTML
   * @param {Rule} rule
   * @param {object[]} operators
   * @returns {string}
   * @fires QueryBuilder.changer:getRuleOperatorTemplate
   * @private
   */
  QueryBuilder.prototype.getRuleOperatorSelect = function (rule, operators) {
    var h = this.templates.operatorSelect({
      builder: this,
      rule: rule,
      operators: operators,
      icons: this.icons,
      settings: this.settings,
      translate: this.translate.bind(this),
    });

    /**
     * Modifies the raw HTML of the rule's operator dropdown
     * @event changer:getRuleOperatorSelect
     * @memberof QueryBuilder
     * @param {string} html
     * @param {Rule} rule
     * @param {QueryBuilder.Operator[]} operators
     * @returns {string}
     */
    return this.change("getRuleOperatorSelect", h, rule, operators);
  };

  /**
   * Returns the rule's value select HTML
   * @param {string} name
   * @param {Rule} rule
   * @returns {string}
   * @fires QueryBuilder.changer:getRuleValueSelect
   * @private
   */
  QueryBuilder.prototype.getRuleValueSelect = function (name, rule) {
    var h = this.templates.ruleValueSelect({
      builder: this,
      name: name,
      rule: rule,
      icons: this.icons,
      settings: this.settings,
      translate: this.translate.bind(this),
    });

    /**
     * Modifies the raw HTML of the rule's value dropdown (in case of a "select filter)
     * @event changer:getRuleValueSelect
     * @memberof QueryBuilder
     * @param {string} html
     * @param [string} name
     * @param {Rule} rule
     * @returns {string}
     */
    return this.change("getRuleValueSelect", h, name, rule);
  };

  /**
   * Returns the rule's value HTML
   * @param {Rule} rule
   * @param {int} value_id
   * @returns {string}
   * @fires QueryBuilder.changer:getRuleInput
   * @private
   */
  QueryBuilder.prototype.getRuleInput = function (rule, value_id) {
    var filter = rule.filter;
    var validation = rule.filter.validation || {};
    var name = rule.id + "_value_" + value_id;
    var c = filter.vertical ? " class=block" : "";
    var h = "";
    var placeholder = Array.isArray(filter.placeholder)
      ? filter.placeholder[value_id]
      : filter.placeholder;

    if (typeof filter.input == "function") {
      h = filter.input.call(this, rule, name);
    } else {
      switch (filter.input) {
        case "radio":
        case "checkbox":
          Utils.iterateOptions(filter.values, function (key, val) {
            h +=
              "<label" +
              c +
              '><input type="' +
              filter.input +
              '" name="' +
              name +
              '" value="' +
              key +
              '"> ' +
              val +
              "</label> ";
          });
          break;

        case "select":
          h = this.getRuleValueSelect(name, rule);
          break;

        case "textarea":
          h += '<textarea class="form-control" name="' + name + '"';
          if (filter.size) h += ' cols="' + filter.size + '"';
          if (filter.rows) h += ' rows="' + filter.rows + '"';
          if (validation.min !== undefined)
            h += ' minlength="' + validation.min + '"';
          if (validation.max !== undefined)
            h += ' maxlength="' + validation.max + '"';
          if (placeholder) h += ' placeholder="' + placeholder + '"';
          h += "></textarea>";
          break;

        case "number":
          h += '<input class="form-control" type="number" name="' + name + '"';
          if (validation.step !== undefined)
            h += ' step="' + validation.step + '"';
          if (validation.min !== undefined)
            h += ' min="' + validation.min + '"';
          if (validation.max !== undefined)
            h += ' max="' + validation.max + '"';
          if (placeholder) h += ' placeholder="' + placeholder + '"';
          if (filter.size) h += ' size="' + filter.size + '"';
          h += ">";
          break;

        default:
          h += '<input class="form-control" type="text" name="' + name + '"';
          if (placeholder) h += ' placeholder="' + placeholder + '"';
          if (filter.type === "string" && validation.min !== undefined)
            h += ' minlength="' + validation.min + '"';
          if (filter.type === "string" && validation.max !== undefined)
            h += ' maxlength="' + validation.max + '"';
          if (filter.size) h += ' size="' + filter.size + '"';
          h += ">";
      }
    }

    /**
     * Modifies the raw HTML of the rule's input
     * @event changer:getRuleInput
     * @memberof QueryBuilder
     * @param {string} html
     * @param {Rule} rule
     * @param {string} name - the name that the input must have
     * @returns {string}
     */
    return this.change("getRuleInput", h, rule, name);
  };

  /**
   * @namespace
   */
  var Utils = {};

  /**
   * @member {object}
   * @memberof QueryBuilder
   * @see Utils
   */
  QueryBuilder.utils = Utils;

  /**
   * @callback Utils#OptionsIteratee
   * @param {string} key
   * @param {string} value
   * @param {string} [optgroup]
   */

  /**
   * Iterates over radio/checkbox/selection options, it accept four formats
   *
   * @example
   * // array of values
   * options = ['one', 'two', 'three']
   * @example
   * // simple key-value map
   * options = {1: 'one', 2: 'two', 3: 'three'}
   * @example
   * // array of 1-element maps
   * options = [{1: 'one'}, {2: 'two'}, {3: 'three'}]
   * @example
   * // array of elements
   * options = [{value: 1, label: 'one', optgroup: 'group'}, {value: 2, label: 'two'}]
   *
   * @param {object|array} options
   * @param {Utils#OptionsIteratee} tpl
   */
  Utils.iterateOptions = function (options, tpl) {
    if (options) {
      if ($.isArray(options)) {
        options.forEach(function (entry) {
          if ($.isPlainObject(entry)) {
            // array of elements
            if ("value" in entry) {
              tpl(entry.value, entry.label || entry.value, entry.optgroup);
            }
            // array of one-element maps
            else {
              $.each(entry, function (key, val) {
                tpl(key, val);
                return false; // break after first entry
              });
            }
          }
          // array of values
          else {
            tpl(entry, entry);
          }
        });
      }
      // unordered map
      else {
        $.each(options, function (key, val) {
          tpl(key, val);
        });
      }
    }
  };

  /**
   * Replaces {0}, {1}, ... in a string
   * @param {string} str
   * @param {...*} args
   * @returns {string}
   */
  Utils.fmt = function (str, args) {
    if (!Array.isArray(args)) {
      args = Array.prototype.slice.call(arguments, 1);
    }

    return str.replace(/{([0-9]+)}/g, function (m, i) {
      return args[parseInt(i)];
    });
  };

  /**
   * Throws an Error object with custom name or logs an error
   * @param {boolean} [doThrow=true]
   * @param {string} type
   * @param {string} message
   * @param {...*} args
   */
  Utils.error = function () {
    var i = 0;
    var doThrow = typeof arguments[i] === "boolean" ? arguments[i++] : true;
    var type = arguments[i++];
    var message = arguments[i++];
    var args = Array.isArray(arguments[i])
      ? arguments[i]
      : Array.prototype.slice.call(arguments, i);

    if (doThrow) {
      var err = new Error(Utils.fmt(message, args));
      err.name = type + "Error";
      err.args = args;
      throw err;
    } else {
      console.error(type + "Error: " + Utils.fmt(message, args));
    }
  };

  /**
   * Changes the type of a value to int, float or bool
   * @param {*} value
   * @param {string} type - 'integer', 'double', 'boolean' or anything else (passthrough)
   * @returns {*}
   */
  Utils.changeType = function (value, type) {
    if (value === "" || value === undefined) {
      return undefined;
    }

    switch (type) {
      // @formatter:off
      case "integer":
        if (typeof value === "string" && !/^-?\d+$/.test(value)) {
          return value;
        }
        return parseInt(value);
      case "double":
        if (typeof value === "string" && !/^-?\d+\.?\d*$/.test(value)) {
          return value;
        }
        return parseFloat(value);
      case "boolean":
        if (
          typeof value === "string" &&
          !/^(0|1|true|false){1}$/i.test(value)
        ) {
          return value;
        }
        return (
          value === true ||
          value === 1 ||
          value.toLowerCase() === "true" ||
          value === "1"
        );
      default:
        return value;
      // @formatter:on
    }
  };

  /**
   * Escapes a string like PHP's mysql_real_escape_string does
   * @param {string} value
   * @returns {string}
   */
  Utils.escapeString = function (value) {
    if (typeof value != "string") {
      return value;
    }

    return (
      value
        .replace(/[\0\n\r\b\\\'\"]/g, function (s) {
          switch (s) {
            // @formatter:off
            case "\0":
              return "\\0";
            case "\n":
              return "\\n";
            case "\r":
              return "\\r";
            case "\b":
              return "\\b";
            default:
              return "\\" + s;
            // @formatter:off
          }
        })
        // uglify compliant
        .replace(/\t/g, "\\t")
        .replace(/\x1a/g, "\\Z")
    );
  };

  /**
   * Escapes a string for use in regex
   * @param {string} str
   * @returns {string}
   */
  Utils.escapeRegExp = function (str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  };

  /**
   * Escapes a string for use in HTML element id
   * @param {string} str
   * @returns {string}
   */
  Utils.escapeElementId = function (str) {
    // Regex based on that suggested by:
    // https://learn.jquery.com/using-jquery-core/faq/how-do-i-select-an-element-by-an-id-that-has-characters-used-in-css-notation/
    // - escapes : . [ ] ,
    // - avoids escaping already escaped values
    return str
      ? str.replace(/(\\)?([:.\[\],])/g, function ($0, $1, $2) {
          return $1 ? $0 : "\\" + $2;
        })
      : str;
  };

  /**
   * Sorts objects by grouping them by `key`, preserving initial order when possible
   * @param {object[]} items
   * @param {string} key
   * @returns {object[]}
   */
  Utils.groupSort = function (items, key) {
    var optgroups = [];
    var newItems = [];

    items.forEach(function (item) {
      var idx;

      if (item[key]) {
        idx = optgroups.lastIndexOf(item[key]);

        if (idx == -1) {
          idx = optgroups.length;
        } else {
          idx++;
        }
      } else {
        idx = optgroups.length;
      }

      optgroups.splice(idx, 0, item[key]);
      newItems.splice(idx, 0, item);
    });

    return newItems;
  };

  /**
   * Defines properties on an Node prototype with getter and setter.<br>
   *     Update events are emitted in the setter through root Model (if any).<br>
   *     The object must have a `__` object, non enumerable property to store values.
   * @param {function} obj
   * @param {string[]} fields
   */
  Utils.defineModelProperties = function (obj, fields) {
    fields.forEach(function (field) {
      Object.defineProperty(obj.prototype, field, {
        enumerable: true,
        get: function () {
          return this.__[field];
        },
        set: function (value) {
          var previousValue =
            this.__[field] !== null && typeof this.__[field] == "object"
              ? $.extend({}, this.__[field])
              : this.__[field];

          this.__[field] = value;

          if (this.model !== null) {
            /**
             * After a value of the model changed
             * @event model:update
             * @memberof Model
             * @param {Node} node
             * @param {string} field
             * @param {*} value
             * @param {*} previousValue
             */
            this.model.trigger("update", this, field, value, previousValue);
          }
        },
      });
    });
  };

  /**
   * Main object storing data model and emitting model events
   * @constructor
   */
  function Model() {
    /**
     * @member {Group}
     * @readonly
     */
    this.root = null;

    /**
     * Base for event emitting
     * @member {jQuery}
     * @readonly
     * @private
     */
    this.$ = $(this);
  }

  $.extend(
    Model.prototype,
    /** @lends Model.prototype */ {
      /**
       * Triggers an event on the model
       * @param {string} type
       * @returns {$.Event}
       */
      trigger: function (type) {
        var event = new $.Event(type);
        this.$.triggerHandler(event, Array.prototype.slice.call(arguments, 1));
        return event;
      },

      /**
       * Attaches an event listener on the model
       * @param {string} type
       * @param {function} cb
       * @returns {Model}
       */
      on: function () {
        this.$.on.apply(this.$, Array.prototype.slice.call(arguments));
        return this;
      },

      /**
       * Removes an event listener from the model
       * @param {string} type
       * @param {function} [cb]
       * @returns {Model}
       */
      off: function () {
        this.$.off.apply(this.$, Array.prototype.slice.call(arguments));
        return this;
      },

      /**
       * Attaches an event listener called once on the model
       * @param {string} type
       * @param {function} cb
       * @returns {Model}
       */
      once: function () {
        this.$.one.apply(this.$, Array.prototype.slice.call(arguments));
        return this;
      },
    }
  );

  /**
   * Root abstract object
   * @constructor
   * @param {Node} [parent]
   * @param {jQuery} $el
   */
  var Node = function (parent, $el) {
    if (!(this instanceof Node)) {
      return new Node(parent, $el);
    }

    Object.defineProperty(this, "__", { value: {} });

    $el.data("queryBuilderModel", this);

    /**
     * @name level
     * @member {int}
     * @memberof Node
     * @instance
     * @readonly
     */
    this.__.level = 1;

    /**
     * @name error
     * @member {string}
     * @memberof Node
     * @instance
     */
    this.__.error = null;

    /**
     * @name flags
     * @member {object}
     * @memberof Node
     * @instance
     * @readonly
     */
    this.__.flags = {};

    /**
     * @name data
     * @member {object}
     * @memberof Node
     * @instance
     */
    this.__.data = undefined;

    /**
     * @member {jQuery}
     * @readonly
     */
    this.$el = $el;

    /**
     * @member {string}
     * @readonly
     */
    this.id = $el[0].id;

    /**
     * @member {Model}
     * @readonly
     */
    this.model = null;

    /**
     * @member {Group}
     * @readonly
     */
    this.parent = parent;
  };

  Utils.defineModelProperties(Node, ["level", "error", "data", "flags"]);

  Object.defineProperty(Node.prototype, "parent", {
    enumerable: true,
    get: function () {
      return this.__.parent;
    },
    set: function (value) {
      this.__.parent = value;
      this.level = value === null ? 1 : value.level + 1;
      this.model = value === null ? null : value.model;
    },
  });

  /**
   * Checks if this Node is the root
   * @returns {boolean}
   */
  Node.prototype.isRoot = function () {
    return this.level === 1;
  };

  /**
   * Returns the node position inside its parent
   * @returns {int}
   */
  Node.prototype.getPos = function () {
    if (this.isRoot()) {
      return -1;
    } else {
      return this.parent.getNodePos(this);
    }
  };

  /**
   * Deletes self
   * @fires Model.model:drop
   */
  Node.prototype.drop = function () {
    var model = this.model;

    if (!!this.parent) {
      this.parent.removeNode(this);
    }

    this.$el.removeData("queryBuilderModel");

    if (model !== null) {
      /**
       * After a node of the model has been removed
       * @event model:drop
       * @memberof Model
       * @param {Node} node
       */
      model.trigger("drop", this);
    }
  };

  /**
   * Moves itself after another Node
   * @param {Node} target
   * @fires Model.model:move
   */
  Node.prototype.moveAfter = function (target) {
    if (!this.isRoot()) {
      this.move(target.parent, target.getPos() + 1);
    }
  };

  /**
   * Moves itself at the beginning of parent or another Group
   * @param {Group} [target]
   * @fires Model.model:move
   */
  Node.prototype.moveAtBegin = function (target) {
    if (!this.isRoot()) {
      if (target === undefined) {
        target = this.parent;
      }

      this.move(target, 0);
    }
  };

  /**
   * Moves itself at the end of parent or another Group
   * @param {Group} [target]
   * @fires Model.model:move
   */
  Node.prototype.moveAtEnd = function (target) {
    if (!this.isRoot()) {
      if (target === undefined) {
        target = this.parent;
      }

      this.move(target, target.length() === 0 ? 0 : target.length() - 1);
    }
  };

  /**
   * Moves itself at specific position of Group
   * @param {Group} target
   * @param {int} index
   * @fires Model.model:move
   */
  Node.prototype.move = function (target, index) {
    if (!this.isRoot()) {
      if (typeof target === "number") {
        index = target;
        target = this.parent;
      }

      this.parent.removeNode(this);
      target.insertNode(this, index, false);

      if (this.model !== null) {
        /**
         * After a node of the model has been moved
         * @event model:move
         * @memberof Model
         * @param {Node} node
         * @param {Node} target
         * @param {int} index
         */
        this.model.trigger("move", this, target, index);
      }
    }
  };

  /**
   * Group object
   * @constructor
   * @extends Node
   * @param {Group} [parent]
   * @param {jQuery} $el
   */
  var Group = function (parent, $el) {
    if (!(this instanceof Group)) {
      return new Group(parent, $el);
    }

    Node.call(this, parent, $el);

    /**
     * @member {object[]}
     * @readonly
     */
    this.rules = [];

    /**
     * @name condition
     * @member {string}
     * @memberof Group
     * @instance
     */
    this.__.condition = null;
  };

  Group.prototype = Object.create(Node.prototype);
  Group.prototype.constructor = Group;

  Utils.defineModelProperties(Group, ["condition"]);

  /**
   * Removes group's content
   */
  Group.prototype.empty = function () {
    this.each(
      "reverse",
      function (rule) {
        rule.drop();
      },
      function (group) {
        group.drop();
      }
    );
  };

  /**
   * Deletes self
   */
  Group.prototype.drop = function () {
    this.empty();
    Node.prototype.drop.call(this);
  };

  /**
   * Returns the number of children
   * @returns {int}
   */
  Group.prototype.length = function () {
    return this.rules.length;
  };

  /**
   * Adds a Node at specified index
   * @param {Node} node
   * @param {int} [index=end]
   * @param {boolean} [trigger=false] - fire 'add' event
   * @returns {Node} the inserted node
   * @fires Model.model:add
   */
  Group.prototype.insertNode = function (node, index, trigger) {
    if (index === undefined) {
      index = this.length();
    }

    this.rules.splice(index, 0, node);
    node.parent = this;

    if (trigger && this.model !== null) {
      /**
       * After a node of the model has been added
       * @event model:add
       * @memberof Model
       * @param {Node} parent
       * @param {Node} node
       * @param {int} index
       */
      this.model.trigger("add", this, node, index);
    }

    return node;
  };

  /**
   * Adds a new Group at specified index
   * @param {jQuery} $el
   * @param {int} [index=end]
   * @returns {Group}
   * @fires Model.model:add
   */
  Group.prototype.addGroup = function ($el, index) {
    return this.insertNode(new Group(this, $el), index, true);
  };

  /**
   * Adds a new Rule at specified index
   * @param {jQuery} $el
   * @param {int} [index=end]
   * @returns {Rule}
   * @fires Model.model:add
   */
  Group.prototype.addRule = function ($el, index) {
    return this.insertNode(new Rule(this, $el), index, true);
  };

  /**
   * Deletes a specific Node
   * @param {Node} node
   */
  Group.prototype.removeNode = function (node) {
    var index = this.getNodePos(node);
    if (index !== -1) {
      node.parent = null;
      this.rules.splice(index, 1);
    }
  };

  /**
   * Returns the position of a child Node
   * @param {Node} node
   * @returns {int}
   */
  Group.prototype.getNodePos = function (node) {
    return this.rules.indexOf(node);
  };

  /**
   * @callback Model#GroupIteratee
   * @param {Node} node
   * @returns {boolean} stop the iteration
   */

  /**
   * Iterate over all Nodes
   * @param {boolean} [reverse=false] - iterate in reverse order, required if you delete nodes
   * @param {Model#GroupIteratee} cbRule - callback for Rules (can be `null` but not omitted)
   * @param {Model#GroupIteratee} [cbGroup] - callback for Groups
   * @param {object} [context] - context for callbacks
   * @returns {boolean} if the iteration has been stopped by a callback
   */
  Group.prototype.each = function (reverse, cbRule, cbGroup, context) {
    if (typeof reverse !== "boolean" && typeof reverse !== "string") {
      context = cbGroup;
      cbGroup = cbRule;
      cbRule = reverse;
      reverse = false;
    }
    context = context === undefined ? null : context;

    var i = reverse ? this.rules.length - 1 : 0;
    var l = reverse ? 0 : this.rules.length - 1;
    var c = reverse ? -1 : 1;
    var next = function () {
      return reverse ? i >= l : i <= l;
    };
    var stop = false;

    for (; next(); i += c) {
      if (this.rules[i] instanceof Group) {
        if (!!cbGroup) {
          stop = cbGroup.call(context, this.rules[i]) === false;
        }
      } else if (!!cbRule) {
        stop = cbRule.call(context, this.rules[i]) === false;
      }

      if (stop) {
        break;
      }
    }

    return !stop;
  };

  /**
   * Checks if the group contains a particular Node
   * @param {Node} node
   * @param {boolean} [recursive=false]
   * @returns {boolean}
   */
  Group.prototype.contains = function (node, recursive) {
    if (this.getNodePos(node) !== -1) {
      return true;
    } else if (!recursive) {
      return false;
    } else {
      // the loop will return with false as soon as the Node is found
      return !this.each(
        function () {
          return true;
        },
        function (group) {
          return !group.contains(node, true);
        }
      );
    }
  };

  /**
   * Rule object
   * @constructor
   * @extends Node
   * @param {Group} parent
   * @param {jQuery} $el
   */
  var Rule = function (parent, $el) {
    if (!(this instanceof Rule)) {
      return new Rule(parent, $el);
    }

    Node.call(this, parent, $el);

    this._updating_value = false;
    this._updating_input = false;

    /**
     * @name filter
     * @member {QueryBuilder.Filter}
     * @memberof Rule
     * @instance
     */
    this.__.filter = null;

    /**
     * @name operator
     * @member {QueryBuilder.Operator}
     * @memberof Rule
     * @instance
     */
    this.__.operator = null;

    /**
     * @name value
     * @member {*}
     * @memberof Rule
     * @instance
     */
    this.__.value = undefined;
  };

  Rule.prototype = Object.create(Node.prototype);
  Rule.prototype.constructor = Rule;

  Utils.defineModelProperties(Rule, ["filter", "operator", "value"]);

  /**
   * Checks if this Node is the root
   * @returns {boolean} always false
   */
  Rule.prototype.isRoot = function () {
    return false;
  };

  /**
   * @member {function}
   * @memberof QueryBuilder
   * @see Group
   */
  QueryBuilder.Group = Group;

  /**
   * @member {function}
   * @memberof QueryBuilder
   * @see Rule
   */
  QueryBuilder.Rule = Rule;

  /**
   * The {@link http://learn.jquery.com/plugins/|jQuery Plugins} namespace
   * @external "jQuery.fn"
   */

  /**
   * Instanciates or accesses the {@link QueryBuilder} on an element
   * @function
   * @memberof external:"jQuery.fn"
   * @param {*} option - initial configuration or method name
   * @param {...*} args - method arguments
   *
   * @example
   * $('#builder').queryBuilder({ /** configuration object *\/ });
   * @example
   * $('#builder').queryBuilder('methodName', methodParam1, methodParam2);
   */
  $.fn.queryBuilder = function (option) {
    if (this.length === 0) {
      Utils.error("Config", "No target defined");
    }
    if (this.length > 1) {
      Utils.error("Config", "Unable to initialize on multiple target");
    }

    var data = this.data("queryBuilder");
    var options = (typeof option == "object" && option) || {};

    if (!data && option == "destroy") {
      return this;
    }
    if (!data) {
      var builder = new QueryBuilder(this, options);
      this.data("queryBuilder", builder);
      builder.init(options.rules);
    }
    if (typeof option == "string") {
      return data[option].apply(data, Array.prototype.slice.call(arguments, 1));
    }

    return this;
  };

  /**
   * @function
   * @memberof external:"jQuery.fn"
   * @see QueryBuilder
   */
  $.fn.queryBuilder.constructor = QueryBuilder;

  /**
   * @function
   * @memberof external:"jQuery.fn"
   * @see QueryBuilder.defaults
   */
  $.fn.queryBuilder.defaults = QueryBuilder.defaults;

  /**
   * @function
   * @memberof external:"jQuery.fn"
   * @see QueryBuilder.defaults
   */
  $.fn.queryBuilder.extend = QueryBuilder.extend;

  /**
   * @function
   * @memberof external:"jQuery.fn"
   * @see QueryBuilder.define
   */
  $.fn.queryBuilder.define = QueryBuilder.define;

  /**
   * @function
   * @memberof external:"jQuery.fn"
   * @see QueryBuilder.regional
   */
  $.fn.queryBuilder.regional = QueryBuilder.regional;

  /**
   * @class BtCheckbox
   * @memberof module:plugins
   * @description Applies Awesome Bootstrap Checkbox for checkbox and radio inputs.
   * @param {object} [options]
   * @param {string} [options.font='glyphicons']
   * @param {string} [options.color='default']
   */
  QueryBuilder.define(
    "bt-checkbox",
    function (options) {
      if (options.font == "glyphicons") {
        this.$el.addClass("bt-checkbox-glyphicons");
      }

      this.on("getRuleInput.filter", function (h, rule, name) {
        var filter = rule.filter;

        if (
          (filter.input === "radio" || filter.input === "checkbox") &&
          !filter.plugin
        ) {
          h.value = "";

          if (!filter.colors) {
            filter.colors = {};
          }
          if (filter.color) {
            filter.colors._def_ = filter.color;
          }

          var style = filter.vertical ? ' style="display:block"' : "";
          var i = 0;

          Utils.iterateOptions(filter.values, function (key, val) {
            var color =
              filter.colors[key] || filter.colors._def_ || options.color;
            var id = name + "_" + i++;

            h.value +=
              "\
<div" +
              style +
              ' class="' +
              filter.input +
              " " +
              filter.input +
              "-" +
              color +
              '"> \
  <input type="' +
              filter.input +
              '" name="' +
              name +
              '" id="' +
              id +
              '" value="' +
              key +
              '"> \
  <label for="' +
              id +
              '">' +
              val +
              "</label> \
</div>";
          });
        }
      });
    },
    {
      font: "glyphicons",
      color: "default",
    }
  );

  /**
   * @class BtSelectpicker
   * @memberof module:plugins
   * @descriptioon Applies Bootstrap Select on filters and operators combo-boxes.
   * @param {object} [options]
   * @param {string} [options.container='body']
   * @param {string} [options.style='btn-inverse btn-xs']
   * @param {int|string} [options.width='auto']
   * @param {boolean} [options.showIcon=false]
   * @throws MissingLibraryError
   */
  QueryBuilder.define(
    "bt-selectpicker",
    function (options) {
      if (!$.fn.selectpicker || !$.fn.selectpicker.Constructor) {
        Utils.error(
          "MissingLibrary",
          'Bootstrap Select is required to use "bt-selectpicker" plugin. Get it here: http://silviomoreto.github.io/bootstrap-select'
        );
      }

      var Selectors = QueryBuilder.selectors;

      // init selectpicker
      this.on("afterCreateRuleFilters", function (e, rule) {
        rule.$el
          .find(Selectors.rule_filter)
          .removeClass("form-control")
          .selectpicker(options);
      });

      this.on("afterCreateRuleOperators", function (e, rule) {
        rule.$el
          .find(Selectors.rule_operator)
          .removeClass("form-control")
          .selectpicker(options);
      });

      // update selectpicker on change
      this.on("afterUpdateRuleFilter", function (e, rule) {
        rule.$el.find(Selectors.rule_filter).selectpicker("render");
      });

      this.on("afterUpdateRuleOperator", function (e, rule) {
        rule.$el.find(Selectors.rule_operator).selectpicker("render");
      });

      this.on("beforeDeleteRule", function (e, rule) {
        rule.$el.find(Selectors.rule_filter).selectpicker("destroy");
        rule.$el.find(Selectors.rule_operator).selectpicker("destroy");
      });
    },
    {
      container: "body",
      style: "btn-inverse btn-xs",
      width: "auto",
      showIcon: false,
    }
  );

  /**
   * @class BtTooltipErrors
   * @memberof module:plugins
   * @description Applies Bootstrap Tooltips on validation error messages.
   * @param {object} [options]
   * @param {string} [options.placement='right']
   * @throws MissingLibraryError
   */
  QueryBuilder.define(
    "bt-tooltip-errors",
    function (options) {
      if (
        !$.fn.tooltip ||
        !$.fn.tooltip.Constructor ||
        !$.fn.tooltip.Constructor.prototype.fixTitle
      ) {
        Utils.error(
          "MissingLibrary",
          'Bootstrap Tooltip is required to use "bt-tooltip-errors" plugin. Get it here: http://getbootstrap.com'
        );
      }

      var self = this;

      // add BT Tooltip data
      this.on("getRuleTemplate.filter getGroupTemplate.filter", function (h) {
        var $h = $($.parseHTML(h.value));
        $h.find(QueryBuilder.selectors.error_container).attr(
          "data-toggle",
          "tooltip"
        );
        h.value = $h.prop("outerHTML");
      });

      // init/refresh tooltip when title changes
      this.model.on("update", function (e, node, field) {
        if (field == "error" && self.settings.display_errors) {
          node.$el
            .find(QueryBuilder.selectors.error_container)
            .eq(0)
            .tooltip(options)
            .tooltip("hide")
            .tooltip("fixTitle");
        }
      });
    },
    {
      placement: "right",
    }
  );

  /**
   * @class ChangeFilters
   * @memberof module:plugins
   * @description Allows to change available filters after plugin initialization.
   */

  QueryBuilder.extend(
    /** @lends module:plugins.ChangeFilters.prototype */ {
      /**
       * Change the filters of the builder
       * @param {boolean} [deleteOrphans=false] - delete rules using old filters
       * @param {QueryBuilder[]} filters
       * @fires module:plugins.ChangeFilters.changer:setFilters
       * @fires module:plugins.ChangeFilters.afterSetFilters
       * @throws ChangeFilterError
       */
      setFilters: function (deleteOrphans, filters) {
        var self = this;

        if (filters === undefined) {
          filters = deleteOrphans;
          deleteOrphans = false;
        }

        filters = this.checkFilters(filters);

        /**
         * Modifies the filters before {@link module:plugins.ChangeFilters.setFilters} method
         * @event changer:setFilters
         * @memberof module:plugins.ChangeFilters
         * @param {QueryBuilder.Filter[]} filters
         * @returns {QueryBuilder.Filter[]}
         */
        filters = this.change("setFilters", filters);

        var filtersIds = filters.map(function (filter) {
          return filter.id;
        });

        // check for orphans
        if (!deleteOrphans) {
          (function checkOrphans(node) {
            node.each(function (rule) {
              if (rule.filter && filtersIds.indexOf(rule.filter.id) === -1) {
                Utils.error(
                  "ChangeFilter",
                  'A rule is using filter "{0}"',
                  rule.filter.id
                );
              }
            }, checkOrphans);
          })(this.model.root);
        }

        // replace filters
        this.filters = filters;

        // apply on existing DOM
        (function updateBuilder(node) {
          node.each(
            true,
            function (rule) {
              if (rule.filter && filtersIds.indexOf(rule.filter.id) === -1) {
                rule.drop();

                self.trigger("rulesChanged");
              } else {
                self.createRuleFilters(rule);

                rule.$el
                  .find(QueryBuilder.selectors.rule_filter)
                  .val(rule.filter ? rule.filter.id : "-1");
                self.trigger("afterUpdateRuleFilter", rule);
              }
            },
            updateBuilder
          );
        })(this.model.root);

        // update plugins
        if (this.settings.plugins) {
          if (this.settings.plugins["unique-filter"]) {
            this.updateDisabledFilters();
          }
          if (this.settings.plugins["bt-selectpicker"]) {
            this.$el
              .find(QueryBuilder.selectors.rule_filter)
              .selectpicker("render");
          }
        }

        // reset the default_filter if does not exist anymore
        if (this.settings.default_filter) {
          try {
            this.getFilterById(this.settings.default_filter);
          } catch (e) {
            this.settings.default_filter = null;
          }
        }

        /**
         * After {@link module:plugins.ChangeFilters.setFilters} method
         * @event afterSetFilters
         * @memberof module:plugins.ChangeFilters
         * @param {QueryBuilder.Filter[]} filters
         */
        this.trigger("afterSetFilters", filters);
      },

      /**
       * Adds a new filter to the builder
       * @param {QueryBuilder.Filter|Filter[]} newFilters
       * @param {int|string} [position=#end] - index or '#start' or '#end'
       * @fires module:plugins.ChangeFilters.changer:setFilters
       * @fires module:plugins.ChangeFilters.afterSetFilters
       * @throws ChangeFilterError
       */
      addFilter: function (newFilters, position) {
        if (position === undefined || position == "#end") {
          position = this.filters.length;
        } else if (position == "#start") {
          position = 0;
        }

        if (!$.isArray(newFilters)) {
          newFilters = [newFilters];
        }

        var filters = $.extend(true, [], this.filters);

        // numeric position
        if (parseInt(position) == position) {
          Array.prototype.splice.apply(
            filters,
            [position, 0].concat(newFilters)
          );
        } else {
          // after filter by its id
          if (
            this.filters.some(function (filter, index) {
              if (filter.id == position) {
                position = index + 1;
                return true;
              }
            })
          ) {
            Array.prototype.splice.apply(
              filters,
              [position, 0].concat(newFilters)
            );
          }
          // defaults to end of list
          else {
            Array.prototype.push.apply(filters, newFilters);
          }
        }

        this.setFilters(filters);
      },

      /**
       * Removes a filter from the builder
       * @param {string|string[]} filterIds
       * @param {boolean} [deleteOrphans=false] delete rules using old filters
       * @fires module:plugins.ChangeFilters.changer:setFilters
       * @fires module:plugins.ChangeFilters.afterSetFilters
       * @throws ChangeFilterError
       */
      removeFilter: function (filterIds, deleteOrphans) {
        var filters = $.extend(true, [], this.filters);
        if (typeof filterIds === "string") {
          filterIds = [filterIds];
        }

        filters = filters.filter(function (filter) {
          return filterIds.indexOf(filter.id) === -1;
        });

        this.setFilters(deleteOrphans, filters);
      },
    }
  );

  /**
   * @class ChosenSelectpicker
   * @memberof module:plugins
   * @descriptioon Applies chosen-js Select on filters and operators combo-boxes.
   * @param {object} [options] Supports all the options for chosen
   * @throws MissingLibraryError
   */
  QueryBuilder.define("chosen-selectpicker", function (options) {
    if (!$.fn.chosen) {
      Utils.error(
        "MissingLibrary",
        'chosen is required to use "chosen-selectpicker" plugin. Get it here: https://github.com/harvesthq/chosen'
      );
    }

    if (this.settings.plugins["bt-selectpicker"]) {
      Utils.error(
        "Conflict",
        "bt-selectpicker is already selected as the dropdown plugin. Please remove chosen-selectpicker from the plugin list"
      );
    }

    var Selectors = QueryBuilder.selectors;

    // init selectpicker
    this.on("afterCreateRuleFilters", function (e, rule) {
      rule.$el
        .find(Selectors.rule_filter)
        .removeClass("form-control")
        .chosen(options);
    });

    this.on("afterCreateRuleOperators", function (e, rule) {
      if (e.builder.getOperators(rule.filter).length > 1) {
        rule.$el
          .find(Selectors.rule_operator)
          .removeClass("form-control")
          .chosen(options);
      }
    });

    // update selectpicker on change
    this.on("afterUpdateRuleFilter", function (e, rule) {
      rule.$el.find(Selectors.rule_filter).trigger("chosen:updated");
    });

    this.on("afterUpdateRuleOperator", function (e, rule) {
      rule.$el.find(Selectors.rule_operator).trigger("chosen:updated");
    });

    this.on("beforeDeleteRule", function (e, rule) {
      rule.$el.find(Selectors.rule_filter).chosen("destroy");
      rule.$el.find(Selectors.rule_operator).chosen("destroy");
    });
  });

  /**
   * @class FilterDescription
   * @memberof module:plugins
   * @description Provides three ways to display a description about a filter: inline, Bootsrap Popover or Bootbox.
   * @param {object} [options]
   * @param {string} [options.icon='glyphicon glyphicon-info-sign']
   * @param {string} [options.mode='popover'] - inline, popover or bootbox
   * @throws ConfigError
   */
  QueryBuilder.define(
    "filter-description",
    function (options) {
      // INLINE
      if (options.mode === "inline") {
        this.on(
          "afterUpdateRuleFilter afterUpdateRuleOperator",
          function (e, rule) {
            var $p = rule.$el.find("p.filter-description");
            var description = e.builder.getFilterDescription(rule.filter, rule);

            if (!description) {
              $p.hide();
            } else {
              if ($p.length === 0) {
                $p = $($.parseHTML('<p class="filter-description"></p>'));
                $p.appendTo(rule.$el);
              } else {
                $p.css("display", "");
              }

              $p.html('<i class="' + options.icon + '"></i> ' + description);
            }
          }
        );
      }
      // POPOVER
      else if (options.mode === "popover") {
        if (
          !$.fn.popover ||
          !$.fn.popover.Constructor ||
          !$.fn.popover.Constructor.prototype.fixTitle
        ) {
          Utils.error(
            "MissingLibrary",
            'Bootstrap Popover is required to use "filter-description" plugin. Get it here: http://getbootstrap.com'
          );
        }

        this.on(
          "afterUpdateRuleFilter afterUpdateRuleOperator",
          function (e, rule) {
            var $b = rule.$el.find("button.filter-description");
            var description = e.builder.getFilterDescription(rule.filter, rule);

            if (!description) {
              $b.hide();

              if ($b.data("bs.popover")) {
                $b.popover("hide");
              }
            } else {
              if ($b.length === 0) {
                $b = $(
                  $.parseHTML(
                    '<button type="button" class="btn btn-xs btn-info filter-description" data-toggle="popover"><i class="' +
                      options.icon +
                      '"></i></button>'
                  )
                );
                $b.prependTo(
                  rule.$el.find(QueryBuilder.selectors.rule_actions)
                );

                $b.popover({
                  placement: "left",
                  container: "body",
                  html: true,
                });

                $b.on("mouseout", function () {
                  $b.popover("hide");
                });
              } else {
                $b.css("display", "");
              }

              $b.data("bs.popover").options.content = description;

              if ($b.attr("aria-describedby")) {
                $b.popover("show");
              }
            }
          }
        );
      }
      // BOOTBOX
      else if (options.mode === "bootbox") {
        if (!("bootbox" in window)) {
          Utils.error(
            "MissingLibrary",
            'Bootbox is required to use "filter-description" plugin. Get it here: http://bootboxjs.com'
          );
        }

        this.on(
          "afterUpdateRuleFilter afterUpdateRuleOperator",
          function (e, rule) {
            var $b = rule.$el.find("button.filter-description");
            var description = e.builder.getFilterDescription(rule.filter, rule);

            if (!description) {
              $b.hide();
            } else {
              if ($b.length === 0) {
                $b = $(
                  $.parseHTML(
                    '<button type="button" class="btn btn-xs btn-info filter-description" data-toggle="bootbox"><i class="' +
                      options.icon +
                      '"></i></button>'
                  )
                );
                $b.prependTo(
                  rule.$el.find(QueryBuilder.selectors.rule_actions)
                );

                $b.on("click", function () {
                  bootbox.alert($b.data("description"));
                });
              } else {
                $b.css("display", "");
              }

              $b.data("description", description);
            }
          }
        );
      }
    },
    {
      icon: "glyphicon glyphicon-info-sign",
      mode: "popover",
    }
  );

  QueryBuilder.extend(
    /** @lends module:plugins.FilterDescription.prototype */ {
      /**
       * Returns the description of a filter for a particular rule (if present)
       * @param {object} filter
       * @param {Rule} [rule]
       * @returns {string}
       * @private
       */
      getFilterDescription: function (filter, rule) {
        if (!filter) {
          return undefined;
        } else if (typeof filter.description == "function") {
          return filter.description.call(this, rule);
        } else {
          return filter.description;
        }
      },
    }
  );

  /**
   * @class Invert
   * @memberof module:plugins
   * @description Allows to invert a rule operator, a group condition or the entire builder.
   * @param {object} [options]
   * @param {string} [options.icon='glyphicon glyphicon-random']
   * @param {boolean} [options.recursive=true]
   * @param {boolean} [options.invert_rules=true]
   * @param {boolean} [options.display_rules_button=false]
   * @param {boolean} [options.silent_fail=false]
   */
  QueryBuilder.define(
    "invert",
    function (options) {
      var self = this;
      var Selectors = QueryBuilder.selectors;

      // Bind events
      this.on("afterInit", function () {
        self.$el.on("click.queryBuilder", "[data-invert=group]", function () {
          var $group = $(this).closest(Selectors.group_container);
          self.invert(self.getModel($group), options);
        });

        if (options.display_rules_button && options.invert_rules) {
          self.$el.on("click.queryBuilder", "[data-invert=rule]", function () {
            var $rule = $(this).closest(Selectors.rule_container);
            self.invert(self.getModel($rule), options);
          });
        }
      });

      // Modify templates
      if (!options.disable_template) {
        this.on("getGroupTemplate.filter", function (h) {
          var $h = $($.parseHTML(h.value));
          $h.find(Selectors.condition_container).after(
            '<button type="button" class="btn btn-xs btn-default" data-invert="group">' +
              '<i class="' +
              options.icon +
              '"></i> ' +
              self.translate("invert") +
              "</button>"
          );
          h.value = $h.prop("outerHTML");
        });

        if (options.display_rules_button && options.invert_rules) {
          this.on("getRuleTemplate.filter", function (h) {
            var $h = $($.parseHTML(h.value));
            $h.find(Selectors.rule_actions).prepend(
              '<button type="button" class="btn btn-xs btn-default" data-invert="rule">' +
                '<i class="' +
                options.icon +
                '"></i> ' +
                self.translate("invert") +
                "</button>"
            );
            h.value = $h.prop("outerHTML");
          });
        }
      }
    },
    {
      icon: "glyphicon glyphicon-random",
      recursive: true,
      invert_rules: true,
      display_rules_button: false,
      silent_fail: false,
      disable_template: false,
    }
  );

  QueryBuilder.defaults({
    operatorOpposites: {
      equal: "not_equal",
      not_equal: "equal",
      in: "not_in",
      not_in: "in",
      less: "greater_or_equal",
      less_or_equal: "greater",
      greater: "less_or_equal",
      greater_or_equal: "less",
      between: "not_between",
      not_between: "between",
      begins_with: "not_begins_with",
      not_begins_with: "begins_with",
      contains: "not_contains",
      not_contains: "contains",
      ends_with: "not_ends_with",
      not_ends_with: "ends_with",
      is_empty: "is_not_empty",
      is_not_empty: "is_empty",
      is_null: "is_not_null",
      is_not_null: "is_null",
    },

    conditionOpposites: {
      AND: "OR",
      OR: "AND",
    },
  });

  QueryBuilder.extend(
    /** @lends module:plugins.Invert.prototype */ {
      /**
       * Invert a Group, a Rule or the whole builder
       * @param {Node} [node]
       * @param {object} [options] {@link module:plugins.Invert}
       * @fires module:plugins.Invert.afterInvert
       * @throws InvertConditionError, InvertOperatorError
       */
      invert: function (node, options) {
        if (!(node instanceof Node)) {
          if (!this.model.root) return;
          options = node;
          node = this.model.root;
        }

        if (typeof options != "object") options = {};
        if (options.recursive === undefined) options.recursive = true;
        if (options.invert_rules === undefined) options.invert_rules = true;
        if (options.silent_fail === undefined) options.silent_fail = false;
        if (options.trigger === undefined) options.trigger = true;

        if (node instanceof Group) {
          // invert group condition
          if (this.settings.conditionOpposites[node.condition]) {
            node.condition = this.settings.conditionOpposites[node.condition];
          } else if (!options.silent_fail) {
            Utils.error(
              "InvertCondition",
              'Unknown inverse of condition "{0}"',
              node.condition
            );
          }

          // recursive call
          if (options.recursive) {
            var tempOpts = $.extend({}, options, { trigger: false });
            node.each(
              function (rule) {
                if (options.invert_rules) {
                  this.invert(rule, tempOpts);
                }
              },
              function (group) {
                this.invert(group, tempOpts);
              },
              this
            );
          }
        } else if (node instanceof Rule) {
          if (node.operator && !node.filter.no_invert) {
            // invert rule operator
            if (this.settings.operatorOpposites[node.operator.type]) {
              var invert = this.settings.operatorOpposites[node.operator.type];
              // check if the invert is "authorized"
              if (
                !node.filter.operators ||
                node.filter.operators.indexOf(invert) != -1
              ) {
                node.operator = this.getOperatorByType(invert);
              }
            } else if (!options.silent_fail) {
              Utils.error(
                "InvertOperator",
                'Unknown inverse of operator "{0}"',
                node.operator.type
              );
            }
          }
        }

        if (options.trigger) {
          /**
           * After {@link module:plugins.Invert.invert} method
           * @event afterInvert
           * @memberof module:plugins.Invert
           * @param {Node} node - the main group or rule that has been modified
           * @param {object} options
           */
          this.trigger("afterInvert", node, options);

          this.trigger("rulesChanged");
        }
      },
    }
  );

  /**
   * @class MongoDbSupport
   * @memberof module:plugins
   * @description Allows to export rules as a MongoDB find object as well as populating the builder from a MongoDB object.
   */

  QueryBuilder.defaults({
    mongoOperators: {
      // @formatter:off
      equal: function (v) {
        return v[0];
      },
      not_equal: function (v) {
        return { $ne: v[0] };
      },
      in: function (v) {
        return { $in: v };
      },
      not_in: function (v) {
        return { $nin: v };
      },
      less: function (v) {
        return { $lt: v[0] };
      },
      less_or_equal: function (v) {
        return { $lte: v[0] };
      },
      greater: function (v) {
        return { $gt: v[0] };
      },
      greater_or_equal: function (v) {
        return { $gte: v[0] };
      },
      between: function (v) {
        return { $gte: v[0], $lte: v[1] };
      },
      not_between: function (v) {
        return { $lt: v[0], $gt: v[1] };
      },
      begins_with: function (v) {
        return { $regex: "^" + Utils.escapeRegExp(v[0]) };
      },
      not_begins_with: function (v) {
        return { $regex: "^(?!" + Utils.escapeRegExp(v[0]) + ")" };
      },
      contains: function (v) {
        return { $regex: Utils.escapeRegExp(v[0]) };
      },
      not_contains: function (v) {
        return {
          $regex: "^((?!" + Utils.escapeRegExp(v[0]) + ").)*$",
          $options: "s",
        };
      },
      ends_with: function (v) {
        return { $regex: Utils.escapeRegExp(v[0]) + "$" };
      },
      not_ends_with: function (v) {
        return { $regex: "(?<!" + Utils.escapeRegExp(v[0]) + ")$" };
      },
      is_empty: function (v) {
        return "";
      },
      is_not_empty: function (v) {
        return { $ne: "" };
      },
      is_null: function (v) {
        return null;
      },
      is_not_null: function (v) {
        return { $ne: null };
      },
      // @formatter:on
    },

    mongoRuleOperators: {
      $eq: function (v) {
        return {
          val: v,
          op: v === null ? "is_null" : v === "" ? "is_empty" : "equal",
        };
      },
      $ne: function (v) {
        v = v.$ne;
        return {
          val: v,
          op:
            v === null
              ? "is_not_null"
              : v === ""
              ? "is_not_empty"
              : "not_equal",
        };
      },
      $regex: function (v) {
        v = v.$regex;
        if (v.slice(0, 4) == "^(?!" && v.slice(-1) == ")") {
          return { val: v.slice(4, -1), op: "not_begins_with" };
        } else if (v.slice(0, 5) == "^((?!" && v.slice(-5) == ").)*$") {
          return { val: v.slice(5, -5), op: "not_contains" };
        } else if (v.slice(0, 4) == "(?<!" && v.slice(-2) == ")$") {
          return { val: v.slice(4, -2), op: "not_ends_with" };
        } else if (v.slice(-1) == "$") {
          return { val: v.slice(0, -1), op: "ends_with" };
        } else if (v.slice(0, 1) == "^") {
          return { val: v.slice(1), op: "begins_with" };
        } else {
          return { val: v, op: "contains" };
        }
      },
      between: function (v) {
        return { val: [v.$gte, v.$lte], op: "between" };
      },
      not_between: function (v) {
        return { val: [v.$lt, v.$gt], op: "not_between" };
      },
      $in: function (v) {
        return { val: v.$in, op: "in" };
      },
      $nin: function (v) {
        return { val: v.$nin, op: "not_in" };
      },
      $lt: function (v) {
        return { val: v.$lt, op: "less" };
      },
      $lte: function (v) {
        return { val: v.$lte, op: "less_or_equal" };
      },
      $gt: function (v) {
        return { val: v.$gt, op: "greater" };
      },
      $gte: function (v) {
        return { val: v.$gte, op: "greater_or_equal" };
      },
    },
  });

  QueryBuilder.extend(
    /** @lends module:plugins.MongoDbSupport.prototype */ {
      /**
       * Returns rules as a MongoDB query
       * @param {object} [data] - current rules by default
       * @returns {object}
       * @fires module:plugins.MongoDbSupport.changer:getMongoDBField
       * @fires module:plugins.MongoDbSupport.changer:ruleToMongo
       * @fires module:plugins.MongoDbSupport.changer:groupToMongo
       * @throws UndefinedMongoConditionError, UndefinedMongoOperatorError
       */
      getMongo: function (data) {
        data = data === undefined ? this.getRules() : data;

        if (!data) {
          return null;
        }

        var self = this;

        return (function parse(group) {
          if (!group.condition) {
            group.condition = self.settings.default_condition;
          }
          if (["AND", "OR"].indexOf(group.condition.toUpperCase()) === -1) {
            Utils.error(
              "UndefinedMongoCondition",
              'Unable to build MongoDB query with condition "{0}"',
              group.condition
            );
          }

          if (!group.rules) {
            return {};
          }

          var parts = [];

          group.rules.forEach(function (rule) {
            if (rule.rules && rule.rules.length > 0) {
              parts.push(parse(rule));
            } else {
              var mdb = self.settings.mongoOperators[rule.operator];
              var ope = self.getOperatorByType(rule.operator);

              if (mdb === undefined) {
                Utils.error(
                  "UndefinedMongoOperator",
                  'Unknown MongoDB operation for operator "{0}"',
                  rule.operator
                );
              }

              if (ope.nb_inputs !== 0) {
                if (!(rule.value instanceof Array)) {
                  rule.value = [rule.value];
                }
              }

              /**
               * Modifies the MongoDB field used by a rule
               * @event changer:getMongoDBField
               * @memberof module:plugins.MongoDbSupport
               * @param {string} field
               * @param {Rule} rule
               * @returns {string}
               */
              var field = self.change("getMongoDBField", rule.field, rule);

              var ruleExpression = {};
              ruleExpression[field] = mdb.call(self, rule.value);

              /**
               * Modifies the MongoDB expression generated for a rul
               * @event changer:ruleToMongo
               * @memberof module:plugins.MongoDbSupport
               * @param {object} expression
               * @param {Rule} rule
               * @param {*} value
               * @param {function} valueWrapper - function that takes the value and adds the operator
               * @returns {object}
               */
              parts.push(
                self.change(
                  "ruleToMongo",
                  ruleExpression,
                  rule,
                  rule.value,
                  mdb
                )
              );
            }
          });

          var groupExpression = {};
          groupExpression["$" + group.condition.toLowerCase()] = parts;

          /**
           * Modifies the MongoDB expression generated for a group
           * @event changer:groupToMongo
           * @memberof module:plugins.MongoDbSupport
           * @param {object} expression
           * @param {Group} group
           * @returns {object}
           */
          return self.change("groupToMongo", groupExpression, group);
        })(data);
      },

      /**
       * Converts a MongoDB query to rules
       * @param {object} query
       * @returns {object}
       * @fires module:plugins.MongoDbSupport.changer:parseMongoNode
       * @fires module:plugins.MongoDbSupport.changer:getMongoDBFieldID
       * @fires module:plugins.MongoDbSupport.changer:mongoToRule
       * @fires module:plugins.MongoDbSupport.changer:mongoToGroup
       * @throws MongoParseError, UndefinedMongoConditionError, UndefinedMongoOperatorError
       */
      getRulesFromMongo: function (query) {
        if (query === undefined || query === null) {
          return null;
        }

        var self = this;

        /**
         * Custom parsing of a MongoDB expression, you can return a sub-part of the expression, or a well formed group or rule JSON
         * @event changer:parseMongoNode
         * @memberof module:plugins.MongoDbSupport
         * @param {object} expression
         * @returns {object} expression, rule or group
         */
        query = self.change("parseMongoNode", query);

        // a plugin returned a group
        if ("rules" in query && "condition" in query) {
          return query;
        }

        // a plugin returned a rule
        if ("id" in query && "operator" in query && "value" in query) {
          return {
            condition: this.settings.default_condition,
            rules: [query],
          };
        }

        var key = self.getMongoCondition(query);
        if (!key) {
          Utils.error("MongoParse", "Invalid MongoDB query format");
        }

        return (function parse(data, topKey) {
          var rules = data[topKey];
          var parts = [];

          rules.forEach(function (data) {
            // allow plugins to manually parse or handle special cases
            data = self.change("parseMongoNode", data);

            // a plugin returned a group
            if ("rules" in data && "condition" in data) {
              parts.push(data);
              return;
            }

            // a plugin returned a rule
            if ("id" in data && "operator" in data && "value" in data) {
              parts.push(data);
              return;
            }

            var key = self.getMongoCondition(data);
            if (key) {
              parts.push(parse(data, key));
            } else {
              var field = Object.keys(data)[0];
              var value = data[field];

              var operator = self.getMongoOperator(value);
              if (operator === undefined) {
                Utils.error("MongoParse", "Invalid MongoDB query format");
              }

              var mdbrl = self.settings.mongoRuleOperators[operator];
              if (mdbrl === undefined) {
                Utils.error(
                  "UndefinedMongoOperator",
                  'JSON Rule operation unknown for operator "{0}"',
                  operator
                );
              }

              var opVal = mdbrl.call(self, value);

              var id = self.getMongoDBFieldID(field, value);

              /**
               * Modifies the rule generated from the MongoDB expression
               * @event changer:mongoToRule
               * @memberof module:plugins.MongoDbSupport
               * @param {object} rule
               * @param {object} expression
               * @returns {object}
               */
              var rule = self.change(
                "mongoToRule",
                {
                  id: id,
                  field: field,
                  operator: opVal.op,
                  value: opVal.val,
                },
                data
              );

              parts.push(rule);
            }
          });

          /**
           * Modifies the group generated from the MongoDB expression
           * @event changer:mongoToGroup
           * @memberof module:plugins.MongoDbSupport
           * @param {object} group
           * @param {object} expression
           * @returns {object}
           */
          return self.change(
            "mongoToGroup",
            {
              condition: topKey.replace("$", "").toUpperCase(),
              rules: parts,
            },
            data
          );
        })(query, key);
      },

      /**
       * Sets rules a from MongoDB query
       * @see module:plugins.MongoDbSupport.getRulesFromMongo
       */
      setRulesFromMongo: function (query) {
        this.setRules(this.getRulesFromMongo(query));
      },

      /**
       * Returns a filter identifier from the MongoDB field.
       * Automatically use the only one filter with a matching field, fires a changer otherwise.
       * @param {string} field
       * @param {*} value
       * @fires module:plugins.MongoDbSupport:changer:getMongoDBFieldID
       * @returns {string}
       * @private
       */
      getMongoDBFieldID: function (field, value) {
        var matchingFilters = this.filters.filter(function (filter) {
          return filter.field === field;
        });

        var id;
        if (matchingFilters.length === 1) {
          id = matchingFilters[0].id;
        } else {
          /**
           * Returns a filter identifier from the MongoDB field
           * @event changer:getMongoDBFieldID
           * @memberof module:plugins.MongoDbSupport
           * @param {string} field
           * @param {*} value
           * @returns {string}
           */
          id = this.change("getMongoDBFieldID", field, value);
        }

        return id;
      },

      /**
       * Finds which operator is used in a MongoDB sub-object
       * @param {*} data
       * @returns {string|undefined}
       * @private
       */
      getMongoOperator: function (data) {
        if (data !== null && typeof data === "object") {
          if (data.$gte !== undefined && data.$lte !== undefined) {
            return "between";
          }
          if (data.$lt !== undefined && data.$gt !== undefined) {
            return "not_between";
          }

          var knownKeys = Object.keys(data).filter(
            function (key) {
              return !!this.settings.mongoRuleOperators[key];
            }.bind(this)
          );

          if (knownKeys.length === 1) {
            return knownKeys[0];
          }
        } else {
          return "$eq";
        }
      },

      /**
       * Returns the key corresponding to "$or" or "$and"
       * @param {object} data
       * @returns {string|undefined}
       * @private
       */
      getMongoCondition: function (data) {
        var keys = Object.keys(data);

        for (var i = 0, l = keys.length; i < l; i++) {
          if (
            keys[i].toLowerCase() === "$or" ||
            keys[i].toLowerCase() === "$and"
          ) {
            return keys[i];
          }
        }
      },
    }
  );

  /**
   * @class NotGroup
   * @memberof module:plugins
   * @description Adds a "Not" checkbox in front of group conditions.
   * @param {object} [options]
   * @param {string} [options.icon_checked='glyphicon glyphicon-checked']
   * @param {string} [options.icon_unchecked='glyphicon glyphicon-unchecked']
   */
  QueryBuilder.define(
    "not-group",
    function (options) {
      var self = this;

      // Bind events
      this.on("afterInit", function () {
        self.$el.on("click.queryBuilder", "[data-not=group]", function () {
          var $group = $(this).closest(QueryBuilder.selectors.group_container);
          var group = self.getModel($group);
          group.not = !group.not;
        });

        self.model.on("update", function (e, node, field) {
          if (node instanceof Group && field === "not") {
            self.updateGroupNot(node);
          }
        });
      });

      // Init "not" property
      this.on("afterAddGroup", function (e, group) {
        group.__.not = false;
      });

      // Modify templates
      if (!options.disable_template) {
        this.on("getGroupTemplate.filter", function (h) {
          var $h = $($.parseHTML(h.value));
          $h.find(QueryBuilder.selectors.condition_container).prepend(
            '<button type="button" class="btn btn-xs btn-default" data-not="group">' +
              '<i class="' +
              options.icon_unchecked +
              '"></i> ' +
              self.translate("NOT") +
              "</button>"
          );
          h.value = $h.prop("outerHTML");
        });
      }

      // Export "not" to JSON
      this.on("groupToJson.filter", function (e, group) {
        e.value.not = group.not;
      });

      // Read "not" from JSON
      this.on("jsonToGroup.filter", function (e, json) {
        e.value.not = !!json.not;
      });

      // Export "not" to SQL
      this.on("groupToSQL.filter", function (e, group) {
        if (group.not) {
          e.value = "NOT ( " + e.value + " )";
        }
      });

      // Parse "NOT" function from sqlparser
      this.on("parseSQLNode.filter", function (e) {
        if (e.value.name && e.value.name.toUpperCase() == "NOT") {
          e.value = e.value.arguments.value[0];

          // if the there is no sub-group, create one
          if (["AND", "OR"].indexOf(e.value.operation.toUpperCase()) === -1) {
            e.value = new SQLParser.nodes.Op(
              self.settings.default_condition,
              e.value,
              null
            );
          }

          e.value.not = true;
        }
      });

      // Request to create sub-group if the "not" flag is set
      this.on("sqlGroupsDistinct.filter", function (e, group, data, i) {
        if (data.not && i > 0) {
          e.value = true;
        }
      });

      // Read "not" from parsed SQL
      this.on("sqlToGroup.filter", function (e, data) {
        e.value.not = !!data.not;
      });

      // Export "not" to Mongo
      this.on("groupToMongo.filter", function (e, group) {
        var key = "$" + group.condition.toLowerCase();
        if (group.not && e.value[key]) {
          e.value = { $nor: [e.value] };
        }
      });

      // Parse "$nor" operator from Mongo
      this.on("parseMongoNode.filter", function (e) {
        var keys = Object.keys(e.value);

        if (keys[0] == "$nor") {
          e.value = e.value[keys[0]][0];
          e.value.not = true;
        }
      });

      // Read "not" from parsed Mongo
      this.on("mongoToGroup.filter", function (e, data) {
        e.value.not = !!data.not;
      });
    },
    {
      icon_unchecked: "glyphicon glyphicon-unchecked",
      icon_checked: "glyphicon glyphicon-check",
      disable_template: false,
    }
  );

  /**
   * From {@link module:plugins.NotGroup}
   * @name not
   * @member {boolean}
   * @memberof Group
   * @instance
   */
  Utils.defineModelProperties(Group, ["not"]);

  QueryBuilder.selectors.group_not =
    QueryBuilder.selectors.group_header + " [data-not=group]";

  QueryBuilder.extend(
    /** @lends module:plugins.NotGroup.prototype */ {
      /**
       * Performs actions when a group's not changes
       * @param {Group} group
       * @fires module:plugins.NotGroup.afterUpdateGroupNot
       * @private
       */
      updateGroupNot: function (group) {
        var options = this.plugins["not-group"];
        group.$el
          .find(">" + QueryBuilder.selectors.group_not)
          .toggleClass("active", group.not)
          .find("i")
          .attr(
            "class",
            group.not ? options.icon_checked : options.icon_unchecked
          );

        /**
         * After the group's not flag has been modified
         * @event afterUpdateGroupNot
         * @memberof module:plugins.NotGroup
         * @param {Group} group
         */
        this.trigger("afterUpdateGroupNot", group);

        this.trigger("rulesChanged");
      },
    }
  );

  /**
   * @class Sortable
   * @memberof module:plugins
   * @description Enables drag & drop sort of rules.
   * @param {object} [options]
   * @param {boolean} [options.inherit_no_drop=true]
   * @param {boolean} [options.inherit_no_sortable=true]
   * @param {string} [options.icon='glyphicon glyphicon-sort']
   * @throws MissingLibraryError, ConfigError
   */
  QueryBuilder.define(
    "sortable",
    function (options) {
      if (!("interact" in window)) {
        Utils.error(
          "MissingLibrary",
          'interact.js is required to use "sortable" plugin. Get it here: http://interactjs.io'
        );
      }

      if (options.default_no_sortable !== undefined) {
        Utils.error(
          false,
          "Config",
          'Sortable plugin : "default_no_sortable" options is deprecated, use standard "default_rule_flags" and "default_group_flags" instead'
        );
        this.settings.default_rule_flags.no_sortable =
          this.settings.default_group_flags.no_sortable =
            options.default_no_sortable;
      }

      // recompute drop-zones during drag (when a rule is hidden)
      interact.dynamicDrop(true);

      // set move threshold to 10px
      interact.pointerMoveTolerance(10);

      var placeholder;
      var ghost;
      var src;
      var moved;

      // Init drag and drop
      this.on("afterAddRule afterAddGroup", function (e, node) {
        if (node == placeholder) {
          return;
        }

        var self = e.builder;

        // Inherit flags
        if (
          options.inherit_no_sortable &&
          node.parent &&
          node.parent.flags.no_sortable
        ) {
          node.flags.no_sortable = true;
        }
        if (
          options.inherit_no_drop &&
          node.parent &&
          node.parent.flags.no_drop
        ) {
          node.flags.no_drop = true;
        }

        // Configure drag
        if (!node.flags.no_sortable) {
          interact(node.$el[0]).draggable({
            allowFrom: QueryBuilder.selectors.drag_handle,
            onstart: function (event) {
              moved = false;

              // get model of dragged element
              src = self.getModel(event.target);

              // create ghost
              ghost = src.$el
                .clone()
                .appendTo(src.$el.parent())
                .width(src.$el.outerWidth())
                .addClass("dragging");

              // create drop placeholder
              var ph = $(
                $.parseHTML('<div class="rule-placeholder">&nbsp;</div>')
              ).height(src.$el.outerHeight());

              placeholder = src.parent.addRule(ph, src.getPos());

              // hide dragged element
              src.$el.hide();
            },
            onmove: function (event) {
              // make the ghost follow the cursor
              ghost[0].style.top = event.clientY - 15 + "px";
              ghost[0].style.left = event.clientX - 15 + "px";
            },
            onend: function (event) {
              // starting from Interact 1.3.3, onend is called before ondrop
              if (event.dropzone) {
                moveSortableToTarget(src, $(event.relatedTarget), self);
                moved = true;
              }

              // remove ghost
              ghost.remove();
              ghost = undefined;

              // remove placeholder
              placeholder.drop();
              placeholder = undefined;

              // show element
              src.$el.css("display", "");

              /**
               * After a node has been moved with {@link module:plugins.Sortable}
               * @event afterMove
               * @memberof module:plugins.Sortable
               * @param {Node} node
               */
              self.trigger("afterMove", src);

              self.trigger("rulesChanged");
            },
          });
        }

        if (!node.flags.no_drop) {
          //  Configure drop on groups and rules
          interact(node.$el[0]).dropzone({
            accept: QueryBuilder.selectors.rule_and_group_containers,
            ondragenter: function (event) {
              moveSortableToTarget(placeholder, $(event.target), self);
            },
            ondrop: function (event) {
              if (!moved) {
                moveSortableToTarget(src, $(event.target), self);
              }
            },
          });

          // Configure drop on group headers
          if (node instanceof Group) {
            interact(
              node.$el.find(QueryBuilder.selectors.group_header)[0]
            ).dropzone({
              accept: QueryBuilder.selectors.rule_and_group_containers,
              ondragenter: function (event) {
                moveSortableToTarget(placeholder, $(event.target), self);
              },
              ondrop: function (event) {
                if (!moved) {
                  moveSortableToTarget(src, $(event.target), self);
                }
              },
            });
          }
        }
      });

      // Detach interactables
      this.on("beforeDeleteRule beforeDeleteGroup", function (e, node) {
        if (!e.isDefaultPrevented()) {
          interact(node.$el[0]).unset();

          if (node instanceof Group) {
            interact(
              node.$el.find(QueryBuilder.selectors.group_header)[0]
            ).unset();
          }
        }
      });

      // Remove drag handle from non-sortable items
      this.on("afterApplyRuleFlags afterApplyGroupFlags", function (e, node) {
        if (node.flags.no_sortable) {
          node.$el.find(".drag-handle").remove();
        }
      });

      // Modify templates
      if (!options.disable_template) {
        this.on("getGroupTemplate.filter", function (h, level) {
          if (level > 1) {
            var $h = $($.parseHTML(h.value));
            $h.find(QueryBuilder.selectors.condition_container).after(
              '<div class="drag-handle"><i class="' +
                options.icon +
                '"></i></div>'
            );
            h.value = $h.prop("outerHTML");
          }
        });

        this.on("getRuleTemplate.filter", function (h) {
          var $h = $($.parseHTML(h.value));
          $h.find(QueryBuilder.selectors.rule_header).after(
            '<div class="drag-handle"><i class="' +
              options.icon +
              '"></i></div>'
          );
          h.value = $h.prop("outerHTML");
        });
      }
    },
    {
      inherit_no_sortable: true,
      inherit_no_drop: true,
      icon: "glyphicon glyphicon-sort",
      disable_template: false,
    }
  );

  QueryBuilder.selectors.rule_and_group_containers =
    QueryBuilder.selectors.rule_container +
    ", " +
    QueryBuilder.selectors.group_container;
  QueryBuilder.selectors.drag_handle = ".drag-handle";

  QueryBuilder.defaults({
    default_rule_flags: {
      no_sortable: false,
      no_drop: false,
    },
    default_group_flags: {
      no_sortable: false,
      no_drop: false,
    },
  });

  /**
   * Moves an element (placeholder or actual object) depending on active target
   * @memberof module:plugins.Sortable
   * @param {Node} node
   * @param {jQuery} target
   * @param {QueryBuilder} [builder]
   * @private
   */
  function moveSortableToTarget(node, target, builder) {
    var parent, method;
    var Selectors = QueryBuilder.selectors;

    // on rule
    parent = target.closest(Selectors.rule_container);
    if (parent.length) {
      method = "moveAfter";
    }

    // on group header
    if (!method) {
      parent = target.closest(Selectors.group_header);
      if (parent.length) {
        parent = target.closest(Selectors.group_container);
        method = "moveAtBegin";
      }
    }

    // on group
    if (!method) {
      parent = target.closest(Selectors.group_container);
      if (parent.length) {
        method = "moveAtEnd";
      }
    }

    if (method) {
      node[method](builder.getModel(parent));

      // refresh radio value
      if (builder && node instanceof Rule) {
        builder.setRuleInputValue(node, node.value);
      }
    }
  }

  /**
   * @class SqlSupport
   * @memberof module:plugins
   * @description Allows to export rules as a SQL WHERE statement as well as populating the builder from an SQL query.
   * @param {object} [options]
   * @param {boolean} [options.boolean_as_integer=true] - `true` to convert boolean values to integer in the SQL output
   */
  QueryBuilder.define("sql-support", function (options) {}, {
    boolean_as_integer: true,
  });

  QueryBuilder.defaults({
    // operators for internal -> SQL conversion
    sqlOperators: {
      equal: { op: "= ?" },
      not_equal: { op: "!= ?" },
      in: { op: "IN(?)", sep: ", " },
      not_in: { op: "NOT IN(?)", sep: ", " },
      less: { op: "< ?" },
      less_or_equal: { op: "<= ?" },
      greater: { op: "> ?" },
      greater_or_equal: { op: ">= ?" },
      between: { op: "BETWEEN ?", sep: " AND " },
      not_between: { op: "NOT BETWEEN ?", sep: " AND " },
      begins_with: { op: "LIKE(?)", mod: "{0}%" },
      not_begins_with: { op: "NOT LIKE(?)", mod: "{0}%" },
      contains: { op: "LIKE(?)", mod: "%{0}%" },
      not_contains: { op: "NOT LIKE(?)", mod: "%{0}%" },
      ends_with: { op: "LIKE(?)", mod: "%{0}" },
      not_ends_with: { op: "NOT LIKE(?)", mod: "%{0}" },
      is_empty: { op: "= ''" },
      is_not_empty: { op: "!= ''" },
      is_null: { op: "IS NULL" },
      is_not_null: { op: "IS NOT NULL" },
    },

    // operators for SQL -> internal conversion
    sqlRuleOperator: {
      "=": function (v) {
        return {
          val: v,
          op: v === "" ? "is_empty" : "equal",
        };
      },
      "!=": function (v) {
        return {
          val: v,
          op: v === "" ? "is_not_empty" : "not_equal",
        };
      },
      LIKE: function (v) {
        if (v.slice(0, 1) == "%" && v.slice(-1) == "%") {
          return {
            val: v.slice(1, -1),
            op: "contains",
          };
        } else if (v.slice(0, 1) == "%") {
          return {
            val: v.slice(1),
            op: "ends_with",
          };
        } else if (v.slice(-1) == "%") {
          return {
            val: v.slice(0, -1),
            op: "begins_with",
          };
        } else {
          Utils.error("SQLParse", 'Invalid value for LIKE operator "{0}"', v);
        }
      },
      "NOT LIKE": function (v) {
        if (v.slice(0, 1) == "%" && v.slice(-1) == "%") {
          return {
            val: v.slice(1, -1),
            op: "not_contains",
          };
        } else if (v.slice(0, 1) == "%") {
          return {
            val: v.slice(1),
            op: "not_ends_with",
          };
        } else if (v.slice(-1) == "%") {
          return {
            val: v.slice(0, -1),
            op: "not_begins_with",
          };
        } else {
          Utils.error(
            "SQLParse",
            'Invalid value for NOT LIKE operator "{0}"',
            v
          );
        }
      },
      IN: function (v) {
        return { val: v, op: "in" };
      },
      "NOT IN": function (v) {
        return { val: v, op: "not_in" };
      },
      "<": function (v) {
        return { val: v, op: "less" };
      },
      "<=": function (v) {
        return { val: v, op: "less_or_equal" };
      },
      ">": function (v) {
        return { val: v, op: "greater" };
      },
      ">=": function (v) {
        return { val: v, op: "greater_or_equal" };
      },
      BETWEEN: function (v) {
        return { val: v, op: "between" };
      },
      "NOT BETWEEN": function (v) {
        return { val: v, op: "not_between" };
      },
      IS: function (v) {
        if (v !== null) {
          Utils.error("SQLParse", "Invalid value for IS operator");
        }
        return { val: null, op: "is_null" };
      },
      "IS NOT": function (v) {
        if (v !== null) {
          Utils.error("SQLParse", "Invalid value for IS operator");
        }
        return { val: null, op: "is_not_null" };
      },
    },

    // statements for internal -> SQL conversion
    sqlStatements: {
      question_mark: function () {
        var params = [];
        return {
          add: function (rule, value) {
            params.push(value);
            return "?";
          },
          run: function () {
            return params;
          },
        };
      },

      numbered: function (char) {
        if (!char || char.length > 1) char = "$";
        var index = 0;
        var params = [];
        return {
          add: function (rule, value) {
            params.push(value);
            index++;
            return char + index;
          },
          run: function () {
            return params;
          },
        };
      },

      named: function (char) {
        if (!char || char.length > 1) char = ":";
        var indexes = {};
        var params = {};
        return {
          add: function (rule, value) {
            if (!indexes[rule.field]) indexes[rule.field] = 1;
            var key = rule.field + "_" + indexes[rule.field]++;
            params[key] = value;
            return char + key;
          },
          run: function () {
            return params;
          },
        };
      },
    },

    // statements for SQL -> internal conversion
    sqlRuleStatement: {
      question_mark: function (values) {
        var index = 0;
        return {
          parse: function (v) {
            return v == "?" ? values[index++] : v;
          },
          esc: function (sql) {
            return sql.replace(/\?/g, "'?'");
          },
        };
      },

      numbered: function (values, char) {
        if (!char || char.length > 1) char = "$";
        var regex1 = new RegExp("^\\" + char + "[0-9]+$");
        var regex2 = new RegExp("\\" + char + "([0-9]+)", "g");
        return {
          parse: function (v) {
            return regex1.test(v) ? values[v.slice(1) - 1] : v;
          },
          esc: function (sql) {
            return sql.replace(
              regex2,
              "'" + (char == "$" ? "$$" : char) + "$1'"
            );
          },
        };
      },

      named: function (values, char) {
        if (!char || char.length > 1) char = ":";
        var regex1 = new RegExp("^\\" + char);
        var regex2 = new RegExp(
          "\\" + char + "(" + Object.keys(values).join("|") + ")\\b",
          "g"
        );
        return {
          parse: function (v) {
            return regex1.test(v) ? values[v.slice(1)] : v;
          },
          esc: function (sql) {
            return sql.replace(
              regex2,
              "'" + (char == "$" ? "$$" : char) + "$1'"
            );
          },
        };
      },
    },
  });

  /**
   * @typedef {object} SqlQuery
   * @memberof module:plugins.SqlSupport
   * @property {string} sql
   * @property {object} params
   */

  QueryBuilder.extend(
    /** @lends module:plugins.SqlSupport.prototype */ {
      /**
       * Returns rules as a SQL query
       * @param {boolean|string} [stmt] - use prepared statements: false, 'question_mark', 'numbered', 'numbered(@)', 'named', 'named(@)'
       * @param {boolean} [nl=false] output with new lines
       * @param {object} [data] - current rules by default
       * @returns {module:plugins.SqlSupport.SqlQuery}
       * @fires module:plugins.SqlSupport.changer:getSQLField
       * @fires module:plugins.SqlSupport.changer:ruleToSQL
       * @fires module:plugins.SqlSupport.changer:groupToSQL
       * @throws UndefinedSQLConditionError, UndefinedSQLOperatorError
       */
      getSQL: function (stmt, nl, data) {
        data = data === undefined ? this.getRules() : data;

        if (!data) {
          return null;
        }

        nl = !!nl ? "\n" : " ";
        var boolean_as_integer = this.getPluginOptions(
          "sql-support",
          "boolean_as_integer"
        );

        if (stmt === true) {
          stmt = "question_mark";
        }
        if (typeof stmt == "string") {
          var config = getStmtConfig(stmt);
          stmt = this.settings.sqlStatements[config[1]](config[2]);
        }

        var self = this;

        var sql = (function parse(group) {
          if (!group.condition) {
            group.condition = self.settings.default_condition;
          }
          if (["AND", "OR"].indexOf(group.condition.toUpperCase()) === -1) {
            Utils.error(
              "UndefinedSQLCondition",
              'Unable to build SQL query with condition "{0}"',
              group.condition
            );
          }

          if (!group.rules) {
            return "";
          }

          var parts = [];

          group.rules.forEach(function (rule) {
            if (rule.rules && rule.rules.length > 0) {
              parts.push("(" + nl + parse(rule) + nl + ")" + nl);
            } else {
              var sql = self.settings.sqlOperators[rule.operator];
              var ope = self.getOperatorByType(rule.operator);
              var value = "";

              if (sql === undefined) {
                Utils.error(
                  "UndefinedSQLOperator",
                  'Unknown SQL operation for operator "{0}"',
                  rule.operator
                );
              }

              if (ope.nb_inputs !== 0) {
                if (!(rule.value instanceof Array)) {
                  rule.value = [rule.value];
                }

                rule.value.forEach(function (v, i) {
                  if (i > 0) {
                    value += sql.sep;
                  }

                  if (rule.type == "boolean" && boolean_as_integer) {
                    v = v ? 1 : 0;
                  } else if (
                    !stmt &&
                    rule.type !== "integer" &&
                    rule.type !== "double" &&
                    rule.type !== "boolean"
                  ) {
                    v = Utils.escapeString(v);
                  }

                  if (sql.mod) {
                    v = Utils.fmt(sql.mod, v);
                  }

                  if (stmt) {
                    value += stmt.add(rule, v);
                  } else {
                    if (typeof v == "string") {
                      v = "'" + v + "'";
                    }

                    value += v;
                  }
                });
              }

              var sqlFn = function (v) {
                return sql.op.replace("?", function () {
                  return v;
                });
              };

              /**
               * Modifies the SQL field used by a rule
               * @event changer:getSQLField
               * @memberof module:plugins.SqlSupport
               * @param {string} field
               * @param {Rule} rule
               * @returns {string}
               */
              var field = self.change("getSQLField", rule.field, rule);

              var ruleExpression = field + " " + sqlFn(value);

              /**
               * Modifies the SQL generated for a rule
               * @event changer:ruleToSQL
               * @memberof module:plugins.SqlSupport
               * @param {string} expression
               * @param {Rule} rule
               * @param {*} value
               * @param {function} valueWrapper - function that takes the value and adds the operator
               * @returns {string}
               */
              parts.push(
                self.change("ruleToSQL", ruleExpression, rule, value, sqlFn)
              );
            }
          });

          var groupExpression = parts.join(" " + group.condition + nl);

          /**
           * Modifies the SQL generated for a group
           * @event changer:groupToSQL
           * @memberof module:plugins.SqlSupport
           * @param {string} expression
           * @param {Group} group
           * @returns {string}
           */
          return self.change("groupToSQL", groupExpression, group);
        })(data);

        if (stmt) {
          return {
            sql: sql,
            params: stmt.run(),
          };
        } else {
          return {
            sql: sql,
          };
        }
      },

      /**
       * Convert a SQL query to rules
       * @param {string|module:plugins.SqlSupport.SqlQuery} query
       * @param {boolean|string} stmt
       * @returns {object}
       * @fires module:plugins.SqlSupport.changer:parseSQLNode
       * @fires module:plugins.SqlSupport.changer:getSQLFieldID
       * @fires module:plugins.SqlSupport.changer:sqlToRule
       * @fires module:plugins.SqlSupport.changer:sqlToGroup
       * @throws MissingLibraryError, SQLParseError, UndefinedSQLOperatorError
       */
      getRulesFromSQL: function (query, stmt) {
        if (!("SQLParser" in window)) {
          Utils.error(
            "MissingLibrary",
            "SQLParser is required to parse SQL queries. Get it here https://github.com/mistic100/sql-parser"
          );
        }

        var self = this;

        if (typeof query == "string") {
          query = { sql: query };
        }

        if (stmt === true) stmt = "question_mark";
        if (typeof stmt == "string") {
          var config = getStmtConfig(stmt);
          stmt = this.settings.sqlRuleStatement[config[1]](
            query.params,
            config[2]
          );
        }

        if (stmt) {
          query.sql = stmt.esc(query.sql);
        }

        if (query.sql.toUpperCase().indexOf("SELECT") !== 0) {
          query.sql = "SELECT * FROM table WHERE " + query.sql;
        }

        var parsed = SQLParser.parse(query.sql);

        if (!parsed.where) {
          Utils.error("SQLParse", "No WHERE clause found");
        }

        /**
         * Custom parsing of an AST node generated by SQLParser, you can return a sub-part of the tree, or a well formed group or rule JSON
         * @event changer:parseSQLNode
         * @memberof module:plugins.SqlSupport
         * @param {object} AST node
         * @returns {object} tree, rule or group
         */
        var data = self.change("parseSQLNode", parsed.where.conditions);

        // a plugin returned a group
        if ("rules" in data && "condition" in data) {
          return data;
        }

        // a plugin returned a rule
        if ("id" in data && "operator" in data && "value" in data) {
          return {
            condition: this.settings.default_condition,
            rules: [data],
          };
        }

        // create root group
        var out = self.change(
          "sqlToGroup",
          {
            condition: this.settings.default_condition,
            rules: [],
          },
          data
        );

        // keep track of current group
        var curr = out;

        (function flatten(data, i) {
          if (data === null) {
            return;
          }

          // allow plugins to manually parse or handle special cases
          data = self.change("parseSQLNode", data);

          // a plugin returned a group
          if ("rules" in data && "condition" in data) {
            curr.rules.push(data);
            return;
          }

          // a plugin returned a rule
          if ("id" in data && "operator" in data && "value" in data) {
            curr.rules.push(data);
            return;
          }

          // data must be a SQL parser node
          if (
            !("left" in data) ||
            !("right" in data) ||
            !("operation" in data)
          ) {
            Utils.error("SQLParse", "Unable to parse WHERE clause");
          }

          // it's a node
          if (["AND", "OR"].indexOf(data.operation.toUpperCase()) !== -1) {
            // create a sub-group if the condition is not the same and it's not the first level

            /**
             * Given an existing group and an AST node, determines if a sub-group must be created
             * @event changer:sqlGroupsDistinct
             * @memberof module:plugins.SqlSupport
             * @param {boolean} create - true by default if the group condition is different
             * @param {object} group
             * @param {object} AST
             * @param {int} current group level
             * @returns {boolean}
             */
            var createGroup = self.change(
              "sqlGroupsDistinct",
              i > 0 && curr.condition != data.operation.toUpperCase(),
              curr,
              data,
              i
            );

            if (createGroup) {
              /**
               * Modifies the group generated from the SQL expression (this is called before the group is filled with rules)
               * @event changer:sqlToGroup
               * @memberof module:plugins.SqlSupport
               * @param {object} group
               * @param {object} AST
               * @returns {object}
               */
              var group = self.change(
                "sqlToGroup",
                {
                  condition: self.settings.default_condition,
                  rules: [],
                },
                data
              );

              curr.rules.push(group);
              curr = group;
            }

            curr.condition = data.operation.toUpperCase();
            i++;

            // some magic !
            var next = curr;
            flatten(data.left, i);

            curr = next;
            flatten(data.right, i);
          }
          // it's a leaf
          else {
            if ($.isPlainObject(data.right.value)) {
              Utils.error(
                "SQLParse",
                "Value format not supported for {0}.",
                data.left.value
              );
            }

            // convert array
            var value;
            if ($.isArray(data.right.value)) {
              value = data.right.value.map(function (v) {
                return v.value;
              });
            } else {
              value = data.right.value;
            }

            // get actual values
            if (stmt) {
              if ($.isArray(value)) {
                value = value.map(stmt.parse);
              } else {
                value = stmt.parse(value);
              }
            }

            // convert operator
            var operator = data.operation.toUpperCase();
            if (operator == "<>") {
              operator = "!=";
            }

            var sqlrl = self.settings.sqlRuleOperator[operator];
            if (sqlrl === undefined) {
              Utils.error(
                "UndefinedSQLOperator",
                'Invalid SQL operation "{0}".',
                data.operation
              );
            }

            var opVal = sqlrl.call(this, value, data.operation);

            // find field name
            var field;
            if ("values" in data.left) {
              field = data.left.values.join(".");
            } else if ("value" in data.left) {
              field = data.left.value;
            } else {
              Utils.error(
                "SQLParse",
                "Cannot find field name in {0}",
                JSON.stringify(data.left)
              );
            }

            var id = self.getSQLFieldID(field, value);

            /**
             * Modifies the rule generated from the SQL expression
             * @event changer:sqlToRule
             * @memberof module:plugins.SqlSupport
             * @param {object} rule
             * @param {object} AST
             * @returns {object}
             */
            var rule = self.change(
              "sqlToRule",
              {
                id: id,
                field: field,
                operator: opVal.op,
                value: opVal.val,
              },
              data
            );

            curr.rules.push(rule);
          }
        })(data, 0);

        return out;
      },

      /**
       * Sets the builder's rules from a SQL query
       * @see module:plugins.SqlSupport.getRulesFromSQL
       */
      setRulesFromSQL: function (query, stmt) {
        this.setRules(this.getRulesFromSQL(query, stmt));
      },

      /**
       * Returns a filter identifier from the SQL field.
       * Automatically use the only one filter with a matching field, fires a changer otherwise.
       * @param {string} field
       * @param {*} value
       * @fires module:plugins.SqlSupport:changer:getSQLFieldID
       * @returns {string}
       * @private
       */
      getSQLFieldID: function (field, value) {
        var matchingFilters = this.filters.filter(function (filter) {
          return filter.field.toLowerCase() === field.toLowerCase();
        });

        var id;
        if (matchingFilters.length === 1) {
          id = matchingFilters[0].id;
        } else {
          /**
           * Returns a filter identifier from the SQL field
           * @event changer:getSQLFieldID
           * @memberof module:plugins.SqlSupport
           * @param {string} field
           * @param {*} value
           * @returns {string}
           */
          id = this.change("getSQLFieldID", field, value);
        }

        return id;
      },
    }
  );

  /**
   * Parses the statement configuration
   * @memberof module:plugins.SqlSupport
   * @param {string} stmt
   * @returns {Array} null, mode, option
   * @private
   */
  function getStmtConfig(stmt) {
    var config = stmt.match(/(question_mark|numbered|named)(?:\((.)\))?/);
    if (!config) config = [null, "question_mark", undefined];
    return config;
  }

  /**
   * @class UniqueFilter
   * @memberof module:plugins
   * @description Allows to define some filters as "unique": ie which can be used for only one rule, globally or in the same group.
   */
  QueryBuilder.define("unique-filter", function () {
    this.status.used_filters = {};

    this.on("afterUpdateRuleFilter", this.updateDisabledFilters);
    this.on("afterDeleteRule", this.updateDisabledFilters);
    this.on("afterCreateRuleFilters", this.applyDisabledFilters);
    this.on("afterReset", this.clearDisabledFilters);
    this.on("afterClear", this.clearDisabledFilters);

    // Ensure that the default filter is not already used if unique
    this.on("getDefaultFilter.filter", function (e, model) {
      var self = e.builder;

      self.updateDisabledFilters();

      if (e.value.id in self.status.used_filters) {
        var found = self.filters.some(function (filter) {
          if (
            !(filter.id in self.status.used_filters) ||
            (self.status.used_filters[filter.id].length > 0 &&
              self.status.used_filters[filter.id].indexOf(model.parent) === -1)
          ) {
            e.value = filter;
            return true;
          }
        });

        if (!found) {
          Utils.error(
            false,
            "UniqueFilter",
            "No more non-unique filters available"
          );
          e.value = undefined;
        }
      }
    });
  });

  QueryBuilder.extend(
    /** @lends module:plugins.UniqueFilter.prototype */ {
      /**
       * Updates the list of used filters
       * @param {$.Event} [e]
       * @private
       */
      updateDisabledFilters: function (e) {
        var self = e ? e.builder : this;

        self.status.used_filters = {};

        if (!self.model) {
          return;
        }

        // get used filters
        (function walk(group) {
          group.each(
            function (rule) {
              if (rule.filter && rule.filter.unique) {
                if (!self.status.used_filters[rule.filter.id]) {
                  self.status.used_filters[rule.filter.id] = [];
                }
                if (rule.filter.unique == "group") {
                  self.status.used_filters[rule.filter.id].push(rule.parent);
                }
              }
            },
            function (group) {
              walk(group);
            }
          );
        })(self.model.root);

        self.applyDisabledFilters(e);
      },

      /**
       * Clear the list of used filters
       * @param {$.Event} [e]
       * @private
       */
      clearDisabledFilters: function (e) {
        var self = e ? e.builder : this;

        self.status.used_filters = {};

        self.applyDisabledFilters(e);
      },

      /**
       * Disabled filters depending on the list of used ones
       * @param {$.Event} [e]
       * @private
       */
      applyDisabledFilters: function (e) {
        var self = e ? e.builder : this;

        // re-enable everything
        self.$el
          .find(QueryBuilder.selectors.filter_container + " option")
          .prop("disabled", false);

        // disable some
        $.each(self.status.used_filters, function (filterId, groups) {
          if (groups.length === 0) {
            self.$el
              .find(
                QueryBuilder.selectors.filter_container +
                  ' option[value="' +
                  filterId +
                  '"]:not(:selected)'
              )
              .prop("disabled", true);
          } else {
            groups.forEach(function (group) {
              group.each(function (rule) {
                rule.$el
                  .find(
                    QueryBuilder.selectors.filter_container +
                      ' option[value="' +
                      filterId +
                      '"]:not(:selected)'
                  )
                  .prop("disabled", true);
              });
            });
          }
        });

        // update Selectpicker
        if (self.settings.plugins && self.settings.plugins["bt-selectpicker"]) {
          self.$el
            .find(QueryBuilder.selectors.rule_filter)
            .selectpicker("render");
        }
      },
    }
  );

  /*!
   * jQuery QueryBuilder 2.6.0
   * Locale: English (en)
   * Author: Damien "Mistic" Sorel, http://www.strangeplanet.fr
   * Licensed under MIT (https://opensource.org/licenses/MIT)
   */

  QueryBuilder.regional["en"] = {
    __locale: "English (en)",
    __author: 'Damien "Mistic" Sorel, http://www.strangeplanet.fr',
    add_rule: "Add rule",
    add_group: "Add group",
    delete_rule: "Delete",
    delete_group: "Delete",
    conditions: {
      AND: "AND",
      OR: "OR",
    },
    operators: {
      equal: "equal",
      not_equal: "not equal",
      in: "in",
      not_in: "not in",
      less: "less",
      less_or_equal: "less or equal",
      greater: "greater",
      greater_or_equal: "greater or equal",
      between: "between",
      not_between: "not between",
      begins_with: "begins with",
      not_begins_with: "doesn't begin with",
      contains: "contains",
      not_contains: "doesn't contain",
      ends_with: "ends with",
      not_ends_with: "doesn't end with",
      is_empty: "is empty",
      is_not_empty: "is not empty",
      is_null: "is null",
      is_not_null: "is not null",
    },
    errors: {
      no_filter: "No filter selected",
      empty_group: "The group is empty",
      radio_empty: "No value selected",
      checkbox_empty: "No value selected",
      select_empty: "No value selected",
      string_empty: "Empty value",
      string_exceed_min_length: "Must contain at least {0} characters",
      string_exceed_max_length: "Must not contain more than {0} characters",
      string_invalid_format: "Invalid format ({0})",
      number_nan: "Not a number",
      number_not_integer: "Not an integer",
      number_not_double: "Not a real number",
      number_exceed_min: "Must be greater than {0}",
      number_exceed_max: "Must be lower than {0}",
      number_wrong_step: "Must be a multiple of {0}",
      number_between_invalid: "Invalid values, {0} is greater than {1}",
      datetime_empty: "Empty value",
      datetime_invalid: "Invalid date format ({0})",
      datetime_exceed_min: "Must be after {0}",
      datetime_exceed_max: "Must be before {0}",
      datetime_between_invalid: "Invalid values, {0} is greater than {1}",
      boolean_not_valid: "Not a boolean",
      operator_not_multiple: 'Operator "{1}" cannot accept multiple values',
    },
    invert: "Invert",
    NOT: "NOT",
  };

  QueryBuilder.defaults({ lang_code: "en" });
  return QueryBuilder;
});
/*!
 * jQuery QueryBuilder 2.6.0
 * Copyright 2014-2021 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (https://opensource.org/licenses/MIT)
 */

!function(e,t){"function"==typeof define&&define.amd?define(["jquery","dot/doT","jquery-extendext"],t):"object"==typeof module&&module.exports?module.exports=t(require("jquery"),require("dot/doT"),require("jquery-extendext")):t(e.jQuery,e.doT)}(this,function($,r){"use strict";var c=function(e,t){(e[0].queryBuilder=this).$el=e,this.settings=$.extendext(!0,"replace",{},c.DEFAULTS,t),this.model=new i,this.status={id:null,generated_id:!1,group_id:0,rule_id:0,has_optgroup:!1,has_operator_optgroup:!1},this.filters=this.settings.filters,this.icons=this.settings.icons,this.operators=this.settings.operators,this.templates=this.settings.templates,this.plugins=this.settings.plugins,this.lang=null,void 0===c.regional.en&&h.error("Config",'"i18n/en.js" not loaded.'),this.lang=$.extendext(!0,"replace",{},c.regional.en,c.regional[this.settings.lang_code],this.settings.lang),!1===this.settings.allow_groups?this.settings.allow_groups=0:!0===this.settings.allow_groups&&(this.settings.allow_groups=-1),Object.keys(this.templates).forEach(function(e){this.templates[e]||(this.templates[e]=c.templates[e]),"string"==typeof this.templates[e]&&(this.templates[e]=r.template(this.templates[e]))},this),this.$el.attr("id")||(this.$el.attr("id","qb_"+Math.floor(99999*Math.random())),this.status.generated_id=!0),this.status.id=this.$el.attr("id"),this.$el.addClass("query-builder form-inline"),this.filters=this.checkFilters(this.filters),this.operators=this.checkOperators(this.operators),this.bindEvents(),this.initPlugins()};$.extend(c.prototype,{trigger:function(e){var t=new $.Event(this._tojQueryEvent(e),{builder:this});return this.$el.triggerHandler(t,Array.prototype.slice.call(arguments,1)),t},change:function(e,t){var r=new $.Event(this._tojQueryEvent(e,!0),{builder:this,value:t});return this.$el.triggerHandler(r,Array.prototype.slice.call(arguments,2)),r.value},on:function(e,t){return this.$el.on(this._tojQueryEvent(e),t),this},off:function(e,t){return this.$el.off(this._tojQueryEvent(e),t),this},once:function(e,t){return this.$el.one(this._tojQueryEvent(e),t),this},_tojQueryEvent:function(e,t){return e.split(" ").map(function(e){return e+".queryBuilder"+(t?".filter":"")}).join(" ")}}),c.types={string:"string",integer:"number",double:"number",date:"datetime",time:"datetime",datetime:"datetime",boolean:"boolean"},c.inputs=["text","number","textarea","radio","checkbox","select"],c.modifiable_options=["display_errors","allow_groups","allow_empty","default_condition","default_filter"],c.selectors={group_container:".rules-group-container",rule_container:".rule-container",filter_container:".rule-filter-container",operator_container:".rule-operator-container",value_container:".rule-value-container",error_container:".error-container",condition_container:".rules-group-header .group-conditions",rule_header:".rule-header",group_header:".rules-group-header",group_actions:".group-actions",rule_actions:".rule-actions",rules_list:".rules-group-body>.rules-list",group_condition:".rules-group-header [name$=_cond]",rule_filter:".rule-filter-container [name$=_filter]",rule_operator:".rule-operator-container [name$=_operator]",rule_value:".rule-value-container [name*=_value_]",add_rule:"[data-add=rule]",delete_rule:"[data-delete=rule]",add_group:"[data-add=group]",delete_group:"[data-delete=group]"},c.templates={},c.regional={},c.OPERATORS={equal:{type:"equal",nb_inputs:1,multiple:!1,apply_to:["string","number","datetime","boolean"]},not_equal:{type:"not_equal",nb_inputs:1,multiple:!1,apply_to:["string","number","datetime","boolean"]},in:{type:"in",nb_inputs:1,multiple:!0,apply_to:["string","number","datetime"]},not_in:{type:"not_in",nb_inputs:1,multiple:!0,apply_to:["string","number","datetime"]},less:{type:"less",nb_inputs:1,multiple:!1,apply_to:["number","datetime"]},less_or_equal:{type:"less_or_equal",nb_inputs:1,multiple:!1,apply_to:["number","datetime"]},greater:{type:"greater",nb_inputs:1,multiple:!1,apply_to:["number","datetime"]},greater_or_equal:{type:"greater_or_equal",nb_inputs:1,multiple:!1,apply_to:["number","datetime"]},between:{type:"between",nb_inputs:2,multiple:!1,apply_to:["number","datetime"]},not_between:{type:"not_between",nb_inputs:2,multiple:!1,apply_to:["number","datetime"]},begins_with:{type:"begins_with",nb_inputs:1,multiple:!1,apply_to:["string"]},not_begins_with:{type:"not_begins_with",nb_inputs:1,multiple:!1,apply_to:["string"]},contains:{type:"contains",nb_inputs:1,multiple:!1,apply_to:["string"]},not_contains:{type:"not_contains",nb_inputs:1,multiple:!1,apply_to:["string"]},ends_with:{type:"ends_with",nb_inputs:1,multiple:!1,apply_to:["string"]},not_ends_with:{type:"not_ends_with",nb_inputs:1,multiple:!1,apply_to:["string"]},is_empty:{type:"is_empty",nb_inputs:0,multiple:!1,apply_to:["string"]},is_not_empty:{type:"is_not_empty",nb_inputs:0,multiple:!1,apply_to:["string"]},is_null:{type:"is_null",nb_inputs:0,multiple:!1,apply_to:["string","number","datetime","boolean"]},is_not_null:{type:"is_not_null",nb_inputs:0,multiple:!1,apply_to:["string","number","datetime","boolean"]}},c.DEFAULTS={filters:[],plugins:[],sort_filters:!1,display_errors:!0,allow_groups:-1,allow_empty:!1,conditions:["AND","OR"],default_condition:"AND",inputs_separator:" , ",select_placeholder:"------",display_empty_filter:!0,default_filter:null,optgroups:{},default_rule_flags:{filter_readonly:!1,operator_readonly:!1,value_readonly:!1,no_delete:!1},default_group_flags:{condition_readonly:!1,no_add_rule:!1,no_add_group:!1,no_delete:!1},templates:{group:null,rule:null,filterSelect:null,operatorSelect:null,ruleValueSelect:null},lang_code:"en",lang:{},operators:["equal","not_equal","in","not_in","less","less_or_equal","greater","greater_or_equal","between","not_between","begins_with","not_begins_with","contains","not_contains","ends_with","not_ends_with","is_empty","is_not_empty","is_null","is_not_null"],icons:{add_group:"glyphicon glyphicon-plus-sign",add_rule:"glyphicon glyphicon-plus",remove_group:"glyphicon glyphicon-remove",remove_rule:"glyphicon glyphicon-remove",error:"glyphicon glyphicon-warning-sign"}},c.plugins={},c.defaults=function(e){if("object"!=typeof e)return"string"==typeof e?"object"==typeof c.DEFAULTS[e]?$.extend(!0,{},c.DEFAULTS[e]):c.DEFAULTS[e]:$.extend(!0,{},c.DEFAULTS);$.extendext(!0,"replace",c.DEFAULTS,e)},c.define=function(e,t,r){c.plugins[e]={fct:t,def:r||{}}},c.extend=function(e){$.extend(c.prototype,e)},c.prototype.initPlugins=function(){if(this.plugins){if($.isArray(this.plugins)){var t={};this.plugins.forEach(function(e){t[e]=null}),this.plugins=t}Object.keys(this.plugins).forEach(function(e){e in c.plugins?(this.plugins[e]=$.extend(!0,{},c.plugins[e].def,this.plugins[e]||{}),c.plugins[e].fct.call(this,this.plugins[e])):h.error("Config",'Unable to find plugin "{0}"',e)},this)}},c.prototype.getPluginOptions=function(e,t){var r;if(this.plugins&&this.plugins[e]?r=this.plugins[e]:c.plugins[e]&&(r=c.plugins[e].def),r)return t?r[t]:r;h.error("Config",'Unable to find plugin "{0}"',e)},c.prototype.init=function(e){this.trigger("afterInit"),e?(this.setRules(e),delete this.settings.rules):this.setRoot(!0)},c.prototype.checkFilters=function(e){var t=[];if(e&&0!==e.length||h.error("Config","Missing filters list"),e.forEach(function(i,e){switch(i.id||h.error("Config","Missing filter {0} id",e),-1!=t.indexOf(i.id)&&h.error("Config",'Filter "{0}" already defined',i.id),t.push(i.id),i.type?c.types[i.type]||h.error("Config",'Invalid type "{0}"',i.type):i.type="string",i.input?"function"!=typeof i.input&&-1==c.inputs.indexOf(i.input)&&h.error("Config",'Invalid input "{0}"',i.input):i.input="number"===c.types[i.type]?"number":"text",i.operators&&i.operators.forEach(function(e){"string"!=typeof e&&h.error("Config","Filter operators must be global operators types (string)")}),i.field||(i.field=i.id),i.label||(i.label=i.field),i.optgroup?(this.status.has_optgroup=!0,this.settings.optgroups[i.optgroup]||(this.settings.optgroups[i.optgroup]=i.optgroup)):i.optgroup=null,i.input){case"radio":case"checkbox":(!i.values||i.values.length<1)&&h.error("Config",'Missing filter "{0}" values',i.id);break;case"select":var o=[];i.has_optgroup=!1,h.iterateOptions(i.values,function(e,t,r){o.push({value:e,label:t,optgroup:r||null}),r&&(i.has_optgroup=!0,this.settings.optgroups[r]||(this.settings.optgroups[r]=r))}.bind(this)),i.has_optgroup?i.values=h.groupSort(o,"optgroup"):i.values=o,i.placeholder&&(void 0===i.placeholder_value&&(i.placeholder_value=-1),i.values.forEach(function(e){e.value==i.placeholder_value&&h.error("Config",'Placeholder of filter "{0}" overlaps with one of its values',i.id)}))}},this),this.settings.sort_filters)if("function"==typeof this.settings.sort_filters)e.sort(this.settings.sort_filters);else{var r=this;e.sort(function(e,t){return r.translate(e.label).localeCompare(r.translate(t.label))})}return this.status.has_optgroup&&(e=h.groupSort(e,"optgroup")),e},c.prototype.checkOperators=function(r){var i=[];return r.forEach(function(e,t){"string"==typeof e?(c.OPERATORS[e]||h.error("Config",'Unknown operator "{0}"',e),r[t]=e=$.extendext(!0,"replace",{},c.OPERATORS[e])):(e.type||h.error("Config",'Missing "type" for operator {0}',t),c.OPERATORS[e.type]&&(r[t]=e=$.extendext(!0,"replace",{},c.OPERATORS[e.type],e)),void 0!==e.nb_inputs&&void 0!==e.apply_to||h.error("Config",'Missing "nb_inputs" and/or "apply_to" for operator "{0}"',e.type)),-1!=i.indexOf(e.type)&&h.error("Config",'Operator "{0}" already defined',e.type),i.push(e.type),e.optgroup?(this.status.has_operator_optgroup=!0,this.settings.optgroups[e.optgroup]||(this.settings.optgroups[e.optgroup]=e.optgroup)):e.optgroup=null},this),this.status.has_operator_optgroup&&(r=h.groupSort(r,"optgroup")),r},c.prototype.bindEvents=function(){var n=this,t=c.selectors;this.$el.on("change.queryBuilder",t.group_condition,function(){if($(this).is(":checked")){var e=$(this).closest(t.group_container);n.getModel(e).condition=$(this).val()}}),this.$el.on("change.queryBuilder",t.rule_filter,function(){var e=$(this).closest(t.rule_container);n.getModel(e).filter=n.getFilterById($(this).val())}),this.$el.on("change.queryBuilder",t.rule_operator,function(){var e=$(this).closest(t.rule_container);n.getModel(e).operator=n.getOperatorByType($(this).val())}),this.$el.on("click.queryBuilder",t.add_rule,function(){var e=$(this).closest(t.group_container);n.addRule(n.getModel(e))}),this.$el.on("click.queryBuilder",t.delete_rule,function(){var e=$(this).closest(t.rule_container);n.deleteRule(n.getModel(e))}),0!==this.settings.allow_groups&&(this.$el.on("click.queryBuilder",t.add_group,function(){var e=$(this).closest(t.group_container);n.addGroup(n.getModel(e))}),this.$el.on("click.queryBuilder",t.delete_group,function(){var e=$(this).closest(t.group_container);n.deleteGroup(n.getModel(e))})),this.model.on({drop:function(e,t){t.$el.remove(),n.refreshGroupsConditions()},add:function(e,t,r,i){0===i?r.$el.prependTo(t.$el.find(">"+c.selectors.rules_list)):r.$el.insertAfter(t.rules[i-1].$el),n.refreshGroupsConditions()},move:function(e,t,r,i){t.$el.detach(),0===i?t.$el.prependTo(r.$el.find(">"+c.selectors.rules_list)):t.$el.insertAfter(r.rules[i-1].$el),n.refreshGroupsConditions()},update:function(e,t,r,i,o){if(t instanceof l)switch(r){case"error":n.updateError(t);break;case"flags":n.applyRuleFlags(t);break;case"filter":n.updateRuleFilter(t,o);break;case"operator":n.updateRuleOperator(t,o);break;case"value":n.updateRuleValue(t,o)}else switch(r){case"error":n.updateError(t);break;case"flags":n.applyGroupFlags(t);break;case"condition":n.updateGroupCondition(t,o)}}})},c.prototype.setRoot=function(e,t,r){e=void 0===e||!0===e;var i=this.nextGroupId(),o=$($.parseHTML(this.getGroupTemplate(i,1)));return this.$el.append(o),this.model.root=new a(null,o),this.model.root.model=this.model,this.model.root.data=t,this.model.root.flags=$.extend({},this.settings.default_group_flags,r),this.model.root.condition=this.settings.default_condition,this.trigger("afterAddGroup",this.model.root),e&&this.addRule(this.model.root),this.model.root},c.prototype.addGroup=function(e,t,r,i){t=void 0===t||!0===t;var o=e.level+1;if(this.trigger("beforeAddGroup",e,t,o).isDefaultPrevented())return null;var n=this.nextGroupId(),l=$(this.getGroupTemplate(n,o)),s=e.addGroup(l);return s.data=r,s.flags=$.extend({},this.settings.default_group_flags,i),s.condition=this.settings.default_condition,this.trigger("afterAddGroup",s),this.trigger("rulesChanged"),t&&this.addRule(s),s},c.prototype.deleteGroup=function(e){if(e.isRoot())return!1;if(this.trigger("beforeDeleteGroup",e).isDefaultPrevented())return!1;var t=!0;return e.each("reverse",function(e){t&=this.deleteRule(e)},function(e){t&=this.deleteGroup(e)},this),t&&(e.drop(),this.trigger("afterDeleteGroup"),this.trigger("rulesChanged")),t},c.prototype.updateGroupCondition=function(t,e){t.$el.find(">"+c.selectors.group_condition).each(function(){var e=$(this);e.prop("checked",e.val()===t.condition),e.parent().toggleClass("active",e.val()===t.condition)}),this.trigger("afterUpdateGroupCondition",t,e),this.trigger("rulesChanged")},c.prototype.refreshGroupsConditions=function(){!function t(e){(!e.flags||e.flags&&!e.flags.condition_readonly)&&e.$el.find(">"+c.selectors.group_condition).prop("disabled",e.rules.length<=1).parent().toggleClass("disabled",e.rules.length<=1),e.each(null,function(e){t(e)},this)}(this.model.root)},c.prototype.addRule=function(e,t,r){if(this.trigger("beforeAddRule",e).isDefaultPrevented())return null;var i=this.nextRuleId(),o=$($.parseHTML(this.getRuleTemplate(i))),n=e.addRule(o);return n.data=t,n.flags=$.extend({},this.settings.default_rule_flags,r),this.trigger("afterAddRule",n),this.trigger("rulesChanged"),this.createRuleFilters(n),!this.settings.default_filter&&this.settings.display_empty_filter||(n.filter=this.change("getDefaultFilter",this.getFilterById(this.settings.default_filter||this.filters[0].id),n)),n},c.prototype.deleteRule=function(e){return!e.flags.no_delete&&(!this.trigger("beforeDeleteRule",e).isDefaultPrevented()&&(e.drop(),this.trigger("afterDeleteRule"),this.trigger("rulesChanged"),!0))},c.prototype.createRuleFilters=function(e){var t=this.change("getRuleFilters",this.filters,e),r=$($.parseHTML(this.getRuleFilterSelect(e,t)));e.$el.find(c.selectors.filter_container).html(r),this.trigger("afterCreateRuleFilters",e),this.applyRuleFlags(e)},c.prototype.createRuleOperators=function(e){var t=e.$el.find(c.selectors.operator_container).empty();if(e.filter){var r=this.getOperators(e.filter),i=$($.parseHTML(this.getRuleOperatorSelect(e,r)));t.html(i),e.filter.default_operator?e.__.operator=this.getOperatorByType(e.filter.default_operator):e.__.operator=r[0],e.$el.find(c.selectors.rule_operator).val(e.operator.type),this.trigger("afterCreateRuleOperators",e,r),this.applyRuleFlags(e)}},c.prototype.createRuleInput=function(e){var t=e.$el.find(c.selectors.value_container).empty();if(e.__.value=void 0,e.filter&&e.operator&&0!==e.operator.nb_inputs){for(var r=this,i=$(),o=e.filter,n=0;n<e.operator.nb_inputs;n++){var l=$($.parseHTML(this.getRuleInput(e,n)));0<n&&t.append(this.settings.inputs_separator),t.append(l),i=i.add(l)}t.css("display",""),i.on("change "+(o.input_event||""),function(){e._updating_input||(e._updating_value=!0,e.value=r.getRuleInputValue(e),e._updating_value=!1)}),o.plugin&&i[o.plugin](o.plugin_config||{}),this.trigger("afterCreateRuleInput",e),void 0!==o.default_value?e.value=o.default_value:(e._updating_value=!0,e.value=r.getRuleInputValue(e),e._updating_value=!1),this.applyRuleFlags(e)}},c.prototype.updateRuleFilter=function(e,t){this.createRuleOperators(e),this.createRuleInput(e),e.$el.find(c.selectors.rule_filter).val(e.filter?e.filter.id:"-1"),t&&e.filter&&t.id!==e.filter.id&&(e.data=void 0),this.trigger("afterUpdateRuleFilter",e,t),this.trigger("rulesChanged")},c.prototype.updateRuleOperator=function(e,t){var r=e.$el.find(c.selectors.value_container);e.operator&&0!==e.operator.nb_inputs?(r.css("display",""),!r.is(":empty")&&t&&e.operator.nb_inputs===t.nb_inputs&&e.operator.optgroup===t.optgroup||this.createRuleInput(e)):(r.hide(),e.__.value=void 0),e.operator&&(e.$el.find(c.selectors.rule_operator).val(e.operator.type),e.__.value=this.getRuleInputValue(e)),this.trigger("afterUpdateRuleOperator",e,t),this.trigger("rulesChanged")},c.prototype.updateRuleValue=function(e,t){e._updating_value||this.setRuleInputValue(e,e.value),this.trigger("afterUpdateRuleValue",e,t),this.trigger("rulesChanged")},c.prototype.applyRuleFlags=function(e){var t=e.flags,r=c.selectors;e.$el.find(r.rule_filter).prop("disabled",t.filter_readonly),e.$el.find(r.rule_operator).prop("disabled",t.operator_readonly),e.$el.find(r.rule_value).prop("disabled",t.value_readonly),t.no_delete&&e.$el.find(r.delete_rule).remove(),this.trigger("afterApplyRuleFlags",e)},c.prototype.applyGroupFlags=function(e){var t=e.flags,r=c.selectors;e.$el.find(">"+r.group_condition).prop("disabled",t.condition_readonly).parent().toggleClass("readonly",t.condition_readonly),t.no_add_rule&&e.$el.find(r.add_rule).remove(),t.no_add_group&&e.$el.find(r.add_group).remove(),t.no_delete&&e.$el.find(r.delete_group).remove(),this.trigger("afterApplyGroupFlags",e)},c.prototype.clearErrors=function(e){(e=e||this.model.root)&&(e.error=null,e instanceof a&&e.each(function(e){e.error=null},function(e){this.clearErrors(e)},this))},c.prototype.updateError=function(e){if(this.settings.display_errors)if(null===e.error)e.$el.removeClass("has-error");else{var t=this.translate("errors",e.error[0]);t=h.fmt(t,e.error.slice(1)),t=this.change("displayError",t,e.error,e),e.$el.addClass("has-error").find(c.selectors.error_container).eq(0).attr("title",t)}},c.prototype.triggerValidationError=function(e,t,r){$.isArray(t)||(t=[t]),this.trigger("validationError",e,t,r).isDefaultPrevented()||(e.error=t)},c.prototype.destroy=function(){this.trigger("beforeDestroy"),this.status.generated_id&&this.$el.removeAttr("id"),this.clear(),this.model=null,this.$el.off(".queryBuilder").removeClass("query-builder").removeData("queryBuilder"),delete this.$el[0].queryBuilder},c.prototype.reset=function(){this.trigger("beforeReset").isDefaultPrevented()||(this.status.group_id=1,this.status.rule_id=0,this.model.root.empty(),this.model.root.data=void 0,this.model.root.flags=$.extend({},this.settings.default_group_flags),this.model.root.condition=this.settings.default_condition,this.addRule(this.model.root),this.trigger("afterReset"),this.trigger("rulesChanged"))},c.prototype.clear=function(){this.trigger("beforeClear").isDefaultPrevented()||(this.status.group_id=0,this.status.rule_id=0,this.model.root&&(this.model.root.drop(),this.model.root=null),this.trigger("afterClear"),this.trigger("rulesChanged"))},c.prototype.setOptions=function(e){$.each(e,function(e,t){-1!==c.modifiable_options.indexOf(e)&&(this.settings[e]=t)}.bind(this))},c.prototype.getModel=function(e){return e?e instanceof o?e:$(e).data("queryBuilderModel"):this.model.root},c.prototype.validate=function(n){n=$.extend({skip_empty:!1},n),this.clearErrors();var l=this,e=function r(e){var i=0,o=0;return e.each(function(e){if(e.filter||!n.skip_empty){if(!e.filter)return l.triggerValidationError(e,"no_filter",null),void o++;if(!e.operator)return l.triggerValidationError(e,"no_operator",null),void o++;if(0!==e.operator.nb_inputs){var t=l.validateValue(e,e.value);if(!0!==t)return l.triggerValidationError(e,t,e.value),void o++}i++}},function(e){var t=r(e);!0===t?i++:!1===t&&o++}),!(0<o)&&(0===i&&!e.isRoot()&&n.skip_empty?null:!!(0!==i||l.settings.allow_empty&&e.isRoot())||(l.triggerValidationError(e,"empty_group",null),!1))}(this.model.root);return this.change("validate",e)},c.prototype.getRules=function(n){n=$.extend({get_flags:!1,allow_invalid:!1,skip_empty:!1},n);var e=this.validate(n);if(!e&&!n.allow_invalid)return null;var l=this,t=function r(e){var o={condition:e.condition,rules:[]};if(e.data&&(o.data=$.extendext(!0,"replace",{},e.data)),n.get_flags){var t=l.getGroupFlags(e.flags,"all"===n.get_flags);$.isEmptyObject(t)||(o.flags=t)}return e.each(function(e){if(e.filter||!n.skip_empty){var t=null;e.operator&&0===e.operator.nb_inputs||(t=e.value);var r={id:e.filter?e.filter.id:null,field:e.filter?e.filter.field:null,type:e.filter?e.filter.type:null,input:e.filter?e.filter.input:null,operator:e.operator?e.operator.type:null,value:t};if((e.filter&&e.filter.data||e.data)&&(r.data=$.extendext(!0,"replace",{},e.filter.data,e.data)),n.get_flags){var i=l.getRuleFlags(e.flags,"all"===n.get_flags);$.isEmptyObject(i)||(r.flags=i)}o.rules.push(l.change("ruleToJson",r,e))}},function(e){var t=r(e);0===t.rules.length&&n.skip_empty||o.rules.push(t)},this),l.change("groupToJson",o,e)}(this.model.root);return t.valid=e,this.change("getRules",t)},c.prototype.setRules=function(e,o){o=$.extend({allow_invalid:!1},o),$.isArray(e)&&(e={condition:this.settings.default_condition,rules:e}),e&&e.rules&&(0!==e.rules.length||this.settings.allow_empty)||h.error("RulesParse","Incorrect data object passed"),this.clear(),this.setRoot(!1,e.data,this.parseGroupFlags(e)),e=this.change("setRules",e,o);var n=this;!function r(e,i){null!==i&&(void 0===e.condition?e.condition=n.settings.default_condition:-1==n.settings.conditions.indexOf(e.condition)&&(h.error(!o.allow_invalid,"UndefinedCondition",'Invalid condition "{0}"',e.condition),e.condition=n.settings.default_condition),i.condition=e.condition,e.rules.forEach(function(e){var t;if(void 0!==e.rules)if(-1!==n.settings.allow_groups&&n.settings.allow_groups<i.level)h.error(!o.allow_invalid,"RulesParse","No more than {0} groups are allowed",n.settings.allow_groups),n.reset();else{if(null===(t=n.addGroup(i,!1,e.data,n.parseGroupFlags(e))))return;r(e,t)}else{if(e.empty||(void 0===e.id&&(h.error(!o.allow_invalid,"RulesParse","Missing rule field id"),e.empty=!0),void 0===e.operator&&(e.operator="equal")),null===(t=n.addRule(i,e.data,n.parseRuleFlags(e))))return;e.empty||(t.filter=n.getFilterById(e.id,!o.allow_invalid)),t.filter&&(t.operator=n.getOperatorByType(e.operator,!o.allow_invalid),t.operator||(t.operator=n.getOperators(t.filter)[0])),t.operator&&0!==t.operator.nb_inputs&&(void 0!==e.value?t.value=e.value:void 0!==t.filter.default_value&&(t.value=t.filter.default_value)),n.change("jsonToRule",t,e)!=t&&h.error("RulesParse","Plugin tried to change rule reference")}}),n.change("jsonToGroup",i,e)!=i&&h.error("RulesParse","Plugin tried to change group reference"))}(e,this.model.root),this.trigger("afterSetRules")},c.prototype.validateValue=function(e,t){var r=e.filter.validation||{},i=!0;return i=r.callback?r.callback.call(this,t,e):this._validateValue(e,t),this.change("validateValue",i,t,e)},c.prototype._validateValue=function(e,t){var r,i,o=e.filter,n=e.operator,l=o.validation||{},s=!0;1===e.operator.nb_inputs&&(t=[t]);for(var a=0;a<n.nb_inputs;a++){if(!n.multiple&&$.isArray(t[a])&&1<t[a].length){s=["operator_not_multiple",n.type,this.translate("operators",n.type)];break}switch(o.input){case"radio":if(void 0!==t[a]&&0!==t[a].length)break;l.allow_empty_value||(s=["radio_empty"]);break;case"checkbox":if(void 0!==t[a]&&0!==t[a].length)break;l.allow_empty_value||(s=["checkbox_empty"]);break;case"select":if(void 0===t[a]||0===t[a].length||o.placeholder&&t[a]==o.placeholder_value){l.allow_empty_value||(s=["select_empty"]);break}break;default:i=$.isArray(t[a])?t[a]:[t[a]];for(var u=0;u<i.length;u++){switch(c.types[o.type]){case"string":if(void 0===i[u]||0===i[u].length){l.allow_empty_value||(s=["string_empty"]);break}if(void 0!==l.min&&i[u].length<parseInt(l.min)){s=[this.getValidationMessage(l,"min","string_exceed_min_length"),l.min];break}if(void 0!==l.max&&i[u].length>parseInt(l.max)){s=[this.getValidationMessage(l,"max","string_exceed_max_length"),l.max];break}if(!l.format||("string"==typeof l.format&&(l.format=new RegExp(l.format)),l.format.test(i[u])))break;s=[this.getValidationMessage(l,"format","string_invalid_format"),l.format];break;case"number":if(void 0===i[u]||0===i[u].length){l.allow_empty_value||(s=["number_nan"]);break}if(isNaN(i[u])){s=["number_nan"];break}if("integer"==o.type){if(parseInt(i[u])!=i[u]){s=["number_not_integer"];break}}else if(parseFloat(i[u])!=i[u]){s=["number_not_double"];break}if(void 0!==l.min&&i[u]<parseFloat(l.min)){s=[this.getValidationMessage(l,"min","number_exceed_min"),l.min];break}if(void 0!==l.max&&i[u]>parseFloat(l.max)){s=[this.getValidationMessage(l,"max","number_exceed_max"),l.max];break}if(void 0!==l.step&&"any"!==l.step){var p=(i[u]/l.step).toPrecision(14);if(parseInt(p)!=p){s=[this.getValidationMessage(l,"step","number_wrong_step"),l.step];break}}break;case"datetime":if(void 0===i[u]||0===i[u].length){l.allow_empty_value||(s=["datetime_empty"]);break}if(l.format){"moment"in window||h.error("MissingLibrary","MomentJS is required for Date/Time validation. Get it here http://momentjs.com");var d=moment(i[u],l.format);if(!d.isValid()){s=[this.getValidationMessage(l,"format","datetime_invalid"),l.format];break}if(l.min&&d<moment(l.min,l.format)){s=[this.getValidationMessage(l,"min","datetime_exceed_min"),l.min];break}if(l.max&&d>moment(l.max,l.format)){s=[this.getValidationMessage(l,"max","datetime_exceed_max"),l.max];break}}break;case"boolean":if(void 0===i[u]||0===i[u].length){l.allow_empty_value||(s=["boolean_not_valid"]);break}if("true"!==(r=(""+i[u]).trim().toLowerCase())&&"false"!==r&&"1"!==r&&"0"!==r&&1!==i[u]&&0!==i[u]){s=["boolean_not_valid"];break}}if(!0!==s)break}}if(!0!==s)break}if(("between"===e.operator.type||"not_between"===e.operator.type)&&2===t.length)switch(c.types[o.type]){case"number":t[0]>t[1]&&(s=["number_between_invalid",t[0],t[1]]);break;case"datetime":l.format&&("moment"in window||h.error("MissingLibrary","MomentJS is required for Date/Time validation. Get it here http://momentjs.com"),moment(t[0],l.format).isAfter(moment(t[1],l.format))&&(s=["datetime_between_invalid",t[0],t[1]]))}return s},c.prototype.nextGroupId=function(){return this.status.id+"_group_"+this.status.group_id++},c.prototype.nextRuleId=function(){return this.status.id+"_rule_"+this.status.rule_id++},c.prototype.getOperators=function(r){"string"==typeof r&&(r=this.getFilterById(r));for(var e=[],t=0,i=this.operators.length;t<i;t++){if(r.operators){if(-1==r.operators.indexOf(this.operators[t].type))continue}else if(-1==this.operators[t].apply_to.indexOf(c.types[r.type]))continue;e.push(this.operators[t])}return r.operators&&e.sort(function(e,t){return r.operators.indexOf(e.type)-r.operators.indexOf(t.type)}),this.change("getOperators",e,r)},c.prototype.getFilterById=function(e,t){if("-1"==e)return null;for(var r=0,i=this.filters.length;r<i;r++)if(this.filters[r].id==e)return this.filters[r];return h.error(!1!==t,"UndefinedFilter",'Undefined filter "{0}"',e),null},c.prototype.getOperatorByType=function(e,t){if("-1"==e)return null;for(var r=0,i=this.operators.length;r<i;r++)if(this.operators[r].type==e)return this.operators[r];return h.error(!1!==t,"UndefinedOperator",'Undefined operator "{0}"',e),null},c.prototype.getRuleInputValue=function(e){var t=e.filter,r=e.operator,i=[];if(t.valueGetter)i=t.valueGetter.call(this,e);else{for(var o=e.$el.find(c.selectors.value_container),n=0;n<r.nb_inputs;n++){var l,s=h.escapeElementId(e.id+"_value_"+n);switch(t.input){case"radio":i.push(o.find("[name="+s+"]:checked").val());break;case"checkbox":l=[],o.find("[name="+s+"]:checked").each(function(){l.push($(this).val())}),i.push(l);break;case"select":t.multiple?(l=[],o.find("[name="+s+"] option:selected").each(function(){l.push($(this).val())}),i.push(l)):i.push(o.find("[name="+s+"] option:selected").val());break;default:i.push(o.find("[name="+s+"]").val())}}i=i.map(function(e){return r.multiple&&t.value_separator&&"string"==typeof e&&(e=e.split(t.value_separator)),$.isArray(e)?e.map(function(e){return h.changeType(e,t.type)}):h.changeType(e,t.type)}),1===r.nb_inputs&&(i=i[0]),t.valueParser&&(i=t.valueParser.call(this,e,i))}return this.change("getRuleValue",i,e)},c.prototype.setRuleInputValue=function(e,t){var r=e.filter,i=e.operator;if(r&&i){if(e._updating_input=!0,r.valueSetter)r.valueSetter.call(this,e,t);else{var o=e.$el.find(c.selectors.value_container);1==i.nb_inputs&&(t=[t]);for(var n=0;n<i.nb_inputs;n++){var l=h.escapeElementId(e.id+"_value_"+n);switch(r.input){case"radio":o.find("[name="+l+'][value="'+t[n]+'"]').prop("checked",!0).trigger("change");break;case"checkbox":$.isArray(t[n])||(t[n]=[t[n]]),t[n].forEach(function(e){o.find("[name="+l+'][value="'+e+'"]').prop("checked",!0).trigger("change")});break;default:i.multiple&&r.value_separator&&$.isArray(t[n])&&(t[n]=t[n].join(r.value_separator)),o.find("[name="+l+"]").val(t[n]).trigger("change")}}}e._updating_input=!1}},c.prototype.parseRuleFlags=function(e){var t=$.extend({},this.settings.default_rule_flags);return e.readonly&&$.extend(t,{filter_readonly:!0,operator_readonly:!0,value_readonly:!0,no_delete:!0}),e.flags&&$.extend(t,e.flags),this.change("parseRuleFlags",t,e)},c.prototype.getRuleFlags=function(r,e){if(e)return $.extend({},r);var i={};return $.each(this.settings.default_rule_flags,function(e,t){r[e]!==t&&(i[e]=r[e])}),i},c.prototype.parseGroupFlags=function(e){var t=$.extend({},this.settings.default_group_flags);return e.readonly&&$.extend(t,{condition_readonly:!0,no_add_rule:!0,no_add_group:!0,no_delete:!0}),e.flags&&$.extend(t,e.flags),this.change("parseGroupFlags",t,e)},c.prototype.getGroupFlags=function(r,e){if(e)return $.extend({},r);var i={};return $.each(this.settings.default_group_flags,function(e,t){r[e]!==t&&(i[e]=r[e])}),i},c.prototype.translate=function(e,t){var r;return t||(t=e,e=void 0),r="object"==typeof t?t[this.settings.lang_code]||t.en:(e?this.lang[e]:this.lang)[t]||t,this.change("translate",r,t,e)},c.prototype.getValidationMessage=function(e,t,r){return e.messages&&e.messages[t]||r},c.templates.group='<div id="{{= it.group_id }}" class="rules-group-container">   <div class="rules-group-header">     <div class="btn-group pull-right group-actions">       <button type="button" class="btn btn-xs btn-success" data-add="rule">         <i class="{{= it.icons.add_rule }}"></i> {{= it.translate("add_rule") }}       </button>       {{? it.settings.allow_groups===-1 || it.settings.allow_groups>=it.level }}         <button type="button" class="btn btn-xs btn-success" data-add="group">           <i class="{{= it.icons.add_group }}"></i> {{= it.translate("add_group") }}         </button>       {{?}}       {{? it.level>1 }}         <button type="button" class="btn btn-xs btn-danger" data-delete="group">           <i class="{{= it.icons.remove_group }}"></i> {{= it.translate("delete_group") }}         </button>       {{?}}     </div>     <div class="btn-group group-conditions">       {{~ it.conditions: condition }}         <label class="btn btn-xs btn-primary">           <input type="radio" name="{{= it.group_id }}_cond" value="{{= condition }}"> {{= it.translate("conditions", condition) }}         </label>       {{~}}     </div>     {{? it.settings.display_errors }}       <div class="error-container"><i class="{{= it.icons.error }}"></i></div>     {{?}}   </div>   <div class=rules-group-body>     <div class=rules-list></div>   </div> </div>',c.templates.rule='<div id="{{= it.rule_id }}" class="rule-container">   <div class="rule-header">     <div class="btn-group pull-right rule-actions">       <button type="button" class="btn btn-xs btn-danger" data-delete="rule">         <i class="{{= it.icons.remove_rule }}"></i> {{= it.translate("delete_rule") }}       </button>     </div>   </div>   {{? it.settings.display_errors }}     <div class="error-container"><i class="{{= it.icons.error }}"></i></div>   {{?}}   <div class="rule-filter-container"></div>   <div class="rule-operator-container"></div>   <div class="rule-value-container"></div> </div>',c.templates.filterSelect='{{ var optgroup = null; }} <select class="form-control" name="{{= it.rule.id }}_filter">   {{? it.settings.display_empty_filter }}     <option value="-1">{{= it.settings.select_placeholder }}</option>   {{?}}   {{~ it.filters: filter }}     {{? optgroup !== filter.optgroup }}       {{? optgroup !== null }}</optgroup>{{?}}       {{? (optgroup = filter.optgroup) !== null }}         <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}">       {{?}}     {{?}}     <option value="{{= filter.id }}" {{? filter.icon}}data-icon="{{= filter.icon}}"{{?}}>{{= it.translate(filter.label) }}</option>   {{~}}   {{? optgroup !== null }}</optgroup>{{?}} </select>',c.templates.operatorSelect='{{? it.operators.length === 1 }} <span> {{= it.translate("operators", it.operators[0].type) }} </span> {{?}} {{ var optgroup = null; }} <select class="form-control {{? it.operators.length === 1 }}hide{{?}}" name="{{= it.rule.id }}_operator">   {{~ it.operators: operator }}     {{? optgroup !== operator.optgroup }}       {{? optgroup !== null }}</optgroup>{{?}}       {{? (optgroup = operator.optgroup) !== null }}         <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}">       {{?}}     {{?}}     <option value="{{= operator.type }}" {{? operator.icon}}data-icon="{{= operator.icon}}"{{?}}>{{= it.translate("operators", operator.type) }}</option>   {{~}}   {{? optgroup !== null }}</optgroup>{{?}} </select>',c.templates.ruleValueSelect='{{ var optgroup = null; }} <select class="form-control" name="{{= it.name }}" {{? it.rule.filter.multiple }}multiple{{?}}>   {{? it.rule.filter.placeholder }}     <option value="{{= it.rule.filter.placeholder_value }}" disabled selected>{{= it.rule.filter.placeholder }}</option>   {{?}}   {{~ it.rule.filter.values: entry }}     {{? optgroup !== entry.optgroup }}       {{? optgroup !== null }}</optgroup>{{?}}       {{? (optgroup = entry.optgroup) !== null }}         <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}">       {{?}}     {{?}}     <option value="{{= entry.value }}">{{= entry.label }}</option>   {{~}}   {{? optgroup !== null }}</optgroup>{{?}} </select>',c.prototype.getGroupTemplate=function(e,t){var r=this.templates.group({builder:this,group_id:e,level:t,conditions:this.settings.conditions,icons:this.icons,settings:this.settings,translate:this.translate.bind(this)});return this.change("getGroupTemplate",r,t)},c.prototype.getRuleTemplate=function(e){var t=this.templates.rule({builder:this,rule_id:e,icons:this.icons,settings:this.settings,translate:this.translate.bind(this)});return this.change("getRuleTemplate",t)},c.prototype.getRuleFilterSelect=function(e,t){var r=this.templates.filterSelect({builder:this,rule:e,filters:t,icons:this.icons,settings:this.settings,translate:this.translate.bind(this)});return this.change("getRuleFilterSelect",r,e,t)},c.prototype.getRuleOperatorSelect=function(e,t){var r=this.templates.operatorSelect({builder:this,rule:e,operators:t,icons:this.icons,settings:this.settings,translate:this.translate.bind(this)});return this.change("getRuleOperatorSelect",r,e,t)},c.prototype.getRuleValueSelect=function(e,t){var r=this.templates.ruleValueSelect({builder:this,name:e,rule:t,icons:this.icons,settings:this.settings,translate:this.translate.bind(this)});return this.change("getRuleValueSelect",r,e,t)},c.prototype.getRuleInput=function(e,t){var r=e.filter,i=e.filter.validation||{},o=e.id+"_value_"+t,n=r.vertical?" class=block":"",l="",s=Array.isArray(r.placeholder)?r.placeholder[t]:r.placeholder;if("function"==typeof r.input)l=r.input.call(this,e,o);else switch(r.input){case"radio":case"checkbox":h.iterateOptions(r.values,function(e,t){l+="<label"+n+'><input type="'+r.input+'" name="'+o+'" value="'+e+'"> '+t+"</label> "});break;case"select":l=this.getRuleValueSelect(o,e);break;case"textarea":l+='<textarea class="form-control" name="'+o+'"',r.size&&(l+=' cols="'+r.size+'"'),r.rows&&(l+=' rows="'+r.rows+'"'),void 0!==i.min&&(l+=' minlength="'+i.min+'"'),void 0!==i.max&&(l+=' maxlength="'+i.max+'"'),s&&(l+=' placeholder="'+s+'"'),l+="></textarea>";break;case"number":l+='<input class="form-control" type="number" name="'+o+'"',void 0!==i.step&&(l+=' step="'+i.step+'"'),void 0!==i.min&&(l+=' min="'+i.min+'"'),void 0!==i.max&&(l+=' max="'+i.max+'"'),s&&(l+=' placeholder="'+s+'"'),r.size&&(l+=' size="'+r.size+'"'),l+=">";break;default:l+='<input class="form-control" type="text" name="'+o+'"',s&&(l+=' placeholder="'+s+'"'),"string"===r.type&&void 0!==i.min&&(l+=' minlength="'+i.min+'"'),"string"===r.type&&void 0!==i.max&&(l+=' maxlength="'+i.max+'"'),r.size&&(l+=' size="'+r.size+'"'),l+=">"}return this.change("getRuleInput",l,e,o)};var h={};function i(){this.root=null,this.$=$(this)}(c.utils=h).iterateOptions=function(e,r){e&&($.isArray(e)?e.forEach(function(e){$.isPlainObject(e)?"value"in e?r(e.value,e.label||e.value,e.optgroup):$.each(e,function(e,t){return r(e,t),!1}):r(e,e)}):$.each(e,function(e,t){r(e,t)}))},h.fmt=function(e,r){return Array.isArray(r)||(r=Array.prototype.slice.call(arguments,1)),e.replace(/{([0-9]+)}/g,function(e,t){return r[parseInt(t)]})},h.error=function(){var e=0,t="boolean"!=typeof arguments[e]||arguments[e++],r=arguments[e++],i=arguments[e++],o=Array.isArray(arguments[e])?arguments[e]:Array.prototype.slice.call(arguments,e);if(t){var n=new Error(h.fmt(i,o));throw n.name=r+"Error",n.args=o,n}console.error(r+"Error: "+h.fmt(i,o))},h.changeType=function(e,t){if(""!==e&&void 0!==e)switch(t){case"integer":return"string"!=typeof e||/^-?\d+$/.test(e)?parseInt(e):e;case"double":return"string"!=typeof e||/^-?\d+\.?\d*$/.test(e)?parseFloat(e):e;case"boolean":return"string"!=typeof e||/^(0|1|true|false){1}$/i.test(e)?!0===e||1===e||"true"===e.toLowerCase()||"1"===e:e;default:return e}},h.escapeString=function(e){return"string"!=typeof e?e:e.replace(/[\0\n\r\b\\\'\"]/g,function(e){switch(e){case"\0":return"\\0";case"\n":return"\\n";case"\r":return"\\r";case"\b":return"\\b";default:return"\\"+e}}).replace(/\t/g,"\\t").replace(/\x1a/g,"\\Z")},h.escapeRegExp=function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},h.escapeElementId=function(e){return e?e.replace(/(\\)?([:.\[\],])/g,function(e,t,r){return t?e:"\\"+r}):e},h.groupSort=function(e,r){var i=[],o=[];return e.forEach(function(e){var t;e[r]?-1==(t=i.lastIndexOf(e[r]))?t=i.length:t++:t=i.length,i.splice(t,0,e[r]),o.splice(t,0,e)}),o},h.defineModelProperties=function(e,t){t.forEach(function(r){Object.defineProperty(e.prototype,r,{enumerable:!0,get:function(){return this.__[r]},set:function(e){var t=null!==this.__[r]&&"object"==typeof this.__[r]?$.extend({},this.__[r]):this.__[r];this.__[r]=e,null!==this.model&&this.model.trigger("update",this,r,e,t)}})})},$.extend(i.prototype,{trigger:function(e){var t=new $.Event(e);return this.$.triggerHandler(t,Array.prototype.slice.call(arguments,1)),t},on:function(){return this.$.on.apply(this.$,Array.prototype.slice.call(arguments)),this},off:function(){return this.$.off.apply(this.$,Array.prototype.slice.call(arguments)),this},once:function(){return this.$.one.apply(this.$,Array.prototype.slice.call(arguments)),this}});var o=function(e,t){if(!(this instanceof o))return new o(e,t);Object.defineProperty(this,"__",{value:{}}),t.data("queryBuilderModel",this),this.__.level=1,this.__.error=null,this.__.flags={},this.__.data=void 0,this.$el=t,this.id=t[0].id,this.model=null,this.parent=e};h.defineModelProperties(o,["level","error","data","flags"]),Object.defineProperty(o.prototype,"parent",{enumerable:!0,get:function(){return this.__.parent},set:function(e){this.__.parent=e,this.level=null===e?1:e.level+1,this.model=null===e?null:e.model}}),o.prototype.isRoot=function(){return 1===this.level},o.prototype.getPos=function(){return this.isRoot()?-1:this.parent.getNodePos(this)},o.prototype.drop=function(){var e=this.model;this.parent&&this.parent.removeNode(this),this.$el.removeData("queryBuilderModel"),null!==e&&e.trigger("drop",this)},o.prototype.moveAfter=function(e){this.isRoot()||this.move(e.parent,e.getPos()+1)},o.prototype.moveAtBegin=function(e){this.isRoot()||(void 0===e&&(e=this.parent),this.move(e,0))},o.prototype.moveAtEnd=function(e){this.isRoot()||(void 0===e&&(e=this.parent),this.move(e,0===e.length()?0:e.length()-1))},o.prototype.move=function(e,t){this.isRoot()||("number"==typeof e&&(t=e,e=this.parent),this.parent.removeNode(this),e.insertNode(this,t,!1),null!==this.model&&this.model.trigger("move",this,e,t))};var a=function(e,t){if(!(this instanceof a))return new a(e,t);o.call(this,e,t),this.rules=[],this.__.condition=null};a.prototype=Object.create(o.prototype),a.prototype.constructor=a,h.defineModelProperties(a,["condition"]),a.prototype.empty=function(){this.each("reverse",function(e){e.drop()},function(e){e.drop()})},a.prototype.drop=function(){this.empty(),o.prototype.drop.call(this)},a.prototype.length=function(){return this.rules.length},a.prototype.insertNode=function(e,t,r){return void 0===t&&(t=this.length()),this.rules.splice(t,0,e),e.parent=this,r&&null!==this.model&&this.model.trigger("add",this,e,t),e},a.prototype.addGroup=function(e,t){return this.insertNode(new a(this,e),t,!0)},a.prototype.addRule=function(e,t){return this.insertNode(new l(this,e),t,!0)},a.prototype.removeNode=function(e){var t=this.getNodePos(e);-1!==t&&(e.parent=null,this.rules.splice(t,1))},a.prototype.getNodePos=function(e){return this.rules.indexOf(e)},a.prototype.each=function(e,t,r,i){"boolean"!=typeof e&&"string"!=typeof e&&(i=r,r=t,t=e,e=!1),i=void 0===i?null:i;for(var o=e?this.rules.length-1:0,n=e?0:this.rules.length-1,l=e?-1:1,s=!1;(e?n<=o:o<=n)&&(this.rules[o]instanceof a?r&&(s=!1===r.call(i,this.rules[o])):t&&(s=!1===t.call(i,this.rules[o])),!s);o+=l);return!s},a.prototype.contains=function(t,e){return-1!==this.getNodePos(t)||!!e&&!this.each(function(){return!0},function(e){return!e.contains(t,!0)})};var l=function(e,t){if(!(this instanceof l))return new l(e,t);o.call(this,e,t),this._updating_value=!1,this._updating_input=!1,this.__.filter=null,this.__.operator=null,this.__.value=void 0};function u(e,t,r){var i,o,n=c.selectors;(i=t.closest(n.rule_container)).length&&(o="moveAfter"),o||(i=t.closest(n.group_header)).length&&(i=t.closest(n.group_container),o="moveAtBegin"),o||(i=t.closest(n.group_container)).length&&(o="moveAtEnd"),o&&(e[o](r.getModel(i)),r&&e instanceof l&&r.setRuleInputValue(e,e.value))}function n(e){var t=e.match(/(question_mark|numbered|named)(?:\((.)\))?/);return t||(t=[null,"question_mark",void 0]),t}return l.prototype=Object.create(o.prototype),l.prototype.constructor=l,h.defineModelProperties(l,["filter","operator","value"]),l.prototype.isRoot=function(){return!1},c.Group=a,c.Rule=l,$.fn.queryBuilder=function(e){0===this.length&&h.error("Config","No target defined"),1<this.length&&h.error("Config","Unable to initialize on multiple target");var t=this.data("queryBuilder"),r="object"==typeof e&&e||{};if(!t&&"destroy"==e)return this;if(!t){var i=new c(this,r);this.data("queryBuilder",i),i.init(r.rules)}return"string"==typeof e?t[e].apply(t,Array.prototype.slice.call(arguments,1)):this},$.fn.queryBuilder.constructor=c,$.fn.queryBuilder.defaults=c.defaults,$.fn.queryBuilder.extend=c.extend,$.fn.queryBuilder.define=c.define,$.fn.queryBuilder.regional=c.regional,c.define("bt-checkbox",function(u){"glyphicons"==u.font&&this.$el.addClass("bt-checkbox-glyphicons"),this.on("getRuleInput.filter",function(o,e,n){var l=e.filter;if(("radio"===l.input||"checkbox"===l.input)&&!l.plugin){o.value="",l.colors||(l.colors={}),l.color&&(l.colors._def_=l.color);var s=l.vertical?' style="display:block"':"",a=0;h.iterateOptions(l.values,function(e,t){var r=l.colors[e]||l.colors._def_||u.color,i=n+"_"+a++;o.value+="<div"+s+' class="'+l.input+" "+l.input+"-"+r+'">   <input type="'+l.input+'" name="'+n+'" id="'+i+'" value="'+e+'">   <label for="'+i+'">'+t+"</label> </div>"})}})},{font:"glyphicons",color:"default"}),c.define("bt-selectpicker",function(r){$.fn.selectpicker&&$.fn.selectpicker.Constructor||h.error("MissingLibrary",'Bootstrap Select is required to use "bt-selectpicker" plugin. Get it here: http://silviomoreto.github.io/bootstrap-select');var i=c.selectors;this.on("afterCreateRuleFilters",function(e,t){t.$el.find(i.rule_filter).removeClass("form-control").selectpicker(r)}),this.on("afterCreateRuleOperators",function(e,t){t.$el.find(i.rule_operator).removeClass("form-control").selectpicker(r)}),this.on("afterUpdateRuleFilter",function(e,t){t.$el.find(i.rule_filter).selectpicker("render")}),this.on("afterUpdateRuleOperator",function(e,t){t.$el.find(i.rule_operator).selectpicker("render")}),this.on("beforeDeleteRule",function(e,t){t.$el.find(i.rule_filter).selectpicker("destroy"),t.$el.find(i.rule_operator).selectpicker("destroy")})},{container:"body",style:"btn-inverse btn-xs",width:"auto",showIcon:!1}),c.define("bt-tooltip-errors",function(i){$.fn.tooltip&&$.fn.tooltip.Constructor&&$.fn.tooltip.Constructor.prototype.fixTitle||h.error("MissingLibrary",'Bootstrap Tooltip is required to use "bt-tooltip-errors" plugin. Get it here: http://getbootstrap.com');var o=this;this.on("getRuleTemplate.filter getGroupTemplate.filter",function(e){var t=$($.parseHTML(e.value));t.find(c.selectors.error_container).attr("data-toggle","tooltip"),e.value=t.prop("outerHTML")}),this.model.on("update",function(e,t,r){"error"==r&&o.settings.display_errors&&t.$el.find(c.selectors.error_container).eq(0).tooltip(i).tooltip("hide").tooltip("fixTitle")})},{placement:"right"}),c.extend({setFilters:function(e,t){var r=this;void 0===t&&(t=e,e=!1),t=this.checkFilters(t);var i=(t=this.change("setFilters",t)).map(function(e){return e.id});if(e||function e(t){t.each(function(e){e.filter&&-1===i.indexOf(e.filter.id)&&h.error("ChangeFilter",'A rule is using filter "{0}"',e.filter.id)},e)}(this.model.root),this.filters=t,function e(t){t.each(!0,function(e){e.filter&&-1===i.indexOf(e.filter.id)?(e.drop(),r.trigger("rulesChanged")):(r.createRuleFilters(e),e.$el.find(c.selectors.rule_filter).val(e.filter?e.filter.id:"-1"),r.trigger("afterUpdateRuleFilter",e))},e)}(this.model.root),this.settings.plugins&&(this.settings.plugins["unique-filter"]&&this.updateDisabledFilters(),this.settings.plugins["bt-selectpicker"]&&this.$el.find(c.selectors.rule_filter).selectpicker("render")),this.settings.default_filter)try{this.getFilterById(this.settings.default_filter)}catch(e){this.settings.default_filter=null}this.trigger("afterSetFilters",t)},addFilter:function(e,r){void 0===r||"#end"==r?r=this.filters.length:"#start"==r&&(r=0),$.isArray(e)||(e=[e]);var t=$.extend(!0,[],this.filters);parseInt(r)==r?Array.prototype.splice.apply(t,[r,0].concat(e)):this.filters.some(function(e,t){if(e.id==r)return r=t+1,!0})?Array.prototype.splice.apply(t,[r,0].concat(e)):Array.prototype.push.apply(t,e),this.setFilters(t)},removeFilter:function(t,e){var r=$.extend(!0,[],this.filters);"string"==typeof t&&(t=[t]),r=r.filter(function(e){return-1===t.indexOf(e.id)}),this.setFilters(e,r)}}),c.define("chosen-selectpicker",function(r){$.fn.chosen||h.error("MissingLibrary",'chosen is required to use "chosen-selectpicker" plugin. Get it here: https://github.com/harvesthq/chosen'),this.settings.plugins["bt-selectpicker"]&&h.error("Conflict","bt-selectpicker is already selected as the dropdown plugin. Please remove chosen-selectpicker from the plugin list");var i=c.selectors;this.on("afterCreateRuleFilters",function(e,t){t.$el.find(i.rule_filter).removeClass("form-control").chosen(r)}),this.on("afterCreateRuleOperators",function(e,t){1<e.builder.getOperators(t.filter).length&&t.$el.find(i.rule_operator).removeClass("form-control").chosen(r)}),this.on("afterUpdateRuleFilter",function(e,t){t.$el.find(i.rule_filter).trigger("chosen:updated")}),this.on("afterUpdateRuleOperator",function(e,t){t.$el.find(i.rule_operator).trigger("chosen:updated")}),this.on("beforeDeleteRule",function(e,t){t.$el.find(i.rule_filter).chosen("destroy"),t.$el.find(i.rule_operator).chosen("destroy")})}),c.define("filter-description",function(o){"inline"===o.mode?this.on("afterUpdateRuleFilter afterUpdateRuleOperator",function(e,t){var r=t.$el.find("p.filter-description"),i=e.builder.getFilterDescription(t.filter,t);i?(0===r.length?(r=$($.parseHTML('<p class="filter-description"></p>'))).appendTo(t.$el):r.css("display",""),r.html('<i class="'+o.icon+'"></i> '+i)):r.hide()}):"popover"===o.mode?($.fn.popover&&$.fn.popover.Constructor&&$.fn.popover.Constructor.prototype.fixTitle||h.error("MissingLibrary",'Bootstrap Popover is required to use "filter-description" plugin. Get it here: http://getbootstrap.com'),this.on("afterUpdateRuleFilter afterUpdateRuleOperator",function(e,t){var r=t.$el.find("button.filter-description"),i=e.builder.getFilterDescription(t.filter,t);i?(0===r.length?((r=$($.parseHTML('<button type="button" class="btn btn-xs btn-info filter-description" data-toggle="popover"><i class="'+o.icon+'"></i></button>'))).prependTo(t.$el.find(c.selectors.rule_actions)),r.popover({placement:"left",container:"body",html:!0}),r.on("mouseout",function(){r.popover("hide")})):r.css("display",""),r.data("bs.popover").options.content=i,r.attr("aria-describedby")&&r.popover("show")):(r.hide(),r.data("bs.popover")&&r.popover("hide"))})):"bootbox"===o.mode&&("bootbox"in window||h.error("MissingLibrary",'Bootbox is required to use "filter-description" plugin. Get it here: http://bootboxjs.com'),this.on("afterUpdateRuleFilter afterUpdateRuleOperator",function(e,t){var r=t.$el.find("button.filter-description"),i=e.builder.getFilterDescription(t.filter,t);i?(0===r.length?((r=$($.parseHTML('<button type="button" class="btn btn-xs btn-info filter-description" data-toggle="bootbox"><i class="'+o.icon+'"></i></button>'))).prependTo(t.$el.find(c.selectors.rule_actions)),r.on("click",function(){bootbox.alert(r.data("description"))})):r.css("display",""),r.data("description",i)):r.hide()}))},{icon:"glyphicon glyphicon-info-sign",mode:"popover"}),c.extend({getFilterDescription:function(e,t){return e?"function"==typeof e.description?e.description.call(this,t):e.description:void 0}}),c.define("invert",function(r){var i=this,o=c.selectors;this.on("afterInit",function(){i.$el.on("click.queryBuilder","[data-invert=group]",function(){var e=$(this).closest(o.group_container);i.invert(i.getModel(e),r)}),r.display_rules_button&&r.invert_rules&&i.$el.on("click.queryBuilder","[data-invert=rule]",function(){var e=$(this).closest(o.rule_container);i.invert(i.getModel(e),r)})}),r.disable_template||(this.on("getGroupTemplate.filter",function(e){var t=$($.parseHTML(e.value));t.find(o.condition_container).after('<button type="button" class="btn btn-xs btn-default" data-invert="group"><i class="'+r.icon+'"></i> '+i.translate("invert")+"</button>"),e.value=t.prop("outerHTML")}),r.display_rules_button&&r.invert_rules&&this.on("getRuleTemplate.filter",function(e){var t=$($.parseHTML(e.value));t.find(o.rule_actions).prepend('<button type="button" class="btn btn-xs btn-default" data-invert="rule"><i class="'+r.icon+'"></i> '+i.translate("invert")+"</button>"),e.value=t.prop("outerHTML")}))},{icon:"glyphicon glyphicon-random",recursive:!0,invert_rules:!0,display_rules_button:!1,silent_fail:!1,disable_template:!1}),c.defaults({operatorOpposites:{equal:"not_equal",not_equal:"equal",in:"not_in",not_in:"in",less:"greater_or_equal",less_or_equal:"greater",greater:"less_or_equal",greater_or_equal:"less",between:"not_between",not_between:"between",begins_with:"not_begins_with",not_begins_with:"begins_with",contains:"not_contains",not_contains:"contains",ends_with:"not_ends_with",not_ends_with:"ends_with",is_empty:"is_not_empty",is_not_empty:"is_empty",is_null:"is_not_null",is_not_null:"is_null"},conditionOpposites:{AND:"OR",OR:"AND"}}),c.extend({invert:function(e,t){if(!(e instanceof o)){if(!this.model.root)return;t=e,e=this.model.root}if("object"!=typeof t&&(t={}),void 0===t.recursive&&(t.recursive=!0),void 0===t.invert_rules&&(t.invert_rules=!0),void 0===t.silent_fail&&(t.silent_fail=!1),void 0===t.trigger&&(t.trigger=!0),e instanceof a){if(this.settings.conditionOpposites[e.condition]?e.condition=this.settings.conditionOpposites[e.condition]:t.silent_fail||h.error("InvertCondition",'Unknown inverse of condition "{0}"',e.condition),t.recursive){var r=$.extend({},t,{trigger:!1});e.each(function(e){t.invert_rules&&this.invert(e,r)},function(e){this.invert(e,r)},this)}}else if(e instanceof l&&e.operator&&!e.filter.no_invert)if(this.settings.operatorOpposites[e.operator.type]){var i=this.settings.operatorOpposites[e.operator.type];e.filter.operators&&-1==e.filter.operators.indexOf(i)||(e.operator=this.getOperatorByType(i))}else t.silent_fail||h.error("InvertOperator",'Unknown inverse of operator "{0}"',e.operator.type);t.trigger&&(this.trigger("afterInvert",e,t),this.trigger("rulesChanged"))}}),c.defaults({mongoOperators:{equal:function(e){return e[0]},not_equal:function(e){return{$ne:e[0]}},in:function(e){return{$in:e}},not_in:function(e){return{$nin:e}},less:function(e){return{$lt:e[0]}},less_or_equal:function(e){return{$lte:e[0]}},greater:function(e){return{$gt:e[0]}},greater_or_equal:function(e){return{$gte:e[0]}},between:function(e){return{$gte:e[0],$lte:e[1]}},not_between:function(e){return{$lt:e[0],$gt:e[1]}},begins_with:function(e){return{$regex:"^"+h.escapeRegExp(e[0])}},not_begins_with:function(e){return{$regex:"^(?!"+h.escapeRegExp(e[0])+")"}},contains:function(e){return{$regex:h.escapeRegExp(e[0])}},not_contains:function(e){return{$regex:"^((?!"+h.escapeRegExp(e[0])+").)*$",$options:"s"}},ends_with:function(e){return{$regex:h.escapeRegExp(e[0])+"$"}},not_ends_with:function(e){return{$regex:"(?<!"+h.escapeRegExp(e[0])+")$"}},is_empty:function(e){return""},is_not_empty:function(e){return{$ne:""}},is_null:function(e){return null},is_not_null:function(e){return{$ne:null}}},mongoRuleOperators:{$eq:function(e){return{val:e,op:null===e?"is_null":""===e?"is_empty":"equal"}},$ne:function(e){return{val:e=e.$ne,op:null===e?"is_not_null":""===e?"is_not_empty":"not_equal"}},$regex:function(e){return"^(?!"==(e=e.$regex).slice(0,4)&&")"==e.slice(-1)?{val:e.slice(4,-1),op:"not_begins_with"}:"^((?!"==e.slice(0,5)&&").)*$"==e.slice(-5)?{val:e.slice(5,-5),op:"not_contains"}:"(?<!"==e.slice(0,4)&&")$"==e.slice(-2)?{val:e.slice(4,-2),op:"not_ends_with"}:"$"==e.slice(-1)?{val:e.slice(0,-1),op:"ends_with"}:"^"==e.slice(0,1)?{val:e.slice(1),op:"begins_with"}:{val:e,op:"contains"}},between:function(e){return{val:[e.$gte,e.$lte],op:"between"}},not_between:function(e){return{val:[e.$lt,e.$gt],op:"not_between"}},$in:function(e){return{val:e.$in,op:"in"}},$nin:function(e){return{val:e.$nin,op:"not_in"}},$lt:function(e){return{val:e.$lt,op:"less"}},$lte:function(e){return{val:e.$lte,op:"less_or_equal"}},$gt:function(e){return{val:e.$gt,op:"greater"}},$gte:function(e){return{val:e.$gte,op:"greater_or_equal"}}}}),c.extend({getMongo:function(e){if(!(e=void 0===e?this.getRules():e))return null;var l=this;return function o(e){if(e.condition||(e.condition=l.settings.default_condition),-1===["AND","OR"].indexOf(e.condition.toUpperCase())&&h.error("UndefinedMongoCondition",'Unable to build MongoDB query with condition "{0}"',e.condition),!e.rules)return{};var n=[];e.rules.forEach(function(e){if(e.rules&&0<e.rules.length)n.push(o(e));else{var t=l.settings.mongoOperators[e.operator],r=l.getOperatorByType(e.operator);void 0===t&&h.error("UndefinedMongoOperator",'Unknown MongoDB operation for operator "{0}"',e.operator),0!==r.nb_inputs&&(e.value instanceof Array||(e.value=[e.value]));var i={};i[l.change("getMongoDBField",e.field,e)]=t.call(l,e.value),n.push(l.change("ruleToMongo",i,e,e.value,t))}});var t={};return t["$"+e.condition.toLowerCase()]=n,l.change("groupToMongo",t,e)}(e)},getRulesFromMongo:function(e){if(null==e)return null;var d=this;if("rules"in(e=d.change("parseMongoNode",e))&&"condition"in e)return e;if("id"in e&&"operator"in e&&"value"in e)return{condition:this.settings.default_condition,rules:[e]};var t=d.getMongoCondition(e);return t||h.error("MongoParse","Invalid MongoDB query format"),function u(e,t){var r=e[t],p=[];return r.forEach(function(e){if("rules"in(e=d.change("parseMongoNode",e))&&"condition"in e)p.push(e);else if("id"in e&&"operator"in e&&"value"in e)p.push(e);else{var t=d.getMongoCondition(e);if(t)p.push(u(e,t));else{var r=Object.keys(e)[0],i=e[r],o=d.getMongoOperator(i);void 0===o&&h.error("MongoParse","Invalid MongoDB query format");var n=d.settings.mongoRuleOperators[o];void 0===n&&h.error("UndefinedMongoOperator",'JSON Rule operation unknown for operator "{0}"',o);var l=n.call(d,i),s=d.getMongoDBFieldID(r,i),a=d.change("mongoToRule",{id:s,field:r,operator:l.op,value:l.val},e);p.push(a)}}}),d.change("mongoToGroup",{condition:t.replace("$","").toUpperCase(),rules:p},e)}(e,t)},setRulesFromMongo:function(e){this.setRules(this.getRulesFromMongo(e))},getMongoDBFieldID:function(t,e){var r=this.filters.filter(function(e){return e.field===t});return 1===r.length?r[0].id:this.change("getMongoDBFieldID",t,e)},getMongoOperator:function(e){if(null===e||"object"!=typeof e)return"$eq";if(void 0!==e.$gte&&void 0!==e.$lte)return"between";if(void 0!==e.$lt&&void 0!==e.$gt)return"not_between";var t=Object.keys(e).filter(function(e){return!!this.settings.mongoRuleOperators[e]}.bind(this));return 1===t.length?t[0]:void 0},getMongoCondition:function(e){for(var t=Object.keys(e),r=0,i=t.length;r<i;r++)if("$or"===t[r].toLowerCase()||"$and"===t[r].toLowerCase())return t[r]}}),c.define("not-group",function(r){var i=this;this.on("afterInit",function(){i.$el.on("click.queryBuilder","[data-not=group]",function(){var e=$(this).closest(c.selectors.group_container),t=i.getModel(e);t.not=!t.not}),i.model.on("update",function(e,t,r){t instanceof a&&"not"===r&&i.updateGroupNot(t)})}),this.on("afterAddGroup",function(e,t){t.__.not=!1}),r.disable_template||this.on("getGroupTemplate.filter",function(e){var t=$($.parseHTML(e.value));t.find(c.selectors.condition_container).prepend('<button type="button" class="btn btn-xs btn-default" data-not="group"><i class="'+r.icon_unchecked+'"></i> '+i.translate("NOT")+"</button>"),e.value=t.prop("outerHTML")}),this.on("groupToJson.filter",function(e,t){e.value.not=t.not}),this.on("jsonToGroup.filter",function(e,t){e.value.not=!!t.not}),this.on("groupToSQL.filter",function(e,t){t.not&&(e.value="NOT ( "+e.value+" )")}),this.on("parseSQLNode.filter",function(e){e.value.name&&"NOT"==e.value.name.toUpperCase()&&(e.value=e.value.arguments.value[0],-1===["AND","OR"].indexOf(e.value.operation.toUpperCase())&&(e.value=new SQLParser.nodes.Op(i.settings.default_condition,e.value,null)),e.value.not=!0)}),this.on("sqlGroupsDistinct.filter",function(e,t,r,i){r.not&&0<i&&(e.value=!0)}),this.on("sqlToGroup.filter",function(e,t){e.value.not=!!t.not}),this.on("groupToMongo.filter",function(e,t){var r="$"+t.condition.toLowerCase();t.not&&e.value[r]&&(e.value={$nor:[e.value]})}),this.on("parseMongoNode.filter",function(e){var t=Object.keys(e.value);"$nor"==t[0]&&(e.value=e.value[t[0]][0],e.value.not=!0)}),this.on("mongoToGroup.filter",function(e,t){e.value.not=!!t.not})},{icon_unchecked:"glyphicon glyphicon-unchecked",icon_checked:"glyphicon glyphicon-check",disable_template:!1}),h.defineModelProperties(a,["not"]),c.selectors.group_not=c.selectors.group_header+" [data-not=group]",c.extend({updateGroupNot:function(e){var t=this.plugins["not-group"];e.$el.find(">"+c.selectors.group_not).toggleClass("active",e.not).find("i").attr("class",e.not?t.icon_checked:t.icon_unchecked),this.trigger("afterUpdateGroupNot",e),this.trigger("rulesChanged")}}),c.define("sortable",function(i){var o,n,l,s;"interact"in window||h.error("MissingLibrary",'interact.js is required to use "sortable" plugin. Get it here: http://interactjs.io'),void 0!==i.default_no_sortable&&(h.error(!1,"Config",'Sortable plugin : "default_no_sortable" options is deprecated, use standard "default_rule_flags" and "default_group_flags" instead'),this.settings.default_rule_flags.no_sortable=this.settings.default_group_flags.no_sortable=i.default_no_sortable),interact.dynamicDrop(!0),interact.pointerMoveTolerance(10),this.on("afterAddRule afterAddGroup",function(e,t){if(t!=o){var r=e.builder;i.inherit_no_sortable&&t.parent&&t.parent.flags.no_sortable&&(t.flags.no_sortable=!0),i.inherit_no_drop&&t.parent&&t.parent.flags.no_drop&&(t.flags.no_drop=!0),t.flags.no_sortable||interact(t.$el[0]).draggable({allowFrom:c.selectors.drag_handle,onstart:function(e){s=!1,l=r.getModel(e.target),n=l.$el.clone().appendTo(l.$el.parent()).width(l.$el.outerWidth()).addClass("dragging");var t=$($.parseHTML('<div class="rule-placeholder">&nbsp;</div>')).height(l.$el.outerHeight());o=l.parent.addRule(t,l.getPos()),l.$el.hide()},onmove:function(e){n[0].style.top=e.clientY-15+"px",n[0].style.left=e.clientX-15+"px"},onend:function(e){e.dropzone&&(u(l,$(e.relatedTarget),r),s=!0),n.remove(),n=void 0,o.drop(),o=void 0,l.$el.css("display",""),r.trigger("afterMove",l),r.trigger("rulesChanged")}}),t.flags.no_drop||(interact(t.$el[0]).dropzone({accept:c.selectors.rule_and_group_containers,ondragenter:function(e){u(o,$(e.target),r)},ondrop:function(e){s||u(l,$(e.target),r)}}),t instanceof a&&interact(t.$el.find(c.selectors.group_header)[0]).dropzone({accept:c.selectors.rule_and_group_containers,ondragenter:function(e){u(o,$(e.target),r)},ondrop:function(e){s||u(l,$(e.target),r)}}))}}),this.on("beforeDeleteRule beforeDeleteGroup",function(e,t){e.isDefaultPrevented()||(interact(t.$el[0]).unset(),t instanceof a&&interact(t.$el.find(c.selectors.group_header)[0]).unset())}),this.on("afterApplyRuleFlags afterApplyGroupFlags",function(e,t){t.flags.no_sortable&&t.$el.find(".drag-handle").remove()}),i.disable_template||(this.on("getGroupTemplate.filter",function(e,t){if(1<t){var r=$($.parseHTML(e.value));r.find(c.selectors.condition_container).after('<div class="drag-handle"><i class="'+i.icon+'"></i></div>'),e.value=r.prop("outerHTML")}}),this.on("getRuleTemplate.filter",function(e){var t=$($.parseHTML(e.value));t.find(c.selectors.rule_header).after('<div class="drag-handle"><i class="'+i.icon+'"></i></div>'),e.value=t.prop("outerHTML")}))},{inherit_no_sortable:!0,inherit_no_drop:!0,icon:"glyphicon glyphicon-sort",disable_template:!1}),c.selectors.rule_and_group_containers=c.selectors.rule_container+", "+c.selectors.group_container,c.selectors.drag_handle=".drag-handle",c.defaults({default_rule_flags:{no_sortable:!1,no_drop:!1},default_group_flags:{no_sortable:!1,no_drop:!1}}),c.define("sql-support",function(e){},{boolean_as_integer:!0}),c.defaults({sqlOperators:{equal:{op:"= ?"},not_equal:{op:"!= ?"},in:{op:"IN(?)",sep:", "},not_in:{op:"NOT IN(?)",sep:", "},less:{op:"< ?"},less_or_equal:{op:"<= ?"},greater:{op:"> ?"},greater_or_equal:{op:">= ?"},between:{op:"BETWEEN ?",sep:" AND "},not_between:{op:"NOT BETWEEN ?",sep:" AND "},begins_with:{op:"LIKE(?)",mod:"{0}%"},not_begins_with:{op:"NOT LIKE(?)",mod:"{0}%"},contains:{op:"LIKE(?)",mod:"%{0}%"},not_contains:{op:"NOT LIKE(?)",mod:"%{0}%"},ends_with:{op:"LIKE(?)",mod:"%{0}"},not_ends_with:{op:"NOT LIKE(?)",mod:"%{0}"},is_empty:{op:"= ''"},is_not_empty:{op:"!= ''"},is_null:{op:"IS NULL"},is_not_null:{op:"IS NOT NULL"}},sqlRuleOperator:{"=":function(e){return{val:e,op:""===e?"is_empty":"equal"}},"!=":function(e){return{val:e,op:""===e?"is_not_empty":"not_equal"}},LIKE:function(e){return"%"==e.slice(0,1)&&"%"==e.slice(-1)?{val:e.slice(1,-1),op:"contains"}:"%"==e.slice(0,1)?{val:e.slice(1),op:"ends_with"}:"%"==e.slice(-1)?{val:e.slice(0,-1),op:"begins_with"}:void h.error("SQLParse",'Invalid value for LIKE operator "{0}"',e)},"NOT LIKE":function(e){return"%"==e.slice(0,1)&&"%"==e.slice(-1)?{val:e.slice(1,-1),op:"not_contains"}:"%"==e.slice(0,1)?{val:e.slice(1),op:"not_ends_with"}:"%"==e.slice(-1)?{val:e.slice(0,-1),op:"not_begins_with"}:void h.error("SQLParse",'Invalid value for NOT LIKE operator "{0}"',e)},IN:function(e){return{val:e,op:"in"}},"NOT IN":function(e){return{val:e,op:"not_in"}},"<":function(e){return{val:e,op:"less"}},"<=":function(e){return{val:e,op:"less_or_equal"}},">":function(e){return{val:e,op:"greater"}},">=":function(e){return{val:e,op:"greater_or_equal"}},BETWEEN:function(e){return{val:e,op:"between"}},"NOT BETWEEN":function(e){return{val:e,op:"not_between"}},IS:function(e){return null!==e&&h.error("SQLParse","Invalid value for IS operator"),{val:null,op:"is_null"}},"IS NOT":function(e){return null!==e&&h.error("SQLParse","Invalid value for IS operator"),{val:null,op:"is_not_null"}}},sqlStatements:{question_mark:function(){var r=[];return{add:function(e,t){return r.push(t),"?"},run:function(){return r}}},numbered:function(r){(!r||1<r.length)&&(r="$");var i=0,o=[];return{add:function(e,t){return o.push(t),r+ ++i},run:function(){return o}}},named:function(i){(!i||1<i.length)&&(i=":");var o={},n={};return{add:function(e,t){o[e.field]||(o[e.field]=1);var r=e.field+"_"+o[e.field]++;return n[r]=t,i+r},run:function(){return n}}}},sqlRuleStatement:{question_mark:function(t){var r=0;return{parse:function(e){return"?"==e?t[r++]:e},esc:function(e){return e.replace(/\?/g,"'?'")}}},numbered:function(t,r){(!r||1<r.length)&&(r="$");var i=new RegExp("^\\"+r+"[0-9]+$"),o=new RegExp("\\"+r+"([0-9]+)","g");return{parse:function(e){return i.test(e)?t[e.slice(1)-1]:e},esc:function(e){return e.replace(o,"'"+("$"==r?"$$":r)+"$1'")}}},named:function(t,r){(!r||1<r.length)&&(r=":");var i=new RegExp("^\\"+r),o=new RegExp("\\"+r+"("+Object.keys(t).join("|")+")\\b","g");return{parse:function(e){return i.test(e)?t[e.slice(1)]:e},esc:function(e){return e.replace(o,"'"+("$"==r?"$$":r)+"$1'")}}}}}),c.extend({getSQL:function(a,u,e){if(!(e=void 0===e?this.getRules():e))return null;u=u?"\n":" ";var p=this.getPluginOptions("sql-support","boolean_as_integer");if(!0===a&&(a="question_mark"),"string"==typeof a){var t=n(a);a=this.settings.sqlStatements[t[1]](t[2])}var d=this,r=function l(e){if(e.condition||(e.condition=d.settings.default_condition),-1===["AND","OR"].indexOf(e.condition.toUpperCase())&&h.error("UndefinedSQLCondition",'Unable to build SQL query with condition "{0}"',e.condition),!e.rules)return"";var s=[];e.rules.forEach(function(r){if(r.rules&&0<r.rules.length)s.push("("+u+l(r)+u+")"+u);else{var i=d.settings.sqlOperators[r.operator],e=d.getOperatorByType(r.operator),o="";void 0===i&&h.error("UndefinedSQLOperator",'Unknown SQL operation for operator "{0}"',r.operator),0!==e.nb_inputs&&(r.value instanceof Array||(r.value=[r.value]),r.value.forEach(function(e,t){0<t&&(o+=i.sep),"boolean"==r.type&&p?e=e?1:0:a||"integer"===r.type||"double"===r.type||"boolean"===r.type||(e=h.escapeString(e)),i.mod&&(e=h.fmt(i.mod,e)),a?o+=a.add(r,e):("string"==typeof e&&(e="'"+e+"'"),o+=e)}));var t=function(e){return i.op.replace("?",function(){return e})},n=d.change("getSQLField",r.field,r)+" "+t(o);s.push(d.change("ruleToSQL",n,r,o,t))}});var t=s.join(" "+e.condition+u);return d.change("groupToSQL",t,e)}(e);return a?{sql:r,params:a.run()}:{sql:r}},getRulesFromSQL:function(e,c){"SQLParser"in window||h.error("MissingLibrary","SQLParser is required to parse SQL queries. Get it here https://github.com/mistic100/sql-parser");var f=this;if("string"==typeof e&&(e={sql:e}),!0===c&&(c="question_mark"),"string"==typeof c){var t=n(c);c=this.settings.sqlRuleStatement[t[1]](e.params,t[2])}c&&(e.sql=c.esc(e.sql)),0!==e.sql.toUpperCase().indexOf("SELECT")&&(e.sql="SELECT * FROM table WHERE "+e.sql);var r=SQLParser.parse(e.sql);r.where||h.error("SQLParse","No WHERE clause found");var i=f.change("parseSQLNode",r.where.conditions);if("rules"in i&&"condition"in i)return i;if("id"in i&&"operator"in i&&"value"in i)return{condition:this.settings.default_condition,rules:[i]};var o=f.change("sqlToGroup",{condition:this.settings.default_condition,rules:[]},i),g=o;return function e(t,r){if(null!==t)if("rules"in(t=f.change("parseSQLNode",t))&&"condition"in t)g.rules.push(t);else if("id"in t&&"operator"in t&&"value"in t)g.rules.push(t);else if("left"in t&&"right"in t&&"operation"in t||h.error("SQLParse","Unable to parse WHERE clause"),-1!==["AND","OR"].indexOf(t.operation.toUpperCase())){if(f.change("sqlGroupsDistinct",0<r&&g.condition!=t.operation.toUpperCase(),g,t,r)){var i=f.change("sqlToGroup",{condition:f.settings.default_condition,rules:[]},t);g.rules.push(i),g=i}g.condition=t.operation.toUpperCase(),r++;var o=g;e(t.left,r),g=o,e(t.right,r)}else{var n;$.isPlainObject(t.right.value)&&h.error("SQLParse","Value format not supported for {0}.",t.left.value),n=$.isArray(t.right.value)?t.right.value.map(function(e){return e.value}):t.right.value,c&&(n=$.isArray(n)?n.map(c.parse):c.parse(n));var l=t.operation.toUpperCase();"<>"==l&&(l="!=");var s=f.settings.sqlRuleOperator[l];void 0===s&&h.error("UndefinedSQLOperator",'Invalid SQL operation "{0}".',t.operation);var a,u=s.call(this,n,t.operation);"values"in t.left?a=t.left.values.join("."):"value"in t.left?a=t.left.value:h.error("SQLParse","Cannot find field name in {0}",JSON.stringify(t.left));var p=f.getSQLFieldID(a,n),d=f.change("sqlToRule",{id:p,field:a,operator:u.op,value:u.val},t);g.rules.push(d)}}(i,0),o},setRulesFromSQL:function(e,t){this.setRules(this.getRulesFromSQL(e,t))},getSQLFieldID:function(t,e){var r=this.filters.filter(function(e){return e.field.toLowerCase()===t.toLowerCase()});return 1===r.length?r[0].id:this.change("getSQLFieldID",t,e)}}),c.define("unique-filter",function(){this.status.used_filters={},this.on("afterUpdateRuleFilter",this.updateDisabledFilters),this.on("afterDeleteRule",this.updateDisabledFilters),this.on("afterCreateRuleFilters",this.applyDisabledFilters),this.on("afterReset",this.clearDisabledFilters),this.on("afterClear",this.clearDisabledFilters),this.on("getDefaultFilter.filter",function(t,r){var i=t.builder;(i.updateDisabledFilters(),t.value.id in i.status.used_filters)&&(i.filters.some(function(e){if(!(e.id in i.status.used_filters)||0<i.status.used_filters[e.id].length&&-1===i.status.used_filters[e.id].indexOf(r.parent))return t.value=e,!0})||(h.error(!1,"UniqueFilter","No more non-unique filters available"),t.value=void 0))})}),c.extend({updateDisabledFilters:function(e){var r=e?e.builder:this;r.status.used_filters={},r.model&&(!function t(e){e.each(function(e){e.filter&&e.filter.unique&&(r.status.used_filters[e.filter.id]||(r.status.used_filters[e.filter.id]=[]),"group"==e.filter.unique&&r.status.used_filters[e.filter.id].push(e.parent))},function(e){t(e)})}(r.model.root),r.applyDisabledFilters(e))},clearDisabledFilters:function(e){var t=e?e.builder:this;t.status.used_filters={},t.applyDisabledFilters(e)},applyDisabledFilters:function(e){var r=e?e.builder:this;r.$el.find(c.selectors.filter_container+" option").prop("disabled",!1),$.each(r.status.used_filters,function(t,e){0===e.length?r.$el.find(c.selectors.filter_container+' option[value="'+t+'"]:not(:selected)').prop("disabled",!0):e.forEach(function(e){e.each(function(e){e.$el.find(c.selectors.filter_container+' option[value="'+t+'"]:not(:selected)').prop("disabled",!0)})})}),r.settings.plugins&&r.settings.plugins["bt-selectpicker"]&&r.$el.find(c.selectors.rule_filter).selectpicker("render")}}),c.regional.en={__locale:"English (en)",__author:'Damien "Mistic" Sorel, http://www.strangeplanet.fr',add_rule:"Add rule",add_group:"Add group",delete_rule:"Delete",delete_group:"Delete",conditions:{AND:"AND",OR:"OR"},operators:{equal:"equal",not_equal:"not equal",in:"in",not_in:"not in",less:"less",less_or_equal:"less or equal",greater:"greater",greater_or_equal:"greater or equal",between:"between",not_between:"not between",begins_with:"begins with",not_begins_with:"doesn't begin with",contains:"contains",not_contains:"doesn't contain",ends_with:"ends with",not_ends_with:"doesn't end with",is_empty:"is empty",is_not_empty:"is not empty",is_null:"is null",is_not_null:"is not null"},errors:{no_filter:"No filter selected",empty_group:"The group is empty",radio_empty:"No value selected",checkbox_empty:"No value selected",select_empty:"No value selected",string_empty:"Empty value",string_exceed_min_length:"Must contain at least {0} characters",string_exceed_max_length:"Must not contain more than {0} characters",string_invalid_format:"Invalid format ({0})",number_nan:"Not a number",number_not_integer:"Not an integer",number_not_double:"Not a real number",number_exceed_min:"Must be greater than {0}",number_exceed_max:"Must be lower than {0}",number_wrong_step:"Must be a multiple of {0}",number_between_invalid:"Invalid values, {0} is greater than {1}",datetime_empty:"Empty value",datetime_invalid:"Invalid date format ({0})",datetime_exceed_min:"Must be after {0}",datetime_exceed_max:"Must be before {0}",datetime_between_invalid:"Invalid values, {0} is greater than {1}",boolean_not_valid:"Not a boolean",operator_not_multiple:'Operator "{1}" cannot accept multiple values'},invert:"Invert",NOT:"NOT"},c.defaults({lang_code:"en"}),c});
//# sourceMappingURL=query-builder.min.js.map