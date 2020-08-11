import React from "react"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from 'gatsby'

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar"

import { ITemplateProps } from '../interface';

type IPostTemplateProps = ITemplateProps<{
    tags: string;
}>;

const LatestPostListQuery = graphql`
        query LatestPostListQuery {
            allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
                edges {
                    node {
                        excerpt(truncate: true, pruneLength: 200)
                        frontmatter {
                            title
                            path
                            tags
                            date(formatString: "YYYY-MM-DD HH:mm:ss")
                        }
                        id
                    }
                }
            }
        }
    `;

const IndexPage: React.FC<IPostTemplateProps> = React.memo(props => {
    const data = useStaticQuery(LatestPostListQuery);
    const { tags } = props.pageContext;
    return (
        <Layout>
            <Sidebar></Sidebar>
            <SEO title="Home" />
            <h1>{tags}</h1>
            <ul>
                {data.allMarkdownRemark.edges.map(({ node }) => {
                    if (tags == "" || tags == node.frontmatter.tags || tags == undefined)
                        return (
                            <li key={node.id}>
                                <h2>
                                    <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
                                </h2>
                                <h3>{node.frontmatter.date}</h3>
                                <p>{node.excerpt}</p>
                                <hr />
                            </li>
                        )
                })}
            </ul>
        </Layout>
    );
})

export default IndexPage
