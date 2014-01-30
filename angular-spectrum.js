angular.module('spectrum', ['ng'])
  .provider('spectrum', function () {

    this.globalOptions = {};

    this.useNative = false;

    this.$get = ['$window', function ($window) {
      var defaultOptions = $window.jQuery.fn.spectrum.defaultOptions;

      return {
        useNative: this.useNative,
        defaultOptions: angular.extend({}, defaultOptions, this.globalOptions)
      }
    }]
  })
  .directive('spectrum', ['spectrum', function (spectrum) {

    var template = spectrum.useNative ? '<input type="color" />' : '<input type="text" />';

    return {
      restrict: 'E',
      template: template,
      replace: true,
      scope: {
        ngModel: '=',
        ngValue: '=',
        show: '=',
        hide: '=',
        disabled: '='
      },
      link: function ($scope, $element, $attrs) {

        var color = $scope.model || '#000000';
        var options = angular.extend({}, spectrum.defaultOptions, { color: color });

        if (!$element.data('spectrum.id')) {
          $element.spectrum(options);
        }

        $scope.$watch('ngModel', function (value) {
          $element.spectrum({ color: value });
        });

        $scope.$watch('ngValue', function (value) {
          $element.spectrum({ color: value });
        });

        if (!angular.isUndefined($attrs['disabled'])) {
          $scope.$watch('disabled', function (value) {
            $element.spectrum({ disabled: !!value });
          });
        }

        if (!angular.isUndefined($attrs['show'])) {
          $scope.$watch('show', function (value) {
            $element.spectrum('container')[!!value ? 'show' : 'hide']();
          });
        }

        if (!angular.isUndefined($attrs['hide'])) {
          $scope.$watch('hide', function (value) {
            $element.spectrum('container')[!value ? 'show' : 'hide']();
          });
        }
      }
    }
  }]);
