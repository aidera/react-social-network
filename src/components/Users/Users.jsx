import React from "react";
import s from './Users.module.sass'
import User from "./User/User";
import * as axios from "axios";


class Users extends React.Component {

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(responce => {
                this.props.setUsers(responce.data.items);
            });
    }

    getUsers = () => {

        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(responce => {
                this.props.setUsers(responce.data.items);
            });

    }


    render() {
        return (
            <div className={s.usersPage}>
                <h1>Users</h1>
                <div className={s.buttons}>
                    <button onClick={this.getUsers} className="button">Get Users</button>
                </div>
                {
                    this.props.users.map(user => {

                            return <User
                                key={user.id}
                                state={user}
                                follow={this.props.follow}
                                unfollow={this.props.unfollow}
                            />
                        }
                    )
                }
            </div>
        );
    }
}

export default Users;