import React from 'react';
import Layout from '../components/layout';
import Utterances from '../components/Utterances'
import { ITemplateProps } from '../interface';

type IPostTemplateProps = ITemplateProps<{
    html: string;
    date: string;
    title: string;
}>;

const PostTemplate: React.FC<IPostTemplateProps> = React.memo(props => {
    const { title, date, html } = props.pageContext;
    return (
        <Layout>
            <h2>{title}</h2>
            <h4>{date}</h4>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <Utterances repo="kkywalk2/GatsbyBlog" />
        </Layout>
    );
});

PostTemplate.displayName = 'PostTemplate';

export default PostTemplate;