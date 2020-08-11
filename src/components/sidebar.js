import React from 'react';
import { Link, graphql, useStaticQuery } from "gatsby"
import '../components/sidebar.css'

const query = graphql`
    query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
    `

function Sidebar (){
    const taglinlks = []
    const data = useStaticQuery(query);

    const editedData = JSON.parse(JSON.stringify(data))
    editedData.allMarkdownRemark.group.forEach(({ totalCount,fieldValue }) => {
        taglinlks.push(<Link to={'/tag/' + fieldValue}>{fieldValue + '(' + totalCount + ')'}</Link>)
    });
    return (
        <>
        <div className="sidenav">
            {taglinlks}
        </div>
        </>
    );
}
  
export default Sidebar;