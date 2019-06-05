import React from 'react';

export default function User(props) {
    return (
        <section>
            <h2>{props.user.name}</h2>
            <h5>{props.user.email}</h5>
        </section>
    )
}