<div align="center">
  <div align="cetner">
    <a href="https://blog.this-is-for-developer.com/" target="_blank" rel="noreferrer">
      <img src="https://user-images.githubusercontent.com/36183001/157453117-de1d02f6-332d-4d70-97ae-95b366eda5ed.png" width="64" height="64" alt="This is Blog"></img>
    </a>
  </div>
</div>

<h1 align="center">Just Write Markdown for Your Github Blog</h1>

Markdown GitBlog provides a fully made blog page, a set of reusable React components that create website.

*Looking for demo?* 👉 <a href="https://blog.this-is-for-developer.com/" target="_blank" rel="noreferrer">Demo</a>


## 🌟 Features

- Ease of Making Blog Post : Before you start your own blog, only need to do just create a `.md` file in the `/posts/about` and `/posts/post` directories.
- Optimized for SEO : With Next.js's `SSG (Static Site Generation)` function and appropriate meta tag implementation for each page, you don't have to spend a lot of time on `SEO (Search Engine Optimization)`.
- Keep your Blog Up to Date : If you pull and push on the `master` branch after writing an article, you can keep your blog up to date by using `Git Actions` CI/CD.

## 📔 Documentation

1. Write about page

- Base directory `/posts/about`

Required `about.md` Metadata

```bash
author: # Your Nickname
summary: # Your Slogan
updated: # YYYY-MM-DD
email: # Your Email
url: # Your Own URL
tags: # Separate each word with a comma
```

Replace the `avatar.png` file to change your avatar picture

2. Write post page

- Base directory `/posts/post`
- Directure Structure: `/post/[category]/[post]/[post].md`

Required `[post].md` Metadata

Create the custom category directory, create the post directory, and write the markdown file

```bash
title: # Post Card Title
summary: # Post Card Summary
category: # Be sure to enter the parent category directory name
date: # YYYY-MM-DD
shortcut: # Post Content Summary
coverImage: # Image URL of Same Directory
```

## ⌨️ Installation

First, open the CLI:

1. Fork the repository (click the `fork` button at the top right of this <a href="https://github.com/canoe726/MarkdownGitBlog" target="_blank" rel="noreferrer">repo</a>)

2. Clone your fork locally

```bash
git clone https://github.com/<your_github_username>/MarkdownGitBlog.git
cd frontend
```

3. After clone install packages and start

```bash
npm install
# or
yarn install

npm run dev
# or
yarn dev
```

If you want to customize design of this blog, please refer to the <a href="https://chakra-ui.com/" target="_blank" rel="noreferrer">Chakra UI</a> page after executing the dev command.

## 🤝 Contribution

Do you want to contribute? Or did you find an error? That's awesome! Please create an issue in `master` branch or create a `feature/` branch to create a `merge request` to master.
