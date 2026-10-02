# quan.github.io

My simple webpage.

[Link](https://lequan14.github.io/quan.github.io/)


## Adding or removing projects

Projects on the homepage are generated from the `PROJECTS` list at the top of
[`projects.js`](projects.js). Add an object to show a new card, delete one to
remove it — no HTML changes needed:

```js
{
    title: "My New Thing",
    description: "One or two sentences about it.",
    shortDescription: "Optional shorter text for phones.",
    href: "my-new-thing/index.html",      // or a full https:// URL
    tags: ["HTML", "CSS"],
    preview: { type: "image", src: "my-new-thing/screenshot.png", alt: "Screenshot" },
},
```

`preview.type` can be `"scoreboard"`, `"phone"`, `"image"` or `"text"`; leave
`preview` out and the card shows the project's initials.
