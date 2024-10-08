// Q: Why didn't you write this in purescript?
// A: This is fundamentally just a "manipulate the DOM once" program, and honestly isn't complicated enough to warrant me wrangling all the DOM types around 


var gloss_dict = {
    // Pronouns/Person Marking
    "1SG": ["1st Person Singular", "\"I\"."],
    "1PL": ["1st Person Plural", "\"we\"."],
    "2SG": ["2nd Person Singular", "\"you\"."],
    "2PL": ["2nd Person Plural", "\"you all\"."],
    "3SG": ["3rd Person Singular", "\"he/she/they\"."],
    "3PL": ["3rd Person Plural", "\"they\", but plural."],
    "PROX": ["Proximate", "This pronoun refers to something more contextually salient."],
    "OBV": ["Obviate", "This pronoun refers to something less contextually salient."],
    
    // Noun Cases
    "AGT": ["Agentive Case", "Indicates the subject of a transitive verb, or an agent-like subject of an intransitive verb."],
    "PAT": ["Patientive Case", "Indicates the (direct) object of a transitive verb, or a patient-like subject of an intransitive verb."],
    "DAT": ["Dative Case", "Indicates (primarily) the indirect object of a transitive verb."],
    "GEN": ["Genitive Case", "Indicates that the noun is posessing something, or a similar association."],
    "INST": ["Instrumental-Comitative Case", "Expresses either that the noun is the means by which something is done, or that the noun is with or associated with the subject."],
    "VOC": ["Vocative Case", "Used for direct address."],
    "ALL" : ["Allative Case", "Expresses motion towards the noun"],
    "ABL" : ["Ablative Case", "Expresses motion away from the noun"],
    "LOC" : ["Locative Case", "Expresses a spacial relationship of being in, at, or on the noun. Also metaphorally extended to other similar relationships."],

    // Number
    "SG": ["Singular", "Indicates that there is exactly one of the noun."], 
    "PL": ["Plural", "Indicates that there is more than one of the noun."],

    // Verb Tenses 
    "PST": ["Past Tense", "Indicates that the event happened in the past."],
    "PRES": ["Present Tense", "Indicates that the event happens in the present."],
    "FUT": ["Future Tense", "Indicates that the event will happen in the future."],

    // Relativizer
    "REL": ["Relativizer", "Marks the beginning of a relative clause."],

    // Verb Aspects
    "PFV" : ["Perfective Aspect", "Indicates that the event happens at a single point in time."],
    "IMPV" : ["Imperfective Aspect", "Indicates that the event happens continuously over the interval in question."],
    // PERF
    // HAB
    // USIT
    // ITER
    // SEML
    // SEMF

    // Verb Moods
    "IND" : ["Indicative Mood", "Indicates a pure statement of fact."],
    // SUBJ
    // IMP
    // OPT

    // Non-finite Verb Forms
    // INF
    // PSTPART
    // PRESPART
    // FUTPART

    // Converbs
    // PRIM
    // CAUS
    // SEQ
    // PFVC
    // COND
    // IPFVC
    // RES
    // TERM
    // IMMED
    // SIMIL
    // INTRPT
    // GRAD
    // ANT
    // CONCS
    // CONCS2 <- come up with a better name for this by this point PLEASE
    // IRRES

    // Other Verb Things
    "PASS" : ["Passive Verb", "Drops subject, promotes object to subject (though it is still often marked PAT)"],
    "COP" : ["Copula", "Verb that links the subject to its complement. English's copula is \"to be\""],
    "COMP" : ["Complementizer", "Introduces a subordinate clause, e.g \"that\" in \"He said that it is hot outside.\""]
    // Particles
    // NEG
}


