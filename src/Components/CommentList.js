import React from 'react';
import Comment from './Comment';

export default function CommentList(props) {
    let itemsInArray = [];

    for (let key in props.comments) {
        itemsInArray = [...itemsInArray, props.comments[key]]
    }

    const items = itemsInArray.map(item => <Comment key={item.id} name={item.name} body={item.body}/>);
    return (
        <div>
            {items}
        </div>
    )
}