// Q: Why didn't you write this in purescript?
// A: This is fundamentally just a "manipulate the DOM once" program, and honestly isn't complicated enough to warrant me wrangling all the DOM types around 


var gloss_dict = {
    "1SG": ["1st Person Singular", "The speaker, and nobody else (\"I\")."],
    "GEN": ["Genitive Case", "Indicates that the noun is posessing something."],
    "INST": ["Instrumental-Comitative Case", "Expresses either that the noun is the means by which something is done, or that the noun is with or associated with the subject."]
}


const glosses = document.getElementsByTagName("gloss");

for (let g of glosses) {
    var tokens = g.innerHTML.split(/(\.|\-| )/g)
    console.log(tokens);

    g.innerHTML = "";
    for (let token of tokens) {
        let gloss_data = gloss_dict[token];
        if (typeof(gloss_data) == "undefined") {
            g.appendChild(document.createTextNode(token));
        } else {
            let title = gloss_data[0];
            let description = gloss_data[1];
            // <div class="tooltip">rook<span class="tooltiptext">Slides orthogonally until it reaches another piece.</span></div>

            let outerDiv = document.createElement("div");
            outerDiv.setAttribute("class","tooltip");
            outerDiv.appendChild(document.createTextNode(token));

            let tooltipText = document.createElement("span");
            tooltipText.setAttribute("class","tooltiptext");
            let b = document.createElement("b");
            b.innerText = title;
            let d = document.createTextNode(description);
            tooltipText.appendChild(b);
            tooltipText.appendChild(document.createElement("br"));
            tooltipText.appendChild(d);
            outerDiv.appendChild(tooltipText);
            g.appendChild(outerDiv);
            
        }
    }
}