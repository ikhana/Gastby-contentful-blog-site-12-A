const path = require(`path`)


exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post-contentful.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
    {
      allContentfulBlockchainlearning{
        edges{
          node{
            slug
            title
            subtitle
            
           
          }
        }
      }
    }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allContentfulBlockchainlearning.edges

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      let slugifiedPath= post.node.slug.toLowerCase().replace(/\s/g, '-');
      const previousPostSlug = index === 0 ? null : posts[index - 1].id
      const $nextPostSlug = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: slugifiedPath,
        component: blogPost,
        context: {
          slug: post.node.slug,
          previousPostSlug,
          $nextPostSlug,
        },
      })
    })
  }
}



