---
title: Pamphlet
---

# {{ title }}

<p class="drop">Once upon a time, in a land far away, there lived a writer who had a story to tell.</p>

## Contents

<ol class="toc">
{%- for chapter in collections.chapters %}
<li><a href="{{ chapter.url }}">{{ chapter.data.title }}</a></li>
{%- endfor %}
</ol>
