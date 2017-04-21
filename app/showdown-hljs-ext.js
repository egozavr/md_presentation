showdown.extension('codehighlight', function () {
    function htmlunencode(text) {
        return (
            text
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
        );
    }

    return [
        {
            type: 'output',
            filter: function (text, converter, options) {
                // use new shodown's regexp engine to conditionally parse codeblocks
                var left = '<pre><code\\b[^>]*>',
                    right = '</code></pre>',
                    flags = 'g',
                    replacement = function (wholeMatch, match, left, right) {
                        // unescape match to prevent double escaping
                        match = htmlunencode(match);
                        const lm = left.match(/class="(.*)"/i);
                        if (lm) {
                            if (lm[1].match(/nohighlight/i)) return wholeMatch;
                            left = left.replace(/class="(.*)"/, `class="hljs ${lm[1]}"`);
                        }
                        else {
                            left = left.replace(/[>]$/ig, ' class="hljs">');
                        }
                        return left + hljs.highlightAuto(match).value + right;
                    };
                return showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags);
            }
        }
    ];
});
