/**
 * Created by jellyfish on 5/24/16.
 */
var nodeIterator,
    currentNode,
    orgs;

orgs = [
    {
        "name": "Alliance for Therapeutic Choice and Scientific Integrity",
        "politics": "right",
        "bias": "anti-trans"
    },
    {
        "name": "American College of Pediatricians",
        "politics": "right",
        "bias": "anti-trans"
    }
];

var checkBias = function() {
    nodeIterator = document.createNodeIterator(
        document.body,
        NodeFilter.SHOW_TEXT
    );

    var regex, text;

    while (currentNode = nodeIterator.nextNode()) {
        for (var i = 0; i < orgs.length; i++) {
            regex = createRegex(orgs[i]);
            text = createTag(orgs[i]);
            console.log(currentNode.textContent.search(regex));
            currentNode.textContent = currentNode.textContent.replace(regex, text);
        }
    }
};

var createRegex = function( entry ) {
    return new RegExp(entry.name.toLowerCase(), "gi");
};

var createTag = function( entry ) {
    var text = entry.name + " [ " + entry.politics + " ] ";
    console.log(text);
    return text;
};

checkBias();
