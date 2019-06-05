import React from 'react';
import User from './User';
import CommentList from './CommentList';

export default function Post(props) {
    const { usersMap } = props;
    const { commentsMap } = props;
    const { userId } = props;
    const comments = {};

    for (let key in commentsMap) {
        if (commentsMap[key].postId === userId) {
            comments[key] = commentsMap[key];
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
                <CommentList comments={comments}/>
            </td>
        </tr>
    )
}