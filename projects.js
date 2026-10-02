// Projects shown on the homepage.
// To add a project, add an object to this list. To remove one, delete its object.
// Cards render in the order they appear here.
//
// Fields:
//   title        (required) card heading
//   description  (required) one or two sentences
//   shortDescription (optional) shorter text shown on phones instead of description
//   href         (required) link the card opens; relative paths or full URLs
//   tags         (optional) list of short labels, e.g. ["HTML", "CSS"]
//   preview      (optional) what fills the top of the card:
//                  { type: "scoreboard" }                    — desktop scoreboard illustration
//                  { type: "phone" }                         — phone scoreboard illustration
//                  { type: "image", src: "path.png", alt: "" } — a screenshot or picture
//                  { type: "text", text: "λ" }               — big glyph / short word
//                Leave it out and the card shows the project's initials.

const PROJECTS = [
    {
        title: "Fencing Dashboard",
        description: "A referee scoreboard for bouts — 3-minute timer, score tracking for both fencers, one-tap reset. Built for a laptop beside the piste.",
        shortDescription: "Referee scoreboard with a 3-minute bout timer and score tracking.",
        href: "fencing-dashboard/index.html",
        tags: ["HTML", "CSS", "JavaScript"],
        preview: { type: "scoreboard" },
    },
    {
        title: "Fencing Dashboard Mobile",
        description: "The same scoreboard, redesigned for one-handed use on a phone. Big tap targets, readable from across the room.",
        shortDescription: "The scoreboard, redesigned for one-handed use on a phone.",
        href: "fencing-dashboard-mobile/index.html",
        tags: ["Mobile", "Responsive", "JS"],
        preview: { type: "phone" },
    },
];

// ---------------------------------------------------------------------------
// Rendering — no need to edit below this line when adding projects.

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function scoreDigits(container, separator) {
    container.append(
        el("span", "digits digits--left", "12"),
        el("span", "digits-sep", separator),
        el("span", "digits digits--right", "09"),
    );
}

function renderPreview(preview, title) {
    const wrap = el("div", "card-preview");
    const type = preview && preview.type;

    if (type === "scoreboard") {
        const board = el("div", "mini-scoreboard");
        board.append(el("span", "mini-timer", "02:47"));
        const row = el("div", "mini-score-row");
        scoreDigits(row, ":");
        board.append(row);
        wrap.append(board);
    } else if (type === "phone") {
        const phone = el("div", "mini-phone");
        phone.append(el("span", "mini-timer", "02:47"));
        scoreDigits(phone, "·");
        wrap.append(phone);
    } else if (type === "image") {
        const img = el("img", "card-image");
        img.src = preview.src;
        img.alt = preview.alt || "";
        img.loading = "lazy";
        wrap.append(img);
    } else {
        const fallback = type === "text"
            ? preview.text
            : title.split(/\s+/).map(w => w[0]).join("").slice(0, 3).toUpperCase();
        wrap.append(el("span", "card-glyph", fallback));
    }
    return wrap;
}

function renderCard(project) {
    const card = el("a", "card");
    card.href = project.href;
    if (/^https?:\/\//.test(project.href)) {
        card.target = "_blank";
        card.rel = "noreferrer";
    }

    card.append(renderPreview(project.preview, project.title));

    const body = el("div", "card-body");
    const titleRow = el("div", "card-title-row");
    titleRow.append(el("h3", "card-title", project.title), el("span", "card-arrow", "↗"));
    titleRow.lastChild.setAttribute("aria-hidden", "true");
    const desc = el("p", "card-desc");
    if (project.shortDescription) {
        desc.append(
            el("span", "desc-long", project.description),
            el("span", "desc-short", project.shortDescription),
        );
    } else {
        desc.textContent = project.description;
    }
    body.append(titleRow, desc);

    if (project.tags && project.tags.length) {
        const tags = el("ul", "card-tags");
        for (const tag of project.tags) tags.append(el("li", "tag", tag));
        body.append(tags);
    }

    card.append(body);
    return card;
}

const grid = document.getElementById("project-grid");
grid.replaceChildren(...PROJECTS.map(renderCard));
