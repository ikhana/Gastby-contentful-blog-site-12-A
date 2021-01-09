import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image";
import styled from "styled-components";

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Post = styled.div`

display: flex;


`

const postImage = styled.div`

 flex: 25%;
 margin-right: 1rem;
`


const postText = styled.div`

 flex: 75%
 
`

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allContentfulBlockchainlearning.edges

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          
          const title = post.node.title 

          return (
            <Post key={post.node.slug.toLowerCase().replace(/\s/g, '-') }>
              <postImage>
                <Img fluid={post.node.image.fluid}/>
              </postImage>
              <postText>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.node.slug.toLowerCase().replace(/\s/g, '-')} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.node.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.node.title ||post.node.title
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
              </postText>
             
            </Post>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        
      }
    }
    allContentfulBlockchainlearning{
      edges{
        
        node{
          slug
          title
          image{
            fluid{
              ...GatsbyContentfulFluid
            }
          }
          subtitle

         
        
          
        }
      }
    }
   
  }
`
