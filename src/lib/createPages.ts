import { CreatePagesArgs } from 'gatsby';
import path from 'path';
import { node } from 'prop-types';

export async function CreatePages({ actions, graphql }: CreatePagesArgs) {
    const { createPage } = actions;
    const taglist = []
    const { data, errors } = await graphql(`
            {
                allMarkdownRemark {
                    edges {
                        node {
                            html
                            frontmatter {
                                title
                                path
                                tags
                            }
                        }
                    }
                }
            }
        `);

    if (errors) {
        throw errors;
    }
    const editedData = JSON.parse(JSON.stringify(data))
    editedData.allMarkdownRemark.edges.forEach(({ node }: any) => {
        taglist.push(node.frontmatter.tags)
        createPage({
            path: node.frontmatter.path,
            context: {
                html: node.html,
                title: node.frontmatter.title,
            },
            component: path.resolve(__dirname, '../templates/PostTemplates.tsx'),
        });
    });
    var unique = taglist.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    })
    unique.forEach((tag) => {
        createPage({
            path: '/tag/' + tag,
            context: {
                tags : tag
            },
            component: path.resolve(__dirname, '../pages/index.tsx'),
        });
    });
    createPage({
        path: '/',
        context: {
            tags : ''
        },
        component: path.resolve(__dirname, '../pages/index.tsx'),
    });
}