function fontToRoman(s) {
    return s.replaceAll("c","ṡ")
            .replaceAll("D","ż")
            .replaceAll("L","ł")
            .replaceAll("X","ǧ")
            .replaceAll("K","q")
            .replaceAll("S","š")
            .replaceAll("Z","ž")
            .replaceAll("C","č")
            .replaceAll("R","ř")
            .replaceAll("ah", "ā")
            .replaceAll("eh", "ē")
            .replaceAll("ih", "ī")
            .replaceAll("oh", "ō")
            .replaceAll("uh", "ū")
            .replaceAll(".", "")
            .replace(/^ṡ/, "ts")
            .replace(/^D/, "dz")
            .replace(/=$/, "=∅")
            .replaceAll("= ", "=∅ ")
            .replaceAll("==","=∅=")
            .replaceAll("=","-")
}

// takes a single word's worth of gloss (no spaces)
function makeGlossElement(gloss, g) {
    var tokens = gloss.split(/(\.|\-)/g);
    for (let token of tokens) {
        let gloss_data = gloss_dict[token];
        if (typeof(gloss_data) == "undefined") {
            g.appendChild(document.createTextNode(token));
        } else {
            let title = gloss_data[0];
            let description = gloss_data[1];

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

const glosses = document.getElementsByTagName("gloss");
console.log(glosses);
for (let g of glosses) {
    var eng = g.dataset.eng;
    var gloss = g.dataset.gloss.split(" ");
    var tsal = g.dataset.tsal;
    var footnotes = g.dataset.footnotes;
    var tsalRoman = fontToRoman(tsal);
    tsal = tsal.replaceAll("=","").split(" ");
    tsalRoman = tsalRoman.split(" ");
    console.log(eng, gloss, tsal, tsalRoman);

    g.innerHTML = "";
    var tableLength = Math.max(gloss.length, tsal.length, tsalRoman.length);

    var div = document.createElement("div");
    div.setAttribute("style","align-items: center; text-align: center;");
    var table = document.createElement("table");
    div.appendChild(table);

    table.setAttribute("style","border: none; margin: auto; text-align: left;");


    fontRow = document.createElement("tr");
    // make the font segments
    for (var i = 0; i < tableLength; i++) {
        td = document.createElement("td");
        td.setAttribute("style", "border: none;");
        tsalE = document.createElement("tsal");
        tsalE.innerHTML = tsal[i];
        td.appendChild(tsalE);
        fontRow.appendChild(td);
    }

    // make the romanization segments
    romanRow = document.createElement("tr");
    for (var i = 0; i < tableLength; i++) {
        td = document.createElement("td");
        td.setAttribute("style", "border: none;");
        td.innerHTML = tsalRoman[i];
        romanRow.appendChild(td);
    }   

    // make the gloss segments
    glossRow = document.createElement("tr");
    for (var i = 0; i < tableLength; i++) {
        td = document.createElement("td");
        td.setAttribute("style", "border: none;");
        makeGlossElement(gloss[i], td);
        glossRow.appendChild(td);
    }

    table.appendChild(fontRow);
    table.appendChild(romanRow);
    table.appendChild(glossRow);

    i = document.createElement("i");

    // handle footnotes
    if (typeof(footnotes) != "undefined") {
        for (let i of footnotes.split(",")) {
            // horrendous practice. i don't care.
            eng = eng.replaceAll("[" + i + "]", "<sup id=\"ref" + i + "\"><a href=\"#fn" + i + "\">" + i + "</a></sup>");
        }
    }
    i.innerHTML = eng;

    div.appendChild(i);

    g.appendChild(div);
}

const pglosses = document.getElementsByTagName("puregloss");

for (let g of pglosses) {
    var words = g.innerHTML.split(" ")
    console.log(words);

    g.innerHTML = "";
    for (let word of words) {
        makeGlossElement(word, g);
        g.appendChild(document.createTextNode(" "));
    }
}

const withRomans = document.getElementsByTagName("tsalr");

for (let g of withRomans) {
    var text = g.innerHTML;
    g.innerHTML = "";

    var t = document.createElement("tsal");
    t.innerHTML = text;
    t.setAttribute("style", "font-size: 38px;");

    var b = document.createElement("br");

    var r = document.createElement("span");
    r.innerHTML = fontToRoman(text);
    r.setAttribute("style", "font-size: 16px;");

    g.appendChild(t);
    g.appendChild(b);
    g.appendChild(r);
}