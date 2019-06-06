import React from 'react';
import User from './User';
import CommentList from './CommentList';

export default function Post(props) {
    const { usersMap } = props;
    const { comments } = props;
    const { userId } = props;

    const commentsItems = [];

    for (const comment of comments) {
        if (comment.postId === userId) {
            commentsItems.push(comment);
        }
    }

    return (
        <tr>
            <td>
                <span>{props.title}</span>
                <p>{props.body}</p>
            </td>
            <td>
                <User user={usersMap[userId]}/>
            </td>
            <td>
                <CommentList comments={commentsItems}/>
            </td>
        </tr>
    )
}