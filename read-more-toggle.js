define([
    'jquery',
    'jquery/ui'
], function($) {
    'use strict';

    $.widget('drgz.readMoreToggle', {
        options: {
            visibleChar: 100,
            ellipsesText: '...',
            moreText: 'Show more',
            lessText: 'Show less',
            contentSelector: null,
            toggleSelector: '.read-more-toggle' /* If toggleSelector.length is true, then the widget will use it as a toggle button */
        },

        _create: function () {
            var self = this;

            self._processContent();
        },

        _processContent: function () {
            var self = this;

            self.content = self.element.find(self.options.contentSelector).length ?
                self.element.find(self.options.contentSelector) :
                self.element;
            self.contentText = self.content.text().trim();
            self.toggle = self.element.find(self.options.toggleSelector).length ?
                self.element.find(self.options.toggleSelector) :
                $('<a href="#" class="morelink">' + self.options.moreText + '</a>');

            if(self.contentText.length > self.options.visibleChar) {

                !self.element.find(self.options.toggleSelector).length && self.toggle.insertAfter(self.content);

                var visibleText = self.contentText.substr(0, self.options.visibleChar);
                var hiddenText = self.contentText.substr(self.options.visibleChar, self.contentText.length - self.options.visibleChar);

                self.visibleContent = $('<span class="less-content">' + visibleText + '</span>');
                self.ellipses = $('<span class="ellipses">' + self.options.ellipsesText+ '</span>');
                self.hiddenContent = $('<span class="more-content">' + hiddenText + '</span>');

                self.content
                    .empty()
                    .append(self.visibleContent)
                    .append(self.ellipses)
                    .append(self.hiddenContent.hide());

                self.toggle.show();
                self._bindEvents();
            } else {
                self.toggle.hide();
            }
        },

        _bindEvents: function () {
            var self = this;

            self.toggle.on('click', function(event){
                event.preventDefault();

                if(self.content.hasClass("less")) {
                    self.content.removeClass("less");
                    self.toggle.text(self.options.moreText);
                } else {
                    self.content.addClass("less");
                    self.toggle.text(self.options.lessText);
                }
                self.ellipses.toggle();
                self.hiddenContent.toggle();
            });
        }
    });

    return $.drgz.readMoreToggle;
});
