import React,{ Component } from 'react';
import { Post } from './Post';

export class PostList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            requested: false,
            loadedUsers: false,
            loadedPosts: false,
            loadedComments: false,
            articles: null,
            users: null,
            posts: null,
            comments: null,
            filter: ''
        };

        this.handleClick = this.handleClick.bind(this);
        this.filterChanged = this.filterChanged.bind(this);
    }

    handleClick() {
        this.setState({
            requested: true
        });

        const xhrPosts = new XMLHttpRequest();
        const xhrUsers = new XMLHttpRequest();
        const xhrComments = new XMLHttpRequest();
        const url = 'https://jsonplaceholder.typicode.com/';

        xhrPosts.open('GET', `${url}posts`);
        xhrUsers.open('GET', `${url}users`);
        xhrComments.open('GET', `${url}comments`);

        xhrPosts.addEventListener('load', () => {
            this.setState({
                loadedPosts: true,
                posts: JSON.parse(xhrPosts.response)
            });
        });
        xhrUsers.addEventListener('load', () => {
            this.setState({
                loadedUsers: true,
                users: JSON.parse(xhrUsers.response)
            });
        });
        xhrComments.addEventListener('load', () => {
            this.setState({
                loadedComments: true,
                comments: JSON.parse(xhrComments.response)
            });
        });

        xhrPosts.send();
        xhrUsers.send();
        xhrComments.send();
    }

    filterChanged(event) {
        this.setState(
            {filter: event.target.value}
        );
    }

    render() {
        if (!this.state.requested) {

            return <button onClick={this.handleClick}>Download posts!</button>;
        } else if (
                   this.state.loadedUsers
                   && this.state.loadedPosts
                   && this.state.comments
                  ) {
            const postComponents = this.state.posts.filter(post => {
                return post.title.includes(this.state.filter);
            });
            const usersMap = this.state.users.reduce((acc, user) => ({...acc, [user.id]: user,}), {});
            const items = postComponents.map(item => (<Post key={item.id}
                                                            userId={item.userId}
                                                            title={item.title}
                                                            body={item.body}
                                                            id={item.id}
                                                            comments={this.state.comments}
                                                            usersMap={usersMap}
                                                            />));

            return (
                <div>
                    <input type="text" placeholder="search by title" onChange={this.filterChanged}/>
                    <table>
                        <thead>
                            <tr>
                                <th>Post</th>
                                <th>User</th>
                                <th>Comments</th>
                            </tr>
                        </thead>
                            <tbody>
                                {items}
                            </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div>Loading...</div>
            );
        }
    }
}
