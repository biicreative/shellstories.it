import React from "react"
import { Link } from "gatsby"
import NFT from "../components/nft"

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <ol style={{ listStyle: `none` }}>
      {posts.map(post => {
        const title = post.frontmatter.title || post.fields.slug

        return (
          <li key={post.fields.slug}>
            <article
              className="post-list-item"
              itemScope
              itemType="http://schema.org/Article"
            >
              <header>
                <h2>
                  <Link to={post.fields.slug} itemProp="url">
                    <span itemProp="headline">{title}</span>
                  </Link>
                </h2>
                <small>{post.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: post.frontmatter.description || post.excerpt,
                  }}
                  itemProp="description"
                />
                <Link to={post.fields.slug} itemProp="url">
                  Leggi la storia...
                </Link>
              </section>
              <p>&nbsp;</p>
              <footer style={{ border: `thin black dashed`, padding: `10px` }}>
                {post.frontmatter.nft && (
                  <NFT
                    token={post.frontmatter.token}
                    title={post.frontmatter.nft_title}
                    url={post.frontmatter.nft_url}
                  />
                )}
              </footer>
            </article>
          </li>
        )
      })}
    </ol>
  )
}

export default BlogIndex
