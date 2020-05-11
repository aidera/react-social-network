import React from 'react';
import profileReducer, {addPost, getUserProfile, setUserProfile, setUserStatus} from './profile-reducer';

let state = {
    posts:[
        {id: 1, likesCount: 1, text: 'Lorem ipsum dolor sit.'},
        {id: 2, likesCount: 5, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, quisquam!'},
        {id: 3, likesCount: 2, text: 'Lorem ipsum dolor sit amet'},
        {id: 4, likesCount: 40, text: 'Jetxc jjsd ddffddf'},
    ],
    profile: null,
    status: ''
};



test('length of posts should be incremented', () => {
    let action = addPost('hello');

    let newState = profileReducer(state,action);

    expect(newState.posts.length).toBe(5);
});

test('length of posts should be incremented', () => {
    let action = addPost('hello');

    let newState = profileReducer(state,action);

    expect(newState.posts[4].text).toBe('hello');
});

test('no other posts should be changed', () => {
    let action = addPost('hello');

    let newState = profileReducer(state,action);

    expect(newState.posts[0]).toBe(state.posts[0]);
    expect(newState.posts[1]).toBe(state.posts[1]);
    expect(newState.posts[2]).toBe(state.posts[2]);
    expect(newState.posts[3]).toBe(state.posts[3]);
});

test('users profile is setted', () => {
    let action = setUserProfile(7453);

    let newState = profileReducer(state,action);

    expect(newState.profile).toBe(7453);
});

test('users status is setted', () => {
    let action = setUserStatus('New status text');

    let newState = profileReducer(state,action);

    expect(newState.status).toBe('New status text');
});

// test('get user profile', async () => {
//     let action = await getUserProfile(2);
//     console.log(action)
//
//     let newState = profileReducer(state,action);
//     console.log(newState)
//
//     expect(newState.profile).toBe(2);
//     // expect(newState.status).toBe('ghgdddsdsd sd');
// });