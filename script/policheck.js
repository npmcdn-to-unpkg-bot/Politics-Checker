/**
 * Created by jellyfish on 5/24/16.
 */

var checkBias = function() {
    var nodeIterator,
        currentNode,
        orgs,
        regex,
        text,
        match;

    nodeIterator = document.createNodeIterator(
        document.body,
        NodeFilter.SHOW_TEXT
    );

    $.getJSON('data/orgs.json', function (data, status) {
        if (status === 'success') {
            orgs = data.data;

            console.log(orgs);

            while (currentNode = nodeIterator.nextNode()) {
                for (var i = 0; i < orgs.length; i++) {
                    regex = createRegex(orgs[i]);
                    match = regex.exec(currentNode.textContent);

                    if (match) {
                        text = createTag(match[0], orgs[i]);
                        currentNode.textContent = currentNode.textContent.replace(regex, text);
                    }
                }
            }
        }
    });
};

var createRegex = function( entry ) {
    return new RegExp(entry.name.toLowerCase(), "gi");
};

var createTag = function( matchedStr, entry ) {
    var text;

    text = matchedStr + " [ " + entry.alignment + " ] ";

    if (entry.bias) {
        text += " [ " + entry.bias + " ] ";
    }

    return text;
};

checkBias();
