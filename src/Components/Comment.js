import React from 'react';

export default function Comment(props) {
    return (
        <section>
            <p>{props.body}</p>
            <span>{props.name}</span>
        </section>
    )

}