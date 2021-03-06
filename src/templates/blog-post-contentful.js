import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.contentfulBlockchainlearning
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
 

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post.title} description={post.subtitle}/>
      <Img fluid={post.image.fluid}/>
      <article className="blog-post" itemScope  itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <p>{post.date}</p>
        </header>
          <section
          
          dangerouslySetInnerHTML= {{ __html: post.content.raw }}
          itemProp="articleBody"
        />
      
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.slug} rel="prev">Hey There
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
    
  ) {
    site {
      siteMetadata {
        title
        
        
      }
    }
    contentfulBlockchainlearning(slug: {eq: $slug}){
      title
      subtitle
      image{
        fluid{
          ...GatsbyContentfulFluid
        }
      }
      content{
        raw
      }

    }
    previous: contentfulBlockchainlearning(slug: { eq: $previousPostSlug}) {
      title 
    }
    
        


    next:  contentfulBlockchainlearning(slug: { eq: $nextPostSlug }) {
         title     
        
     
          
      
    }
  }
`
